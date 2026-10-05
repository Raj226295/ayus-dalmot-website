import { createServer } from 'node:http'
import { randomUUID } from 'node:crypto'
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const adminTickets = new Map()
const productsFile = join(dirname(fileURLToPath(import.meta.url)), '../data/products.json')
const themeFile = join(dirname(fileURLToPath(import.meta.url)), '../data/theme.json')
const reviewsFile = join(dirname(fileURLToPath(import.meta.url)), '../data/reviews.json')
const storeFeedbackFile = join(dirname(fileURLToPath(import.meta.url)), '../data/store-feedback.json')
const defaultTheme = { productCard: '#ffffff', buyNow: '#087331', footer: '#050505' }
let storefrontTheme = defaultTheme
try { storefrontTheme = { ...defaultTheme, ...JSON.parse(readFileSync(themeFile, 'utf8')) } } catch { storefrontTheme = defaultTheme }
let storedProducts = []
try { storedProducts = JSON.parse(readFileSync(productsFile, 'utf8')) } catch { storedProducts = [] }
const managedProducts = new Map(storedProducts.map(product => [product.id, product]))
let storedReviews = []
let storedStoreFeedback = []
try { storedReviews = JSON.parse(readFileSync(reviewsFile, 'utf8')) } catch { storedReviews = [] }
try { storedStoreFeedback = JSON.parse(readFileSync(storeFeedbackFile, 'utf8')) } catch { storedStoreFeedback = [] }
const managedReviews = new Map(storedReviews.map(review => [review.id, review]))
const adminEmail = process.env.ADMIN_EMAIL || 'admin@ayushkursela.com'
const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123'

function cleanMediaItems(items, limit = 12) {
  if (!Array.isArray(items)) return []
  const cleanedItems = items.filter(item => item && typeof item.url === 'string' && /^(data:image\/(png|jpeg|webp);base64,|\/)/i.test(item.url)).map((item, index) => ({ url: item.url, altText: String(item.altText || '').slice(0, 180), sortOrder: Number(item.sortOrder) || index + 1, isActive: item.isActive !== false }))
  return Number.isFinite(limit) ? cleanedItems.slice(0, limit) : cleanedItems
}

function cleanTextList(items, limit = 12) { return Array.isArray(items) ? items.map(item => String(item || '').trim()).filter(Boolean).slice(0, limit) : [] }
function cleanSpecifications(items) { return Array.isArray(items) ? items.map((item, index) => ({ label: String(item?.label || '').trim().slice(0, 80), value: String(item?.value || '').trim().slice(0, 180), sortOrder: Number(item?.sortOrder) || index + 1 })).filter(item => item.label && item.value).slice(0, 20) : [] }
function normaliseProduct(product) { return { ...product, galleryImages: cleanMediaItems(product.galleryImages), productDetailImages: cleanMediaItems(product.productDetailImages, Number.POSITIVE_INFINITY), benefits: cleanTextList(product.benefits), whyChoose: cleanTextList(product.whyChoose), specifications: cleanSpecifications(product.specifications), nutrition: cleanSpecifications(product.nutrition), ingredients: String(product.ingredients || '').trim().slice(0, 3000), shortDescription: String(product.shortDescription || '').trim().slice(0, 800), fullDescription: String(product.fullDescription || product.description || '').trim().slice(0, 8000), badge: String(product.badge || '').trim().slice(0, 40), relatedProductIds: cleanTextList(product.relatedProductIds, 12) } }
function cleanReviewText(value, limit) { return String(value || '').replace(/[<>\u0000-\u001f]/g, '').trim().slice(0, limit) }
function cleanReviewImages(images) { return Array.isArray(images) ? images.slice(0, 5).filter(image => typeof image === 'string' && /^data:image\/(jpeg|png|webp);base64,/i.test(image) && image.length <= 7_000_000) : [] }
function publicReview(review) { const { email, ...safeReview } = review; return safeReview }
function persistReviews() { writeFileSync(reviewsFile, JSON.stringify([...managedReviews.values()], null, 2)) }

function sendJson(response, status, payload) {
  response.writeHead(status)
  response.end(JSON.stringify(payload))
}

