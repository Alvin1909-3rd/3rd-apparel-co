'use client'

import { X, ShoppingBag, Trash2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import { useEffect } from 'react'
import { useFocusTrap } from '@/hooks/useFocusTrap'

export default function CartDrawer() {
  const { cart, count, total, remove, update, isCartOpen, closeCart } = useCart()
  const trapRef = useFocusTrap(isCartOpen)

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isCartOpen])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeCart() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [closeCart])

  return (
    <>
      {/* Backdrop — aria-hidden, click handled here */}
      <div
        onClick={closeCart}
        aria-hidden="true"
        style={{
          position: 'fixed', inset: 0, zIndex: 50,
          backgroundColor: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(2px)',
          opacity: isCartOpen ? 1 : 0,
          pointerEvents: isCartOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Drawer */}
      <div
        ref={trapRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        style={{
          position: 'fixed', top: 0, right: 0, bottom: 0,
          width: 'min(420px, 100vw)',
          zIndex: 51,
          display: 'flex', flexDirection: 'column',
          backgroundColor: '#0e0e0e',
          borderLeft: '1px solid #2e2e2e',
          transform: isCartOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid #2e2e2e' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <ShoppingBag size={18} style={{ color: '#c25b2a' }} aria-hidden="true" />
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#f0ece4' }}>
              Cart {count > 0 && `(${count})`}
            </span>
          </div>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            style={{ color: '#9e9a94', background: 'none', border: 'none', cursor: 'pointer', padding: 4, lineHeight: 0 }}
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>
          {cart.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 16, padding: '80px 0' }}>
              <ShoppingBag size={44} style={{ color: '#2e2e2e' }} aria-hidden="true" />
              <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9e9a94' }}>Your cart is empty</p>
              <button
                onClick={closeCart}
                style={{ padding: '10px 24px', border: '1px solid #c25b2a', color: '#c25b2a', background: 'none', cursor: 'pointer', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {cart.map((item) => (
                <div key={`${item.product.id}-${item.size}-${item.color ?? ''}`} style={{ display: 'flex', gap: 14, paddingBottom: 20, borderBottom: '1px solid #1a1a1a' }}>
                  {/* Thumbnail */}
                  <div style={{ position: 'relative', width: 76, height: 96, flexShrink: 0, backgroundColor: '#1a1a1a', overflow: 'hidden' }}>
                    {item.product.images[0] ? (
                      <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" sizes="76px" />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontFamily: 'Bebas Neue, sans-serif', color: '#2e2e2e', fontSize: '0.65rem' }} aria-hidden="true">3RD</span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: 'Bebas Neue, sans-serif', color: '#f0ece4', fontSize: '1.05rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.product.name}
                    </p>
                    <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9e9a94', marginTop: 2 }}>
                      {item.color ? `${item.color} / ` : ''}Size: {item.size}
                    </p>
                    <p style={{ fontSize: '0.85rem', color: '#c8a96e', marginTop: 4 }}>${(item.product.price * item.quantity).toFixed(2)}</p>

                    {/* Qty + Remove */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                      <div
                        role="group"
                        aria-label={`Quantity for ${item.product.name}`}
                        style={{ display: 'flex', alignItems: 'center', border: '1px solid #2e2e2e' }}
                      >
                        <button
                          onClick={() => item.quantity > 1 ? update(item.product.id, item.size, item.color ?? '', item.quantity - 1) : remove(item.product.id, item.size, item.color ?? '')}
                          aria-label={`Decrease quantity of ${item.product.name}`}
                          style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', color: '#9e9a94', cursor: 'pointer', fontSize: '1rem' }}
                        >−</button>
                        <span aria-live="polite" aria-label={`Quantity: ${item.quantity}`} style={{ width: 28, textAlign: 'center', fontSize: '0.85rem', color: '#f0ece4' }}>{item.quantity}</span>
                        <button
                          onClick={() => update(item.product.id, item.size, item.color ?? '', item.quantity + 1)}
                          aria-label={`Increase quantity of ${item.product.name}`}
                          style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', color: '#9e9a94', cursor: 'pointer', fontSize: '1rem' }}
                        >+</button>
                      </div>
                      <button
                        onClick={() => remove(item.product.id, item.size, item.color ?? '')}
                        aria-label={`Remove ${item.product.name} from cart`}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9e9a94', lineHeight: 0, padding: 4 }}
                      >
                        <Trash2 size={14} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div style={{ padding: '20px 24px', borderTop: '1px solid #2e2e2e', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9e9a94' }}>Subtotal</span>
              <span style={{ fontFamily: 'Bebas Neue, sans-serif', color: '#f0ece4', fontSize: '1.4rem' }}>${total.toFixed(2)}</span>
            </div>
            <p style={{ fontSize: '0.7rem', color: '#9e9a94' }}>Shipping and taxes calculated at checkout</p>
            <Link
              href="/checkout"
              onClick={closeCart}
              style={{ display: 'block', width: '100%', padding: '16px 0', textAlign: 'center', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, backgroundColor: '#c25b2a', color: '#ffffff', textDecoration: 'none' }}
            >
              Checkout
            </Link>
            <button
              onClick={closeCart}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9e9a94', padding: '8px 0' }}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  )
}
