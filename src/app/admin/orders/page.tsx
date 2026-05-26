export const dynamic = 'force-dynamic'

import { getAdminSession } from '@/lib/adminAuth'
import { redirect } from 'next/navigation'
import { supabaseAdmin } from '@/lib/supabase'
import Link from 'next/link'
import { Order } from '@/lib/types'

async function getOrders(): Promise<Order[]> {
  const { data } = await supabaseAdmin
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })
  return data || []
}

const STATUS_COLORS: Record<string, string> = {
  pending: '#9e9a94',
  paid: '#c8a96e',
  shipped: '#c25b2a',
  delivered: '#4a7c4a',
}

export default async function AdminOrdersPage() {
  const { valid } = await getAdminSession()
  if (!valid) redirect('/admin/login')
  const orders = await getOrders()

  return (
    <div className="min-h-screen px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <Link href="/admin" className="text-sm hover:text-[#c25b2a] transition-colors" style={{ color: '#9e9a94' }}>
            ← Dashboard
          </Link>
          <h1 className="text-5xl mt-4" style={{ fontFamily: 'Bebas Neue, sans-serif', color: '#f0ece4' }}>
            Orders
          </h1>
        </div>

        {orders.length === 0 ? (
          <p style={{ color: '#9e9a94' }}>No orders yet.</p>
        ) : (
          <div className="space-y-2">
            <div className="grid grid-cols-5 px-4 py-2 text-xs uppercase tracking-widest" style={{ color: '#9e9a94' }}>
              <span>Order ID</span>
              <span>Customer</span>
              <span>Date</span>
              <span>Total</span>
              <span>Status</span>
            </div>
            {orders.map((order) => (
              <div
                key={order.id}
                className="grid grid-cols-5 items-center px-4 py-4"
                style={{ backgroundColor: '#1a1a1a', border: '1px solid #2e2e2e' }}
              >
                <span className="font-mono text-xs" style={{ color: '#f0ece4' }}>
                  #{order.id.slice(0, 8).toUpperCase()}
                </span>
                <span className="text-sm" style={{ color: '#9e9a94' }}>{order.email}</span>
                <span className="text-sm" style={{ color: '#9e9a94' }}>
                  {new Date(order.created_at).toLocaleDateString()}
                </span>
                <span style={{ color: '#c8a96e' }}>${order.total.toFixed(2)}</span>
                <span
                  className="text-xs uppercase tracking-widest"
                  style={{ color: STATUS_COLORS[order.status] || '#9e9a94' }}
                >
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
