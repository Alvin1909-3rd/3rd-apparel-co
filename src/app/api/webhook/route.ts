import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { supabaseAdmin } from '@/lib/supabase'
import Stripe from 'stripe'
import { Resend } from 'resend'
import { orderConfirmationHtml } from '@/lib/orderConfirmationEmail'

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
      // Mark order as paid
      await supabaseAdmin
        .from('orders')
        .update({ status: 'paid' })
        .eq('id', orderId)

      // Send order confirmation email
      const { data: orderForEmail } = await supabaseAdmin
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single()

      if (orderForEmail?.email) {
        const resend = new Resend(process.env.RESEND_API_KEY)
        await resend.emails.send({
          from: '3rd Apparel Co <orders@3rdapparelco.com>',
          to: orderForEmail.email,
          subject: `Order Confirmed — #${orderId.slice(0, 8).toUpperCase()}`,
          html: orderConfirmationHtml(orderForEmail),
        }).catch((err) => console.error('Order email failed:', err))
      }

      // Decrement inventory
      const { data: order } = await supabaseAdmin
        .from('orders')
        .select('items')
        .eq('id', orderId)
        .single()

      if (order?.items) {
        for (const item of order.items) {
          const { data: product } = await supabaseAdmin
            .from('products')
            .select('inventory')
            .eq('id', item.product.id)
            .single()

          if (product?.inventory) {
            const updatedInventory = { ...product.inventory }
            updatedInventory[item.size] = Math.max(
              0,
              (updatedInventory[item.size] || 0) - item.quantity
            )
            await supabaseAdmin
              .from('products')
              .update({ inventory: updatedInventory })
              .eq('id', item.product.id)
          }
        }
      }
    }
  }

  return NextResponse.json({ received: true })
}
