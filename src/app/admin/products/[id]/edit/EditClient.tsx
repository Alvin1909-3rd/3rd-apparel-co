'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { Trash2 } from 'lucide-react'

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'OSFA']
const CATEGORIES = ['Apparel', 'Accessories', 'Headwear']

export default function EditProductPage() {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()

  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState('')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const [form, setForm] = useState({
    name: '',
    slug: '',
    description: '',
    price: '',
    category: 'Apparel',
    featured: false,
    sizes: [] as string[],
    inventory: {} as Record<string, number>,
    images: [''],
  })

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setForm({
          name: data.name,
          slug: data.slug,
          description: data.description,
          price: data.price.toString(),
          category: data.category,
          featured: data.featured,
          sizes: data.sizes,
          inventory: data.inventory,
          images: data.images.length ? data.images : [''],
        })
        setFetching(false)
      })
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const toggleSize = (size: string) => {
    setForm((f) => {
      const sizes = f.sizes.includes(size)
        ? f.sizes.filter((s) => s !== size)
        : [...f.sizes, size]
      const inventory = { ...f.inventory }
      if (!sizes.includes(size)) delete inventory[size]
      else inventory[size] = inventory[size] ?? 0
      return { ...f, sizes, inventory }
    })
  }

  const handleInventory = (size: string, qty: string) => {
    setForm((f) => ({ ...f, inventory: { ...f.inventory, [size]: parseInt(qty) || 0 } }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price),
          images: form.images.filter(Boolean),
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to update product')
      router.push('/admin/products')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete product')
      router.push('/admin/products')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Delete failed')
    }
  }

  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p style={{ color: '#9e9a94' }}>Loading product...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/admin/products" className="text-sm hover:text-[#c25b2a] transition-colors" style={{ color: '#9e9a94' }}>
              ← Back to Products
            </Link>
            <h1 className="text-5xl mt-4" style={{ fontFamily: 'Bebas Neue, sans-serif', color: '#f0ece4' }}>
              Edit Product
            </h1>
          </div>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm uppercase tracking-widest transition-all hover:opacity-80"
            style={{ border: '1px solid #c25b2a', color: '#c25b2a' }}
          >
            <Trash2 size={14} />
            Delete
          </button>
        </div>

        {/* Delete Confirmation */}
        {showDeleteConfirm && (
          <div className="p-6 mb-6" style={{ backgroundColor: '#1a1a1a', border: '1px solid #c25b2a' }}>
            <p className="text-sm mb-4" style={{ color: '#f0ece4' }}>
              Are you sure you want to delete this product? This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                className="px-6 py-2 text-sm uppercase tracking-widest hover:opacity-80"
                style={{ backgroundColor: '#c25b2a', color: '#f0ece4' }}
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-6 py-2 text-sm uppercase tracking-widest hover:text-[#f0ece4] transition-colors"
                style={{ border: '1px solid #2e2e2e', color: '#9e9a94' }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="p-6 space-y-4" style={{ backgroundColor: '#1a1a1a', border: '1px solid #2e2e2e' }}>
            <p className="text-xs uppercase tracking-widest" style={{ color: '#c8a96e' }}>Basic Info</p>
            <div>
              <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: '#9e9a94' }}>Product Name</label>
              <input name="name" required value={form.name} onChange={handleChange}
                className="w-full px-4 py-3 text-sm outline-none"
                style={{ backgroundColor: '#0e0e0e', border: '1px solid #2e2e2e', color: '#f0ece4' }} />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: '#9e9a94' }}>Slug (URL)</label>
              <input name="slug" required value={form.slug} onChange={handleChange}
                className="w-full px-4 py-3 text-sm outline-none font-mono"
                style={{ backgroundColor: '#0e0e0e', border: '1px solid #2e2e2e', color: '#9e9a94' }} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: '#9e9a94' }}>Price ($)</label>
                <input name="price" type="number" step="0.01" min="0" required value={form.price} onChange={handleChange}
                  className="w-full px-4 py-3 text-sm outline-none"
                  style={{ backgroundColor: '#0e0e0e', border: '1px solid #2e2e2e', color: '#f0ece4' }} />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: '#9e9a94' }}>Category</label>
                <select name="category" value={form.category} onChange={handleChange}
                  className="w-full px-4 py-3 text-sm outline-none"
                  style={{ backgroundColor: '#0e0e0e', border: '1px solid #2e2e2e', color: '#f0ece4' }}>
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: '#9e9a94' }}>Description</label>
              <textarea name="description" rows={4} value={form.description}
                onChange={handleChange as unknown as React.ChangeEventHandler<HTMLTextAreaElement>}
                className="w-full px-4 py-3 text-sm outline-none resize-none"
                style={{ backgroundColor: '#0e0e0e', border: '1px solid #2e2e2e', color: '#f0ece4' }} />
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" id="featured" checked={form.featured}
                onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))} />
              <label htmlFor="featured" className="text-sm" style={{ color: '#9e9a94' }}>Feature on homepage</label>
            </div>
          </div>

          {/* Sizes & Inventory */}
          <div className="p-6 space-y-4" style={{ backgroundColor: '#1a1a1a', border: '1px solid #2e2e2e' }}>
            <p className="text-xs uppercase tracking-widest" style={{ color: '#c8a96e' }}>Sizes & Inventory</p>
            <div className="flex flex-wrap gap-2">
              {SIZES.map((size) => (
                <button key={size} type="button" onClick={() => toggleSize(size)}
                  className="px-4 py-2 text-xs uppercase tracking-widest transition-all"
                  style={{
                    backgroundColor: form.sizes.includes(size) ? '#c25b2a' : 'transparent',
                    color: form.sizes.includes(size) ? '#f0ece4' : '#9e9a94',
                    border: `1px solid ${form.sizes.includes(size) ? '#c25b2a' : '#2e2e2e'}`,
                  }}>
                  {size}
                </button>
              ))}
            </div>
            {form.sizes.length > 0 && (
              <div className="space-y-2">
                {form.sizes.map((size) => (
                  <div key={size} className="flex items-center gap-4">
                    <span className="text-sm w-12 uppercase" style={{ color: '#9e9a94' }}>{size}</span>
                    <input type="number" min="0" value={form.inventory[size] ?? 0}
                      onChange={(e) => handleInventory(size, e.target.value)}
                      className="w-24 px-3 py-2 text-sm outline-none"
                      style={{ backgroundColor: '#0e0e0e', border: '1px solid #2e2e2e', color: '#f0ece4' }} />
                    <span className="text-xs" style={{ color: '#9e9a94' }}>units</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Images */}
          <div className="p-6 space-y-4" style={{ backgroundColor: '#1a1a1a', border: '1px solid #2e2e2e' }}>
            <p className="text-xs uppercase tracking-widest" style={{ color: '#c8a96e' }}>Image URLs</p>
            {form.images.map((url, i) => (
              <input key={i} type="url" value={url}
                onChange={(e) => {
                  const images = [...form.images]
                  images[i] = e.target.value
                  setForm((f) => ({ ...f, images }))
                }}
                placeholder={`Image ${i + 1} URL`}
                className="w-full px-4 py-3 text-sm outline-none"
                style={{ backgroundColor: '#0e0e0e', border: '1px solid #2e2e2e', color: '#f0ece4' }} />
            ))}
            <button type="button"
              onClick={() => setForm((f) => ({ ...f, images: [...f.images, ''] }))}
              className="text-xs uppercase tracking-widest hover:text-[#c25b2a] transition-colors"
              style={{ color: '#9e9a94' }}>
              + Add another image
            </button>
          </div>

          {error && <p className="text-sm" style={{ color: '#c25b2a' }}>{error}</p>}

          <button type="submit" disabled={loading}
            className="w-full py-4 text-sm uppercase tracking-widest font-semibold hover:opacity-90 transition-all disabled:opacity-50"
            style={{ backgroundColor: '#c25b2a', color: '#f0ece4' }}>
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  )
}
