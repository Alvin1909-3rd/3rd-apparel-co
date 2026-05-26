'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { CartItem, Product } from '@/lib/types'
import { getCart, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartCount } from '@/lib/cart'

interface CartContextType {
  cart: CartItem[]
  count: number
  total: number
  add: (product: Product, size: string, qty?: number) => void
  remove: (productId: string, size: string) => void
  update: (productId: string, size: string, qty: number) => void
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

  const add = (product: Product, size: string, qty = 1) => {
    setCart(addToCart(product, size, qty))
  }

  const remove = (productId: string, size: string) => {
    setCart(removeFromCart(productId, size))
  }

  const update = (productId: string, size: string, qty: number) => {
    setCart(updateQuantity(productId, size, qty))
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
