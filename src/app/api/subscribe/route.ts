import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { Resend } from 'resend'
import { welcomeEmailHtml } from '@/lib/emails/welcomeEmail'

const DISCOUNT_CODE = 'WELCOME10'

export async function POST(req: NextRequest) {
  try {
    const { email, source = 'popup' } = await req.json()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 })
    }

    const { error, data } = await supabaseAdmin
      .from('email_subscribers')
      .upsert({ email: email.toLowerCase().trim(), source }, { onConflict: 'email', ignoreDuplicates: true })
      .select()

    if (error) throw new Error(error.message)

    // Only send welcome email to new subscribers (not re-submits)
    if (data && data.length > 0) {
      const resend = new Resend(process.env.RESEND_API_KEY)
      await resend.emails.send({
        from: '3rd Apparel Co <onboarding@resend.dev>',
        to: email.toLowerCase().trim(),
        subject: `You're in. Here's ${DISCOUNT_CODE} — 10% off your first order.`,
        html: welcomeEmailHtml(DISCOUNT_CODE),
      }).catch((err) => console.error('Welcome email failed:', err))
    }

    return NextResponse.json({ success: true, code: DISCOUNT_CODE })
  } catch (err: unknown) {
    console.error('Subscribe error:', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
