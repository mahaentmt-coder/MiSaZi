import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Workshops',
  description: 'Art workshops and educational events hosted by MiSaZi Art Gallery.',
}

const UPCOMING = [
  {
    id: 'w1',
    title: 'Mixed Media Techniques with Central Asian Motifs',
    date: 'Spring 2025',
    duration: '3 sessions · 2 hours each',
    location: 'New York · In Person',
    spots: 12,
    description:
      'Explore traditional Central Asian artistic motifs through contemporary mixed media techniques. Led by featured artist Behnoosh Momeni.',
    level: 'All levels',
  },
  {
    id: 'w2',
    title: 'Artist Talk: Navigating Identity in Contemporary Art',
    date: 'April 2025',
    duration: '1 session · 90 min',
    location: 'Virtual · Zoom',
    spots: 50,
    description:
      'A panel conversation with MiSaZi artists discussing how their cultural backgrounds shape their practice and the challenges of being seen in Western art markets.',
    level: 'Open to all',
  },
]

const PAST = [
  {
    id: 'pw1',
    title: 'Nowruz Art Workshop 2024',
    date: 'March 2024',
    location: 'New York',
    description: 'A hands-on workshop celebrating Nowruz through painting and collage.',
  },
  {
    id: 'pw2',
    title: 'Photography & Identity',
    date: 'November 2023',
    location: 'New York',
    description: 'Workshop with Hamidreza Emami exploring documentary photography and personal narrative.',
  },
  {
    id: 'pw3',
    title: 'Digital Art for Emerging Artists',
    date: 'June 2023',
    location: 'Virtual',
    description: 'An introductory digital art workshop with practical exercises in Procreate and Photoshop.',
  },
]

export default function WorkshopsPage() {
  return (
    <div className="mt-[60px]">
      {/* Header */}
      <div className="px-8 md:px-10 pt-16 pb-12 border-b border-gallery-lightgray">
        <p className="label mb-3">Education {'&'} Community</p>
        <h1 className="heading-lg">Workshops {'&'} <em>Events</em></h1>
      </div>

      {/* Upcoming */}
      <section className="px-8 md:px-10 py-20">
        <div className="mb-12 pb-4 border-b border-gallery-lightgray">
          <p className="label mb-2">Coming Soon</p>
          <h2 className="heading-md">Upcoming <em>Workshops</em></h2>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-gallery-lightgray">
          {UPCOMING.map((w) => (
            <div key={w.id} className="bg-white px-8 py-10">
              <div className="flex items-start justify-between gap-4 mb-6">
                <span className="pill-upcoming">{w.date}</span>
                <span className="label">{w.spots} spots</span>
              </div>
              <h3 className="font-serif font-light text-2xl leading-snug mb-3">{w.title}</h3>
              <div className="space-y-2 mb-6">
                <p className="label">{w.duration}</p>
                <p className="label">{w.location}</p>
                <p className="label">Level: {w.level}</p>
              </div>
              <p className="body-text text-sm mb-8">{w.description}</p>
              <Link href="/contact" className="btn-primary">Register Interest</Link>
            </div>
          ))}
        </div>
      </section>

      {/* Past workshops */}
      <section className="px-8 md:px-10 py-20 bg-gallery-offwhite">
        <div className="mb-12 pb-4 border-b border-gallery-lightgray">
          <p className="label mb-2">Archive</p>
          <h2 className="heading-md">Previous <em>Workshops</em></h2>
        </div>

        <div className="divide-y divide-gallery-lightgray">
          {PAST.map((w) => (
            <div
              key={w.id}
              className="py-7 grid md:grid-cols-[180px_1fr] gap-6 items-start"
            >
              <div>
                <p className="label mb-1">{w.date}</p>
                <p className="text-xs text-gallery-gray font-light">{w.location}</p>
              </div>
              <div>
                <h3 className="font-serif font-light text-xl mb-2">{w.title}</h3>
                <p className="text-sm text-gallery-gray font-light leading-loose">{w.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Host a workshop CTA */}
      <section className="px-8 md:px-10 py-20 grid md:grid-cols-2 gap-12 border-t border-gallery-lightgray">
        <div>
          <p className="label mb-4">Collaborate</p>
          <h2 className="heading-md mb-6">Propose a <em>Workshop</em></h2>
          <p className="body-text mb-8">
            Are you an artist or educator interested in leading a workshop through MiSaZi?
            We regularly partner with artists to create meaningful educational experiences
            for our community.
          </p>
          <Link href="/contact" className="btn-primary">Get in Touch</Link>
        </div>
        <div className="bg-gallery-offwhite p-10">
          <p className="label mb-6">What We Look For</p>
          <ul className="space-y-4">
            {[
              'Artists with a clear pedagogical approach',
              'Topics relevant to multicultural art practices',
              'Both in-person (New York) and virtual formats',
              'Workshops for all levels — beginner to professional',
            ].map((item) => (
              <li key={item} className="flex gap-3 text-sm font-light text-gallery-darkgray">
                <span className="text-gallery-orange mt-0.5">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
