import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from '@/lib/adminSession'

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (!pathname.startsWith('/admin')) return NextResponse.next()
  if (pathname.startsWith('/admin/login')) return NextResponse.next()
  if (pathname.startsWith('/api/admin/login')) return NextResponse.next()

  const sessionCookie = req.cookies.get(ADMIN_SESSION_COOKIE)?.value

  if (!(await verifyAdminSessionToken(sessionCookie))) {
    const loginUrl = req.nextUrl.clone()
    loginUrl.pathname = '/admin/login'
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin', '/admin/:path*', '/api/admin/:path*'],
}
