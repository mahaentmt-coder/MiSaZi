import { NextRequest, NextResponse } from 'next/server'
// import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  // const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const { firstName, lastName, email, artist, budget, message } = await req.json()

    if (!firstName || !lastName || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // TODO: uncomment when RESEND_API_KEY is set in Vercel environment variables
    // await resend.emails.send({ from: '...', to: [...], reply_to: email, subject: '...', html: '...' })
    // await resend.emails.send({ from: '...', to: [email], subject: '...', html: '...' })

    console.log('Inquiry received:', { firstName, lastName, email, artist, budget, message })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Inquiry error:', err)
    return NextResponse.json({ error: 'Failed to process' }, { status: 500 })
  }
}
