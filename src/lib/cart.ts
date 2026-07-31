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

// Colors are derived from inventory keys using "Color-Size" convention.
// Single-color products use plain size keys ("XS", "S", etc.).
export function getProductColors(inventory: Record<string, number>): string[] {
  const colorSizeKeys = Object.keys(inventory).filter(k => k.includes('-'))
  if (!colorSizeKeys.length) return []
  return [...new Set(colorSizeKeys.map(k => k.substring(0, k.lastIndexOf('-'))))]
}

export function getInventoryKey(size: string, color: string): string {
  return color ? `${color}-${size}` : size
}

export function addToCart(product: Product, size: string, color = '', quantity = 1): CartItem[] {
  const cart = getCart()
  const existing = cart.findIndex(
    (i) => i.product.id === product.id && i.size === size && i.color === color
  )
  if (existing >= 0) {
    cart[existing].quantity += quantity
  } else {
    cart.push({ product, size, color, quantity })
  }
  saveCart(cart)
  return cart
}

export function removeFromCart(productId: string, size: string, color = ''): CartItem[] {
  const cart = getCart().filter(
    (i) => !(i.product.id === productId && i.size === size && (i.color ?? '') === color)
  )
  saveCart(cart)
  return cart
}

export function updateQuantity(productId: string, size: string, color = '', quantity: number): CartItem[] {
  const cart = getCart().map((i) =>
    i.product.id === productId && i.size === size && (i.color ?? '') === color
      ? { ...i, quantity }
      : i
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
