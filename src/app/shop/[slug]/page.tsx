export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) return {}

  const image = product.images[0]
  const title = `${product.name} — 3rd Apparel Co`
  const description = `${product.description}. $${product.price}. Shop now at 3rd Apparel Co, Baltimore streetwear.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.3rdapparelco.com/shop/${product.slug}`,
      type: 'website',
      siteName: '3rd Apparel Co',
      ...(image && {
        images: [{ url: image, width: 1200, height: 1200, alt: product.name }],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(image && { images: [image] }),
    },
  }
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
