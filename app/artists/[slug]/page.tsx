import Image from 'next/image'
import Link from 'next/link'
import { client, urlFor, ARTIST_QUERY } from '@/lib/sanity'
import type { Artist } from '@/lib/sanity'
import type { Metadata } from 'next'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const artist = await client.fetch<Artist>(ARTIST_QUERY, { slug: params.slug })
    if (!artist) return { title: 'Artist Not Found' }
    return {
      title: artist.name,
      description: artist.bio?.slice(0, 155),
    }
  } catch {
    return { title: 'Artist' }
  }
}

export default async function ArtistPage({ params }: Props) {
  let artist: Artist | null = null
  try {
    artist = await client.fetch<Artist>(ARTIST_QUERY, { slug: params.slug })
  } catch {
    // dev fallback
    artist = null
  }

  if (!artist) {
    return (
      <div className="mt-[60px] flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h1 className="heading-md">Artist not found</h1>
        <Link href="/artists" className="btn-text-link">Back to Artists</Link>
      </div>
    )
  }

  return (
    <div className="mt-[60px]">
      {/* Hero: split layout */}
      <section className="grid md:grid-cols-2 min-h-[80vh]">
        {/* Photo */}
        <div className="relative bg-gallery-offwhite min-h-[50vw] md:min-h-0">
          {artist.photo ? (
            <Image
              src={urlFor(artist.photo).width(800).url()}
              fill
              alt={artist.name}
              className="object-cover"
              priority
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-serif text-8xl font-light italic text-gallery-lightgray">
                {artist.name.split(' ').map((n: string) => n[0]).join('')}
              </span>
            </div>
          )}
        </div>

        {/* Bio */}
        <div className="px-10 md:px-16 py-16 md:py-24 flex flex-col justify-between">
          <div>
            <Link href="/artists" className="label hover:text-gallery-black transition-colors mb-8 inline-block">
              ← All Artists
            </Link>
          </div>
          <div>
            {artist.featured && (
              <span className="pill-online mb-6 inline-block">Featured Artist</span>
            )}
            {artist.emerging && (
              <span className="pill-upcoming mb-6 inline-block">Emerging Artist</span>
            )}
            <h1 className="heading-lg mb-2">{artist.name}</h1>
            <p className="label mb-8">{artist.medium}</p>
            {artist.bio && (
              <p className="body-text max-w-md leading-loose mb-10">{artist.bio}</p>
            )}
            <Link
              href={`/contact?artist=${encodeURIComponent(artist.name)}`}
              className="btn-primary"
            >
              Inquire About Artwork
            </Link>
          </div>
          <div className="pt-8 mt-8 border-t border-gallery-lightgray flex gap-6">
            {artist.website && (
              <a href={artist.website} target="_blank" rel="noopener" className="btn-text-link">
                Website
              </a>
            )}
            {artist.instagram && (
              <a
                href={`https://instagram.com/${artist.instagram}`}
                target="_blank" rel="noopener"
                className="btn-text-link"
              >
                Instagram
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Artworks */}
      {artist.artworks && artist.artworks.length > 0 && (
        <section className="px-8 md:px-10 py-20 bg-gallery-offwhite">
          <div className="mb-12 pb-4 border-b border-gallery-lightgray">
            <p className="label mb-2">Portfolio</p>
            <h2 className="heading-md">Works by <em>{artist.name}</em></h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-gallery-lightgray">
            {artist.artworks.map((artwork) => (
              <div key={artwork._id} className="bg-white group">
                <div className="aspect-square relative overflow-hidden bg-gallery-offwhite">
                  {artwork.image ? (
                    <Image
                      src={urlFor(artwork.image).width(600).url()}
                      fill
                      alt={artwork.title}
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="label">No image</span>
                    </div>
                  )}
                  {artwork.sold && (
                    <div className="absolute top-4 left-4 bg-gallery-black text-white text-2xs tracking-wider uppercase px-2.5 py-1">
                      Sold
                    </div>
                  )}
                </div>
                <div className="px-5 py-5 border-t border-gallery-lightgray">
                  <p className="font-serif font-light text-base mb-1">{artwork.title}</p>
                  <p className="label mb-3">
                    {[artwork.year, artwork.medium, artwork.dimensions].filter(Boolean).join(' · ')}
                  </p>
                  {!artwork.sold && (
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-light">
                        {artwork.price
                          ? `$${artwork.price.toLocaleString()}`
                          : 'Price on request'}
                      </p>
                      <Link
                        href={`/contact?artist=${encodeURIComponent(artist.name)}&artwork=${encodeURIComponent(artwork.title)}`}
                        className="btn-text-link text-gallery-orange border-gallery-orange hover:text-gallery-black hover:border-gallery-black"
                      >
                        Inquire
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
