'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { CartItem, Product } from '@/lib/types'
import { getCart, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartCount } from '@/lib/cart'

interface CartContextType {
  cart: CartItem[]
  count: number
  total: number
  add: (product: Product, size: string, color?: string, qty?: number) => void
  remove: (productId: string, size: string, color?: string) => void
  update: (productId: string, size: string, color: string, qty: number) => void
  clear: () => void
  isCartOpen: boolean
  openCart: () => void
  closeCart: () => void
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  useEffect(() => {
    setCart(getCart())
  }, [])

  const add = (product: Product, size: string, color = '', qty = 1) => {
    setCart(addToCart(product, size, color, qty))
  }

  const remove = (productId: string, size: string, color = '') => {
    setCart(removeFromCart(productId, size, color))
  }

  const update = (productId: string, size: string, color: string, qty: number) => {
    setCart(updateQuantity(productId, size, color, qty))
  }

  const clear = () => {
    clearCart()
    setCart([])
  }

  const openCart = () => setIsCartOpen(true)
  const closeCart = () => setIsCartOpen(false)

  return (
    <CartContext.Provider
      value={{
        cart,
        count: getCartCount(cart),
        total: getCartTotal(cart),
        add,
        remove,
        update,
        clear,
        isCartOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
