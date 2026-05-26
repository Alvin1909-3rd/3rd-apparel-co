'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

interface FeedPhoto {
  id: string
  image_url: string
  caption: string
}

export default function PhotoCarousel({ photos }: { photos: FeedPhoto[] }) {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => setCurrent(i => (i + 1) % photos.length), [photos.length])
  const prev = () => setCurrent(i => (i - 1 + photos.length) % photos.length)

  useEffect(() => {
    if (paused || photos.length <= 1) return
    const timer = setInterval(next, 4500)
    return () => clearInterval(timer)
  }, [paused, next, photos.length])

  if (!photos.length) return null

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-5xl" style={{ fontFamily: 'Bebas Neue, sans-serif', color: '#0e0e0e' }}>
            The Culture
          </h2>
          <p className="text-xs uppercase tracking-widest" style={{ color: '#5a5650' }}>
            {current + 1} / {photos.length}
          </p>
        </div>

        {/* Main Slide */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative aspect-[4/3] md:aspect-[16/9]" style={{ backgroundColor: '#f7f5f2' }}>
            <Image
              key={current}
              src={photos[current].image_url}
              alt={photos[current].caption || `Photo ${current + 1}`}
              fill
              className="object-cover transition-opacity duration-500"
              priority={current === 0}
              quality={90}
              sizes="(max-width: 768px) 100vw, 1280px"
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to bottom, transparent 60%, rgba(247,245,242,0.5) 100%)' }}
            />
            {photos[current].caption && (
              <p
                className="absolute bottom-10 left-6 text-sm uppercase tracking-widest"
                style={{ color: '#0e0e0e' }}
              >
                {photos[current].caption}
              </p>
            )}
          </div>

          {/* Prev */}
          <button
            onClick={prev}
            aria-label="Previous"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center transition-all hover:opacity-100 opacity-60 hover:border-[#c25b2a] hover:text-[#c25b2a]"
            style={{ backgroundColor: 'rgba(255,255,255,0.85)', border: '1px solid #d8d2ca', color: '#0e0e0e' }}
          >
            ←
          </button>

          {/* Next */}
          <button
            onClick={next}
            aria-label="Next"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center transition-all hover:opacity-100 opacity-60 hover:border-[#c25b2a] hover:text-[#c25b2a]"
            style={{ backgroundColor: 'rgba(255,255,255,0.85)', border: '1px solid #d8d2ca', color: '#0e0e0e' }}
          >
            →
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="transition-all rounded-full"
                style={{
                  width: i === current ? '20px' : '8px',
                  height: '8px',
                  backgroundColor: i === current ? '#c25b2a' : '#d8d2ca',
                }}
              />
            ))}
          </div>
        </div>

        {/* Thumbnail strip */}
        <div className="grid mt-1" style={{ gridTemplateColumns: `repeat(${photos.length}, 1fr)`, gap: '4px' }}>
          {photos.map((photo, i) => (
            <button
              key={photo.id}
              onClick={() => setCurrent(i)}
              className="relative aspect-square overflow-hidden transition-all"
              style={{
                opacity: i === current ? 1 : 0.4,
                outline: i === current ? '2px solid #c25b2a' : 'none',
              }}
            >
              <Image src={photo.image_url} alt="" fill className="object-cover" sizes="120px" quality={75} />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
