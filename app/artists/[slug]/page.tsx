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

  const heroArtwork = artist.artworks?.find(a => a.image && !a.sold) ?? artist.artworks?.[0]

  return (
    <div className="mt-[80px]">
      {/* Hero: dominant single artwork */}
      {heroArtwork?.image && (
        <section className="relative w-full bg-gallery-black" style={{ height: '80vh' }}>
          <Image
            src={urlFor(heroArtwork.image).width(2400).url()}
            fill
            alt={heroArtwork.title || artist.name}
            className="object-cover opacity-90"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 px-12 md:px-20 py-12 flex items-end justify-between">
            <div>
              <Link href="/artists" className="text-white/50 text-xs tracking-widest uppercase hover:text-white transition-colors mb-4 inline-block">
                ← All Artists
              </Link>
              <h1 className="font-serif font-light text-5xl md:text-7xl text-white leading-none mb-2">{artist.name}</h1>
              <p className="text-white/60 text-xs tracking-widest uppercase">{artist.medium}</p>
            </div>
            <Link
              href={`/contact?artist=${encodeURIComponent(artist.name)}`}
              className="hidden md:inline-block border border-white/40 text-white text-xs tracking-widest uppercase px-6 py-3 hover:bg-white hover:text-gallery-black transition-colors"
            >
              Inquire
            </Link>
          </div>
        </section>
      )}

      {/* Bio */}
      <section className="grid md:grid-cols-[1fr_2fr] border-b border-gallery-lightgray">
        <div className="relative bg-gallery-offwhite min-h-[320px] md:min-h-0">
          {artist.photo ? (
            <Image src={urlFor(artist.photo).width(600).url()} fill alt={artist.name} className="object-cover" />
          ) : !heroArtwork?.image ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-serif text-8xl font-light italic text-gallery-lightgray">
                {artist.name.split(' ').map((n: string) => n[0]).join('')}
              </span>
            </div>
          ) : null}
        </div>
        <div className="px-12 md:px-20 py-16 md:py-24 flex flex-col justify-center">
          {!heroArtwork?.image && (
            <Link href="/artists" className="label hover:text-gallery-black transition-colors mb-10 inline-block">← All Artists</Link>
          )}
          <div className="flex gap-3 mb-8">
            {artist.featured && <span className="pill-online">Featured Artist</span>}
            {artist.emerging && <span className="pill-upcoming">Emerging Artist</span>}
          </div>
          {!heroArtwork?.image && <h1 className="heading-lg mb-2">{artist.name}</h1>}
          {!heroArtwork?.image && <p className="label mb-8">{artist.medium}</p>}
          {artist.bio && (
            <p className="body-text max-w-lg leading-loose mb-10">{artist.bio}</p>
          )}
          <div className="flex flex-wrap gap-6 items-center">
            <Link href={`/contact?artist=${encodeURIComponent(artist.name)}`} className="btn-primary">
              Inquire About Artwork
            </Link>
            {artist.website && (
              <a href={artist.website} target="_blank" rel="noopener" className="btn-text-link">Website</a>
            )}
            {artist.instagram && (
              <a href={`https://instagram.com/${artist.instagram}`} target="_blank" rel="noopener" className="btn-text-link">Instagram</a>
            )}
          </div>
        </div>
      </section>

      {/* Artworks */}
      {artist.artworks && artist.artworks.length > 0 && (
        <section className="px-8 md:px-10 py-28">
          <div className="mb-16 pb-4 border-b border-gallery-lightgray flex items-baseline justify-between">
            <div>
              <p className="label mb-2">Portfolio</p>
              <h2 className="heading-md">Works by <em>{artist.name}</em></h2>
            </div>
            <p className="label text-gallery-gray">{artist.artworks.length} work{artist.artworks.length !== 1 ? 's' : ''}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-gallery-lightgray">
            {artist.artworks.map((artwork) => (
              <div key={artwork._id} className="bg-white group">
                <div className="aspect-[4/5] relative overflow-hidden bg-gallery-offwhite">
                  {artwork.image ? (
                    <Image
                      src={urlFor(artwork.image).width(600).url()}
                      fill
                      alt={artwork.title}
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="label">No image</span>
                    </div>
                  )}
                  {artwork.sold && (
                    <div className="absolute top-4 left-4 bg-gallery-black text-white text-2xs tracking-wider uppercase px-2.5 py-1">Sold</div>
                  )}
                </div>
                <div className="px-5 py-6 border-t border-gallery-lightgray">
                  <p className="font-serif font-light text-base mb-1">{artwork.title}</p>
                  <p className="label mb-4">{[artwork.year, artwork.medium, artwork.dimensions].filter(Boolean).join(' · ')}</p>
                  {!artwork.sold && (
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-light">{artwork.price ? `$${artwork.price.toLocaleString()}` : 'Price on request'}</p>
                      <Link
                        href={`/contact?artist=${encodeURIComponent(artist.name)}&artwork=${encodeURIComponent(artwork.title)}`}
                        className="text-2xs tracking-widest uppercase text-gallery-orange hover:underline"
                      >
                        Inquire →
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
