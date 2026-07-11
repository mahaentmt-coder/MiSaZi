import Image from 'next/image'
import Link from 'next/link'
import { client, urlFor, ARTISTS_QUERY, EXHIBITIONS_QUERY } from '@/lib/sanity'
import type { Artist, Exhibition } from '@/lib/sanity'

const FALLBACK_ARTISTS: Partial<Artist>[] = [
  { _id: '1', name: 'Fariba Oni',        medium: 'Painting · Mixed Media',  featured: true,  slug: { current: 'fariba-oni' } },
  { _id: '2', name: 'Hamidreza Emami',   medium: 'Photography',             featured: true,  slug: { current: 'hamidreza-emami' } },
  { _id: '3', name: 'Behnoosh Momeni',   medium: 'Digital · Installation',  featured: true,  slug: { current: 'behnoosh-momeni' } },
  { _id: '4', name: 'Mojtaba Asadi',     medium: 'Sculpture',               featured: true,  slug: { current: 'mojtaba-asadi' } },
  { _id: '5', name: 'Narges Mirnezhad',  medium: 'Painting · Textile',      featured: true,  slug: { current: 'narges-mirnezhad' } },
  { _id: '6', name: 'Hamid Shiri',       medium: 'Drawing · Print',         featured: true,  slug: { current: 'hamid-shiri' } },
  { _id: '7', name: 'Mahsa Sohrabi',     medium: 'Painting',                emerging: true,  slug: { current: 'mahsa-sohrabi' } },
  { _id: '8', name: 'Farshid Barghi',    medium: 'Mixed Media',             emerging: true,  slug: { current: 'farshid-barghi' } },
]

const FALLBACK_EXHIBITIONS: Partial<Exhibition>[] = [
  { _id: 'e1', title: 'Diaspora Dialogues: Contemporary Voices from Central Asia', status: 'online', startDate: '2024-01-01', location: 'Virtual', description: 'A curated online exhibition featuring works exploring themes of identity, displacement, and cultural memory.', slug: { current: 'diaspora-dialogues' }, artists: [] },
  { _id: 'e2', title: 'Nowruz 2025: New Beginnings, Ancient Roots', status: 'upcoming', startDate: '2025-03-20', endDate: '2025-04-30', location: 'New York · In Person', description: 'Celebrating the Persian New Year through a group exhibition of 12 artists.', slug: { current: 'nowruz-2025' }, artists: [] },
  { _id: 'e3', title: 'Affordable Art Fair New York 2024', status: 'past', startDate: '2024-11-01', endDate: '2024-11-05', location: 'New York', description: "MiSaZi's participation at the New York Affordable Art Fair.", slug: { current: 'aaf-2024' }, artists: [] },
  { _id: 'e4', title: 'Nowruz 2024: Breath of Spring', status: 'past', startDate: '2024-03-20', endDate: '2024-04-30', location: 'New York', description: 'A celebration of renewal and cultural heritage.', slug: { current: 'nowruz-2024' }, artists: [] },
]

async function getData() {
  try {
    const [artists, exhibitions] = await Promise.all([
      client.fetch<Artist[]>(ARTISTS_QUERY),
      client.fetch<Exhibition[]>(EXHIBITIONS_QUERY),
    ])
    return { artists, exhibitions }
  } catch {
    return { artists: FALLBACK_ARTISTS as Artist[], exhibitions: FALLBACK_EXHIBITIONS as Exhibition[] }
  }
}

export default async function HomePage() {
  const { artists, exhibitions } = await getData()
  const featured = artists.filter((a) => a.featured).slice(0, 8)
  const ticker = [...artists, ...artists]

  return (
    <>
      <HeroSection />

      {/* Ticker */}
      <div className="border-y border-gallery-lightgray py-3.5 overflow-hidden bg-white">
        <div className="flex whitespace-nowrap animate-marquee">
          {ticker.map((artist, i) => (
            <span key={i} className="inline-flex items-center gap-8 mr-8">
              <Link href={`/artists/${artist.slug?.current}`} className="label hover:text-gallery-orange transition-colors">
                {artist.name}
              </Link>
              <span className="text-gallery-lightgray text-xs">—</span>
            </span>
          ))}
        </div>
      </div>

      <ExhibitionsSection exhibitions={exhibitions} />
      <ArtistsSection artists={featured} />
      <AboutSection />
    </>
  )
}

