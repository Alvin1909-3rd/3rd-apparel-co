import Link from 'next/link'

export const metadata = {
  title: 'Returns & Exchanges | 3rd Apparel Co',
}

export default function ReturnsPage() {
  return (
    <div className="min-h-screen px-6 py-20" style={{ backgroundColor: '#ffffff' }}>
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-xs uppercase tracking-widest hover:text-[#c25b2a] transition-colors mb-10 block" style={{ color: '#5a5650' }}>
          ← Back
        </Link>

        <p className="text-xs uppercase tracking-[0.4em] mb-3" style={{ color: '#8a6510' }}>3rd Apparel Co</p>
        <h1 className="text-6xl mb-10 leading-none" style={{ fontFamily: 'Bebas Neue, sans-serif', color: '#0e0e0e' }}>
          Returns &amp; Exchanges
        </h1>

        <div className="space-y-8 text-sm leading-relaxed" style={{ color: '#5a5650' }}>

          <section>
            <h2 className="text-xs uppercase tracking-widest mb-3" style={{ color: '#0e0e0e' }}>Return Window</h2>
            <p>We accept returns within <strong style={{ color: '#0e0e0e' }}>14 days</strong> of the delivery date. Items must be unworn, unwashed, and in original condition with all tags attached.</p>
          </section>

          <div className="w-full h-px" style={{ backgroundColor: '#d8d2ca' }} />

          <section>
            <h2 className="text-xs uppercase tracking-widest mb-3" style={{ color: '#0e0e0e' }}>Eligible Items</h2>
            <ul className="space-y-2">
              {[
                'Unworn and unwashed items',
                'Items with original tags attached',
                'Items in original packaging where applicable',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span style={{ color: '#c25b2a' }}>—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="w-full h-px" style={{ backgroundColor: '#d8d2ca' }} />

          <section>
            <h2 className="text-xs uppercase tracking-widest mb-3" style={{ color: '#0e0e0e' }}>Non-Returnable Items</h2>
            <ul className="space-y-2">
              {[
                'Items marked as final sale',
                'Items that have been worn, washed, or altered',
                'Items without original tags',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span style={{ color: '#5a5650' }}>—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="w-full h-px" style={{ backgroundColor: '#d8d2ca' }} />

          <section>
            <h2 className="text-xs uppercase tracking-widest mb-3" style={{ color: '#0e0e0e' }}>How to Start a Return</h2>
            <p>Email us at <a href="mailto:orders@3rdapparelco.com" className="underline hover:text-[#c25b2a] transition-colors" style={{ color: '#0e0e0e' }}>orders@3rdapparelco.com</a> with your order number and the reason for your return. We will respond within 1–2 business days with return instructions.</p>
            <p className="mt-2">Return shipping costs are the responsibility of the customer unless the item was received damaged or incorrect.</p>
          </section>

          <div className="w-full h-px" style={{ backgroundColor: '#d8d2ca' }} />

          <section>
            <h2 className="text-xs uppercase tracking-widest mb-3" style={{ color: '#0e0e0e' }}>Refunds</h2>
            <p>Once your return is received and inspected, we will notify you by email. Approved refunds are issued to your original payment method within <strong style={{ color: '#0e0e0e' }}>5–7 business days</strong>.</p>
          </section>

          <div className="w-full h-px" style={{ backgroundColor: '#d8d2ca' }} />

          <section>
            <h2 className="text-xs uppercase tracking-widest mb-3" style={{ color: '#0e0e0e' }}>Exchanges</h2>
            <p>We do not process direct exchanges. To get a different size or item, return your original purchase for a refund and place a new order.</p>
          </section>

        </div>
      </div>
    </div>
  )
}
