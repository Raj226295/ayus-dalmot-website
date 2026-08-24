import { createServer } from 'node:http'
import { randomUUID } from 'node:crypto'
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const adminTickets = new Map()
const productsFile = join(dirname(fileURLToPath(import.meta.url)), '../data/products.json')
let storedProducts = []
try { storedProducts = JSON.parse(readFileSync(productsFile, 'utf8')) } catch { storedProducts = [] }
const managedProducts = new Map(storedProducts.map(product => [product.id, product]))
const adminEmail = process.env.ADMIN_EMAIL || 'admin@ayushkursela.com'
const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123'

function sendJson(response, status, payload) {
  response.writeHead(status)
  response.end(JSON.stringify(payload))
}

function readJson(request) {
  return new Promise((resolve, reject) => {
    let body = ''
    request.on('data', chunk => {
      body += chunk
      if (body.length > 10_000) reject(new Error('Request too large'))
    })
    request.on('end', () => {
      try { resolve(body ? JSON.parse(body) : {}) } catch (error) { reject(error) }
    })
    request.on('error', reject)
  })
}

export function createApp() {
  return createServer((request, response) => {
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

    if (request.method === 'POST' && request.url === '/api/products') {
      readJson(request).then(product => {
        if (!product.name || !product.sku) {
          sendJson(response, 400, { message: 'Product name aur SKU required hai.' })
          return
        }
        const id = product.id || String(product.name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || randomUUID()
        const saved = { ...product, id, updatedAt: new Date().toISOString() }
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
