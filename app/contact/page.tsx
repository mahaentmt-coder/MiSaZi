'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

const ARTISTS = [
  'Fariba Oni', 'Hamidreza Emami', 'Behnoosh Momeni', 'Mojtaba Asadi',
  'Narges Mirnezhad', 'Hamid Shiri', 'Zahra Jamshidi',
  'Mahsa Sohrabi', 'Donya Ziaei', 'Farshid Barghi', 'Atefeh Etemadi', 'Armita Jafari',
]

function ContactForm() {
  const params = useSearchParams()
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    artist: params.get('artist') || '',
    artwork: params.get('artwork') || '',
    budget: '',
    subject: 'artwork',
    message: '',
  })

  const update = (k: keyof typeof form, v: string) =>
    setForm((f) => ({ ...f, [k]: v }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState('loading')
    try {
      const res = await fetch('/api/inquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setState(res.ok ? 'success' : 'error')
    } catch {
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div className="py-20 text-center">
        <div className="w-10 h-px bg-gallery-orange mx-auto mb-8" />
        <h3 className="heading-md mb-4">Thank you</h3>
        <p className="body-text">We'll be in touch within 2 business days.</p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-7">
      <div>
        <label className="label block mb-2">Inquiry Type</label>
        <div className="flex gap-6 flex-wrap">
          {[
            { value: 'artwork',    label: 'Artwork Inquiry' },
            { value: 'exhibition', label: 'Exhibition'      },
            { value: 'press',      label: 'Press'           },
            { value: 'general',    label: 'General'         },
          ].map(({ value, label }) => (
            <label key={value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio" name="subject" value={value}
                checked={form.subject === value}
                onChange={(e) => update('subject', e.target.value)}
                className="accent-gallery-orange"
              />
              <span className="label">{label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div>
          <label className="label block mb-2">First Name *</label>
          <input className="form-input" type="text" placeholder="First name" required
            value={form.firstName} onChange={(e) => update('firstName', e.target.value)} />
        </div>
        <div>
          <label className="label block mb-2">Last Name *</label>
          <input className="form-input" type="text" placeholder="Last name" required
            value={form.lastName} onChange={(e) => update('lastName', e.target.value)} />
        </div>
      </div>

      <div>
        <label className="label block mb-2">Email Address *</label>
        <input className="form-input" type="email" placeholder="you@example.com" required
          value={form.email} onChange={(e) => update('email', e.target.value)} />
      </div>

      {form.subject === 'artwork' && (
        <>
          <div>
            <label className="label block mb-2">Artist of Interest</label>
            <select className="form-select" value={form.artist}
              onChange={(e) => update('artist', e.target.value)}>
              <option value="">Select an artist…</option>
              {ARTISTS.map((a) => <option key={a} value={a}>{a}</option>)}
              <option value="General">General / Multiple Artists</option>
            </select>
          </div>
          {form.artwork && (
            <div>
              <label className="label block mb-2">Artwork</label>
              <input className="form-input" type="text" readOnly
                value={form.artwork} onChange={(e) => update('artwork', e.target.value)} />
            </div>
          )}
          <div>
            <label className="label block mb-2">Budget Range</label>
            <select className="form-select" value={form.budget}
              onChange={(e) => update('budget', e.target.value)}>
              <option value="">Select a range…</option>
              {['Under $1,000', '$1,000 – $5,000', '$5,000 – $15,000', '$15,000 – $50,000', '$50,000+', 'Prefer not to say'].map(
                (b) => <option key={b} value={b}>{b}</option>
              )}
            </select>
          </div>
        </>
      )}

      <div>
        <label className="label block mb-2">Message</label>
        <textarea className="form-textarea" rows={5}
          placeholder="Tell us more about your inquiry…"
          value={form.message} onChange={(e) => update('message', e.target.value)} />
      </div>

      {state === 'error' && (
        <p className="text-xs text-red-500">
          Something went wrong. Please email us directly:{' '}
          <a href="mailto:info@misaziart.com" className="underline">info@misaziart.com</a>
        </p>
      )}

      <button type="submit" disabled={state === 'loading'}
        className="btn-primary w-full text-center disabled:opacity-50">
        {state === 'loading' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  )
}

export default function ContactPage() {
  return (
    <div className="mt-[60px]">
      <div className="px-8 md:px-10 pt-16 pb-12 border-b border-gallery-lightgray">
        <p className="label mb-3">Get in Touch</p>
        <h1 className="heading-lg">Contact <em>MiSaZi</em></h1>
      </div>

      <div className="px-8 md:px-10 py-20 grid md:grid-cols-2 gap-16 md:gap-24">
        {/* Info */}
        <div>
          <p className="body-text mb-10">
            Our team is happy to assist with artwork inquiries, exhibition information,
            press requests, or any other questions about the gallery.
          </p>
          {[
            ['Gallery',     '250 W. 50th St., New York, NY 10019'],
            ['Email',       'info@misaziart.com'],
            ['Hours',       'Mon – Fri · 10am – 6pm EST'],
            ['Virtual',     'Zoom appointments available'],
          ].map(([label, val]) => (
            <div key={label} className="mb-7">
              <p className="label mb-1">{label}</p>
              <p className="text-sm font-light">{val}</p>
            </div>
          ))}

          <div className="mt-12 pt-8 border-t border-gallery-lightgray">
            <p className="label mb-4">Follow Us</p>
            <div className="flex gap-6">
              {['Instagram', 'Facebook', 'LinkedIn'].map((p) => (
                <a key={p} href="#" className="btn-text-link">{p}</a>
              ))}
            </div>
          </div>
        </div>

        {/* Form */}
        <Suspense fallback={<div className="label">Loading…</div>}>
          <ContactForm />
        </Suspense>
      </div>
    </div>
  )
}
