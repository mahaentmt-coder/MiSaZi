import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with MiSaZi Art Gallery.',
}

export default function ContactPage() {
  return (
    <div className="mt-[60px]">
      <div className="px-8 md:px-10 pt-16 pb-12 border-b border-gallery-lightgray">
        <p className="label mb-3">Get in Touch</p>
        <h1 className="heading-lg">Contact <em>MiSaZi</em></h1>
      </div>
      <div className="px-8 md:px-10 py-20 grid md:grid-cols-2 gap-16">
        <div>
          <p className="body-text mb-10">
            Our team is happy to assist with artwork inquiries, exhibition information, press requests, or any other questions about the gallery.
          </p>
          {[
            ['Gallery',   '250 W. 50th St., New York, NY 10019'],
            ['Email',     'info@misaziart.com'],
            ['Hours',     'Mon – Fri · 10am – 6pm EST'],
            ['Virtual',   'Zoom appointments available'],
          ].map(([label, val]) => (
            <div key={label} className="mb-7">
              <p className="label mb-1">{label}</p>
              <p className="text-sm font-light">{val}</p>
            </div>
          ))}
          <div className="mt-12 pt-8 border-t border-gallery-lightgray">
            <p className="label mb-4">Follow Us</p>
            <div className="flex gap-6">
              {[
                ['Instagram', 'https://instagram.com'],
                ['Facebook',  'https://facebook.com'],
                ['LinkedIn',  'https://linkedin.com'],
              ].map(([p, href]) => (
                <a key={p} href={href} target="_blank" rel="noopener noreferrer" className="btn-text-link">{p}</a>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-gallery-offwhite p-10 flex flex-col justify-center">
          <p className="label mb-4">Artwork Inquiries</p>
          <h2 className="heading-md mb-6">Interested in <em>Collecting?</em></h2>
          <p className="body-text mb-6">
            To inquire about available works, please email us directly and our team will respond within 2 business days.
          </p>
          <a href="mailto:info@misaziart.com" className="btn-primary inline-block text-center">
            Email Us
          </a>
        </div>
      </div>
    </div>
  )
}
