import { NextRequest, NextResponse } from 'next/server'
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE,
  createAdminSessionToken,
  passwordMatches,
} from '@/lib/adminSession'

export async function POST(req: NextRequest) {
  const { password } = await req.json().catch(() => ({ password: undefined }))

  if (!passwordMatches(password)) {
    return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 })
  }

  const token = await createAdminSessionToken()
  if (!token) {
    return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 })
  }

  const res = NextResponse.json({ success: true })
  res.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: ADMIN_SESSION_MAX_AGE,
    path: '/',
  })
  return res
}
