import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { supabaseAdmin } from '@/lib/supabase'
import { CartItem } from '@/lib/types'
import { lookupPromo } from '@/lib/promoCodes'

export async function POST(req: NextRequest) {
  try {
    const { cart, shippingAddress, email, promoCode } = await req.json()

    if (!cart?.length) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
    }

    const subtotal = cart.reduce(
      (sum: number, item: CartItem) => sum + item.product.price * item.quantity,
      0
    )
    const isTestOrder = cart.some((item: CartItem) => item.product.slug === 'test-product')
    const appliedPromo = promoCode ? lookupPromo(promoCode) : null
    const baseShipping = subtotal >= 75 || isTestOrder ? 0 : 8.99
    const shipping = appliedPromo?.type === 'free_shipping' ? 0 : baseShipping
    const total = subtotal + shipping

    // Create order in Supabase
    const { data: order, error } = await supabaseAdmin
      .from('orders')
      .insert({
        email,
        items: cart,
        subtotal,
        shipping,
        total,
        status: 'pending',
        shipping_address: shippingAddress,
      })
      .select()
      .single()

    if (error) throw new Error(error.message)

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email,
      line_items: [
        ...cart.map((item: CartItem) => ({
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${item.product.name}${item.color ? ` - ${item.color}` : ''} (${item.size})`,
              images: item.product.images.slice(0, 1),
            },
            unit_amount: Math.round(item.product.price * 100),
          },
          quantity: item.quantity,
        })),
        ...(shipping > 0
          ? [
              {
                price_data: {
                  currency: 'usd',
                  product_data: { name: 'Shipping' },
                  unit_amount: Math.round(shipping * 100),
                },
                quantity: 1,
              },
            ]
          : []),
      ],
      allow_promotion_codes: true,
      metadata: { orderId: order.id },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/order/${order.id}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout`,
    })

    // Save Stripe session ID to order
    await supabaseAdmin
      .from('orders')
      .update({ stripe_payment_intent: session.id })
      .eq('id', order.id)

    return NextResponse.json({ url: session.url })
  } catch (err: unknown) {
    console.error('Checkout error:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Checkout failed' },
      { status: 500 }
    )
  }
}
