export const dynamic = 'force-dynamic'

import { getAdminSession } from '@/lib/adminAuth'
import { redirect } from 'next/navigation'
import { supabaseAdmin } from '@/lib/supabase'
import Link from 'next/link'
import { Order } from '@/lib/types'
import OrdersClient from './OrdersClient'

async function getOrders(): Promise<Order[]> {
  const { data } = await supabaseAdmin
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })
  return data || []
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
          <OrdersClient initialOrders={orders} />
        )}
      </div>
    </div>
  )
}
