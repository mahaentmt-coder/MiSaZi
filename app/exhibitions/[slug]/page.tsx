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
      <section className="grid md:grid-cols-[3fr_2fr] min-h-[70vh]">
        <div className="relative bg-gallery-offwhite min-h-[50vw] md:min-h-0">
          {ex.coverImage ? (
            <Image src={urlFor(ex.coverImage).width(1200).url()} fill alt={ex.title} className="object-cover" priority />
          ) : (
            <div className="absolute inset-0 bg-gallery-lightgray flex items-center justify-center">
              <p className="label">No image</p>
            </div>
          )}
        </div>

        <div className="px-10 md:px-14 py-16 md:py-20 bg-white flex flex-col justify-between">
          <Link href="/exhibitions" className="label hover:text-gallery-black transition-colors">← Exhibitions</Link>
          <div>
            <span className={`${STATUS_CLASS[ex.status] || 'pill-past'} mb-6 inline-block`}>
              {STATUS_LABEL[ex.status] || ex.status}
            </span>
            <h1 className="font-serif font-light text-3xl md:text-4xl leading-snug mb-6">{ex.title}</h1>
            <div className="space-y-4 mb-10">
              {(ex.startDate || ex.endDate) && (
                <div>
                  <p className="label mb-1">Dates</p>
                  <p className="text-sm font-light">{formatDate(ex.startDate)}{ex.endDate && ` – ${formatDate(ex.endDate)}`}</p>
                </div>
              )}
              {ex.location && (
                <div>
                  <p className="label mb-1">Location</p>
                  <p className="text-sm font-light">{ex.location}</p>
                </div>
              )}
            </div>
            <Link href={`/contact?subject=exhibition`} className="btn-primary">
              {ex.status === 'upcoming' ? 'Register Interest' : 'Inquire'}
            </Link>
          </div>
          {ex.artists && ex.artists.length > 0 && (
            <div className="pt-8 border-t border-gallery-lightgray">
              <p className="label mb-3">Artists</p>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {ex.artists.map((a) => (
                  <Link key={a.slug.current} href={`/artists/${a.slug.current}`}
                    className="text-sm font-light hover:text-gallery-orange transition-colors">
                    {a.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {ex.description && (
        <section className="px-8 md:px-10 py-20 max-w-3xl">
          <p className="label mb-6">About the Exhibition</p>
          <p className="body-text text-base leading-loose">{ex.description}</p>
        </section>
      )}

      <div className="px-8 md:px-10 py-12 border-t border-gallery-lightgray flex justify-between items-center">
        <Link href="/exhibitions" className="btn-text-link">← All Exhibitions</Link>
        <Link href="/contact" className="btn-text-link-orange">Inquire About Artwork</Link>
      </div>
    </div>
  )
}
