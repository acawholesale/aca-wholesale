import { NextResponse } from 'next/server'

export function middleware(request) {
  const session = request.cookies.get('admin_session')
  const isLoginPage = request.nextUrl.pathname === '/admin/login'

  // Secret loaded from env var — never hardcoded
  const secret = process.env.ADMIN_SESSION_SECRET

  if (!isLoginPage && session?.value !== secret) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }
  if (isLoginPage && session?.value === secret) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }
  return NextResponse.next()
}

export const config = { matcher: '/admin/:path*' }
