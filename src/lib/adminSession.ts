// Signed admin session tokens.
//
// The admin_session cookie used to hold ADMIN_PASSWORD itself. It now holds
// `<expiresAt>.<nonce>.<signature>`, where the signature is an HMAC-SHA256 of
// `<expiresAt>.<nonce>` keyed by ADMIN_SESSION_SECRET (or ADMIN_PASSWORD when
// no separate secret is set). The password never leaves the server, the
// expiry is enforced server side, and changing the secret or password logs
// every existing session out.
//
// Uses Web Crypto only (no next/headers), so it works in proxy.ts, route
// handlers and server components alike.

export const ADMIN_SESSION_COOKIE = 'admin_session'
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 24 * 7 // 7 days, in seconds

const encoder = new TextEncoder()

function getSigningSecret(): string | null {
  const secret = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD
  return secret ? secret : null
}

function toBase64Url(bytes: ArrayBuffer | Uint8Array): string {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes)
  let binary = ''
  for (const b of arr) binary += String.fromCharCode(b)
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

async function sign(payload: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(payload))
  return toBase64Url(sig)
}

// Compares two strings without short-circuiting on the first difference.
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

// Also constant time with respect to content, for checking the login password.
export function passwordMatches(given: unknown): boolean {
  const expected = process.env.ADMIN_PASSWORD
  if (!expected || typeof given !== 'string' || !given) return false
  return safeEqual(given, expected)
}

export async function createAdminSessionToken(): Promise<string | null> {
  const secret = getSigningSecret()
  if (!secret) return null
  const expiresAt = Math.floor(Date.now() / 1000) + ADMIN_SESSION_MAX_AGE
  const nonce = toBase64Url(crypto.getRandomValues(new Uint8Array(32)))
  const payload = `${expiresAt}.${nonce}`
  return `${payload}.${await sign(payload, secret)}`
}

export async function verifyAdminSessionToken(token: string | undefined | null): Promise<boolean> {
  const secret = getSigningSecret()
  if (!secret || !token) return false

  const parts = token.split('.')
  if (parts.length !== 3) return false
  const [expiresAtRaw, nonce, signature] = parts

  const expiresAt = Number(expiresAtRaw)
  if (!Number.isInteger(expiresAt) || expiresAt <= Math.floor(Date.now() / 1000)) return false
  if (!nonce || !signature) return false

  const expected = await sign(`${expiresAtRaw}.${nonce}`, secret)
  return safeEqual(signature, expected)
}
