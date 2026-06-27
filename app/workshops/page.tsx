import Image from 'next/image'
import Link from 'next/link'
import { client, urlFor, WORKSHOPS_QUERY } from '@/lib/sanity'
import type { Workshop } from '@/lib/sanity'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Workshops',
  description: 'Art workshops and educational events hosted by MiSaZi Art Gallery.',
}

export default async function WorkshopsPage() {
  let workshops: Workshop[] = []
  try {
    workshops = await client.fetch<Workshop[]>(WORKSHOPS_QUERY)
  } catch {
    workshops = []
  }

  const upcoming = workshops.filter((w) => w.status === 'upcoming')
  const past = workshops.filter((w) => w.status === 'past')

  return (
    <div className="mt-[60px]">
      {/* Header */}
      <div className="px-8 md:px-10 pt-16 pb-12 border-b border-gallery-lightgray">
        <p className="label mb-3">Education {'&'} Community</p>
        <h1 className="heading-lg">Workshops {'&'} <em>Events</em></h1>
      </div>

      {/* Upcoming */}
      {upcoming.length > 0 && (
        <section className="px-8 md:px-10 py-20">
          <div className="mb-12 pb-4 border-b border-gallery-lightgray">
            <p className="label mb-2">Coming Soon</p>
            <h2 className="heading-md">Upcoming <em>Workshops</em></h2>
          </div>
          <div className="grid md:grid-cols-2 gap-px bg-gallery-lightgray">
            {upcoming.map((w) => (
              <WorkshopCard key={w._id} workshop={w} />
            ))}
          </div>
        </section>
      )}

      {/* Past workshops */}
      {past.length > 0 && (
        <section className="px-8 md:px-10 py-20 bg-gallery-offwhite">
          <div className="mb-12 pb-4 border-b border-gallery-lightgray">
            <p className="label mb-2">Archive</p>
            <h2 className="heading-md">Previous <em>Workshops</em></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-gallery-lightgray">
            {past.map((w) => (
              <WorkshopCard key={w._id} workshop={w} />
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="px-8 md:px-10 py-20 grid md:grid-cols-2 gap-12 border-t border-gallery-lightgray">
        <div>
          <p className="label mb-4">Collaborate</p>
          <h2 className="heading-md mb-6">Propose a <em>Workshop</em></h2>
          <p className="body-text mb-8">
            Are you an artist or educator interested in leading a workshop through MiSaZi?
            We regularly partner with artists to create meaningful educational experiences for our community.
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

function WorkshopCard({ workshop: w }: { workshop: Workshop }) {
  return (
    <div className="bg-white group">
      {/* Cover image */}
      <div className="aspect-[16/9] relative overflow-hidden bg-gallery-offwhite">
        {w.coverImage ? (
          <Image
            src={urlFor(w.coverImage).width(700).url()}
            fill
            alt={w.title}
            className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gallery-lightgray flex items-center justify-center">
            <span className="label">Workshop</span>
          </div>
        )}
        <div className="absolute top-4 left-4">
          <span className={w.status === 'upcoming' ? 'pill-upcoming' : 'pill-past'}>
            {w.status === 'upcoming' ? 'Upcoming' : 'Past'}
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="px-6 py-6 border-t border-gallery-lightgray">
        <p className="font-serif font-light text-xl leading-snug mb-2">{w.title}</p>
        <p className="label mb-3">Led by {w.instructor}</p>
        {w.topics && w.topics.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {w.topics.slice(0, 4).map((t) => (
              <span key={t} className="text-2xs tracking-wider uppercase px-2 py-0.5 border border-gallery-lightgray text-gallery-gray">
                {t}
              </span>
            ))}
          </div>
        )}
        {w.description && (
          <p className="text-sm text-gallery-gray font-light leading-loose line-clamp-3">
            {w.description.split('\n')[0]}
          </p>
        )}
        {w.status === 'upcoming' && (
          <Link href="/contact" className="btn-primary mt-6 inline-block">
            Register Interest
          </Link>
        )}
      </div>
    </div>
  )
}
