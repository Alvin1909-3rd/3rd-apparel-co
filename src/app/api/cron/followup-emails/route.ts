import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { Resend } from 'resend'
import { shippingUpdateHtml } from '@/lib/emails/shippingUpdateEmail'
import { discountEmailHtml } from '@/lib/emails/discountEmail'
import { abandonedCartEmailHtml } from '@/lib/emails/abandonedCartEmail'
import { ownerDailyDigestHtml } from '@/lib/emails/ownerAlerts'

const OWNER_EMAIL = process.env.OWNER_EMAIL!

function firstName(fullName: string): string {
  return fullName.trim().split(/\s+/)[0]
}

function orderNum(id: string): string {
  return id.slice(0, 8).toUpperCase()
}

async function sendAndMark(orderId: string, currentSent: string[], tag: string, sendFn: () => Promise<void>) {
  await sendFn()
  await supabaseAdmin
    .from('orders')
    .update({ emails_sent: [...currentSent, tag] })
    .eq('id', orderId)
}

export async function GET(req: NextRequest) {
  if (req.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)
  const now = Date.now()
  const hour = 60 * 60 * 1000
  const day = 24 * hour

  const [day3Min, day3Max] = [new Date(now - 4 * day).toISOString(), new Date(now - 3 * day).toISOString()]
  const [day7Min, day7Max] = [new Date(now - 8 * day).toISOString(), new Date(now - 7 * day).toISOString()]
  const [abandonedMin, abandonedMax] = [new Date(now - 24 * hour).toISOString(), new Date(now - 2 * hour).toISOString()]

  const results = { day3: 0, day7: 0, abandoned: 0, errors: 0 }

  // Post-purchase follow-ups (paid orders)
  const { data: paidCandidates } = await supabaseAdmin
    .from('orders')
    .select('*')
    .eq('status', 'paid')
    .gte('created_at', day7Min)

  for (const order of paidCandidates || []) {
    const sent: string[] = order.emails_sent || []
    const name = firstName(order.shipping_address?.name || 'there')
    const num = orderNum(order.id)
    const createdAt = order.created_at

    if (createdAt >= day3Min && createdAt <= day3Max && !sent.includes('day3')) {
      try {
        await sendAndMark(order.id, sent, 'day3', () =>
          resend.emails.send({
            from: '3rd Apparel Co <orders@3rdapparelco.com>',
            to: order.email,
            subject: 'Your cap is on the move',
            html: shippingUpdateHtml(name, num),
          }).then(() => undefined)
        )
        results.day3++
      } catch { results.errors++ }
    }

    if (createdAt >= day7Min && createdAt <= day7Max && !sent.includes('day7')) {
      try {
        await sendAndMark(order.id, sent, 'day7', () =>
          resend.emails.send({
            from: '3rd Apparel Co <orders@3rdapparelco.com>',
            to: order.email,
            subject: 'Something for coming back',
            html: discountEmailHtml(name),
          }).then(() => undefined)
        )
        results.day7++
      } catch { results.errors++ }
    }
  }

  // Abandoned cart (pending orders that never converted)
  const { data: abandonedOrders } = await supabaseAdmin
    .from('orders')
    .select('*')
    .eq('status', 'pending')
    .gte('created_at', abandonedMin)
    .lte('created_at', abandonedMax)

  for (const order of abandonedOrders || []) {
    const sent: string[] = order.emails_sent || []
    if (sent.includes('abandoned')) continue
    if (!order.email || !order.items?.length) continue

    const name = firstName(order.shipping_address?.name || 'there')

    try {
      await sendAndMark(order.id, sent, 'abandoned', () =>
        resend.emails.send({
          from: '3rd Apparel Co <orders@3rdapparelco.com>',
          to: order.email,
          subject: 'You left something behind',
          html: abandonedCartEmailHtml(name, order.items),
        }).then(() => undefined)
      )
      results.abandoned++
    } catch { results.errors++ }
  }

  // Owner: daily digest
  try {
    const since = new Date(now - day).toISOString()
    const { data: recentOrders } = await supabaseAdmin
      .from('orders').select('id, total, email').eq('status', 'paid').gte('created_at', since)

    const { data: allProducts } = await supabaseAdmin
      .from('products').select('name, inventory')

    const revenue = (recentOrders || []).reduce((sum, o) => sum + o.total, 0)

    const lowStock: { name: string; totalUnits: number }[] = []
    const outOfStock: { name: string; totalUnits: number }[] = []

    for (const p of allProducts || []) {
      const total = Object.values(p.inventory as Record<string, number>).reduce((a, b) => a + b, 0)
      if (total === 0) outOfStock.push({ name: p.name, totalUnits: 0 })
      else if (total <= 3) lowStock.push({ name: p.name, totalUnits: total })
    }

    await resend.emails.send({
      from: '3rd Apparel Co <orders@3rdapparelco.com>',
      to: OWNER_EMAIL,
      subject: `3rd Apparel Co — Daily Summary (${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})`,
      html: ownerDailyDigestHtml(recentOrders || [], revenue, lowStock, outOfStock),
    })
  } catch (err) {
    console.error('Daily digest failed:', err)
    results.errors++
  }

  return NextResponse.json({ ok: true, ...results })
}
