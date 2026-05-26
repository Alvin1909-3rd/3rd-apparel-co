'use client'


import { useCart } from '@/context/CartContext'
import Image from 'next/image'
import Link from 'next/link'
import { Trash2, Minus, Plus } from 'lucide-react'

export default function CartClient() {
  const { cart, total, remove, update, count } = useCart()

  if (count === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <span className="text-6xl mb-4" style={{ fontFamily: 'Bebas Neue, sans-serif', color: '#d8d2ca' }}>
          Your Cart is Empty
        </span>
        <p className="text-sm mb-8" style={{ color: '#5a5650' }}>
          Looks like you haven&apos;t added anything yet.
        </p>
        <Link
          href="/shop"
          className="px-8 py-3 text-sm uppercase tracking-widest hover:opacity-90 transition-all"
          style={{ backgroundColor: '#c25b2a', color: '#0e0e0e' }}
        >
          Browse the Collection
        </Link>
      </div>
    )
  }

  const shipping = total >= 75 ? 0 : 8.99

  return (
    <div className="min-h-screen px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-6xl mb-10" style={{ fontFamily: 'Bebas Neue, sans-serif', color: '#0e0e0e' }}>
          Your Cart
        </h1>

        <div className="grid md:grid-cols-3 gap-10">
          {/* Items */}
          <div className="md:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={`${item.product.id}-${item.size}`}
                className="flex gap-4 p-4"
                style={{ backgroundColor: '#f7f5f2', border: '1px solid #d8d2ca' }}
              >
                <div className="relative w-24 aspect-[3/4] flex-shrink-0 overflow-hidden" style={{ backgroundColor: '#0e0e0e' }}>
                  {item.product.images[0] ? (
                    <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span style={{ fontFamily: 'Bebas Neue, sans-serif', color: '#d8d2ca', fontSize: '10px' }}>3RD</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-widest mb-1" style={{ color: '#5a5650' }}>{item.product.category}</p>
                    <h3 className="text-xl" style={{ fontFamily: 'Bebas Neue, sans-serif', color: '#0e0e0e' }}>{item.product.name}</h3>
                    <p className="text-xs mt-1" style={{ color: '#5a5650' }}>Size: {item.size}</p>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => update(item.product.id, item.size, Math.max(1, item.quantity - 1))}
                        className="w-7 h-7 flex items-center justify-center transition-colors hover:border-[#c25b2a]"
                        style={{ border: '1px solid #d8d2ca', color: '#5a5650' }}
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-6 text-center text-sm" style={{ color: '#0e0e0e' }}>{item.quantity}</span>
                      <button
                        onClick={() => update(item.product.id, item.size, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center transition-colors hover:border-[#c25b2a]"
                        style={{ border: '1px solid #d8d2ca', color: '#5a5650' }}
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <div className="flex items-center gap-4">
                      <span style={{ color: '#8a6510' }}>${(item.product.price * item.quantity).toFixed(2)}</span>
                      <button
                        onClick={() => remove(item.product.id, item.size)}
                        className="transition-colors hover:text-[#c25b2a]"
                        style={{ color: '#5a5650' }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div
            className="h-fit p-6"
            style={{ backgroundColor: '#f7f5f2', border: '1px solid #d8d2ca' }}
          >
            <h2 className="text-2xl mb-6" style={{ fontFamily: 'Bebas Neue, sans-serif', color: '#0e0e0e' }}>Order Summary</h2>
            <div className="space-y-3 text-sm mb-6">
              <div className="flex justify-between">
                <span style={{ color: '#5a5650' }}>Subtotal</span>
                <span style={{ color: '#0e0e0e' }}>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: '#5a5650' }}>Shipping</span>
                <span style={{ color: shipping === 0 ? '#8a6510' : '#0e0e0e' }}>
                  {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-xs" style={{ color: '#5a5650' }}>
                  Add ${(75 - total).toFixed(2)} more for free shipping
                </p>
              )}
              <div className="pt-3 flex justify-between font-semibold" style={{ borderTop: '1px solid #d8d2ca' }}>
                <span style={{ color: '#0e0e0e' }}>Total</span>
                <span style={{ color: '#8a6510' }}>${(total + shipping).toFixed(2)}</span>
              </div>
            </div>
            <Link
              href="/checkout"
              className="block w-full py-4 text-center text-sm uppercase tracking-widest font-semibold hover:opacity-90 transition-all"
              style={{ backgroundColor: '#c25b2a', color: '#0e0e0e' }}
            >
              Proceed to Checkout
            </Link>
            <Link
              href="/shop"
              className="block w-full py-3 text-center text-xs uppercase tracking-widest mt-3 hover:text-[#c25b2a] transition-colors"
              style={{ color: '#5a5650' }}
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

