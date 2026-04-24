import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, artist, budget, message } = await req.json()

    // Validation
    if (!firstName || !lastName || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Send notification to gallery
    await resend.emails.send({
      from: 'MiSaZi Inquiry <noreply@misaziart.com>',
      to:   ['info@misaziart.com'],
      replyTo: email,
      subject: `Artwork Inquiry — ${artist || 'General'} — ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px; color: #0D0D0D;">
          <h1 style="font-size: 24px; font-weight: 300; border-bottom: 1px solid #E8E5E0; padding-bottom: 20px; margin-bottom: 28px;">
            New Artwork Inquiry
          </h1>
          <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
            <tr><td style="color: #999; padding: 8px 0; width: 140px; text-transform: uppercase; font-size: 11px; letter-spacing: 0.1em;">Name</td><td style="padding: 8px 0;">${firstName} ${lastName}</td></tr>
            <tr><td style="color: #999; padding: 8px 0; text-transform: uppercase; font-size: 11px; letter-spacing: 0.1em;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #C8581A;">${email}</a></td></tr>
            <tr><td style="color: #999; padding: 8px 0; text-transform: uppercase; font-size: 11px; letter-spacing: 0.1em;">Artist</td><td style="padding: 8px 0;">${artist || '—'}</td></tr>
            <tr><td style="color: #999; padding: 8px 0; text-transform: uppercase; font-size: 11px; letter-spacing: 0.1em;">Budget</td><td style="padding: 8px 0;">${budget || '—'}</td></tr>
          </table>
          ${message ? `
            <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #E8E5E0;">
              <p style="color: #999; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 12px;">Message</p>
              <p style="font-size: 14px; line-height: 1.8; color: #333;">${message}</p>
            </div>
          ` : ''}
          <p style="margin-top: 40px; font-size: 12px; color: #999;">
            Submitted via misaziart.com · Reply directly to this email to respond.
          </p>
        </div>
      `,
    })

    // Send auto-reply to collector
    await resend.emails.send({
      from: 'MiSaZi Art Gallery <info@misaziart.com>',
      to:   [email],
      subject: 'Thank you for your inquiry — MiSaZi Art Gallery',
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px; color: #0D0D0D;">
          <p style="font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #999; margin-bottom: 32px;">MiSaZi Art Gallery</p>
          <h1 style="font-size: 28px; font-weight: 300; line-height: 1.2; margin-bottom: 24px;">
            Thank you, ${firstName}.
          </h1>
          <p style="font-size: 14px; line-height: 1.9; color: #555; margin-bottom: 16px;">
            We've received your inquiry${artist ? ` about work by <strong>${artist}</strong>` : ''} and will be in touch within 2 business days.
          </p>
          <p style="font-size: 14px; line-height: 1.9; color: #555; margin-bottom: 32px;">
            In the meantime, please feel free to explore our current exhibitions and artist profiles on our website.
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
    console.error('Inquiry email error:', err)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
