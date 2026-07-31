'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { ShoppingBag, Check } from 'lucide-react'
import { Product } from '@/lib/types'
import { useCart } from '@/context/CartContext'
import { pixelAddToCart } from '@/lib/pixel'
import { getProductColors, getInventoryKey } from '@/lib/cart'

export default function ProductDetails({ product }: { product: Product }) {
  const { add, openCart } = useCart()
  const [activeImage, setActiveImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [error, setError] = useState('')
  const [added, setAdded] = useState(false)
  const [stickyVisible, setStickyVisible] = useState(false)
  const atcRef = useRef<HTMLDivElement>(null)

  const colors = getProductColors(product.inventory)
  const hasColors = colors.length > 0

  const availableSizes = product.sizes.filter((s) => {
    const key = getInventoryKey(s, hasColors ? selectedColor : '')
    return (product.inventory[key] || 0) > 0
  })

  useEffect(() => {
    const el = atcRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setStickyVisible(!entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const handleAdd = (sizeOverride?: string, colorOverride?: string) => {
    const sz = sizeOverride || selectedSize
    const cl = colorOverride !== undefined ? colorOverride : selectedColor
    if (hasColors && !cl) { setError('Please select a color'); return }
    if (!sz) { setError('Please select a size'); return }
    add(product, sz, cl)
    pixelAddToCart(product.id, product.name, product.price)
    setAdded(true)
    setError('')
    openCart()
    setTimeout(() => setAdded(false), 2000)
  }

  const sizeButtonsDisabled = hasColors && !selectedColor

  return (
    <>
      <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
        {/* Image gallery */}
        <div className="space-y-3">
          <div
            className="relative aspect-[3/4] overflow-hidden"
            style={{ backgroundColor: '#f7f5f2' }}
          >
            {product.images[activeImage] ? (
              <Image
                src={product.images[activeImage]}
                alt={product.name}
                fill
                className="object-cover"
                priority={activeImage === 0}
                quality={95}
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ transition: 'opacity 0.3s ease' }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-6xl" style={{ fontFamily: 'Bebas Neue, sans-serif', color: '#d8d2ca' }}>3RD</span>
              </div>
            )}
          </div>

          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  aria-label={`View image ${i + 1} of ${product.images.length}`}
                  aria-pressed={activeImage === i}
                  style={{
                    position: 'relative', aspectRatio: '1/1',
                    overflow: 'hidden',
                    backgroundColor: '#f7f5f2',
                    border: activeImage === i ? '2px solid #c25b2a' : '2px solid transparent',
                    padding: 0, cursor: 'pointer',
                    transition: 'border-color 0.2s',
                  }}
                >
                  <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-cover" quality={80} sizes="25vw" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: '#9e9a94' }}>
            {product.category}
          </p>
          <h1 className="text-5xl md:text-6xl mb-2" style={{ fontFamily: 'Bebas Neue, sans-serif', color: '#f0ece4' }}>
            {product.name}
          </h1>
          <p className="text-2xl mb-6" style={{ color: '#c8a96e' }}>
            ${product.price.toFixed(2)}
          </p>

          <div className="w-12 h-px mb-6" style={{ backgroundColor: '#c25b2a' }} />

          <p className="text-sm leading-relaxed mb-8" style={{ color: '#9e9a94' }}>
            {product.description}
          </p>

          {/* Color + Size + ATC */}
          <div ref={atcRef}>
            {availableSizes.length === 0 && !hasColors ? (
              <div
                className="w-full py-4 text-center text-sm uppercase tracking-widest"
                style={{ border: '1px solid #2e2e2e', color: '#9e9a94' }}
              >
                Sold Out
              </div>
            ) : (
              <div className="space-y-4">
                {/* Color selector */}
                {hasColors && (
                  <div>
                    <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#9e9a94' }}>
                      Select Color{selectedColor ? `: ${selectedColor}` : ''}
                    </p>
                    <div className="flex flex-wrap gap-2" role="group" aria-label="Select a color">
                      {colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => { setSelectedColor(color); setSelectedSize(''); setError('') }}
                          aria-pressed={selectedColor === color}
                          className="px-4 h-10 text-sm uppercase tracking-wide transition-all"
                          style={{
                            backgroundColor: selectedColor === color ? '#c25b2a' : 'transparent',
                            color: selectedColor === color ? '#f0ece4' : '#f0ece4',
                            border: `1px solid ${selectedColor === color ? '#c25b2a' : '#2e2e2e'}`,
                            cursor: 'pointer',
                          }}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size selector */}
                <div>
                  <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#9e9a94' }}>
                    {sizeButtonsDisabled ? 'Select a color first' : 'Select Size'}
                  </p>
                  <div className="flex flex-wrap gap-2" role="group" aria-label="Select a size">
                    {product.sizes.map((size) => {
                      const inStock = !sizeButtonsDisabled && availableSizes.includes(size)
                      const disabled = sizeButtonsDisabled || !inStock
                      return (
                        <button
                          key={size}
                          onClick={() => { if (!disabled) { setSelectedSize(size); setError('') } }}
                          disabled={disabled}
                          aria-pressed={selectedSize === size}
                          className="w-12 h-12 text-sm uppercase font-medium transition-all"
                          style={{
                            backgroundColor: selectedSize === size ? '#c25b2a' : 'transparent',
                            color: selectedSize === size ? '#f0ece4' : disabled ? '#2e2e2e' : '#f0ece4',
                            border: `1px solid ${selectedSize === size ? '#c25b2a' : disabled ? '#1a1a1a' : '#2e2e2e'}`,
                            cursor: disabled ? 'not-allowed' : 'pointer',
                            textDecoration: !sizeButtonsDisabled && !inStock ? 'line-through' : 'none',
                          }}
                        >
                          {size}
                        </button>
                      )
                    })}
                  </div>
                  {error && <p className="text-xs mt-2" style={{ color: '#c25b2a' }}>{error}</p>}
                </div>

                <button
                  onClick={() => handleAdd()}
                  className="w-full py-4 text-sm uppercase tracking-widest font-semibold flex items-center justify-center gap-3 transition-all hover:opacity-90"
                  style={{ backgroundColor: added ? '#2d4a2d' : '#c25b2a', color: '#f0ece4' }}
                >
                  {added ? (
                    <><Check size={16} /> Added to Cart</>
                  ) : (
                    <><ShoppingBag size={16} /> Add to Cart</>
                  )}
                </button>
              </div>
            )}
          </div>

          <div className="mt-8 pt-8" style={{ borderTop: '1px solid #2e2e2e' }}>
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#c8a96e' }}>Details</p>
            <ul className="space-y-1 text-sm" style={{ color: '#9e9a94' }}>
              <li>Free shipping on orders over $75</li>
              <li>Returns accepted within 14 days</li>
              <li>Private label — made to order</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sticky add-to-cart bar */}
      {(availableSizes.length > 0 || hasColors) && (
        <div
          style={{
            position: 'fixed', bottom: 0, left: 0, right: 0,
            zIndex: 40,
            backgroundColor: '#0e0e0e',
            borderTop: '1px solid #2e2e2e',
            padding: '12px 24px',
            display: 'flex', alignItems: 'center', gap: 16,
            transform: stickyVisible ? 'translateY(0)' : 'translateY(100%)',
            transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.1rem', color: '#f0ece4', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {product.name}
            </p>
            <p style={{ fontSize: '0.8rem', color: '#c8a96e' }}>${product.price.toFixed(2)}</p>
          </div>

          {/* Size selector (compact) */}
          <div style={{ display: 'flex', gap: 6, flexShrink: 0 }} role="group" aria-label="Select a size">
            {availableSizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                aria-pressed={selectedSize === size}
                aria-label={`Size ${size}`}
                style={{
                  width: 36, height: 36, fontSize: '0.7rem', textTransform: 'uppercase',
                  backgroundColor: selectedSize === size ? '#c25b2a' : 'transparent',
                  color: selectedSize === size ? '#ffffff' : '#9e9a94',
                  border: `1px solid ${selectedSize === size ? '#c25b2a' : '#2e2e2e'}`,
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
              >
                {size}
              </button>
            ))}
          </div>

          <button
            onClick={() => handleAdd(selectedSize, selectedColor)}
            style={{
              padding: '10px 20px', flexShrink: 0,
              backgroundColor: added ? '#2d4a2d' : '#c25b2a',
              color: '#ffffff',
              border: 'none', cursor: 'pointer',
              fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600,
              display: 'flex', alignItems: 'center', gap: 8,
              transition: 'background-color 0.2s',
            }}
          >
            {added ? <><Check size={14} /> Added</> : <><ShoppingBag size={14} /> Add to Cart</>}
          </button>
        </div>
      )}
    </>
  )
}
