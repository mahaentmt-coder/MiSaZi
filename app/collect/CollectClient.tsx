'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useMemo, useEffect, useCallback, useRef } from 'react'
import { urlFor } from '@/lib/sanity'
import type { Artwork } from '@/lib/sanity'

type ArtworkWithArtist = Artwork & { artist: { _id: string; name: string; slug: { current: string }; featured: boolean } }

const TRUST_SIGNALS = [
  { icon: '🎨', title: 'Original Works', desc: 'Every piece is a unique original, authenticated by the artist.' },
  { icon: '🤝', title: 'Personal Guidance', desc: 'Our curators help you find the right work for your space and budget.' },
  { icon: '🚚', title: 'Worldwide Shipping', desc: 'Professional art handling and insured shipping to your door.' },
  { icon: '📜', title: 'Certificate of Authenticity', desc: 'Each work comes with full provenance documentation.' },
]

const PRICE_RANGES = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under $500', min: 0, max: 500 },
  { label: '$500 – $1,500', min: 500, max: 1500 },
  { label: '$1,500 – $5,000', min: 1500, max: 5000 },
  { label: 'Above $5,000', min: 5000, max: Infinity },
]

function ZoomableImage({ src, alt }: { src: string; alt: string }) {
  const [scale, setScale] = useState(1)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const dragStart = useRef<{ mx: number; my: number; px: number; py: number } | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const clampPos = useCallback((x: number, y: number, s: number) => {
    const el = containerRef.current
    if (!el) return { x, y }
    const maxX = (el.clientWidth * (s - 1)) / 2
    const maxY = (el.clientHeight * (s - 1)) / 2
    return { x: Math.max(-maxX, Math.min(maxX, x)), y: Math.max(-maxY, Math.min(maxY, y)) }
  }, [])

  const onWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    setScale(prev => {
      const next = Math.max(1, Math.min(5, prev - e.deltaY * 0.005))
      if (next === 1) setPos({ x: 0, y: 0 })
      return next
    })
  }, [])

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (scale === 1) return
    e.preventDefault()
    setDragging(true)
    dragStart.current = { mx: e.clientX, my: e.clientY, px: pos.x, py: pos.y }
  }, [scale, pos])

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragging || !dragStart.current) return
    const dx = e.clientX - dragStart.current.mx
    const dy = e.clientY - dragStart.current.my
    setPos(clampPos(dragStart.current.px + dx, dragStart.current.py + dy, scale))
  }, [dragging, scale, clampPos])

  const onMouseUp = useCallback(() => { setDragging(false); dragStart.current = null }, [])

  const onDoubleClick = useCallback(() => {
    if (scale > 1) { setScale(1); setPos({ x: 0, y: 0 }) } else { setScale(2.5) }
  }, [scale])

  return (
    <div
      ref={containerRef}
      className="relative bg-black overflow-hidden"
      style={{ flex: '1 1 0', minHeight: '60vh', cursor: scale > 1 ? (dragging ? 'grabbing' : 'grab') : 'zoom-in' }}
      onWheel={onWheel}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onDoubleClick={onDoubleClick}
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'contain',
          transform: `scale(${scale}) translate(${pos.x / scale}px, ${pos.y / scale}px)`,
          transition: dragging ? 'none' : 'transform 0.15s ease',
          userSelect: 'none',
        }}
      />
      {scale === 1 && (
        <div className="absolute bottom-3 right-3 text-white/50 text-xs pointer-events-none">Scroll or double-click to zoom</div>
      )}
    </div>
  )
}

