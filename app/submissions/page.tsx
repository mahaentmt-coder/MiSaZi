'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function SubmissionsPage() {
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({
    name: '', email: '', website: '', instagram: '',
    medium: '', statement: '', location: '',
  })
  const update = (k: keyof typeof form, v: string) =>
    setForm((f) => ({ ...f, [k]: v }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState('loading')
    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setState(res.ok ? 'success' : 'error')
    } catch { setState('error') }
  }

  return (
    <div className="mt-[60px]">
      {/* Header */}
      <div className="grid md:grid-cols-2">
        <div className="bg-gallery-black px-10 md:px-16 py-20 flex flex-col justify-end">
          <p className="label text-white/30 mb-6">Open Call</p>
          <h1 className="heading-lg text-white">
            Submit Your <em>Work</em>
          </h1>
        </div>
        <div className="bg-gallery-offwhite px-10 md:px-16 py-20 flex items-end">
          <div>
            <p className="label mb-4">Who We're Looking For</p>
            <ul className="space-y-4">
              {[
                'Artists from Central Asia and minority communities',
                'Emerging and mid-career practitioners',
                'All media: painting, photography, digital, sculpture, installation',
                'Artists based anywhere in the world',
              ].map((item) => (
                <li key={item} className="flex gap-3 text-sm font-light text-gallery-darkgray">
                  <span className="text-gallery-orange">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Process */}
      <section className="px-8 md:px-10 py-20 border-b border-gallery-lightgray">
        <p className="label mb-10">How It Works</p>
        <div className="grid md:grid-cols-4 gap-px bg-gallery-lightgray">
          {[
            ['01', 'Submit', 'Complete the form below with your artist statement and portfolio links.'],
            ['02', 'Review',  'Our curatorial team reviews submissions on a rolling basis (4–6 weeks).'],
            ['03', 'Meeting', 'Selected artists are invited for a virtual studio visit with the team.'],
            ['04', 'Program', 'We discuss exhibition opportunities, workshops, and how we can support your practice.'],
          ].map(([num, title, desc]) => (
            <div key={num} className="bg-white px-7 py-8">
              <p className="font-serif font-light text-4xl text-gallery-lightgray mb-4">{num}</p>
              <h3 className="font-serif font-light text-xl mb-3">{title}</h3>
              <p className="text-sm text-gallery-gray font-light leading-loose">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Form */}
      <section className="px-8 md:px-10 py-20">
        <div className="max-w-xl">
          <p className="label mb-3">Open Call</p>
          <h2 className="heading-md mb-12">Artist <em>Application</em></h2>

          {state === 'success' ? (
            <div className="py-12">
              <div className="w-10 h-px bg-gallery-orange mb-8" />
              <h3 className="heading-md mb-4">Thank you for applying</h3>
              <p className="body-text">
                We've received your submission and will be in touch within 4–6 weeks.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-7">
              <div>
                <label className="label block mb-2">Full Name *</label>
                <input className="form-input" type="text" placeholder="Your full name" required
                  value={form.name} onChange={(e) => update('name', e.target.value)} />
              </div>
              <div>
                <label className="label block mb-2">Email *</label>
                <input className="form-input" type="email" placeholder="you@example.com" required
                  value={form.email} onChange={(e) => update('email', e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="label block mb-2">Website / Portfolio</label>
                  <input className="form-input" type="url" placeholder="https://…"
                    value={form.website} onChange={(e) => update('website', e.target.value)} />
                </div>
                <div>
                  <label className="label block mb-2">Instagram</label>
                  <input className="form-input" type="text" placeholder="@handle"
                    value={form.instagram} onChange={(e) => update('instagram', e.target.value)} />
                </div>
              </div>
              <div>
                <label className="label block mb-2">Location / Based In</label>
                <input className="form-input" type="text" placeholder="City, Country"
                  value={form.location} onChange={(e) => update('location', e.target.value)} />
              </div>
              <div>
                <label className="label block mb-2">Primary Medium *</label>
                <input className="form-input" type="text" placeholder="e.g. Oil on canvas, Photography, Mixed media" required
                  value={form.medium} onChange={(e) => update('medium', e.target.value)} />
              </div>
              <div>
                <label className="label block mb-2">Artist Statement *</label>
                <textarea className="form-textarea" rows={6} required
                  placeholder="Tell us about your practice, influences, and what drives your work (300–500 words recommended)…"
                  value={form.statement} onChange={(e) => update('statement', e.target.value)} />
              </div>

              {state === 'error' && (
                <p className="text-xs text-red-500">
                  Something went wrong. Please email us: <a href="mailto:info@misaziart.com" className="underline">info@misaziart.com</a>
                </p>
              )}

              <button type="submit" disabled={state === 'loading'}
                className="btn-primary w-full text-center disabled:opacity-50">
                {state === 'loading' ? 'Submitting…' : 'Submit Application'}
              </button>

              <p className="text-xs text-gallery-gray font-light leading-loose">
                By submitting, you agree that MiSaZi Art Gallery may contact you about
                your application. We do not share your information with third parties.
                Submissions are reviewed on a rolling basis.
              </p>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
