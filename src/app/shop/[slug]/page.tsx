export const dynamic = 'force-dynamic'

import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import { Product } from '@/lib/types'
import MetaPixelViewContent from '@/components/MetaPixelViewContent'
import ProductDetails from '@/components/ProductDetails'

async function getProduct(slug: string): Promise<Product | null> {
  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single()
  return data
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) notFound()

  return (
    <div className="min-h-screen px-6 py-16" style={{ backgroundColor: '#0e0e0e' }}>
      <MetaPixelViewContent productId={product.id} name={product.name} value={product.price} />
      <div className="max-w-7xl mx-auto">
        <ProductDetails product={product} />
      </div>
    </div>
  )
}
