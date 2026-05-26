'use client'

import Image from 'next/image'
import { useState } from 'react'

interface FeedPhoto {
  id: string
  image_url: string
  caption?: string | null
}

export default function LookbookSection({ photos }: { photos: FeedPhoto[] }) {
  const [hovered, setHovered] = useState<string | null>(null)

  if (photos.length === 0) return null

  // Arrange into editorial grid: first photo large, rest in 2-col grid on the right
  const [hero, ...rest] = photos.slice(0, 5)

  return (
    <section style={{ backgroundColor: '#0e0e0e', padding: '80px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        {/* Section header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 40 }}>
          <div>
            <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.4em', color: '#8a6510', marginBottom: 8 }}>
              Editorial
            </p>
            <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: '#f0ece4', lineHeight: 1 }}>
              The Lookbook
            </h2>
          </div>
          <div style={{ width: 48, height: 1, backgroundColor: '#c25b2a' }} />
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'auto auto', gap: 8 }}>
          {/* Hero photo — spans 2 rows on left */}
          {hero && (
            <div
              role="img"
              aria-label={hero.caption || 'Lookbook editorial photo'}
              style={{ gridRow: 'span 2', position: 'relative', overflow: 'hidden', aspectRatio: '2/3' }}
              onMouseEnter={() => setHovered(hero.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <Image
                src={hero.image_url}
                alt={hero.caption || 'Lookbook photo'}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
                quality={90}
                style={{
                  transform: hovered === hero.id ? 'scale(1.04)' : 'scale(1)',
                  transition: 'transform 0.6s ease',
                }}
              />
              <div
                style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)',
                  opacity: hovered === hero.id ? 1 : 0,
                  transition: 'opacity 0.4s ease',
                  display: 'flex', alignItems: 'flex-end', padding: '20px',
                }}
              >
                {hero.caption && (
                  <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#f0ece4' }}>
                    {hero.caption}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Right column — up to 4 smaller photos */}
          {rest.slice(0, 4).map((photo) => (
            <div
              key={photo.id}
              role="img"
              aria-label={photo.caption || 'Lookbook editorial photo'}
              style={{ position: 'relative', overflow: 'hidden', aspectRatio: '1/1' }}
              onMouseEnter={() => setHovered(photo.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <Image
                src={photo.image_url}
                alt={photo.caption || 'Lookbook photo'}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
                quality={85}
                style={{
                  transform: hovered === photo.id ? 'scale(1.06)' : 'scale(1)',
                  transition: 'transform 0.6s ease',
                }}
              />
              <div
                style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)',
                  opacity: hovered === photo.id ? 1 : 0,
                  transition: 'opacity 0.4s ease',
                  display: 'flex', alignItems: 'flex-end', padding: '14px',
                }}
              >
                {photo.caption && (
                  <p style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#f0ece4' }}>
                    {photo.caption}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
