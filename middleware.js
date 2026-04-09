import { NextResponse } from 'next/server'

export function middleware(request) {
  const token = request.cookies.get('admin_token')
  const isLoginPage = request.nextUrl.pathname === '/admin/login'

  if (!isLoginPage && !token?.value) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }
  if (isLoginPage && token?.value) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }
  return NextResponse.next()
}

export const config = { matcher: '/admin/:path*' }
