export const dynamic = 'force-dynamic'

import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import ProductCard from '@/components/ProductCard'
import PhotoCarousel from '@/components/PhotoCarousel'
import ParallaxHero from '@/components/ParallaxHero'
import LookbookSection from '@/components/LookbookSection'
import ScrollReveal from '@/components/ScrollReveal'
import { Product } from '@/lib/types'

async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('featured', true)
      .limit(4)
    return data || []
  } catch {
    return []
  }
}

async function getFeedPhotos() {
  try {
    const { data } = await supabase
      .from('feed_photos')
      .select('id, image_url, caption')
      .order('sort_order', { ascending: true })
    return data || []
  } catch {
    return []
  }
}

export default async function HomePage() {
  const featured = await getFeaturedProducts()
  const feedPhotos = await getFeedPhotos()

  return (
    <>
      {/* Hero with parallax */}
      <ParallaxHero />

      {/* Featured Products */}
      {featured.length > 0 && (
        <section className="py-20 px-6" style={{ backgroundColor: '#f7f5f2' }}>
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="flex items-end justify-between mb-10">
                <h2 className="text-5xl md:text-6xl" style={{ fontFamily: 'Bebas Neue, sans-serif', color: '#0e0e0e' }}>
                  Featured Drops
                </h2>
                <Link href="/shop" className="text-sm uppercase tracking-widest hover:text-[#c25b2a] transition-colors" style={{ color: '#5a5650' }}>
                  View All →
                </Link>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {featured.map((product, i) => (
                <ScrollReveal key={product.id} delay={i * 80}>
                  <ProductCard product={product} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About */}
      <section id="about" className="py-20 px-6" style={{ backgroundColor: '#f7f5f2' }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <div>
              <p className="text-xs uppercase tracking-[0.4em] mb-4" style={{ color: '#8a6510' }}>About the Brand</p>
              <h2 className="text-5xl md:text-6xl mb-6" style={{ fontFamily: 'Bebas Neue, sans-serif', color: '#0e0e0e' }}>
                Built From The Culture
              </h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: '#5a5650' }}>
                3rd Apparel Co is a Baltimore-based private label brand specializing in adult casual and urban wear,
                with a special emphasis on culture, arts, history, and political awareness.
              </p>
              <p className="text-base leading-relaxed mb-8" style={{ color: '#5a5650' }}>
                Every piece is intentional. Every design carries weight. We don&apos;t just make clothing —
                we make statements for those who know what they stand for.
              </p>
              <Link
                href="/shop"
                className="inline-block px-8 py-3 text-sm uppercase tracking-widest hover:opacity-90 transition-all"
                style={{ backgroundColor: '#c25b2a', color: '#ffffff' }}
              >
                Shop the Collection
              </Link>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <div className="relative aspect-square overflow-hidden" style={{ border: '1px solid #d8d2ca' }}>
              <Image
                src="https://xakihabewfanylylcwqw.supabase.co/storage/v1/object/public/site-images/feed/Img1.jpg"
                alt="3rd Apparel Co — Built from the culture"
                fill
                className="object-cover"
                quality={90}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Lookbook */}
      <ScrollReveal>
        <LookbookSection photos={feedPhotos} />
      </ScrollReveal>

      {/* Photo Carousel */}
      <section id="carousel">
        <PhotoCarousel photos={feedPhotos} />
      </section>
    </>
  )
}
