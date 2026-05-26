export const dynamic = 'force-dynamic'

import { getAdminSession } from '@/lib/adminAuth'
import { redirect } from 'next/navigation'
import { supabaseAdmin } from '@/lib/supabase'
import Link from 'next/link'
import { Product } from '@/lib/types'
import { Plus, Edit } from 'lucide-react'

async function getProducts(): Promise<Product[]> {
  const { data } = await supabaseAdmin
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })
  return data || []
}

export default async function AdminProductsPage() {
  const { valid } = await getAdminSession()
  if (!valid) redirect('/admin/login')
  const products = await getProducts()

  return (
    <div className="min-h-screen px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-5xl" style={{ fontFamily: 'Bebas Neue, sans-serif', color: '#f0ece4' }}>Products</h1>
          <Link
            href="/admin/products/new"
            className="flex items-center gap-2 px-6 py-3 text-sm uppercase tracking-widest hover:opacity-90"
            style={{ backgroundColor: '#c25b2a', color: '#f0ece4' }}
          >
            <Plus size={16} /> Add Product
          </Link>
        </div>

        {products.length === 0 ? (
          <p style={{ color: '#9e9a94' }}>No products yet. Add your first product.</p>
        ) : (
          <div className="space-y-2">
            {/* Header */}
            <div className="grid grid-cols-5 px-4 py-2 text-xs uppercase tracking-widest" style={{ color: '#9e9a94' }}>
              <span className="col-span-2">Product</span>
              <span>Price</span>
              <span>Stock</span>
              <span>Featured</span>
            </div>
            {products.map((product) => {
              const totalStock = Object.values(product.inventory as Record<string, number>).reduce((a, b) => a + b, 0)
              return (
                <div
                  key={product.id}
                  className="grid grid-cols-5 items-center px-4 py-4 hover:border-[#c25b2a] transition-all"
                  style={{ backgroundColor: '#1a1a1a', border: '1px solid #2e2e2e' }}
                >
                  <div className="col-span-2">
                    <p className="text-sm font-medium" style={{ color: '#f0ece4' }}>{product.name}</p>
                    <p className="text-xs mt-0.5" style={{ color: '#9e9a94' }}>{product.category}</p>
                  </div>
                  <span className="text-sm" style={{ color: '#c8a96e' }}>${product.price.toFixed(2)}</span>
                  <span
                    className="text-xs uppercase tracking-widest"
                    style={{ color: totalStock === 0 ? '#c25b2a' : totalStock <= 3 ? '#c8a96e' : '#9e9a94' }}
                  >
                    {totalStock === 0 ? 'Out' : totalStock}
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-widest" style={{ color: product.featured ? '#c8a96e' : '#2e2e2e' }}>
                      {product.featured ? 'Yes' : '—'}
                    </span>
                    <Link href={`/admin/products/${product.id}/edit`} style={{ color: '#9e9a94' }}>
                      <Edit size={14} />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <div className="mt-6">
          <Link href="/admin" className="text-sm hover:text-[#c25b2a] transition-colors" style={{ color: '#9e9a94' }}>
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
