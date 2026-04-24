import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const { name, email, website, instagram, medium, statement, location } = await req.json()

    if (!name || !email || !medium || !statement) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await resend.emails.send({
      from: 'MiSaZi Submissions <noreply@misaziart.com>',
      to: ['info@misaziart.com'],
      reply_to: email,
      subject: `Artist Submission — ${name}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px; color: #0D0D0D;">
          <h1 style="font-size: 22px; font-weight: 300; border-bottom: 1px solid #E8E5E0; padding-bottom: 20px; margin-bottom: 28px;">
            New Artist Submission
          </h1>
          <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
            <tr><td style="color: #999; padding: 8px 0; width: 140px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em;">Name</td><td style="padding: 8px 0;">${name}</td></tr>
            <tr><td style="color: #999; padding: 8px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color:#C8581A;">${email}</a></td></tr>
            <tr><td style="color: #999; padding: 8px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em;">Location</td><td style="padding: 8px 0;">${location || '—'}</td></tr>
            <tr><td style="color: #999; padding: 8px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em;">Medium</td><td style="padding: 8px 0;">${medium}</td></tr>
            <tr><td style="color: #999; padding: 8px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em;">Website</td><td style="padding: 8px 0;">${website ? `<a href="${website}" style="color:#C8581A;">${website}</a>` : '—'}</td></tr>
            <tr><td style="color: #999; padding: 8px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em;">Instagram</td><td style="padding: 8px 0;">${instagram || '—'}</td></tr>
          </table>
          <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #E8E5E0;">
            <p style="color: #999; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 12px;">Artist Statement</p>
            <p style="font-size: 14px; line-height: 1.9; color: #333; white-space: pre-wrap;">${statement}</p>
          </div>
        </div>
      `,
    })

    // Auto-reply
    await resend.emails.send({
      from: 'MiSaZi Art Gallery <info@misaziart.com>',
      to: [email],
      subject: 'We received your submission — MiSaZi Art Gallery',
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px; color: #0D0D0D;">
          <p style="font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #999; margin-bottom: 32px;">MiSaZi Art Gallery</p>
          <h1 style="font-size: 28px; font-weight: 300; line-height: 1.2; margin-bottom: 24px;">Thank you, ${name.split(' ')[0]}.</h1>
          <p style="font-size: 14px; line-height: 1.9; color: #555; margin-bottom: 16px;">
            We've received your artist submission and our curatorial team will review it carefully.
            You can expect to hear from us within <strong>4–6 weeks</strong>.
          </p>
          <p style="font-size: 14px; line-height: 1.9; color: #555; margin-bottom: 32px;">
            In the meantime, we'd love for you to explore our current exhibitions and the artists we represent.
          </p>
          <p style="font-size: 13px; color: #999;">
            250 W. 50th St., New York, NY 10019<br />
            <a href="mailto:info@misaziart.com" style="color: #C8581A;">info@misaziart.com</a>
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Submission error:', err)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
