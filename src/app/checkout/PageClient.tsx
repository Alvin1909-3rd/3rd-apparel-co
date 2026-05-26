'use client'


import { useState, useEffect } from 'react'
import { useCart } from '@/context/CartContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { pixelInitiateCheckout } from '@/lib/pixel'

export default function CheckoutClient() {
  const { cart, total, clear } = useCart()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const shipping = total >= 75 ? 0 : 8.99
  const orderTotal = total + shipping

  useEffect(() => {
    if (cart.length > 0) {
      const numItems = cart.reduce((sum, item) => sum + item.quantity, 0)
      const contentIds = cart.map((item) => item.product.id)
      pixelInitiateCheckout(orderTotal, numItems, contentIds)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const [form, setForm] = useState({
    email: '',
    name: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    zip: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart, shippingAddress: form, email: form.email }),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Checkout failed')

      // Redirect to Stripe
      window.location.href = data.url
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <p style={{ color: '#5a5650' }}>Your cart is empty.</p>
        <Link href="/shop" className="mt-4 text-sm underline" style={{ color: '#c25b2a' }}>Back to Shop</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-6xl mb-10" style={{ fontFamily: 'Bebas Neue, sans-serif', color: '#0e0e0e' }}>
          Checkout
        </h1>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-widest mb-4" style={{ color: '#8a6510' }}>Contact</p>
              <input
                name="email"
                type="email"
                placeholder="Email address"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 text-sm outline-none focus:border-[#c25b2a] transition-colors"
                style={{ backgroundColor: '#f7f5f2', border: '1px solid #d8d2ca', color: '#0e0e0e' }}
              />
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest mb-4 mt-6" style={{ color: '#8a6510' }}>Shipping Address</p>
              <div className="space-y-3">
                <input name="name" placeholder="Full name" required value={form.name} onChange={handleChange}
                  className="w-full px-4 py-3 text-sm outline-none focus:border-[#c25b2a] transition-colors"
                  style={{ backgroundColor: '#f7f5f2', border: '1px solid #d8d2ca', color: '#0e0e0e' }} />
                <input name="line1" placeholder="Address" required value={form.line1} onChange={handleChange}
                  className="w-full px-4 py-3 text-sm outline-none focus:border-[#c25b2a] transition-colors"
                  style={{ backgroundColor: '#f7f5f2', border: '1px solid #d8d2ca', color: '#0e0e0e' }} />
                <input name="line2" placeholder="Apt, suite, etc. (optional)" value={form.line2} onChange={handleChange}
                  className="w-full px-4 py-3 text-sm outline-none focus:border-[#c25b2a] transition-colors"
                  style={{ backgroundColor: '#f7f5f2', border: '1px solid #d8d2ca', color: '#0e0e0e' }} />
                <div className="grid grid-cols-3 gap-3">
                  <input name="city" placeholder="City" required value={form.city} onChange={handleChange}
                    className="col-span-1 px-4 py-3 text-sm outline-none focus:border-[#c25b2a] transition-colors"
                    style={{ backgroundColor: '#f7f5f2', border: '1px solid #d8d2ca', color: '#0e0e0e' }} />
                  <input name="state" placeholder="State" required value={form.state} onChange={handleChange} maxLength={2}
                    className="px-4 py-3 text-sm outline-none focus:border-[#c25b2a] transition-colors uppercase"
                    style={{ backgroundColor: '#f7f5f2', border: '1px solid #d8d2ca', color: '#0e0e0e' }} />
                  <input name="zip" placeholder="ZIP" required value={form.zip} onChange={handleChange}
                    className="px-4 py-3 text-sm outline-none focus:border-[#c25b2a] transition-colors"
                    style={{ backgroundColor: '#f7f5f2', border: '1px solid #d8d2ca', color: '#0e0e0e' }} />
                </div>
              </div>
            </div>

            {error && (
              <p className="text-sm" style={{ color: '#c25b2a' }}>{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 text-sm uppercase tracking-widest font-semibold transition-all hover:opacity-90 disabled:opacity-50 mt-4"
              style={{ backgroundColor: '#c25b2a', color: '#0e0e0e' }}
            >
              {loading ? 'Redirecting to Payment...' : `Pay $${orderTotal.toFixed(2)}`}
            </button>

            <p className="text-xs text-center" style={{ color: '#5a5650' }}>
              Payments are processed securely via Stripe
            </p>
          </form>

          {/* Order Summary */}
          <div
            className="h-fit p-6"
            style={{ backgroundColor: '#f7f5f2', border: '1px solid #d8d2ca' }}
          >
            <h2 className="text-2xl mb-6" style={{ fontFamily: 'Bebas Neue, sans-serif', color: '#0e0e0e' }}>Order Summary</h2>
            <div className="space-y-3 mb-6">
              {cart.map((item) => (
                <div key={`${item.product.id}-${item.size}`} className="flex justify-between text-sm">
                  <span style={{ color: '#5a5650' }}>
                    {item.product.name} <span style={{ color: '#d8d2ca' }}>Ã—</span> {item.quantity}
                    <span className="ml-1 text-xs">({item.size})</span>
                  </span>
                  <span style={{ color: '#0e0e0e' }}>${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2 text-sm pt-4" style={{ borderTop: '1px solid #d8d2ca' }}>
              <div className="flex justify-between">
                <span style={{ color: '#5a5650' }}>Subtotal</span>
                <span style={{ color: '#0e0e0e' }}>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: '#5a5650' }}>Shipping</span>
                <span style={{ color: shipping === 0 ? '#8a6510' : '#0e0e0e' }}>
                  {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between font-semibold pt-2" style={{ borderTop: '1px solid #d8d2ca' }}>
                <span style={{ color: '#0e0e0e' }}>Total</span>
                <span style={{ color: '#8a6510' }}>${orderTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

