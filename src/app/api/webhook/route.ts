import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { supabaseAdmin } from '@/lib/supabase'
import Stripe from 'stripe'
import { Resend } from 'resend'
import { orderConfirmationHtml } from '@/lib/orderConfirmationEmail'
import { ownerNewOrderHtml, ownerLowStockHtml } from '@/lib/emails/ownerAlerts'

const OWNER_EMAIL = process.env.OWNER_EMAIL!

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    return NextResponse.json({ error: 'Webhook signature invalid' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const orderId = session.metadata?.orderId

    if (orderId) {
      await supabaseAdmin.from('orders').update({ status: 'paid' }).eq('id', orderId)

      const { data: order } = await supabaseAdmin
        .from('orders').select('*').eq('id', orderId).single()

      if (order) {
        const resend = new Resend(process.env.RESEND_API_KEY)
        const orderNum = orderId.slice(0, 8).toUpperCase()

        // Customer: order confirmation
        await resend.emails.send({
          from: '3rd Apparel Co <orders@3rdapparelco.com>',
          to: order.email,
          subject: `Order Confirmed — #${orderNum}`,
          html: orderConfirmationHtml(order),
        }).catch((err) => console.error('Order confirmation email failed:', err))

        // Owner: new order alert
        await resend.emails.send({
          from: '3rd Apparel Co <orders@3rdapparelco.com>',
          to: OWNER_EMAIL,
          subject: `New Order — #${orderNum} ($${order.total.toFixed(2)})`,
          html: ownerNewOrderHtml({
            orderNum,
            customerEmail: order.email,
            items: order.items,
            total: order.total,
            shipping_address: order.shipping_address,
          }),
        }).catch((err) => console.error('Owner order alert failed:', err))

        // Decrement inventory + check low stock
        const lowStockProducts: { name: string; totalUnits: number }[] = []

        for (const item of order.items) {
          const { data: product } = await supabaseAdmin
            .from('products')
            .select('id, name, inventory')
            .eq('id', item.product.id)
            .single()

          if (product?.inventory) {
            const updated = { ...product.inventory }
            updated[item.size] = Math.max(0, (updated[item.size] || 0) - item.quantity)
            await supabaseAdmin.from('products').update({ inventory: updated }).eq('id', product.id)

            const totalUnits = Object.values(updated as Record<string, number>).reduce((a, b) => a + b, 0)
            if (totalUnits <= 3) {
              lowStockProducts.push({ name: product.name, totalUnits })
            }
          }
        }

        if (lowStockProducts.length > 0) {
          const hasOutOfStock = lowStockProducts.some((p) => p.totalUnits === 0)
          await resend.emails.send({
            from: '3rd Apparel Co <orders@3rdapparelco.com>',
            to: OWNER_EMAIL,
            subject: hasOutOfStock ? 'Out of Stock Alert — 3rd Apparel Co' : 'Low Stock Alert — 3rd Apparel Co',
            html: ownerLowStockHtml(lowStockProducts),
          }).catch((err) => console.error('Low stock alert failed:', err))
        }
      }
    }
  }

  return NextResponse.json({ received: true })
}
