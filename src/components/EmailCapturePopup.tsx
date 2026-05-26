'use client'

import { useState, useEffect, useId } from 'react'
import { usePathname } from 'next/navigation'
import { X } from 'lucide-react'
import { useFocusTrap } from '@/hooks/useFocusTrap'

const STORAGE_KEY = '3rdco_email_popup'

export default function EmailCapturePopup() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const titleId = useId()
  const trapRef = useFocusTrap(visible)

  useEffect(() => {
    if (pathname.startsWith('/admin')) return
    if (typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY)) return
    const t = setTimeout(() => setVisible(true), 4000)
    return () => clearTimeout(t)
  }, [pathname])

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [visible])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') dismiss() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, 'dismissed')
    setVisible(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source: 'popup' }),
    })
    const data = await res.json()
    if (!res.ok) {
      setError(data.error || 'Something went wrong.')
      setLoading(false)
      return
    }
    localStorage.setItem(STORAGE_KEY, 'subscribed')
    setCode(data.code)
    setLoading(false)
  }

  function copyCode() {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!visible) return null

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={dismiss}
        aria-hidden="true"
        style={{
          position: 'fixed', inset: 0, zIndex: 50,
          backgroundColor: 'rgba(14,14,14,0.65)',
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: 51,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 16, pointerEvents: 'none',
        }}
      >
        <div
          ref={trapRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="relative w-full max-w-md p-8 md:p-10"
          style={{ backgroundColor: '#ffffff', boxShadow: '0 32px 80px rgba(0,0,0,0.18)', pointerEvents: 'auto' }}
        >
          <button
            onClick={dismiss}
            aria-label="Close discount popup"
            className="absolute top-4 right-4 transition-colors hover:text-[#c25b2a]"
            style={{ color: '#9e9a94' }}
          >
            <X size={18} aria-hidden="true" />
          </button>

          <div className="w-6 h-px mb-6" style={{ backgroundColor: '#c25b2a' }} aria-hidden="true" />
          <p className="text-xs uppercase tracking-[0.4em] mb-3" style={{ color: '#8a6510' }}>
            3rd Apparel Co
          </p>

          {!code ? (
            <>
              <h2 id={titleId} className="text-5xl mb-3 leading-none" style={{ fontFamily: 'Bebas Neue, sans-serif', color: '#0e0e0e' }}>
                Get 10% Off<br />Your First Order
              </h2>
              <p className="text-sm mb-7" style={{ color: '#5a5650' }}>
                Join the list. Be the first to know about new drops and exclusive releases.
              </p>
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  aria-label="Email address"
                  className="w-full px-4 py-3 text-sm outline-none"
                  style={{ border: '1px solid #d8d2ca', color: '#0e0e0e', backgroundColor: '#fafafa' }}
                />
                {error && <p className="text-xs" role="alert" style={{ color: '#c25b2a' }}>{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 text-sm uppercase tracking-widest font-semibold hover:opacity-90 transition-all disabled:opacity-50"
                  style={{ backgroundColor: '#c25b2a', color: '#ffffff' }}
                >
                  {loading ? 'One moment...' : 'Claim 10% Off'}
                </button>
              </form>
              <button
                onClick={dismiss}
                className="block w-full text-center text-xs mt-4 transition-colors hover:text-[#c25b2a]"
                style={{ color: '#b0aca6' }}
              >
                No thanks
              </button>
            </>
          ) : (
            <>
              <h2 id={titleId} className="text-5xl mb-3 leading-none" style={{ fontFamily: 'Bebas Neue, sans-serif', color: '#0e0e0e' }}>
                You&apos;re In.
              </h2>
              <p className="text-sm mb-6" style={{ color: '#5a5650' }}>
                Use this code at checkout for 10% off your first order.
              </p>
              <div
                className="flex items-center justify-between px-4 py-3 mb-6"
                style={{ backgroundColor: '#f7f5f2', border: '1px solid #d8d2ca' }}
              >
                <span className="text-xl font-mono font-bold tracking-widest" style={{ color: '#0e0e0e' }}>
                  {code}
                </span>
                <button
                  onClick={copyCode}
                  aria-label={copied ? 'Code copied to clipboard' : 'Copy discount code'}
                  className="text-xs uppercase tracking-widest transition-colors hover:text-[#c25b2a]"
                  style={{ color: '#5a5650' }}
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <a
                href="/shop"
                className="block w-full text-center py-4 text-sm uppercase tracking-widest font-semibold hover:opacity-90 transition-all"
                style={{ backgroundColor: '#c25b2a', color: '#ffffff' }}
              >
                Shop Now
              </a>
            </>
          )}
        </div>
      </div>
    </>
  )
}
