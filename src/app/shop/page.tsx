export const dynamic = 'force-dynamic'

import { supabase } from '@/lib/supabase'
import ProductCard from '@/components/ProductCard'
import { Product } from '@/lib/types'

async function getProducts(category?: string): Promise<Product[]> {
  try {
    let query = supabase.from('products').select('*').order('created_at', { ascending: false })
    if (category && category !== 'all') query = query.eq('category', category)
    const { data } = await query
    return data || []
  } catch {
    return []
  }
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const params = await searchParams
  const category = params.category
  const products = await getProducts(category)

  const categories = ['All', 'Apparel', 'Accessories', 'Headwear']

  return (
    <div className="min-h-screen px-6 py-16" style={{ backgroundColor: '#f7f5f2' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs uppercase tracking-[0.4em] mb-3" style={{ color: '#8a6510' }}>
            3rd Apparel Co
          </p>
          <h1 className="text-6xl md:text-8xl" style={{ fontFamily: 'Bebas Neue, sans-serif', color: '#0e0e0e' }}>
            The Collection
          </h1>
        </div>

        {/* Category Filter */}
        <div className="flex gap-3 flex-wrap mb-10" style={{ borderBottom: '1px solid #d8d2ca', paddingBottom: '1.5rem' }}>
          {categories.map((cat) => {
            const value = cat === 'All' ? 'all' : cat.toLowerCase()
            const isActive = (!category && cat === 'All') || category === value
            return (
              <a
                key={cat}
                href={`/shop${cat === 'All' ? '' : `?category=${value}`}`}
                className="px-4 py-2 text-xs uppercase tracking-widest transition-all"
                style={{
                  backgroundColor: isActive ? '#c25b2a' : 'transparent',
                  color: isActive ? '#0e0e0e' : '#5a5650',
                  border: `1px solid ${isActive ? '#c25b2a' : '#d8d2ca'}`,
                }}
              >
                {cat}
              </a>
            )
          })}
        </div>

        {/* Product Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32">
            <span className="text-7xl mb-4" style={{ fontFamily: 'Bebas Neue, sans-serif', color: '#d8d2ca' }}>
              DROP INCOMING
            </span>
            <p className="text-sm" style={{ color: '#5a5650' }}>
              New products coming soon. Follow @3rdapparelco for updates.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
