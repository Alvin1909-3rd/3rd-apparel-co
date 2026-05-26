declare global {
  interface Window {
    fbq: (type: string, event: string, params?: Record<string, unknown>) => void
  }
}

const fbq = (event: string, params?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', event, params)
  }
}

export const pixelPageView = () => fbq('PageView')

export const pixelViewContent = (productId: string, name: string, value: number) =>
  fbq('ViewContent', {
    content_ids: [productId],
    content_name: name,
    content_type: 'product',
    value,
    currency: 'USD',
  })

export const pixelAddToCart = (productId: string, name: string, value: number) =>
  fbq('AddToCart', {
    content_ids: [productId],
    content_name: name,
    content_type: 'product',
    value,
    currency: 'USD',
  })

export const pixelInitiateCheckout = (value: number, numItems: number, contentIds: string[]) =>
  fbq('InitiateCheckout', {
    value,
    currency: 'USD',
    num_items: numItems,
    content_ids: contentIds,
  })

export const pixelPurchase = (value: number, contentIds: string[], numItems: number) =>
  fbq('Purchase', {
    value,
    currency: 'USD',
    content_ids: contentIds,
    content_type: 'product',
    num_items: numItems,
  })
