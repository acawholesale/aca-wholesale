import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(request) {
  const token = request.cookies.get('admin_token')
  const isLoginPage = request.nextUrl.pathname === '/admin/login'

  let validToken = false
  if (token?.value && process.env.ADMIN_JWT_SECRET) {
    try {
      const secret = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET)
      await jwtVerify(token.value, secret)
      validToken = true
    } catch {
      // Invalid or expired token
    }
  }

  if (!isLoginPage && !validToken) {
    const response = NextResponse.redirect(new URL('/admin/login', request.url))
    // Clear invalid cookie if present
    if (token?.value) {
      response.cookies.set('admin_token', '', { path: '/', maxAge: 0 })
    }
    return response
  }
  if (isLoginPage && validToken) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }
  return NextResponse.next()
}

export const config = { matcher: '/admin/:path*' }
