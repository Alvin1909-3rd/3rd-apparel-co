'use client'

import { useState } from 'react'

export default function FooterEmailForm() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source: 'footer' }),
    })
    const data = await res.json()
    if (!res.ok) {
      setError(data.error || 'Something went wrong.')
      setLoading(false)
      return
    }
    // Mark popup as seen too so it doesn't appear later
    localStorage.setItem('3rdco_email_popup', 'subscribed')
    setCode(data.code)
    setLoading(false)
  }

  function copyCode() {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      <h4 className="text-sm uppercase tracking-widest mb-1" style={{ color: '#8a6510' }}>
        Get 10% Off
      </h4>
      <p className="text-xs mb-4" style={{ color: '#5a5650' }}>
        Join the list for early access and exclusive offers.
      </p>

      {!code ? (
        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full px-3 py-2 text-sm outline-none"
            style={{ border: '1px solid #d8d2ca', color: '#0e0e0e', backgroundColor: '#ffffff' }}
          />
          {error && <p className="text-xs" style={{ color: '#c25b2a' }}>{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 text-xs uppercase tracking-widest hover:opacity-90 transition-all disabled:opacity-50"
            style={{ backgroundColor: '#c25b2a', color: '#ffffff' }}
          >
            {loading ? 'Joining...' : 'Join the List'}
          </button>
        </form>
      ) : (
        <div>
          <p className="text-xs mb-2" style={{ color: '#5a5650' }}>Your 10% off code:</p>
          <div
            className="flex items-center justify-between px-3 py-2"
            style={{ backgroundColor: '#ffffff', border: '1px solid #d8d2ca' }}
          >
            <span className="text-sm font-mono font-bold tracking-widest" style={{ color: '#0e0e0e' }}>
              {code}
            </span>
            <button
              onClick={copyCode}
              className="text-xs uppercase tracking-widest transition-colors hover:text-[#c25b2a]"
              style={{ color: '#5a5650' }}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
