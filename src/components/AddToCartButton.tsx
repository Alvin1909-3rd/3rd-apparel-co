'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { Product } from '@/lib/types'
import { ShoppingBag, Check } from 'lucide-react'
import { pixelAddToCart } from '@/lib/pixel'

export default function AddToCartButton({
  product,
  availableSizes,
  onAfterAdd,
}: {
  product: Product
  availableSizes: string[]
  onAfterAdd?: () => void
}) {
  const { add, openCart } = useCart()
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [added, setAdded] = useState(false)
  const [error, setError] = useState('')

  const handleAdd = () => {
    if (!selectedSize) {
      setError('Please select a size')
      return
    }
    add(product, selectedSize)
    pixelAddToCart(product.id, product.name, product.price)
    setAdded(true)
    setError('')
    openCart()
    onAfterAdd?.()
    setTimeout(() => setAdded(false), 2000)
  }

  if (availableSizes.length === 0) {
    return (
      <div
        className="w-full py-4 text-center text-sm uppercase tracking-widest"
        style={{ border: '1px solid #2e2e2e', color: '#9e9a94' }}
      >
        Sold Out
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Size selector */}
      <div>
        <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#9e9a94' }}>Select Size</p>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Select a size">
          {product.sizes.map((size) => {
            const inStock = availableSizes.includes(size)
            return (
              <button
                key={size}
                onClick={() => { if (inStock) { setSelectedSize(size); setError('') } }}
                disabled={!inStock}
                aria-pressed={selectedSize === size}
                className="w-12 h-12 text-sm uppercase font-medium transition-all"
                style={{
                  backgroundColor: selectedSize === size ? '#c25b2a' : 'transparent',
                  color: selectedSize === size ? '#f0ece4' : inStock ? '#f0ece4' : '#2e2e2e',
                  border: `1px solid ${selectedSize === size ? '#c25b2a' : inStock ? '#2e2e2e' : '#1a1a1a'}`,
                  cursor: inStock ? 'pointer' : 'not-allowed',
                  textDecoration: !inStock ? 'line-through' : 'none',
                }}
              >
                {size}
              </button>
            )
          })}
        </div>
        {error && <p className="text-xs mt-2" style={{ color: '#c25b2a' }}>{error}</p>}
      </div>

      {/* Add to Cart */}
      <button
        onClick={handleAdd}
        className="w-full py-4 text-sm uppercase tracking-widest font-semibold flex items-center justify-center gap-3 transition-all hover:opacity-90"
        style={{
          backgroundColor: added ? '#2d4a2d' : '#c25b2a',
          color: '#f0ece4',
        }}
      >
        {added ? (
          <>
            <Check size={16} />
            Added to Cart
          </>
        ) : (
          <>
            <ShoppingBag size={16} />
            Add to Cart
          </>
        )}
      </button>
    </div>
  )
}
