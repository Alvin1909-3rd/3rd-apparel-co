'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'

export default function ParallaxHero() {
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${window.scrollY * 0.35}px)`
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax background */}
      <div
        ref={bgRef}
        className="absolute inset-0 will-change-transform"
        style={{
          background: 'linear-gradient(135deg, #f7f5f2 0%, #ffffff 50%, #f7f5f2 100%)',
          top: '-20%',
          bottom: '-20%',
        }}
      />

      {/* Accent line */}
      <div className="absolute left-0 top-0 w-1 h-full" style={{ backgroundColor: '#c25b2a', zIndex: 1 }} />

      {/* Content */}
      <div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        style={{ animation: 'heroFadeUp 0.9s ease both' }}
      >
        <p
          className="text-xs uppercase tracking-[0.4em] mb-6"
          style={{ color: '#8a6510', animation: 'heroFadeUp 0.9s ease 0.1s both' }}
        >
          Baltimore, MD — Culture. Arts. History.
        </p>
        <h1
          className="text-7xl md:text-[10rem] leading-none mb-6"
          style={{
            fontFamily: 'Bebas Neue, sans-serif',
            color: '#0e0e0e',
            animation: 'heroFadeUp 0.9s ease 0.2s both',
          }}
        >
          3RD APPAREL CO
        </h1>
        <p
          className="text-base md:text-lg mb-10 max-w-xl mx-auto"
          style={{ color: '#5a5650', animation: 'heroFadeUp 0.9s ease 0.35s both' }}
        >
          Private label apparel and accessories built for those who move with purpose.
        </p>
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          style={{ animation: 'heroFadeUp 0.9s ease 0.5s both' }}
        >
          <Link
            href="/shop"
            className="px-10 py-4 text-sm uppercase tracking-widest font-semibold transition-all hover:opacity-90"
            style={{ backgroundColor: '#c25b2a', color: '#ffffff' }}
          >
            Shop Now
          </Link>
          <Link
            href="/#about"
            className="px-10 py-4 text-sm uppercase tracking-widest font-semibold transition-all hover:border-[#c25b2a] hover:text-[#c25b2a]"
            style={{ border: '1px solid #d8d2ca', color: '#5a5650' }}
          >
            Our Story
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ animation: 'heroFadeUp 0.9s ease 0.7s both', zIndex: 1 }}
      >
        <div className="w-px h-12" style={{ backgroundColor: '#d8d2ca' }} />
        <p className="text-xs uppercase tracking-widest" style={{ color: '#5a5650' }}>Scroll</p>
      </div>

      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}
