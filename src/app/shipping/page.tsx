import Link from 'next/link'

export const metadata = {
  title: 'Shipping Policy | 3rd Apparel Co',
}

export default function ShippingPage() {
  return (
    <div className="min-h-screen px-6 py-20" style={{ backgroundColor: '#ffffff' }}>
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-xs uppercase tracking-widest hover:text-[#c25b2a] transition-colors mb-10 block" style={{ color: '#5a5650' }}>
          ← Back
        </Link>

        <p className="text-xs uppercase tracking-[0.4em] mb-3" style={{ color: '#8a6510' }}>3rd Apparel Co</p>
        <h1 className="text-6xl mb-10 leading-none" style={{ fontFamily: 'Bebas Neue, sans-serif', color: '#0e0e0e' }}>
          Shipping Policy
        </h1>

        <div className="space-y-8 text-sm leading-relaxed" style={{ color: '#5a5650' }}>

          <section>
            <h2 className="text-xs uppercase tracking-widest mb-3" style={{ color: '#0e0e0e' }}>Processing Time</h2>
            <p>All orders are processed within <strong style={{ color: '#0e0e0e' }}>2–3 business days</strong> of payment confirmation. Orders placed on weekends or holidays are processed the next business day.</p>
            <p className="mt-2">As a private label brand, some items may be made to order. If your order requires additional production time, we will notify you by email.</p>
          </section>

          <div className="w-full h-px" style={{ backgroundColor: '#d8d2ca' }} />

          <section>
            <h2 className="text-xs uppercase tracking-widest mb-3" style={{ color: '#0e0e0e' }}>Shipping Rates &amp; Delivery</h2>
            <div className="space-y-3">
              <div className="flex justify-between py-3" style={{ borderBottom: '1px solid #d8d2ca' }}>
                <span>Standard Shipping (5–7 business days)</span>
                <span style={{ color: '#0e0e0e' }}>$8.99</span>
              </div>
              <div className="flex justify-between py-3" style={{ borderBottom: '1px solid #d8d2ca' }}>
                <span>Free Shipping on orders over</span>
                <span style={{ color: '#c25b2a', fontWeight: 600 }}>$75.00</span>
              </div>
            </div>
            <p className="mt-4">We currently ship within the <strong style={{ color: '#0e0e0e' }}>United States only.</strong> International shipping is not available at this time.</p>
          </section>

          <div className="w-full h-px" style={{ backgroundColor: '#d8d2ca' }} />

          <section>
            <h2 className="text-xs uppercase tracking-widest mb-3" style={{ color: '#0e0e0e' }}>Tracking Your Order</h2>
            <p>Once your order ships, you will receive a tracking number via email. Allow 24–48 hours for tracking information to update after you receive the shipping confirmation.</p>
          </section>

          <div className="w-full h-px" style={{ backgroundColor: '#d8d2ca' }} />

          <section>
            <h2 className="text-xs uppercase tracking-widest mb-3" style={{ color: '#0e0e0e' }}>Lost or Delayed Shipments</h2>
            <p>If your order has not arrived within 10 business days of your ship date, please contact us at <a href="mailto:orders@3rdapparelco.com" className="underline hover:text-[#c25b2a] transition-colors" style={{ color: '#0e0e0e' }}>orders@3rdapparelco.com</a> and we will work to resolve the issue promptly.</p>
          </section>

        </div>
      </div>
    </div>
  )
}
