export const dynamic = 'force-dynamic'

import { getAdminSession } from '@/lib/adminAuth'
import { redirect } from 'next/navigation'
import { supabaseAdmin } from '@/lib/supabase'
import Link from 'next/link'
import { Package, ShoppingBag, DollarSign, Plus } from 'lucide-react'
import LogoutButton from './LogoutButton'

async function getStats() {
  const [{ data: products }, { data: orders }] = await Promise.all([
    supabaseAdmin.from('products').select('id, name, inventory, price'),
    supabaseAdmin.from('orders').select('total, status').order('created_at', { ascending: false }),
  ])

  const totalRevenue = (orders || [])
    .filter((o) => o.status !== 'pending')
    .reduce((sum, o) => sum + o.total, 0)

  const lowStock = (products || []).filter((p) => {
    const total = Object.values(p.inventory as Record<string, number>).reduce((a, b) => a + b, 0)
    return total <= 3
  })

  return {
    productCount: products?.length || 0,
    orderCount: orders?.length || 0,
    totalRevenue,
    recentOrders: orders?.slice(0, 5) || [],
    lowStock,
  }
}

export default async function AdminPage() {
  const { valid } = await getAdminSession()
  if (!valid) redirect('/admin/login')
  const stats = await getStats()

  return (
    <div className="min-h-screen px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-xs uppercase tracking-widest mb-2" style={{ color: '#c8a96e' }}>Dashboard</p>
            <h1 className="text-5xl" style={{ fontFamily: 'Bebas Neue, sans-serif', color: '#f0ece4' }}>
              Admin Panel
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <LogoutButton />
            <Link
              href="/admin/products/new"
              className="flex items-center gap-2 px-6 py-3 text-sm uppercase tracking-widest hover:opacity-90"
              style={{ backgroundColor: '#c25b2a', color: '#f0ece4' }}
            >
              <Plus size={16} />
              Add Product
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Total Products', value: stats.productCount, icon: Package },
            { label: 'Total Orders', value: stats.orderCount, icon: ShoppingBag },
            { label: 'Total Revenue', value: `$${stats.totalRevenue.toFixed(2)}`, icon: DollarSign },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-6 flex items-center gap-4"
              style={{ backgroundColor: '#1a1a1a', border: '1px solid #2e2e2e' }}
            >
              <stat.icon size={28} style={{ color: '#c25b2a' }} />
              <div>
                <p className="text-xs uppercase tracking-widest" style={{ color: '#9e9a94' }}>{stat.label}</p>
                <p className="text-2xl mt-1" style={{ fontFamily: 'Bebas Neue, sans-serif', color: '#f0ece4' }}>{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Quick Links */}
          <div className="p-6" style={{ backgroundColor: '#1a1a1a', border: '1px solid #2e2e2e' }}>
            <h2 className="text-2xl mb-4" style={{ fontFamily: 'Bebas Neue, sans-serif', color: '#f0ece4' }}>Manage</h2>
            <div className="space-y-2">
              {[
                { label: 'All Products', href: '/admin/products' },
                { label: 'Add New Product', href: '/admin/products/new' },
                { label: 'All Orders', href: '/admin/orders' },
                { label: 'Feed Photos', href: '/admin/feed' },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="flex items-center justify-between p-3 text-sm hover:border-[#c25b2a] transition-all"
                  style={{ border: '1px solid #2e2e2e', color: '#9e9a94' }}
                >
                  {link.label}
                  <span style={{ color: '#c25b2a' }}>→</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Low Stock Warning */}
          <div className="p-6" style={{ backgroundColor: '#1a1a1a', border: '1px solid #2e2e2e' }}>
            <h2 className="text-2xl mb-4" style={{ fontFamily: 'Bebas Neue, sans-serif', color: '#f0ece4' }}>
              Low Stock
            </h2>
            {stats.lowStock.length === 0 ? (
              <p className="text-sm" style={{ color: '#9e9a94' }}>All products have sufficient inventory.</p>
            ) : (
              <div className="space-y-2">
                {stats.lowStock.map((p) => (
                  <div key={p.id} className="flex items-center justify-between p-3" style={{ border: '1px solid #c25b2a11', backgroundColor: '#c25b2a11' }}>
                    <span className="text-sm" style={{ color: '#f0ece4' }}>{p.name}</span>
                    <span className="text-xs uppercase tracking-widest" style={{ color: '#c25b2a' }}>Low Stock</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
