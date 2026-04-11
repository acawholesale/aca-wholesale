export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { checkPassword, signToken } from '../../../../lib/adminAuth'

// Rate limit: max 5 attempts per 15 minutes per IP
const loginAttempts = new Map()
const MAX_ATTEMPTS = 5
const WINDOW_MS = 15 * 60 * 1000

function checkRateLimit(ip) {
  const now = Date.now()
  const record = loginAttempts.get(ip)
  if (!record || now - record.start > WINDOW_MS) {
    loginAttempts.set(ip, { count: 1, start: now })
    return true
  }
  record.count++
  return record.count <= MAX_ATTEMPTS
}

export async function POST(request) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: 'Trop de tentatives. Réessayez dans 15 minutes.' }, { status: 429 })
    }

    const { password } = await request.json()
    const valid = await checkPassword(password)
    if (!valid) {
      return NextResponse.json({ success: false }, { status: 401 })
    }

    // Reset attempts on successful login
    loginAttempts.delete(ip)
    const token = signToken()
    const response = NextResponse.json({ success: true })
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 86400,
    })
    return response
  } catch {
    return NextResponse.json({ success: false }, { status: 400 })
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true })
  response.cookies.set('admin_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
  })
  return response
}
