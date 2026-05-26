import Image from 'next/image'
import { Share2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface FeedPhoto {
  id: string
  image_url: string
  caption: string
}

async function getFeedPhotos(): Promise<FeedPhoto[]> {
  try {
    const { data } = await supabase
      .from('feed_photos')
      .select('id, image_url, caption')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })
      .limit(9)
    return data || []
  } catch {
    return []
  }
}

export default async function InstagramFeed() {
  const posts = await getFeedPhotos()

  return (
    <section id="instagram" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-5xl" style={{ fontFamily: 'Bebas Neue, sans-serif', color: '#f0ece4' }}>
            @3RDAPPARELCO
          </h2>
          <a
            href="https://instagram.com/3rdapparelco"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm uppercase tracking-widest hover:text-[#c25b2a] transition-colors"
            style={{ color: '#9e9a94' }}
          >
            <Share2 size={16} />
            Follow
          </a>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-3 gap-1 md:gap-2">
            {posts.map((post) => (
              <a
                key={post.id}
                href="https://instagram.com/3rdapparelco"
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden aspect-square group"
                style={{ backgroundColor: '#1a1a1a' }}
              >
                <Image
                  src={post.image_url}
                  alt={post.caption || 'Instagram post'}
                  fill
                  className="object-cover transition-opacity duration-300 group-hover:opacity-70"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Share2 size={24} style={{ color: '#f0ece4' }} />
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-1 md:gap-2">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square flex items-center justify-center"
                style={{ backgroundColor: '#1a1a1a' }}
              >
                <Share2 size={20} style={{ color: '#2e2e2e' }} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
