import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { requireAdmin } from '@/lib/adminAuth'

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const unauthorized = await requireAdmin()
  if (unauthorized) return unauthorized

  const body = await req.json()

  const { data, error } = await supabaseAdmin
    .from('products')
    .insert(body)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
