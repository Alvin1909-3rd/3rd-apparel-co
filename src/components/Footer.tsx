import Link from 'next/link'
import { Share2 } from 'lucide-react'
import FooterEmailForm from './FooterEmailForm'

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#f7f5f2', borderTop: '1px solid #d8d2ca' }} className="mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h3 className="text-2xl mb-3" style={{ fontFamily: 'Bebas Neue, sans-serif', color: '#0e0e0e' }}>
              3RD APPAREL CO
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: '#5a5650' }}>
              Baltimore, MD. Culture. Arts. History.<br />
              Private label apparel rooted in purpose.
            </p>
            <a
              href="https://instagram.com/3rdapparelco"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on Instagram @3rdapparelco"
              className="inline-flex items-center gap-2 mt-4 text-sm hover:text-[#c25b2a] transition-colors"
              style={{ color: '#5a5650' }}
            >
              <Share2 size={16} aria-hidden="true" />
              @3rdapparelco
            </a>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm uppercase tracking-widest mb-4" style={{ color: '#8a6510' }}>Shop</h4>
            <ul className="space-y-2">
              {['All Products', 'Apparel', 'Accessories', 'New Arrivals'].map((item) => (
                <li key={item}>
                  <Link href="/shop" className="text-sm hover:text-[#c25b2a] transition-colors" style={{ color: '#5a5650' }}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Email Capture */}
          <FooterEmailForm />

          {/* Info */}
          <div>
            <h4 className="text-sm uppercase tracking-widest mb-4" style={{ color: '#8a6510' }}>Info</h4>
            <ul className="space-y-2">
              {[
                { label: 'About', href: '/#about' },
                { label: 'Shipping Policy', href: '/shipping' },
                { label: 'Returns', href: '/returns' },
                { label: 'Contact', href: '/contact' },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm hover:text-[#c25b2a] transition-colors" style={{ color: '#5a5650' }}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderTop: '1px solid #d8d2ca' }}>
          <p className="text-xs" style={{ color: '#5a5650' }}>
            &copy; {new Date().getFullYear()} 3rd Apparel Co. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: '#5a5650' }}>Baltimore, MD</p>
        </div>
      </div>
    </footer>
  )
}