function readJson(request) {
  return new Promise((resolve, reject) => {
    let body = ''
    request.on('data', chunk => {
      body += chunk
      if (body.length > 80_000_000) reject(new Error('Request too large'))
    })
    request.on('end', () => {
      try { resolve(body ? JSON.parse(body) : {}) } catch (error) { reject(error) }
    })
    request.on('error', reject)
  })
}

export function createApp() {
  return createServer((request, response) => {
    const requestUrl = new URL(request.url, 'http://localhost')
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Content-Type', 'application/json')
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    if (request.method === 'OPTIONS') {
      response.writeHead(204)
      response.end()
      return
    }

    if (request.url === '/api/health') {
      sendJson(response, 200, { status: 'ok', service: 'ayush-kursela-backend' })
      return
    }

    if (request.method === 'GET' && request.url === '/api/products') {
      sendJson(response, 200, { products: [...managedProducts.values()].filter(product => product.status !== 'Draft') })
      return
    }

    if (request.method === 'GET' && requestUrl.pathname === '/api/reviews') {
      const productId = String(requestUrl.searchParams.get('productId') || '')
      const reviews = [...managedReviews.values()].filter(review => review.status === 'Approved' && (!productId || review.productId === productId)).map(publicReview)
      sendJson(response, 200, { reviews })
      return
    }

    if (request.method === 'GET' && requestUrl.pathname === '/api/admin/reviews') {
      sendJson(response, 200, { reviews: [...managedReviews.values()] })
      return
    }

    if (request.method === 'POST' && requestUrl.pathname === '/api/reviews') {
      readJson(request).then(input => {
        const rating = Number(input.rating)
        const reviewContent = cleanReviewText(input.reviewContent, 2000)
        const displayName = cleanReviewText(input.displayName, 80)
        const email = String(input.email || '').trim().toLowerCase().slice(0, 180)
        const productId = cleanReviewText(input.productId, 120)
        if (!productId || !Number.isInteger(rating) || rating < 1 || rating > 5 || reviewContent.length < 10 || displayName.length < 2 || !/^\S+@\S+\.\S+$/.test(email)) {
          sendJson(response, 400, { message: 'Please provide a valid rating, review, name and email.' })
          return
        }
        const submittedImages = Array.isArray(input.reviewImages) ? input.reviewImages : []
        const reviewImages = cleanReviewImages(submittedImages)
        if (submittedImages.length > 5 || reviewImages.length !== submittedImages.length) {
          sendJson(response, 400, { message: 'Use up to 5 valid JPEG, PNG or WebP images under 5 MB each.' })
          return
        }
        const id = `REV-${randomUUID()}`
        const review = { id, productId, productName: cleanReviewText(input.productName, 140), productImage: typeof input.productImage === 'string' && input.productImage.startsWith('/') ? input.productImage : '', rating, reviewTitle: cleanReviewText(input.reviewTitle, 150), reviewContent, displayName: input.anonymous ? 'Anonymous' : displayName, email, anonymous: Boolean(input.anonymous), reviewImages, status: 'Pending', verifiedPurchase: false, featured: false, reply: '', storeRating: null, createdAt: new Date().toISOString() }
        managedReviews.set(id, review)
        persistReviews()
        sendJson(response, 201, { review: publicReview(review) })
      }).catch(() => sendJson(response, 400, { message: 'Invalid review data.' }))
      return
    }

    const storeRatingMatch = requestUrl.pathname.match(/^\/api\/reviews\/([^/]+)\/store-rating$/)
    if (request.method === 'POST' && storeRatingMatch) {
      readJson(request).then(input => {
        const rating = Number(input.rating)
        const reviewId = decodeURIComponent(storeRatingMatch[1])
        if (!managedReviews.has(reviewId) || !Number.isInteger(rating) || rating < 1 || rating > 5) { sendJson(response, 400, { message: 'Invalid store rating.' }); return }
        storedStoreFeedback.push({ id: randomUUID(), reviewId, rating, createdAt: new Date().toISOString() })
        writeFileSync(storeFeedbackFile, JSON.stringify(storedStoreFeedback, null, 2))
        sendJson(response, 201, { saved: true })
      }).catch(() => sendJson(response, 400, { message: 'Invalid store rating.' }))
      return
    }

    const reviewMatch = requestUrl.pathname.match(/^\/api\/reviews\/([^/]+)$/)
    if (request.method === 'PUT' && reviewMatch) {
      readJson(request).then(input => {
        const id = decodeURIComponent(reviewMatch[1])
        const current = managedReviews.get(id)
        if (!current) { sendJson(response, 404, { message: 'Review not found.' }); return }
        const allowedStatuses = ['Pending', 'Approved', 'Hidden']
        const updated = { ...current, status: allowedStatuses.includes(input.status) ? input.status : current.status, featured: typeof input.featured === 'boolean' ? input.featured : current.featured, reply: input.reply === undefined ? current.reply : cleanReviewText(input.reply, 1000), updatedAt: new Date().toISOString() }
        managedReviews.set(id, updated); persistReviews(); sendJson(response, 200, { review: updated })
      }).catch(() => sendJson(response, 400, { message: 'Invalid review update.' }))
      return
    }

    if (request.method === 'DELETE' && reviewMatch) {
      const id = decodeURIComponent(reviewMatch[1])
      if (!managedReviews.delete(id)) { sendJson(response, 404, { message: 'Review not found.' }); return }
      persistReviews(); sendJson(response, 200, { deleted: true })
      return
    }

    if (request.method === 'GET' && request.url === '/api/theme') {
      sendJson(response, 200, { theme: storefrontTheme })
      return
    }

    if (request.method === 'POST' && request.url === '/api/theme') {
      readJson(request).then(theme => {
        const isColour = value => /^#[0-9a-f]{6}$/i.test(String(value))
        const next = {
          productCard: isColour(theme.productCard) ? theme.productCard : storefrontTheme.productCard,
          buyNow: isColour(theme.buyNow) ? theme.buyNow : storefrontTheme.buyNow,
          footer: isColour(theme.footer) ? theme.footer : storefrontTheme.footer,
        }
        storefrontTheme = next
        writeFileSync(themeFile, JSON.stringify(next, null, 2))
        sendJson(response, 200, { theme: next })
      }).catch(() => sendJson(response, 400, { message: 'Invalid theme data.' }))
      return
    }

    if (request.method === 'POST' && request.url === '/api/products') {
      readJson(request).then(product => {
        if (!product.name || !product.sku) {
          sendJson(response, 400, { message: 'Product name aur SKU required hai.' })
          return
        }
        const id = product.id || String(product.name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || randomUUID()
        const saved = { ...normaliseProduct(product), id, updatedAt: new Date().toISOString() }
        managedProducts.set(id, saved)
        writeFileSync(productsFile, JSON.stringify([...managedProducts.values()], null, 2))
        sendJson(response, 201, { product: saved })
      }).catch(() => sendJson(response, 400, { message: 'Invalid product data.' }))
      return
    }

    if (request.method === 'POST' && request.url === '/api/auth/admin') {
      readJson(request).then(({ email, password }) => {
        if (String(email).trim().toLowerCase() !== adminEmail.toLowerCase() || password !== adminPassword) {
          sendJson(response, 401, { message: 'Email ya password galat hai.' })
          return
        }
        const ticket = randomUUID()
        adminTickets.set(ticket, Date.now() + 60_000)
        sendJson(response, 200, { ticket })
      }).catch(() => sendJson(response, 400, { message: 'Invalid request.' }))
      return
    }

    if (request.method === 'POST' && request.url === '/api/auth/admin/consume') {
      readJson(request).then(({ ticket }) => {
        const expiresAt = adminTickets.get(ticket)
        adminTickets.delete(ticket)
        if (!expiresAt || expiresAt < Date.now()) {
          sendJson(response, 401, { message: 'Admin login expired.' })
          return
        }
        sendJson(response, 200, { authenticated: true })
      }).catch(() => sendJson(response, 400, { message: 'Invalid request.' }))
      return
    }

    sendJson(response, 404, { message: 'Route not found' })
  })
}
