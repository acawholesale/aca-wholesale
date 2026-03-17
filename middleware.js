import { NextResponse } from 'next/server'

export function middleware(request) {
  const session = request.cookies.get('admin_session')
  const isLoginPage = request.nextUrl.pathname === '/admin/login'

  if (!isLoginPage && session?.value !== process.env.ADMIN_SECRET) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  if (isLoginPage && session?.value === process.env.ADMIN_SECRET) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*'
}
