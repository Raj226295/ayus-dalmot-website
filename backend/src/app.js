import { createServer } from 'node:http'
import { randomUUID } from 'node:crypto'

const adminTickets = new Map()
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
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')

    if (request.method === 'OPTIONS') {
      response.writeHead(204)
      response.end()
      return
    }

    if (request.url === '/api/health') {
      sendJson(response, 200, { status: 'ok', service: 'ayush-kursela-backend' })
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
