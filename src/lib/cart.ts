import { CartItem, Product } from './types'

const CART_KEY = '3rd_apparel_cart'

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(CART_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function saveCart(items: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items))
}

export function addToCart(product: Product, size: string, quantity = 1): CartItem[] {
  const cart = getCart()
  const existing = cart.findIndex(
    (i) => i.product.id === product.id && i.size === size
  )
  if (existing >= 0) {
    cart[existing].quantity += quantity
  } else {
    cart.push({ product, size, quantity })
  }
  saveCart(cart)
  return cart
}

export function removeFromCart(productId: string, size: string): CartItem[] {
  const cart = getCart().filter(
    (i) => !(i.product.id === productId && i.size === size)
  )
  saveCart(cart)
  return cart
}

export function updateQuantity(productId: string, size: string, quantity: number): CartItem[] {
  const cart = getCart().map((i) =>
    i.product.id === productId && i.size === size ? { ...i, quantity } : i
  )
  saveCart(cart)
  return cart
}

export function clearCart() {
  localStorage.removeItem(CART_KEY)
}

export function getCartTotal(cart: CartItem[]): number {
  return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
}

export function getCartCount(cart: CartItem[]): number {
  return cart.reduce((sum, item) => sum + item.quantity, 0)
}
