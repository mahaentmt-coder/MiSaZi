import Image from 'next/image'
import Link from 'next/link'
import { client, urlFor, ARTISTS_QUERY } from '@/lib/sanity'
import type { Artist } from '@/lib/sanity'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Artists',
  description: 'Meet the featured and emerging artists represented by MiSaZi Art Gallery.',
}

const FALLBACK: Partial<Artist>[] = [
  { _id: '1', name: 'Fariba Oni',       medium: 'Painting · Mixed Media', featured: true,  slug: { current: 'fariba-oni' } },
  { _id: '2', name: 'Hamidreza Emami',  medium: 'Photography',            featured: true,  slug: { current: 'hamidreza-emami' } },
  { _id: '3', name: 'Behnoosh Momeni',  medium: 'Digital · Installation', featured: true,  slug: { current: 'behnoosh-momeni' } },
  { _id: '4', name: 'Mojtaba Asadi',    medium: 'Sculpture',              featured: true,  slug: { current: 'mojtaba-asadi' } },
  { _id: '5', name: 'Narges Mirnezhad', medium: 'Painting · Textile',     featured: true,  slug: { current: 'narges-mirnezhad' } },
  { _id: '6', name: 'Hamid Shiri',      medium: 'Drawing · Print',        featured: true,  slug: { current: 'hamid-shiri' } },
  { _id: '7', name: 'Zahra Jamshidi',   medium: 'Mixed Media',            featured: true,  slug: { current: 'zahra-jamshidi' } },
  { _id: '8', name: 'Mahsa Sohrabi',    medium: 'Painting',               emerging: true,  slug: { current: 'mahsa-sohrabi' } },
  { _id: '9', name: 'Donya Ziaei',      medium: 'Digital Art',            emerging: true,  slug: { current: 'donya-ziaei' } },
  { _id: '10', name: 'Farshid Barghi',  medium: 'Mixed Media',            emerging: true,  slug: { current: 'farshid-barghi' } },
  { _id: '11', name: 'Atefeh Etemadi',  medium: 'Photography',            emerging: true,  slug: { current: 'atefeh-etemadi' } },
  { _id: '12', name: 'Armita Jafari',   medium: 'Installation',           emerging: true,  slug: { current: 'armita-jafari' } },
]

export default async function ArtistsPage() {
  let artists: Artist[] = []
  try {
    artists = await client.fetch<Artist[]>(ARTISTS_QUERY)
  } catch {
    artists = FALLBACK as Artist[]
  }

  const featured = artists.filter((a) => a.featured)
  const emerging = artists.filter((a) => a.emerging)

  return (
    <div className="mt-[60px]">
      {/* Page header */}
      <div className="px-8 md:px-10 pt-16 pb-12 border-b border-gallery-lightgray">
        <p className="label mb-3">MiSaZi Art Gallery</p>
        <h1 className="heading-lg">Our <em>Artists</em></h1>
      </div>

      {/* Featured */}
      <section className="px-8 md:px-10 py-16">
        <div className="flex items-baseline justify-between mb-10 pb-4 border-b border-gallery-lightgray">
          <h2 className="heading-md">Featured <em>Artists</em></h2>
          <span className="label">{featured.length} artists</span>
        </div>
        <ArtistGrid artists={featured} cols={4} />
      </section>

      {/* Emerging */}
      {emerging.length > 0 && (
        <section className="px-8 md:px-10 py-16 bg-gallery-offwhite" id="emerging">
          <div className="flex items-baseline justify-between mb-10 pb-4 border-b border-gallery-lightgray">
            <div>
              <p className="label mb-2">New Voices</p>
              <h2 className="heading-md">Emerging <em>Artists</em></h2>
            </div>
            <span className="label">{emerging.length} artists</span>
          </div>
          <ArtistGrid artists={emerging} cols={5} />
        </section>
      )}
    </div>
  )
}

function ArtistGrid({ artists, cols }: { artists: Artist[]; cols: 4 | 5 }) {
  const gridClass = cols === 5
    ? 'grid grid-cols-2 md:grid-cols-5 gap-px bg-gallery-lightgray'
    : 'grid grid-cols-2 md:grid-cols-4 gap-px bg-gallery-lightgray'

  return (
    <div className={gridClass}>
      {artists.map((artist) => (
        <Link
          key={artist._id}
          href={`/artists/${artist.slug.current}`}
          className="bg-white group block"
        >
          <div className="aspect-[3/4] relative overflow-hidden bg-gallery-offwhite">
            {artist.photo ? (
              <Image
                src={urlFor(artist.photo).width(400).url()}
                fill
                alt={artist.name}
                className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="font-serif text-5xl font-light italic text-gallery-lightgray">
                  {artist.name.split(' ').map((n) => n[0]).join('')}
                </span>
              </div>
            )}
          </div>
          <div className="px-5 py-4">
            <p className="font-serif font-light text-base mb-0.5 group-hover:text-gallery-orange transition-colors">
              {artist.name}
            </p>
            <p className="label">{artist.medium}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
