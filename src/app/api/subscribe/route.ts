import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

const DISCOUNT_CODE = 'WELCOME10'

export async function POST(req: NextRequest) {
  try {
    const { email, source = 'popup' } = await req.json()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 })
    }

    const { error } = await supabaseAdmin
      .from('email_subscribers')
      .upsert({ email: email.toLowerCase().trim(), source }, { onConflict: 'email', ignoreDuplicates: true })

    if (error) throw new Error(error.message)

    return NextResponse.json({ success: true, code: DISCOUNT_CODE })
  } catch (err: unknown) {
    console.error('Subscribe error:', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
