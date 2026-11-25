export type PromoCode = {
  type: 'free_shipping'
  label: string
  discount: number
}

const CODES: Record<string, PromoCode> = {
  FREESHIP: { type: 'free_shipping', label: 'Free Shipping', discount: 8.99 },
}

export function lookupPromo(code: string): PromoCode | null {
  return CODES[code.trim().toUpperCase()] ?? null
}
