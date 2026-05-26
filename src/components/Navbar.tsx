'use client'

import Link from 'next/link'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '@/context/CartContext'

export default function Navbar() {
  const { count, openCart } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav
      className="sticky top-0 z-50 w-full"
      style={{ backgroundColor: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #d8d2ca' }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="text-2xl tracking-widest" style={{ fontFamily: 'Bebas Neue, sans-serif', color: '#0e0e0e' }}>
          3RD APPAREL CO
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/shop" className="text-sm uppercase tracking-widest hover:text-[#c25b2a] transition-colors" style={{ color: '#5a5650' }}>
            Shop
          </Link>
          <Link href="/#about" className="text-sm uppercase tracking-widest hover:text-[#c25b2a] transition-colors" style={{ color: '#5a5650' }}>
            About
          </Link>
          <Link href="/#carousel" className="text-sm uppercase tracking-widest hover:text-[#c25b2a] transition-colors" style={{ color: '#5a5650' }}>
            Gallery
          </Link>
        </div>

        {/* Cart + Mobile Menu */}
        <div className="flex items-center gap-4">
          <button
            onClick={openCart}
            className="relative"
            aria-label={count > 0 ? `Open cart, ${count} item${count === 1 ? '' : 's'}` : 'Open cart'}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, lineHeight: 0 }}
          >
            <ShoppingBag size={22} style={{ color: '#0e0e0e' }} aria-hidden="true" />
            {count > 0 && (
              <span
                className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-xs flex items-center justify-center font-semibold"
                style={{ backgroundColor: '#c25b2a', color: '#ffffff' }}
                aria-hidden="true"
              >
                {count}
              </span>
            )}
          </button>

          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            style={{ color: '#0e0e0e' }}
          >
            {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div id="mobile-menu" role="navigation" aria-label="Mobile navigation" className="md:hidden px-6 pb-6 flex flex-col gap-4" style={{ borderTop: '1px solid #d8d2ca', backgroundColor: '#ffffff' }}>
          <Link href="/shop" onClick={() => setMenuOpen(false)} className="text-sm uppercase tracking-widest pt-4 hover:text-[#c25b2a] transition-colors" style={{ color: '#5a5650' }}>Shop</Link>
          <Link href="/#about" onClick={() => setMenuOpen(false)} className="text-sm uppercase tracking-widest hover:text-[#c25b2a] transition-colors" style={{ color: '#5a5650' }}>About</Link>
          <Link href="/#carousel" onClick={() => setMenuOpen(false)} className="text-sm uppercase tracking-widest hover:text-[#c25b2a] transition-colors" style={{ color: '#5a5650' }}>Gallery</Link>
        </div>
      )}
    </nav>
  )
}