function Lightbox({ artwork, onClose, onPrev, onNext, hasPrev, hasNext }: {
  artwork: ArtworkWithArtist
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  hasPrev: boolean
  hasNext: boolean
}) {
  const inquiryUrl = `/contact?subject=${encodeURIComponent(`Inquiry: ${artwork.title || 'Artwork'}`)}&artist=${encodeURIComponent(artwork.artist?.name || '')}`

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onPrev, onNext])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90" onClick={onClose}>
      <button onClick={onClose} className="absolute top-4 right-6 text-white/70 hover:text-white text-3xl leading-none z-10">×</button>

      {hasPrev && (
        <button onClick={e => { e.stopPropagation(); onPrev() }} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-4xl z-10 px-2">‹</button>
      )}
      {hasNext && (
        <button onClick={e => { e.stopPropagation(); onNext() }} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-4xl z-10 px-2">›</button>
      )}

      <div className="flex flex-col md:flex-row w-full mx-4 md:mx-8 gap-0" style={{maxHeight:'90vh'}} onClick={e => e.stopPropagation()}>
        {artwork.image
          ? <ZoomableImage src={urlFor(artwork.image).width(2400).url()} alt={artwork.title || ''} />
          : <div className="flex-1 bg-black" />
        }
        <div className="bg-white md:w-56 px-6 py-8 flex flex-col justify-between shrink-0 overflow-y-auto">
          <div>
            {artwork.artist?.name && (
              <p className="label text-gallery-gray mb-2">{artwork.artist.name}</p>
            )}
            <h3 className="font-serif font-light text-xl mb-4">{artwork.title || 'Untitled'}{artwork.year ? `, ${artwork.year}` : ''}</h3>
            <div className="space-y-1 text-sm font-light text-gallery-gray mb-6">
              {artwork.medium && <p>{artwork.medium}</p>}
              {artwork.dimensions && <p>{artwork.dimensions}</p>}
            </div>
            {artwork.sold ? (
              <p className="text-xs tracking-widest uppercase text-gallery-gray">Sold</p>
            ) : artwork.price ? (
              <p className="font-serif text-2xl">${artwork.price.toLocaleString()}</p>
            ) : (
              <p className="text-sm italic text-gallery-gray">Price on request</p>
            )}
          </div>
          {!artwork.sold && (
            <Link href={inquiryUrl} className="btn-primary text-center mt-6">Inquire</Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default function CollectClient({ artworks }: { artworks: ArtworkWithArtist[] }) {
  const [selectedMedium, setSelectedMedium] = useState('All')
  const [selectedPrice, setSelectedPrice] = useState(0)
  const [selectedArtist, setSelectedArtist] = useState('All')
  const [showAvailableOnly, setShowAvailableOnly] = useState(false)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [lightboxId, setLightboxId] = useState<string | null>(null)

  const mediums = useMemo(() => {
    const all = artworks.map(a => a.medium?.split('·')[0]?.split(',')[0]?.trim()).filter(Boolean)
    return ['All', ...Array.from(new Set(all)).sort()]
  }, [artworks])

  const artists = useMemo(() => {
    const all = artworks.map(a => a.artist?.name).filter(Boolean)
    return ['All', ...Array.from(new Set(all)).sort()]
  }, [artworks])

  const priceRange = PRICE_RANGES[selectedPrice]

  const filtered = useMemo(() => artworks.filter(a => {
    if (showAvailableOnly && a.sold) return false
    if (selectedArtist !== 'All' && a.artist?.name !== selectedArtist) return false
    if (selectedMedium !== 'All' && !a.medium?.toLowerCase().includes(selectedMedium.toLowerCase())) return false
    if (a.price !== undefined && (a.price < priceRange.min || a.price > priceRange.max)) return false
    return true
  }), [artworks, showAvailableOnly, selectedArtist, selectedMedium, priceRange])

  const available = artworks.filter(a => !a.sold)
  const featured = artworks.find(a => (a as any).featured && !a.sold && a.image) || artworks.find(a => !a.sold && a.image) || artworks[0]

  const lightboxIndex = useMemo(() => filtered.findIndex(a => a._id === lightboxId), [filtered, lightboxId])
  const lightboxArtwork = lightboxIndex >= 0 ? filtered[lightboxIndex] : null
  const closeLightbox = useCallback(() => setLightboxId(null), [])
  const prevLightbox = useCallback(() => { if (lightboxIndex > 0) setLightboxId(filtered[lightboxIndex - 1]._id) }, [filtered, lightboxIndex])
  const nextLightbox = useCallback(() => { if (lightboxIndex < filtered.length - 1) setLightboxId(filtered[lightboxIndex + 1]._id) }, [filtered, lightboxIndex])

  const clearFilters = () => {
    setShowAvailableOnly(false)
    setSelectedMedium('All')
    setSelectedPrice(0)
    setSelectedArtist('All')
  }
  const hasFilters = showAvailableOnly || selectedMedium !== 'All' || selectedPrice !== 0 || selectedArtist !== 'All'

  return (
    <>
      {lightboxArtwork && (
        <Lightbox
          artwork={lightboxArtwork}
          onClose={closeLightbox}
          onPrev={prevLightbox}
          onNext={nextLightbox}
          hasPrev={lightboxIndex > 0}
          hasNext={lightboxIndex < filtered.length - 1}
        />
      )}

      {/* ── Hero ── */}
      <section className="relative bg-gallery-black text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          {featured?.image && (
            <Image src={urlFor(featured.image).width(1400).url()} fill alt="" className="object-cover" sizes="100vw" />
          )}
        </div>
        <div className="relative px-8 md:px-16 py-24 md:py-32 max-w-4xl">
          <p className="label text-gallery-orange mb-4">Original Art · Authenticated · Worldwide</p>
          <h1 className="font-serif font-light text-5xl md:text-7xl leading-tight mb-6">
            Collect Art That<br /><em>Moves You</em>
          </h1>
          <p className="text-lg font-light text-white/70 max-w-xl mb-10 leading-relaxed">
            Own original works by contemporary artists from Iran and the diaspora.
            Each piece carries a story — and becomes part of yours.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#artworks" className="btn-primary">Browse Available Works</a>
            <Link href="/contact?subject=collecting" className="border border-white/40 text-white px-6 py-3 text-xs tracking-widest uppercase hover:bg-white/10 transition-colors">
              Speak with a Curator
            </Link>
          </div>
          <div className="mt-12 flex gap-10 text-sm font-light text-white/60">
            <div><span className="text-2xl font-serif text-white">{available.length}</span><br />Works Available</div>
            <div><span className="text-2xl font-serif text-white">{artists.length - 1}</span><br />Artists</div>
            <div><span className="text-2xl font-serif text-white">15+</span><br />Countries Shipped</div>
          </div>
        </div>
      </section>

      {/* ── Trust signals ── */}
      <section className="grid grid-cols-2 md:grid-cols-4 border-b border-gallery-lightgray">
        {TRUST_SIGNALS.map(({ icon, title, desc }) => (
          <div key={title} className="px-8 py-8 border-r border-gallery-lightgray last:border-r-0">
            <div className="text-2xl mb-3">{icon}</div>
            <p className="font-serif font-light text-base mb-1">{title}</p>
            <p className="text-xs font-light text-gallery-gray leading-relaxed">{desc}</p>
          </div>
        ))}
      </section>

      {/* ── Featured work ── */}
      {featured && (
        <section className="grid md:grid-cols-2 border-b border-gallery-lightgray">
          <div className="relative aspect-[4/3] bg-gallery-offwhite overflow-hidden">
            {featured.image && (
              <Image src={urlFor(featured.image).width(900).url()} fill alt={featured.title || ''} className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            )}
            <div className="absolute top-4 left-4 bg-gallery-orange text-white text-2xs tracking-widest uppercase px-3 py-1">
              Featured Work
            </div>
          </div>
          <div className="px-10 md:px-16 py-14 flex flex-col justify-center">
            <p className="label mb-2">{featured.artist?.name}</p>
            <h2 className="font-serif font-light text-3xl md:text-4xl mb-4">{featured.title || 'Untitled'}</h2>
            <div className="space-y-2 mb-8 text-sm font-light text-gallery-gray">
              {featured.year && <p>{featured.year}</p>}
              {featured.medium && <p>{featured.medium}</p>}
              {featured.dimensions && <p>{featured.dimensions}</p>}
            </div>
            {featured.price ? (
              <p className="font-serif text-2xl mb-6">${featured.price.toLocaleString()}</p>
            ) : (
              <p className="text-sm font-light text-gallery-gray mb-6 italic">Price on request</p>
            )}
            <div className="flex gap-4 flex-wrap">
              <Link
                href={`/contact?subject=${encodeURIComponent(`Inquiry: ${featured.title || 'Artwork'}`)}&artist=${encodeURIComponent(featured.artist?.name || '')}`}
                className="btn-primary"
              >
                Inquire About This Work
              </Link>
              {featured.artist?.slug && (
                <Link href={`/artists/${featured.artist.slug.current}`} className="btn-text-link self-center">
                  View Artist →
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── Filters + Grid ── */}
      <section id="artworks" className="px-8 md:px-10 py-16">
        <div className="flex flex-wrap gap-3 mb-4 items-center justify-between">
          <h2 className="font-serif font-light text-3xl">Available Works</h2>
          <p className="label text-gallery-gray">{filtered.length} work{filtered.length !== 1 ? 's' : ''}</p>
        </div>

        <div className="flex flex-wrap gap-3 mb-10 py-6 border-y border-gallery-lightgray items-center">
          <button
            onClick={() => setShowAvailableOnly(!showAvailableOnly)}
            className={`text-2xs tracking-widest uppercase px-4 py-2 border transition-colors ${
              showAvailableOnly ? 'bg-gallery-black text-white border-gallery-black' : 'border-gallery-lightgray text-gallery-gray hover:border-gallery-gray'
            }`}
          >
            Available Only
          </button>

          <select
            value={selectedMedium}
            onChange={e => setSelectedMedium(e.target.value)}
            className="text-2xs tracking-widest uppercase px-4 py-2 border border-gallery-lightgray bg-white text-gallery-gray appearance-none cursor-pointer hover:border-gallery-gray transition-colors"
          >
            {mediums.map(m => <option key={m} value={m}>{m === 'All' ? 'All Mediums' : m}</option>)}
          </select>

          <select
            value={selectedPrice}
            onChange={e => setSelectedPrice(Number(e.target.value))}
            className="text-2xs tracking-widest uppercase px-4 py-2 border border-gallery-lightgray bg-white text-gallery-gray appearance-none cursor-pointer hover:border-gallery-gray transition-colors"
          >
            {PRICE_RANGES.map((r, i) => <option key={i} value={i}>{r.label}</option>)}
          </select>

          <select
            value={selectedArtist}
            onChange={e => setSelectedArtist(e.target.value)}
            className="text-2xs tracking-widest uppercase px-4 py-2 border border-gallery-lightgray bg-white text-gallery-gray appearance-none cursor-pointer hover:border-gallery-gray transition-colors"
          >
            {artists.map(a => <option key={a} value={a}>{a === 'All' ? 'All Artists' : a}</option>)}
          </select>

          {hasFilters && (
            <button onClick={clearFilters} className="text-2xs tracking-widest uppercase text-gallery-orange hover:underline ml-auto">
              Clear Filters
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-serif font-light text-2xl mb-4">No works match your filters</p>
            <button onClick={clearFilters} className="btn-text-link">Clear all filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-gallery-lightgray">
            {filtered.map((artwork) => (
              <ArtworkCard
                key={artwork._id}
                artwork={artwork}
                hovered={hoveredId === artwork._id}
                onHover={setHoveredId}
                onZoom={setLightboxId}
              />
            ))}
          </div>
        )}
      </section>

      {/* ── How it works ── */}
      <section className="bg-gallery-offwhite px-8 md:px-16 py-20 border-t border-gallery-lightgray">
        <div className="max-w-4xl mx-auto">
          <p className="label mb-3 text-center">The Process</p>
          <h2 className="font-serif font-light text-3xl text-center mb-16">How to Acquire a Work</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: '01', title: 'Inquire', desc: "Click Inquire on any artwork. Tell us about yourself — where you'll display it, your budget, and any questions you have." },
              { step: '02', title: 'Connect', desc: 'Our curator connects you with the artist and provides full details: condition report, shipping estimate, and payment options.' },
              { step: '03', title: 'Collect', desc: 'Once you proceed, we handle professional packaging, insured shipping, and send your certificate of authenticity.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="text-center">
                <p className="font-serif text-5xl font-light text-gallery-orange mb-4">{step}</p>
                <h3 className="font-serif font-light text-xl mb-3">{title}</h3>
                <p className="text-sm font-light text-gallery-gray leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-14">
            <Link href="/contact?subject=collecting" className="btn-primary">Start a Conversation</Link>
          </div>
        </div>
      </section>

      {/* ── Quote ── */}
      <section className="px-8 md:px-16 py-20 border-t border-gallery-lightgray">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-serif font-light text-2xl md:text-3xl leading-relaxed mb-8 text-gallery-darkgray italic">
            "Collecting art is not about ownership — it is about becoming part of a story that continues to unfold."
          </p>
          <p className="label text-gallery-gray">Mojgan Miri, Founder · MiSaZi Art Gallery</p>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="bg-gallery-black text-white px-8 md:px-16 py-20">
        <div className="max-w-2xl">
          <p className="label text-gallery-orange mb-4">Not sure where to start?</p>
          <h2 className="font-serif font-light text-4xl mb-6">Let Us Help You Find <em>Your</em> Work</h2>
          <p className="text-white/70 font-light leading-relaxed mb-10">
            Tell us about your space, your taste, and your budget. Our curators will handpick a selection of works personally matched to you — no pressure, no commitment.
          </p>
          <Link href="/contact?subject=Art Advisory" className="btn-primary">Request a Personal Selection</Link>
        </div>
      </section>
    </>
  )
}

function ArtworkCard({
  artwork, hovered, onHover, onZoom
}: {
  artwork: ArtworkWithArtist
  hovered: boolean
  onHover: (id: string | null) => void
  onZoom: (id: string) => void
}) {
  const inquiryUrl = `/contact?subject=${encodeURIComponent(`Inquiry: ${artwork.title || 'Artwork'}`)}&artist=${encodeURIComponent(artwork.artist?.name || '')}`

  return (
    <div
      className="bg-white group relative"
      onMouseEnter={() => onHover(artwork._id)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="aspect-[3/4] relative overflow-hidden bg-gallery-offwhite cursor-zoom-in" onClick={() => artwork.image && onZoom(artwork._id)}>
        {artwork.image ? (
          <Image
            src={urlFor(artwork.image).width(600).url()}
            fill
            alt={artwork.title || artwork.artist?.name || 'Artwork'}
            className={`object-cover transition-transform duration-700 ${hovered ? 'scale-[1.05]' : 'scale-100'}`}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="label text-gallery-gray">No image</span>
          </div>
        )}

        {artwork.sold && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white text-xs tracking-widest uppercase border border-white/50 px-4 py-2">Sold</span>
          </div>
        )}

        {hovered && artwork.image && !artwork.sold && (
          <div className="absolute inset-0 bg-black/20 flex flex-col items-end justify-start p-3 gap-2 pointer-events-none">
            <span className="bg-white/90 text-gallery-black text-2xs tracking-widest uppercase px-2 py-1">⊕ Zoom</span>
          </div>
        )}

        {!artwork.sold && hovered && (
          <div className="absolute inset-x-0 bottom-0 p-4" onClick={e => e.stopPropagation()}>
            <Link href={inquiryUrl} className="block w-full text-center bg-white text-gallery-black text-2xs tracking-widest uppercase py-3 hover:bg-gallery-orange hover:text-white transition-colors">
              Inquire
            </Link>
          </div>
        )}
      </div>

      <div className="px-4 py-4 border-t border-gallery-lightgray">
        {artwork.artist?.name && (
          <Link href={`/artists/${artwork.artist.slug?.current}`} className="label text-gallery-gray hover:text-gallery-orange transition-colors block mb-1">
            {artwork.artist.name}
          </Link>
        )}
        <p className="font-serif font-light text-base leading-snug mb-1 line-clamp-2">
          {artwork.title || 'Untitled'}{artwork.year ? `, ${artwork.year}` : ''}
        </p>
        {artwork.medium && <p className="text-2xs text-gallery-gray font-light mb-2 line-clamp-1">{artwork.medium}</p>}
        <div className="flex items-center justify-between">
          {artwork.sold ? (
            <span className="text-2xs text-gallery-gray tracking-wider uppercase">Sold</span>
          ) : artwork.price ? (
            <span className="font-serif text-base">${artwork.price.toLocaleString()}</span>
          ) : (
            <span className="text-2xs text-gallery-gray italic">Price on request</span>
          )}
          {!artwork.sold && (
            <Link href={inquiryUrl} className="text-2xs tracking-widest uppercase text-gallery-orange hover:underline">
              Inquire →
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
