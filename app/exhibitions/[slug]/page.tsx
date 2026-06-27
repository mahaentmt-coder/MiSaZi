import Image from 'next/image'
import Link from 'next/link'
import { client, urlFor, EXHIBITION_QUERY } from '@/lib/sanity'
import type { Exhibition } from '@/lib/sanity'
import type { Metadata } from 'next'

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const ex = await client.fetch<Exhibition>(EXHIBITION_QUERY, { slug: params.slug })
    return { title: ex?.title || 'Exhibition', description: ex?.description?.slice(0, 155) }
  } catch {
    return { title: 'Exhibition' }
  }
}

function formatDate(d?: string) {
  if (!d) return ''
  return new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

const STATUS_LABEL: Record<string, string> = { online: 'Online Now', upcoming: 'Upcoming', past: 'Past Exhibition' }
const STATUS_CLASS: Record<string, string> = { online: 'pill-online', upcoming: 'pill-upcoming', past: 'pill-past' }

export default async function ExhibitionPage({ params }: Props) {
  let ex: Exhibition | null = null
  try {
    ex = await client.fetch<Exhibition>(EXHIBITION_QUERY, { slug: params.slug })
  } catch { ex = null }

  if (!ex) {
    return (
      <div className="mt-[60px] flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h1 className="heading-md">Exhibition not found</h1>
        <Link href="/exhibitions" className="btn-text-link">Back to Exhibitions</Link>
      </div>
    )
  }

  return (
    <div className="mt-[60px]">
      {/* Hero */}
      <section className="relative w-full bg-gallery-offwhite" style={{ minHeight: '60vh' }}>
        {ex.coverImage ? (
          <Image
            src={urlFor(ex.coverImage).width(1600).url()}
            fill
            alt={ex.title}
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gallery-lightgray" />
        )}
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-end px-8 md:px-16 pb-14">
          <span className={`${STATUS_CLASS[ex.status] || 'pill-past'} mb-4 inline-block w-fit`}>
            {STATUS_LABEL[ex.status] || ex.status}
          </span>
          <h1 className="font-serif font-light text-4xl md:text-6xl text-white leading-tight mb-4">
            {ex.title}
          </h1>
          <div className="flex flex-wrap gap-6 text-white/80 text-sm font-light">
            {(ex.startDate || ex.endDate) && (
              <span>{formatDate(ex.startDate)}{ex.endDate && ` – ${formatDate(ex.endDate)}`}</span>
            )}
            {ex.location && <span>{ex.location}</span>}
          </div>
        </div>
      </section>

      {/* Exhibition description */}
      {ex.description && (
        <section className="px-8 md:px-16 py-16 max-w-4xl">
          <p className="label mb-4">About the Exhibition</p>
          <p className="body-text text-base leading-loose whitespace-pre-line">{ex.description}</p>
        </section>
      )}

      {/* Artists — each with their artwork + bio */}
      {ex.artists && ex.artists.length > 0 && (
        <section className="border-t border-gallery-lightgray">
          <div className="px-8 md:px-16 py-12">
            <p className="label mb-2">Participating Artists</p>
            <h2 className="font-serif font-light text-3xl">The Artists</h2>
          </div>

          {ex.artists.map((artist, i) => {
            const firstArtwork = artist.artworks?.[0]
            const isEven = i % 2 === 0
            return (
              <div
                key={artist.slug.current}
                className={`grid md:grid-cols-2 border-t border-gallery-lightgray ${isEven ? '' : 'md:flex-row-reverse'}`}
              >
                {/* Artwork image */}
                <div className={`relative bg-gallery-offwhite aspect-[4/3] ${!isEven ? 'md:order-2' : ''}`}>
                  {firstArtwork?.image ? (
                    <Image
                      src={urlFor(firstArtwork.image).width(900).url()}
                      fill
                      alt={firstArtwork.title || artist.name}
                      className="object-cover"
                    />
                  ) : artist.photo ? (
                    <Image
                      src={urlFor(artist.photo).width(900).url()}
                      fill
                      alt={artist.name}
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gallery-lightgray">
                      <span className="label text-gallery-gray">{artist.name}</span>
                    </div>
                  )}
                  {firstArtwork?.title && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 px-4 py-2">
                      <p className="text-white text-xs font-light">
                        {firstArtwork.title}
                        {firstArtwork.year && `, ${firstArtwork.year}`}
                        {firstArtwork.medium && ` · ${firstArtwork.medium}`}
                        {firstArtwork.dimensions && ` · ${firstArtwork.dimensions}`}
                      </p>
                    </div>
                  )}
                </div>

                {/* Artist bio */}
                <div className={`px-10 md:px-14 py-14 flex flex-col justify-center bg-white ${!isEven ? 'md:order-1' : ''}`}>
                  <p className="label mb-3">{artist.medium || 'Artist'}</p>
                  <h3 className="font-serif font-light text-2xl md:text-3xl mb-6">
                    <Link href={`/artists/${artist.slug.current}`} className="hover:text-gallery-orange transition-colors">
                      {artist.name}
                    </Link>
                  </h3>
                  {artist.bio ? (
                    <p className="text-sm font-light text-gallery-darkgray leading-loose line-clamp-6">
                      {artist.bio}
                    </p>
                  ) : (
                    <p className="text-sm font-light text-gallery-gray italic">No biography available.</p>
                  )}
                  <Link
                    href={`/artists/${artist.slug.current}`}
                    className="mt-8 btn-text-link self-start"
                  >
                    View Artist Profile →
                  </Link>
                </div>
              </div>
            )
          })}

          {/* Additional artworks grid if artists have more */}
          {ex.artists.some(a => a.artworks && a.artworks.length > 1) && (
            <div className="border-t border-gallery-lightgray px-8 md:px-16 py-16">
              <p className="label mb-2">Exhibition Artworks</p>
              <h2 className="font-serif font-light text-3xl mb-10">Selected Works</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-gallery-lightgray">
                {ex.artists.flatMap(a =>
                  (a.artworks || []).map(aw => ({ ...aw, artistName: a.name, artistSlug: a.slug.current }))
                ).map((aw, idx) => (
                  <Link key={`${aw._id}-${idx}`} href={`/artists/${aw.artistSlug}`} className="group bg-white">
                    <div className="aspect-square relative overflow-hidden bg-gallery-offwhite">
                      {aw.image ? (
                        <Image
                          src={urlFor(aw.image).width(500).url()}
                          fill
                          alt={aw.title || aw.artistName}
                          className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gallery-lightgray" />
                      )}
                    </div>
                    <div className="px-4 py-3 border-t border-gallery-lightgray">
                      <p className="text-xs font-light text-gallery-gray">{aw.artistName}</p>
                      {aw.title && <p className="text-sm font-light leading-snug mt-0.5 line-clamp-1">{aw.title}</p>}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* CTA */}
      <div className="px-8 md:px-16 py-12 border-t border-gallery-lightgray flex flex-wrap gap-6 items-center justify-between">
        <Link href="/exhibitions" className="btn-text-link">← All Exhibitions</Link>
        <Link href="/contact" className="btn-primary">Inquire About Artwork</Link>
      </div>
    </div>
  )
}
