import { cookies } from 'next/headers'

export async function getAdminSession(): Promise<{ valid: boolean }> {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')?.value
  const pw = process.env.ADMIN_PASSWORD

  // Both must be non-empty strings and must match
  if (!session || !pw) return { valid: false }
  return { valid: session === pw }
}
