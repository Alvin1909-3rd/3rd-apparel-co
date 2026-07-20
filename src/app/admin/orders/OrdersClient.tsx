'use client'

import { useState } from 'react'
import { Order } from '@/lib/types'

const STATUS_COLORS: Record<string, string> = {
  pending: '#9e9a94',
  paid: '#c8a96e',
  shipped: '#c25b2a',
  delivered: '#4a7c4a',
}

export default function OrdersClient({ initialOrders }: { initialOrders: Order[] }) {
  const [orders, setOrders] = useState<Order[]>(initialOrders)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [trackingInputs, setTrackingInputs] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  async function handleShip(orderId: string) {
    const tracking = trackingInputs[orderId]?.trim()
    if (!tracking) {
      setErrors((prev) => ({ ...prev, [orderId]: 'Enter a tracking number.' }))
      return
    }
    setLoading(orderId)
    setErrors((prev) => ({ ...prev, [orderId]: '' }))

    try {
      const res = await fetch(`/api/admin/orders/${orderId}/ship`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trackingNumber: tracking }),
      })
      if (!res.ok) {
        const data = await res.json()
        setErrors((prev) => ({ ...prev, [orderId]: data.error || 'Something went wrong.' }))
        return
      }
      const updated = await res.json()
      setOrders((prev) => prev.map((o) => (o.id === orderId ? updated : o)))
      setExpandedId(null)
    } catch {
      setErrors((prev) => ({ ...prev, [orderId]: 'Request failed.' }))
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-5 px-4 py-2 text-xs uppercase tracking-widest" style={{ color: '#9e9a94' }}>
        <span>Order ID</span>
        <span>Customer</span>
        <span>Date</span>
        <span>Total</span>
        <span>Status</span>
      </div>

      {orders.map((order) => (
        <div key={order.id} style={{ backgroundColor: '#1a1a1a', border: '1px solid #2e2e2e' }}>
          <div className="grid grid-cols-5 items-center px-4 py-4">
            <span className="font-mono text-xs" style={{ color: '#f0ece4' }}>
              #{order.id.slice(0, 8).toUpperCase()}
            </span>
            <span className="text-sm" style={{ color: '#9e9a94' }}>{order.email}</span>
            <span className="text-sm" style={{ color: '#9e9a94' }}>
              {new Date(order.created_at).toLocaleDateString()}
            </span>
            <span style={{ color: '#c8a96e' }}>${order.total.toFixed(2)}</span>
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-widest" style={{ color: STATUS_COLORS[order.status] || '#9e9a94' }}>
                {order.status}
              </span>
              {order.status === 'paid' && (
                <button
                  onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
                  className="text-xs uppercase tracking-widest px-3 py-1 transition-opacity hover:opacity-80"
                  style={{ backgroundColor: '#c25b2a', color: '#f0ece4' }}
                >
                  Ship
                </button>
              )}
              {order.status === 'shipped' && order.tracking_number && (
                <span className="font-mono text-xs" style={{ color: '#9e9a94' }}>
                  {order.tracking_number}
                </span>
              )}
            </div>
          </div>

          {expandedId === order.id && (
            <div className="px-4 pb-4 pt-0" style={{ borderTop: '1px solid #2e2e2e' }}>
              <div className="flex items-center gap-3 pt-4">
                <input
                  type="text"
                  placeholder="Tracking number"
                  value={trackingInputs[order.id] || ''}
                  onChange={(e) => setTrackingInputs((prev) => ({ ...prev, [order.id]: e.target.value }))}
                  className="flex-1 px-3 py-2 text-sm bg-transparent outline-none"
                  style={{ border: '1px solid #3e3e3e', color: '#f0ece4', caretColor: '#c25b2a' }}
                  onKeyDown={(e) => e.key === 'Enter' && handleShip(order.id)}
                />
                <button
                  onClick={() => handleShip(order.id)}
                  disabled={loading === order.id}
                  className="px-6 py-2 text-sm uppercase tracking-widest disabled:opacity-50"
                  style={{ backgroundColor: '#c25b2a', color: '#f0ece4' }}
                >
                  {loading === order.id ? 'Sending...' : 'Confirm & Notify'}
                </button>
                <button
                  onClick={() => setExpandedId(null)}
                  className="text-sm"
                  style={{ color: '#9e9a94' }}
                >
                  Cancel
                </button>
              </div>
              {errors[order.id] && (
                <p className="mt-2 text-xs" style={{ color: '#c25b2a' }}>{errors[order.id]}</p>
              )}
              <p className="mt-2 text-xs" style={{ color: '#5a5650' }}>
                Customer will receive a shipping notification email automatically.
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
