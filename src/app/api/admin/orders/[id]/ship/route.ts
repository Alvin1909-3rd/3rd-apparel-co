import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { getAdminSession } from '@/lib/adminAuth'
import { Resend } from 'resend'
import { shippedEmailHtml } from '@/lib/emails/shippedEmail'

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { valid } = await getAdminSession()
  if (!valid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const { trackingNumber } = await req.json()

  if (!trackingNumber?.trim()) {
    return NextResponse.json({ error: 'Tracking number is required.' }, { status: 400 })
  }

  const { data: order, error } = await supabaseAdmin
    .from('orders')
    .update({ status: 'shipped', tracking_number: trackingNumber.trim() })
    .eq('id', id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const firstName = (order.shipping_address?.name || 'there').trim().split(/\s+/)[0]
  const orderNum = id.slice(0, 8).toUpperCase()

  const resend = new Resend(process.env.RESEND_API_KEY)
  await resend.emails.send({
    from: '3rd Apparel Co <onboarding@resend.dev>',
    to: order.email,
    subject: `Your order is on the way — #${orderNum}`,
    html: shippedEmailHtml(firstName, orderNum, trackingNumber.trim()),
  }).catch((err) => console.error('Shipped email failed:', err))

  return NextResponse.json(order)
}
