import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.ADMIN_JWT_SECRET
const PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH

export async function checkPassword(password) {
  if (!JWT_SECRET || !PASSWORD_HASH) {
    console.error('ADMIN_JWT_SECRET or ADMIN_PASSWORD_HASH not set')
    return false
  }
  return bcrypt.compare(password, PASSWORD_HASH)
}

export function signToken() {
  return jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '24h' })
}

export function verifyAdmin(request) {
  if (!JWT_SECRET) return { authenticated: false }
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
