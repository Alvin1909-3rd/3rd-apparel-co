export const dynamic = 'force-dynamic'

import { supabaseAdmin } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'
import MetaPixelPurchase from '@/components/MetaPixelPurchase'

async function getOrder(id: string) {
  const { data } = await supabaseAdmin
    .from('orders')
    .select('*')
    .eq('id', id)
    .single()
  return data
}

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const order = await getOrder(id)
  if (!order) notFound()

  const contentIds = order.items.map((item: { product: { id: string } }) => item.product.id)
  const numItems = order.items.reduce((sum: number, item: { quantity: number }) => sum + item.quantity, 0)

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16">
      <MetaPixelPurchase value={order.total} contentIds={contentIds} numItems={numItems} />
      <div className="max-w-lg w-full text-center">
        <CheckCircle size={56} className="mx-auto mb-6" style={{ color: '#c25b2a' }} />
        <h1 className="text-5xl mb-3" style={{ fontFamily: 'Bebas Neue, sans-serif', color: '#f0ece4' }}>
          Order Confirmed
        </h1>
        <p className="text-sm mb-2" style={{ color: '#9e9a94' }}>
          Thank you for your order. A confirmation has been sent to:
        </p>
        <p className="text-sm mb-8" style={{ color: '#c8a96e' }}>{order.email}</p>

        <div className="p-6 text-left mb-8" style={{ backgroundColor: '#1a1a1a', border: '1px solid #2e2e2e' }}>
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: '#c8a96e' }}>Order Details</p>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span style={{ color: '#9e9a94' }}>Order Number</span>
              <span className="font-mono text-xs" style={{ color: '#f0ece4' }}>#{order.id.slice(0, 8).toUpperCase()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span style={{ color: '#9e9a94' }}>Status</span>
              <span className="uppercase text-xs tracking-widest" style={{ color: '#c8a96e' }}>{order.status}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span style={{ color: '#9e9a94' }}>Total</span>
              <span style={{ color: '#f0ece4' }}>${order.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span style={{ color: '#9e9a94' }}>Shipping to</span>
              <span className="text-right" style={{ color: '#f0ece4' }}>
                {order.shipping_address.name}<br />
                {order.shipping_address.city}, {order.shipping_address.state}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Link
            href="/shop"
            className="block w-full py-4 text-sm uppercase tracking-widest hover:opacity-90 transition-all"
            style={{ backgroundColor: '#c25b2a', color: '#f0ece4' }}
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="block text-sm hover:text-[#c25b2a] transition-colors"
            style={{ color: '#9e9a94' }}
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