function HeroSection() {
  return (
    <section className="mt-[60px] grid md:grid-cols-2 min-h-[calc(100vh-60px)]">
      <div className="relative bg-[#E8E2D8] min-h-[50vw] md:min-h-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#D4C9B5] via-[#C8B89A] to-[#A89070] flex items-center justify-center">
          <p className="label text-black/20">Featured Artwork</p>
        </div>
        <div className="absolute bottom-6 left-6">
          <p className="label text-black/40 mb-1">Currently Showing</p>
          <p className="font-serif text-sm text-black/60 italic">Diaspora Dialogues</p>
        </div>
      </div>
      <div className="flex flex-col justify-between px-10 md:px-16 py-16 md:py-20 bg-white">
        <span className="label"><span className="text-gallery-orange">●&nbsp;</span>Online Exhibition Now Open</span>
        <div>
          <p className="label mb-8">New York · Toronto · International</p>
          <h1 className="heading-xl mb-8">A Place to<br /><em>Rise, Grow,</em><br />{'&'} Empower</h1>
          <p className="body-text max-w-sm mb-10 leading-loose">
            Championing contemporary artists from Central Asia and minority communities worldwide — through exhibitions, workshops, and meaningful cultural dialogue.
          </p>
          <div className="flex gap-6 items-center flex-wrap">
            <Link href="/exhibitions" className="btn-primary">View Exhibitions</Link>
            <Link href="/artists" className="btn-text-link">Meet the Artists</Link>
          </div>
        </div>
        <div className="flex gap-10 pt-8 border-t border-gallery-lightgray">
          {[['12+', 'Represented Artists'], ['2021', 'Founded'], ['3', 'Countries']].map(([n, l]) => (
            <div key={l}>
              <p className="font-serif font-light text-4xl">{n}</p>
              <p className="label mt-1">{l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ExhibitionsSection({ exhibitions }: { exhibitions: Exhibition[] }) {
  const statusLabel: Record<string, string> = { online: 'Online Now', upcoming: 'Upcoming', past: 'Past' }
  const statusClass: Record<string, string> = { online: 'pill-online', upcoming: 'pill-upcoming', past: 'pill-past' }

  return (
    <section className="px-8 md:px-10 py-20" id="exhibitions">
      <div className="flex items-baseline justify-between mb-12 pb-4 border-b border-gallery-lightgray">
        <div>
          <p className="label mb-2">What's On</p>
          <h2 className="heading-md">Exhibitions {'&'} <em>Events</em></h2>
        </div>
        <Link href="/exhibitions" className="btn-text-link hidden sm:block">View All</Link>
      </div>
      <div className="divide-y divide-gallery-lightgray">
        {exhibitions.slice(0, 4).map((ex) => (
          <div key={ex._id} className="grid grid-cols-[100px_1fr] md:grid-cols-[160px_1fr_180px_120px] gap-4 md:gap-6 items-center py-6">
            <div className="aspect-[4/3] bg-gallery-offwhite overflow-hidden">
              {(() => {
                const img = ex.coverImage
                  ?? ex.artists?.[0]?.artworks?.[0]?.image
                  ?? ex.artists?.[0]?.photo
                return img
                  ? <Image src={urlFor(img).width(200).url()} width={200} height={150} alt={ex.title} className="w-full h-full object-cover" />
                  : <div className="w-full h-full bg-gallery-lightgray" />
              })()}
            </div>
            <div>
              <p className="font-serif font-light text-lg leading-snug mb-1.5">{ex.title}</p>
              {ex.artists && ex.artists.length > 0 && (
                <p className="text-xs text-gallery-gray font-light">{ex.artists.map((a) => a.name).join(' · ')}</p>
              )}
            </div>
            <p className="hidden md:block text-xs text-gallery-gray font-light">
              {ex.startDate ? new Date(ex.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
              {ex.location && <><br />{ex.location}</>}
            </p>
            <div className="hidden md:block">
              <span className={statusClass[ex.status] || 'pill-past'}>{statusLabel[ex.status] || ex.status}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function ArtistsSection({ artists }: { artists: Artist[] }) {
  return (
    <section className="bg-gallery-offwhite px-8 md:px-10 py-20" id="artists">
      <div className="flex items-baseline justify-between mb-12 pb-4 border-b border-gallery-lightgray">
        <div>
          <p className="label mb-2">Our Roster</p>
          <h2 className="heading-md">Featured <em>Artists</em></h2>
        </div>
        <Link href="/artists" className="btn-text-link hidden sm:block">View All</Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gallery-lightgray">
        {artists.map((artist) => (
          <Link key={artist._id} href={`/artists/${artist.slug.current}`} className="bg-white group block">
            <div className="aspect-[3/4] overflow-hidden bg-gallery-offwhite relative">
              {artist.photo ? (
                <Image src={urlFor(artist.photo).width(400).url()} fill alt={artist.name} className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-500" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="font-serif text-5xl font-light italic text-gallery-lightgray">
                    {artist.name.split(' ').map((n) => n[0]).join('')}
                  </span>
                </div>
              )}
            </div>
            <div className="px-5 py-4 bg-white">
              <p className="font-serif font-light text-base mb-0.5 group-hover:text-gallery-orange transition-colors">{artist.name}</p>
              <p className="label">{artist.medium}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section className="grid md:grid-cols-2" id="about">
      <div className="bg-gallery-black text-white px-10 md:px-16 py-20 flex flex-col justify-between">
        <div>
          <p className="label text-white/30 mb-10">Our Philosophy</p>
          <blockquote className="font-serif font-light italic text-3xl md:text-4xl leading-snug text-white mb-6">
            "Art must be life — it must belong to everybody."
          </blockquote>
          <p className="text-xs tracking-wider uppercase text-white/40">— Marina Abramović</p>
        </div>
        <div className="flex gap-12 pt-10 mt-10 border-t border-white/10">
          {[['12+', 'Artists'], ['2021', 'Founded'], ['3', 'Countries']].map(([n, l]) => (
            <div key={l}>
              <p className="font-serif font-light text-5xl text-white leading-none">{n}</p>
              <p className="label text-white/30 mt-2">{l}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-gallery-offwhite px-10 md:px-16 py-20 flex flex-col justify-center">
        <p className="label text-gallery-gray mb-8">About MiSaZi</p>
        <h2 className="heading-md mb-6">Founded in New York,<br /><em>built for the world.</em></h2>
        <p className="body-text mb-5">
          Founded in 2021 by Hadi and Mahsa, MiSaZi Art Gallery promotes the rise, growth, and empowerment of artists from Central Asia and minority communities around the globe.
        </p>
        <p className="body-text mb-8">
          With an international team based in New York and Toronto — led by artistic director Mozhgan Miri — we support contemporary works by emerging and mid-career artists through exhibitions, education, and community.
        </p>
        <Link href="/about" className="btn-text-link">Read Our Full Story</Link>
      </div>
    </section>
  )
}
