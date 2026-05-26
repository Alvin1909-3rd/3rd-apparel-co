'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Product } from '@/lib/types'
import QuickViewModal from './QuickViewModal'

export default function ProductCard({ product }: { product: Product }) {
  const inStock = Object.values(product.inventory).some((qty) => qty > 0)
  const [quickViewOpen, setQuickViewOpen] = useState(false)

  return (
    <>
      <div className="group block relative">
        <Link href={`/shop/${product.slug}`}>
          <div
            className="relative overflow-hidden aspect-[3/4]"
            style={{ backgroundColor: '#f7f5f2' }}
          >
            {product.images[0] ? (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                quality={90}
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-4xl" style={{ fontFamily: 'Bebas Neue, sans-serif', color: '#d8d2ca' }}>3RD</span>
              </div>
            )}
            {!inStock && (
              <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: 'rgba(247,245,242,0.85)' }}>
                <span className="text-xs uppercase tracking-widest" style={{ color: '#5a5650' }}>Sold Out</span>
              </div>
            )}
            {product.featured && inStock && (
              <span
                className="absolute top-3 left-3 text-xs uppercase tracking-widest px-2 py-1"
                style={{ backgroundColor: '#c25b2a', color: '#ffffff' }}
              >
                Featured
              </span>
            )}
          </div>
          <div className="pt-3 pb-1">
            <p className="text-xs uppercase tracking-widest mb-1" style={{ color: '#5a5650' }}>{product.category}</p>
            <h3 className="text-lg" style={{ fontFamily: 'Bebas Neue, sans-serif', color: '#0e0e0e' }}>{product.name}</h3>
            <p className="text-sm mt-1" style={{ color: '#8a6510' }}>${product.price.toFixed(2)}</p>
          </div>
        </Link>

        {/* Quick View — appears on hover */}
        {inStock && (
          <button
            onClick={() => setQuickViewOpen(true)}
            aria-label={`Quick view ${product.name}`}
            className="absolute bottom-[72px] left-0 right-0 py-2 text-xs uppercase tracking-widest font-medium opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity duration-200"
            style={{ backgroundColor: 'rgba(14,14,14,0.82)', color: '#f0ece4', border: 'none', cursor: 'pointer' }}
          >
            Quick View
          </button>
        )}
      </div>

      {quickViewOpen && (
        <QuickViewModal product={product} onClose={() => setQuickViewOpen(false)} />
      )}
    </>
  )
}
