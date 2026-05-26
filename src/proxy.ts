import { NextRequest, NextResponse } from 'next/server'

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (!pathname.startsWith('/admin')) return NextResponse.next()
  if (pathname.startsWith('/admin/login')) return NextResponse.next()
  if (pathname.startsWith('/api/admin/login')) return NextResponse.next()

  const adminPassword = process.env.ADMIN_PASSWORD
  const sessionCookie = req.cookies.get('admin_session')?.value

  if (!adminPassword || !sessionCookie || sessionCookie !== adminPassword) {
    const loginUrl = req.nextUrl.clone()
    loginUrl.pathname = '/admin/login'
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin', '/admin/:path*', '/api/admin/:path*'],
}
