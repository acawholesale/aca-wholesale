import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'dev-secret-change-me'
const PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || ''

export async function checkPassword(password) {
  if (!PASSWORD_HASH) return password === (process.env.ADMIN_PASSWORD || 'admin123')
  return bcrypt.compare(password, PASSWORD_HASH)
}

export function signToken() {
  return jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '24h' })
}

export function verifyAdmin(request) {
  const cookie = request.headers.get('cookie') || ''
  const match = cookie.match(/admin_token=([^;]+)/)
  if (!match) return { authenticated: false }
  try {
    jwt.verify(match[1], JWT_SECRET)
    return { authenticated: true }
  } catch {
    return { authenticated: false }
  }
}
