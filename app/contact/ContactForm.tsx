'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { submitInquiry } from './actions'

export default function ContactForm() {
  const params = useSearchParams()
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const subject = params.get('subject') || ''
  const artist = params.get('artist') || ''

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await submitInquiry({ ...form, subject, artist })
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="bg-gallery-offwhite p-10 flex flex-col items-center justify-center text-center min-h-[400px]">
        <p className="text-3xl mb-4">✓</p>
        <h2 className="font-serif font-light text-2xl mb-3">Inquiry Sent</h2>
        <p className="body-text text-gallery-gray">Thank you, {form.name}. We'll be in touch within 2 business days.</p>
      </div>
    )
  }

  return (
    <div className="bg-gallery-offwhite p-8 md:p-10">
      <p className="label mb-3">Artwork Inquiry</p>
      <h2 className="font-serif font-light text-2xl mb-2">
        {subject ? subject : <>Interested in <em>Collecting?</em></>}
      </h2>
      {artist && <p className="text-sm text-gallery-gray font-light mb-6">Artist: {artist}</p>}
      {!artist && <p className="body-text text-gallery-gray mb-6">Tell us what you're looking for and we'll respond within 2 business days.</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label block mb-1">Name *</label>
            <input
              required
              value={form.name}
              onChange={set('name')}
              placeholder="Your full name"
              className="w-full border border-gallery-lightgray px-4 py-3 text-sm font-light focus:outline-none focus:border-gallery-gray bg-white"
            />
          </div>
          <div>
            <label className="label block mb-1">Email *</label>
            <input
              required
              type="email"
              value={form.email}
              onChange={set('email')}
              placeholder="your@email.com"
              className="w-full border border-gallery-lightgray px-4 py-3 text-sm font-light focus:outline-none focus:border-gallery-gray bg-white"
            />
          </div>
        </div>

        <div>
          <label className="label block mb-1">Phone <span className="text-gallery-gray normal-case font-light">(optional)</span></label>
          <input
            type="tel"
            value={form.phone}
            onChange={set('phone')}
            placeholder="+1 (000) 000-0000"
            className="w-full border border-gallery-lightgray px-4 py-3 text-sm font-light focus:outline-none focus:border-gallery-gray bg-white"
          />
        </div>

        <div>
          <label className="label block mb-1">Message *</label>
          <textarea
            required
            rows={5}
            value={form.message}
            onChange={set('message')}
            placeholder="Tell us about your interest in this work, where you'd display it, or any questions you have…"
            className="w-full border border-gallery-lightgray px-4 py-3 text-sm font-light focus:outline-none focus:border-gallery-gray bg-white resize-none"
          />
        </div>

        {status === 'error' && (
          <p className="text-sm text-red-600">Something went wrong. Please email us directly at info@misaziart.com</p>
        )}

        <button
          type="submit"
          disabled={status === 'sending'}
          className="btn-primary w-full disabled:opacity-60"
        >
          {status === 'sending' ? 'Sending…' : 'Send Inquiry'}
        </button>
      </form>
    </div>
  )
}
