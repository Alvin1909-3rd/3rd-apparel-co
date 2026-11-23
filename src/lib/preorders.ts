// Preorder configuration, keyed by product slug.
// A product listed here sells as a preorder until `closesAt`, then shows "Preorder Closed".

export interface Preorder {
  closesAt: string // ISO timestamp
  closesLabel: string
  shipsBy: string
  totalRun: number
}

export const PREORDERS: Record<string, Preorder> = {
  'btcusd-hoodie': {
    closesAt: '2026-11-30T04:59:59Z', // Nov 29, 11:59 PM ET
    closesLabel: 'Nov 29',
    shipsBy: 'Dec 4',
    totalRun: 50,
  },
}

export function getPreorder(slug: string): Preorder | null {
  return PREORDERS[slug] ?? null
}

export function isPreorderOpen(p: Preorder, now = Date.now()): boolean {
  return now < new Date(p.closesAt).getTime()
}

export function cartHasPreorder(items: { product: { slug: string } }[]): boolean {
  return items.some((i) => getPreorder(i.product.slug) !== null)
}
