'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      setSent(true)
    } else {
      const data = await res.json()
      setError(data.error || 'Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen px-6 py-20" style={{ backgroundColor: '#ffffff' }}>
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-xs uppercase tracking-widest hover:text-[#c25b2a] transition-colors mb-10 block" style={{ color: '#5a5650' }}>
          ← Back
        </Link>

        <p className="text-xs uppercase tracking-[0.4em] mb-3" style={{ color: '#8a6510' }}>3rd Apparel Co</p>
        <h1 className="text-6xl mb-3 leading-none" style={{ fontFamily: 'Bebas Neue, sans-serif', color: '#0e0e0e' }}>
          Contact Us
        </h1>
        <p className="text-sm mb-10" style={{ color: '#5a5650' }}>
          Questions about your order or just want to connect? Reach out — we respond within 1–2 business days.
        </p>

        {sent ? (
          <div className="py-12 text-center" style={{ border: '1px solid #d8d2ca' }}>
            <div className="w-8 h-px mx-auto mb-6" style={{ backgroundColor: '#c25b2a' }} />
            <p className="text-lg mb-2" style={{ fontFamily: 'Bebas Neue, sans-serif', color: '#0e0e0e', fontSize: '2rem' }}>Message Received</p>
            <p className="text-sm" style={{ color: '#5a5650' }}>We&apos;ll get back to you within 1–2 business days.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: '#5a5650' }}>Name</label>
                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 text-sm outline-none"
                  style={{ border: '1px solid #d8d2ca', color: '#0e0e0e', backgroundColor: '#fafafa' }}
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: '#5a5650' }}>Email</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 text-sm outline-none"
                  style={{ border: '1px solid #d8d2ca', color: '#0e0e0e', backgroundColor: '#fafafa' }}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: '#5a5650' }}>Subject</label>
              <select
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                required
                className="w-full px-4 py-3 text-sm outline-none"
                style={{ border: '1px solid #d8d2ca', color: '#0e0e0e', backgroundColor: '#fafafa' }}
              >
                <option value="">Select a topic</option>
                <option value="Order Question">Order Question</option>
                <option value="Return / Exchange">Return / Exchange</option>
                <option value="Product Question">Product Question</option>
                <option value="Wholesale / Collab">Wholesale / Collab</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: '#5a5650' }}>Message</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 text-sm outline-none resize-none"
                style={{ border: '1px solid #d8d2ca', color: '#0e0e0e', backgroundColor: '#fafafa' }}
              />
            </div>

            {error && <p className="text-xs" style={{ color: '#c25b2a' }}>{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 text-sm uppercase tracking-widest font-semibold hover:opacity-90 transition-all disabled:opacity-50"
              style={{ backgroundColor: '#c25b2a', color: '#ffffff' }}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}

        <div className="mt-12 pt-8" style={{ borderTop: '1px solid #d8d2ca' }}>
          <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#8a6510' }}>Direct Contact</p>
          <a href="mailto:orders@3rdapparelco.com" className="text-sm hover:text-[#c25b2a] transition-colors" style={{ color: '#5a5650' }}>
            orders@3rdapparelco.com
          </a>
        </div>
      </div>
    </div>
  )
}
