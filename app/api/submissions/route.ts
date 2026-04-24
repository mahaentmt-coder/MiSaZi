import { NextRequest, NextResponse } from 'next/server'
// import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  // const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const { name, email, website, instagram, medium, bio, portfolio, statement } = await req.json()

    if (!name || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // TODO: uncomment when RESEND_API_KEY is set in Vercel environment variables
    // await resend.emails.send({ from: '...', to: ['info@misaziart.com'], reply_to: email, subject: `Artist Submission — ${name}`, html: '...' })

    console.log('Submission received:', { name, email, website, instagram, medium, bio, portfolio, statement })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Submission error:', err)
    return NextResponse.json({ error: 'Failed to process' }, { status: 500 })
  }
}
