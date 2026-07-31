export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  images: string[]
  category: string
  sizes: string[]
  inventory: Record<string, number>
  featured: boolean
  created_at: string
}

export interface CartItem {
  product: Product
  size: string
  color: string
  quantity: number
}

export interface Order {
  id: string
  email: string
  items: CartItem[]
  subtotal: number
  shipping: number
  total: number
  status: 'pending' | 'paid' | 'shipped' | 'delivered'
  stripe_payment_intent: string
  shipping_address: ShippingAddress
  tracking_number?: string
  emails_sent?: string[]
  created_at: string
}

export interface ShippingAddress {
  name: string
  line1: string
  line2?: string
  city: string
  state: string
  zip: string
}
