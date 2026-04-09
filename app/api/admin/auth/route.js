export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { checkPassword, signToken } from '../../../../lib/adminAuth'

export async function POST(request) {
  try {
    const { password } = await request.json()
    const valid = await checkPassword(password)
    if (!valid) {
      return NextResponse.json({ success: false }, { status: 401 })
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
