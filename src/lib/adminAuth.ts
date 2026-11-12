import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from '@/lib/adminSession'

export async function getAdminSession(): Promise<{ valid: boolean }> {
  const cookieStore = await cookies()
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value
  return { valid: await verifyAdminSessionToken(token) }
}

// For API route handlers: returns a 401 response when the caller is not a
// signed-in admin, or null when the request may continue.
export async function requireAdmin(): Promise<NextResponse | null> {
  const { valid } = await getAdminSession()
  if (valid) return null
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}
