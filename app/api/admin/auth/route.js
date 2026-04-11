export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { checkPassword, signToken } from '../../../../lib/adminAuth'
import { rateLimit } from '../../../../lib/ratelimit'
import * as OTPAuth from 'otpauth'

function verifyTOTP(token) {
  const secret = process.env.ADMIN_TOTP_SECRET
  if (!secret) return true // TOTP not configured — skip
  const totp = new OTPAuth.TOTP({ secret: OTPAuth.Secret.fromBase32(secret), algorithm: 'SHA1', digits: 6, period: 30 })
  const delta = totp.validate({ token, window: 1 })
  return delta !== null
}

function isTOTPEnabled() {
  return !!process.env.ADMIN_TOTP_SECRET
}

export async function POST(request) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    const rl = await rateLimit(ip, 'admin-login', { limit: 5, window: 900 })
    if (!rl.success) {
      return NextResponse.json(
        { error: 'Trop de tentatives. Réessayez dans 15 minutes.' },
        { status: 429, headers: { 'Retry-After': '900' } }
      )
    }

    const { password, totp_code } = await request.json()
    const valid = await checkPassword(password)
    if (!valid) {
      return NextResponse.json({ success: false }, { status: 401 })
    }

    // If TOTP is enabled and no code provided, ask for it
    if (isTOTPEnabled() && !totp_code) {
      return NextResponse.json({ success: false, needs_totp: true })
    }

    // If TOTP code provided, verify it
    if (isTOTPEnabled() && totp_code) {
      if (!verifyTOTP(totp_code)) {
        return NextResponse.json({ success: false, error: 'Code 2FA invalide' }, { status: 401 })
      }
    }

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
