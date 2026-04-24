'use client'

import { useState } from 'react'

interface Props {
  artists: string[]
}

export default function InquiryForm({ artists }: Props) {
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '',
    artist: '', budget: '', message: '',
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
      <div className="flex flex-col items-start justify-center py-16">
        <div className="w-10 h-px bg-gallery-orange mb-8" />
        <h3 className="heading-md mb-3">Thank you</h3>
        <p className="body-text">
          Your inquiry has been received. We'll be in touch within 2 business days.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-6">
      {/* Name row */}
      <div className="grid grid-cols-2 gap-5">
        <div>
          <label className="label block mb-2">First Name</label>
          <input
            className="form-input"
            type="text"
            placeholder="First name"
            value={form.firstName}
            onChange={(e) => update('firstName', e.target.value)}
            required
          />
        </div>
        <div>
          <label className="label block mb-2">Last Name</label>
          <input
            className="form-input"
            type="text"
            placeholder="Last name"
            value={form.lastName}
            onChange={(e) => update('lastName', e.target.value)}
            required
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="label block mb-2">Email Address</label>
        <input
          className="form-input"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={(e) => update('email', e.target.value)}
          required
        />
      </div>

      {/* Artist */}
      <div>
        <label className="label block mb-2">Artist of Interest</label>
        <select
          className="form-select"
          value={form.artist}
          onChange={(e) => update('artist', e.target.value)}
        >
          <option value="">Select an artist…</option>
          {artists.map((name) => (
            <option key={name} value={name}>{name}</option>
          ))}
          <option value="General / Multiple Artists">General / Multiple Artists</option>
        </select>
      </div>

      {/* Budget */}
      <div>
        <label className="label block mb-2">Budget Range</label>
        <select
          className="form-select"
          value={form.budget}
          onChange={(e) => update('budget', e.target.value)}
        >
          <option value="">Select a range…</option>
          {['Under $1,000', '$1,000 – $5,000', '$5,000 – $15,000', '$15,000 – $50,000', '$50,000+', 'Prefer not to say'].map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label className="label block mb-2">Message</label>
        <textarea
          className="form-textarea"
          rows={4}
          placeholder="Tell us about the work you're looking for, intended space, or specific requirements…"
          value={form.message}
          onChange={(e) => update('message', e.target.value)}
        />
      </div>

      {/* Error */}
      {state === 'error' && (
        <p className="text-xs text-red-500">
          Something went wrong. Please email us directly at info@misaziart.com
        </p>
      )}

      <button
        type="submit"
        disabled={state === 'loading'}
        className="btn-primary w-full text-center disabled:opacity-50"
      >
        {state === 'loading' ? 'Sending…' : 'Send Inquiry'}
      </button>
    </form>
  )
}
