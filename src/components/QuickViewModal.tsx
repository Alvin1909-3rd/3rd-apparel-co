'use client'

import { useEffect, useId } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { X } from 'lucide-react'
import { Product } from '@/lib/types'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import AddToCartButton from './AddToCartButton'

interface Props {
  product: Product
  onClose: () => void
}

export default function QuickViewModal({ product, onClose }: Props) {
  const availableSizes = product.sizes.filter((s) => (product.inventory[s] || 0) > 0)
  const titleId = useId()
  const trapRef = useFocusTrap(true)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handler)
    }
  }, [onClose])

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        style={{
          position: 'fixed', inset: 0, zIndex: 60,
          backgroundColor: 'rgba(0,0,0,0.72)',
          backdropFilter: 'blur(4px)',
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: 61,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 16, pointerEvents: 'none',
        }}
      >
        <div
          ref={trapRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          style={{
            backgroundColor: '#ffffff',
            width: '100%', maxWidth: 820,
            maxHeight: '90vh',
            display: 'flex',
            overflow: 'hidden',
            pointerEvents: 'auto',
            animation: 'modalIn 0.3s cubic-bezier(0.4,0,0.2,1) both',
          }}
        >
          {/* Product image */}
          <div style={{ position: 'relative', width: '42%', flexShrink: 0, backgroundColor: '#f7f5f2' }}>
            {product.images[0] ? (
              <Image src={product.images[0]} alt={product.name} fill className="object-cover" sizes="40vw" quality={90} />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'Bebas Neue, sans-serif', color: '#d8d2ca', fontSize: '3rem' }} aria-hidden="true">3RD</span>
              </div>
            )}
          </div>

          {/* Details */}
          <div style={{ flex: 1, padding: '28px 24px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 6 }}>
              <button
                onClick={onClose}
                aria-label="Close quick view"
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9e9a94', lineHeight: 0, padding: 4 }}
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            <p style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#5a5650', marginBottom: 6 }}>
              {product.category}
            </p>
            <h2 id={titleId} style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2rem', color: '#0e0e0e', lineHeight: 1, marginBottom: 8 }}>
              {product.name}
            </h2>
            <p style={{ fontSize: '1.15rem', color: '#8a6510', marginBottom: 16 }}>
              ${product.price.toFixed(2)}
            </p>
            <div style={{ width: 32, height: 1, backgroundColor: '#c25b2a', marginBottom: 16 }} aria-hidden="true" />
            <p style={{ fontSize: '0.82rem', lineHeight: 1.75, color: '#5a5650', marginBottom: 24 }}>
              {product.description}
            </p>

            <AddToCartButton product={product} availableSizes={availableSizes} onAfterAdd={onClose} />

            <Link
              href={`/shop/${product.slug}`}
              onClick={onClose}
              style={{ display: 'block', textAlign: 'center', marginTop: 16, fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#5a5650', textDecoration: 'none' }}
            >
              View Full Details →
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.96) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </>
  )
}
