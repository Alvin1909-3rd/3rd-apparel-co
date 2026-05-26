import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const supabaseAdmin = getSupabaseAdmin()
  const { id } = await params

  // Get the record first so we can delete the storage file
  const { data: photo, error: fetchError } = await supabaseAdmin
    .from('feed_photos')
    .select('storage_path')
    .eq('id', id)
    .single()

  if (fetchError) return NextResponse.json({ error: fetchError.message }, { status: 404 })

  // Delete from storage
  if (photo.storage_path) {
    await supabaseAdmin.storage.from('feed-photos').remove([photo.storage_path])
  }

  // Delete from table
  const { error } = await supabaseAdmin.from('feed_photos').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ success: true })
}
