'use server'

import nodemailer from 'nodemailer'

export async function submitInquiry(data: {
  name: string
  email: string
  phone: string
  message: string
  subject: string
  artist: string
}) {
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const to   = process.env.SMTP_TO || user || 'info@misaziart.com'

  if (!user || !pass) {
    console.log('INQUIRY (no SMTP config):', data)
    return
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  })

  await transporter.sendMail({
    from: `"MiSaZi Gallery" <${user}>`,
    to,
    replyTo: data.email,
    subject: data.subject || 'Artwork Inquiry',
    html: `
      <h2 style="font-family:serif;font-weight:300">${data.subject || 'Artwork Inquiry'}</h2>
      ${data.artist ? `<p><strong>Artist:</strong> ${data.artist}</p>` : ''}
      <p><strong>From:</strong> ${data.name} &lt;${data.email}&gt;</p>
      ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
      <hr/>
      <p style="white-space:pre-wrap;font-family:sans-serif">${data.message}</p>
    `,
  })
}
