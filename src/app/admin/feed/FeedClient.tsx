'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Trash2, Upload, ImageIcon } from 'lucide-react'

interface FeedPhoto {
  id: string
  image_url: string
  caption: string
  created_at: string
}

export default function FeedClient() {
  const [photos, setPhotos] = useState<FeedPhoto[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [caption, setCaption] = useState('')
  const [preview, setPreview] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  async function loadPhotos() {
    const res = await fetch('/api/feed')
    const data = await res.json()
    setPhotos(data)
    setLoading(false)
  }

  useEffect(() => { loadPhotos() }, [])

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setPreview(URL.createObjectURL(file))
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault()
    const file = fileRef.current?.files?.[0]
    if (!file) { setError('Please select a photo'); return }

    setUploading(true)
    setError('')

    const formData = new FormData()
    formData.append('file', file)
    formData.append('caption', caption)

    const res = await fetch('/api/feed', { method: 'POST', body: formData })
    const data = await res.json()

    if (!res.ok) {
      setError(data.error || 'Upload failed')
      setUploading(false)
      return
    }

    setPhotos((prev) => [data, ...prev])
    setCaption('')
    setPreview(null)
    if (fileRef.current) fileRef.current.value = ''
    setUploading(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('Remove this photo from the feed?')) return
    const res = await fetch(`/api/feed/${id}`, { method: 'DELETE' })
    if (res.ok) setPhotos((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <div className="min-h-screen px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <Link href="/admin" className="text-sm hover:text-[#c25b2a] transition-colors" style={{ color: '#9e9a94' }}>
            ← Back to Admin
          </Link>
          <h1 className="text-5xl mt-4" style={{ fontFamily: 'Bebas Neue, sans-serif', color: '#f0ece4' }}>
            Feed Photos
          </h1>
          <p className="text-sm mt-2" style={{ color: '#9e9a94' }}>
            Up to 9 photos display on the homepage. Most recent shown first.
          </p>
        </div>

        {/* Upload Form */}
        <form onSubmit={handleUpload} className="p-6 mb-10 space-y-4" style={{ backgroundColor: '#1a1a1a', border: '1px solid #2e2e2e' }}>
          <p className="text-xs uppercase tracking-widest" style={{ color: '#c8a96e' }}>Upload Photo</p>

          <div
            className="relative border-2 border-dashed flex flex-col items-center justify-center cursor-pointer"
            style={{ borderColor: '#2e2e2e', minHeight: '180px' }}
            onClick={() => fileRef.current?.click()}
          >
            {preview ? (
              <div className="relative w-full h-48">
                <Image src={preview} alt="Preview" fill className="object-contain" />
              </div>
            ) : (
              <>
                <ImageIcon size={32} style={{ color: '#2e2e2e' }} />
                <p className="text-xs mt-3 uppercase tracking-widest" style={{ color: '#9e9a94' }}>Click to choose photo</p>
              </>
            )}
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: '#9e9a94' }}>
              Caption (optional)
            </label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="e.g. New drop just landed"
              className="w-full px-4 py-3 text-sm outline-none"
              style={{ backgroundColor: '#0e0e0e', border: '1px solid #2e2e2e', color: '#f0ece4' }}
            />
          </div>

          {error && <p className="text-sm" style={{ color: '#c25b2a' }}>{error}</p>}

          <button
            type="submit"
            disabled={uploading}
            className="flex items-center gap-2 px-8 py-3 text-sm uppercase tracking-widest hover:opacity-90 transition-all disabled:opacity-50"
            style={{ backgroundColor: '#c25b2a', color: '#f0ece4' }}
          >
            <Upload size={16} />
            {uploading ? 'Uploading...' : 'Upload Photo'}
          </button>
        </form>

        {/* Current Photos */}
        <div>
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: '#c8a96e' }}>
            Current Feed — {photos.length}/9 photos
          </p>

          {loading ? (
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="aspect-square animate-pulse" style={{ backgroundColor: '#1a1a1a' }} />
              ))}
            </div>
          ) : photos.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-20"
              style={{ backgroundColor: '#1a1a1a', border: '1px solid #2e2e2e' }}
            >
              <ImageIcon size={40} style={{ color: '#2e2e2e' }} />
              <p className="text-sm mt-4" style={{ color: '#9e9a94' }}>No photos yet. Upload your first one above.</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {photos.map((photo) => (
                <div key={photo.id} className="relative aspect-square group" style={{ backgroundColor: '#1a1a1a' }}>
                  <Image
                    src={photo.image_url}
                    alt={photo.caption || 'Feed photo'}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
                    <button
                      onClick={() => handleDelete(photo.id)}
                      className="p-3 transition-colors hover:text-[#c25b2a]"
                      style={{ color: '#f0ece4' }}
                    >
                      <Trash2 size={22} />
                    </button>
                  </div>
                  {photo.caption && (
                    <div className="absolute bottom-0 left-0 right-0 px-2 py-1" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
                      <p className="text-xs truncate" style={{ color: '#f0ece4' }}>{photo.caption}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
