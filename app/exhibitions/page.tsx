import Image from 'next/image'
import Link from 'next/link'
import { client, urlFor, EXHIBITIONS_QUERY } from '@/lib/sanity'
import type { Exhibition } from '@/lib/sanity'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Exhibitions',
  description: 'Current, upcoming, and past exhibitions at MiSaZi Art Gallery.',
}

const FALLBACK: Partial<Exhibition>[] = [
  { _id: 'e1', title: 'Diaspora Dialogues', status: 'online',    startDate: '2024-01-01', location: 'Virtual',   slug: { current: 'diaspora-dialogues' }, description: 'Works exploring themes of identity, displacement, and cultural memory.' },
  { _id: 'e2', title: 'Nowruz 2025: New Beginnings, Ancient Roots', status: 'upcoming', startDate: '2025-03-20', endDate: '2025-04-30', location: 'New York', slug: { current: 'nowruz-2025' }, description: 'Celebrating the Persian New Year through a group exhibition of 12 artists.' },
  { _id: 'e3', title: 'Affordable Art Fair New York 2024', status: 'past', startDate: '2024-11-01', endDate: '2024-11-05', location: 'New York', slug: { current: 'aaf-2024' }, description: 'MiSaZi participation at the Affordable Art Fair.' },
  { _id: 'e4', title: 'Nowruz 2024: Breath of Spring', status: 'past', startDate: '2024-03-20', endDate: '2024-04-30', location: 'New York', slug: { current: 'nowruz-2024' }, description: 'A celebration of renewal and cultural heritage.' },
]

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

export default async function ExhibitionsPage() {
  let exhibitions: Exhibition[] = []
  try {
    exhibitions = await client.fetch<Exhibition[]>(EXHIBITIONS_QUERY)
  } catch {
    exhibitions = FALLBACK as Exhibition[]
  }

  const online   = exhibitions.filter((e) => e.status === 'online')
  const upcoming = exhibitions.filter((e) => e.status === 'upcoming')
  const past     = exhibitions.filter((e) => e.status === 'past')

  return (
    <div className="mt-[60px]">
      {/* Header */}
      <div className="px-8 md:px-10 pt-16 pb-12 border-b border-gallery-lightgray">
        <p className="label mb-3">MiSaZi Art Gallery</p>
        <h1 className="heading-lg">Exhibitions {'&'} <em>Events</em></h1>
      </div>

      {/* Online now */}
      {online.length > 0 && (
        <ExhibitionGroup title="Online Now" label="Currently Open" exhibitions={online} accent />
      )}

      {/* Upcoming */}
      {upcoming.length > 0 && (
        <ExhibitionGroup title="Upcoming" label="Coming Soon" exhibitions={upcoming} />
      )}

      {/* Past */}
      {past.length > 0 && (
        <ExhibitionGroup title="Past Exhibitions" label="Archive" exhibitions={past} muted />
      )}
    </div>
  )
}

function ExhibitionGroup({
  title, label, exhibitions, accent, muted
}: {
  title: string; label: string; exhibitions: Exhibition[]
  accent?: boolean; muted?: boolean
}) {
  return (
    <section className={`px-8 md:px-10 py-16 ${muted ? 'bg-gallery-offwhite' : 'bg-white'}`}>
      <div className="mb-10 pb-4 border-b border-gallery-lightgray">
        <p className="label mb-2">{label}</p>
        <h2 className="heading-md">{title}</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-px bg-gallery-lightgray">
        {exhibitions.map((ex) => (
          <Link
            key={ex._id}
            href={`/exhibitions/${ex.slug.current}`}
            className="bg-white group block"
          >
            {/* Cover image */}
            <div className="aspect-[16/9] relative overflow-hidden bg-gallery-offwhite">
              {(() => {
                const img = ex.coverImage
                  ?? (ex.artists as any)?.[0]?.artworks?.[0]?.image
                  ?? (ex.artists as any)?.[0]?.photo
                return img
                  ? <Image src={urlFor(img).width(800).url()} fill alt={ex.title} className="object-cover group-hover:scale-[1.03] transition-transform duration-500" />
                  : <div className="w-full h-full bg-gallery-lightgray flex items-center justify-center"><span className="label">No image</span></div>
              })()}
              <div className="absolute top-4 left-4">
                <span className={
                  ex.status === 'online'   ? 'pill-online'   :
                  ex.status === 'upcoming' ? 'pill-upcoming' : 'pill-past'
                }>
                  {ex.status === 'online' ? 'Online Now' : ex.status === 'upcoming' ? 'Upcoming' : 'Past'}
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="px-6 py-6 border-t border-gallery-lightgray">
              <p className="font-serif font-light text-xl leading-snug mb-2 group-hover:text-gallery-orange transition-colors">
                {ex.title}
              </p>
              <p className="label mb-3">
                {ex.startDate && formatDate(ex.startDate)}
                {ex.endDate && ` – ${formatDate(ex.endDate)}`}
                {ex.location && ` · ${ex.location}`}
              </p>
              {ex.description && (
                <p className="text-sm text-gallery-gray font-light leading-loose line-clamp-2">
                  {ex.description}
                </p>
              )}
              {ex.artists && ex.artists.length > 0 && (
                <p className="label mt-3">{ex.artists.map((a) => a.name).join(' · ')}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
