import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-gallery-black text-white">
      {/* Newsletter strip */}
      <div className="border-b border-white/10 px-8 md:px-10 py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <p className="font-serif font-light text-2xl text-white mb-1">Stay in the Loop</p>
          <p className="text-[13px] text-white/50 font-light">
            Exhibition openings, artist news, and upcoming events.
          </p>
        </div>
        <NewsletterForm />
      </div>

      {/* Links grid */}
      <div className="px-8 md:px-10 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <p className="font-sans font-extralight text-xl tracking-widest uppercase mb-4">
            Mi<span className="text-gallery-orange">S</span>a<span className="text-gallery-orange">Z</span>i
          </p>
          <p className="text-[12px] text-white/40 font-light leading-loose max-w-[200px]">
            Promoting the rise, growth, and empowerment of artists from Central Asia and minority communities worldwide.
          </p>
          <p className="text-[11px] text-white/30 font-light mt-4">
            Founded New York, 2021
          </p>
        </div>

        {/* Exhibitions */}
        <div>
          <h4 className="label text-white/30 mb-5">Exhibitions</h4>
          {[
            ['Online Exhibition',  '/exhibitions/online'],
            ['Upcoming Shows',     '/exhibitions/upcoming'],
            ['Past Exhibitions',   '/exhibitions/past'],
            ['Art Fairs',          '/exhibitions/fairs'],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="block text-[12px] text-white/50 font-light mb-3 hover:text-white transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Artists */}
        <div>
          <h4 className="label text-white/30 mb-5">Artists</h4>
          {[
            ['Featured Artists',   '/artists'],
            ['Emerging Artists',   '/artists#emerging'],
            ['Submit Your Work',   '/submissions'],
            ['Workshops',          '/workshops'],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="block text-[12px] text-white/50 font-light mb-3 hover:text-white transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Gallery */}
        <div>
          <h4 className="label text-white/30 mb-5">Gallery</h4>
          {[
            ['About Us',      '/about'],
            ['Contact',       '/contact'],
            ['Press',         '/press'],
            ['Privacy Policy','/privacy'],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="block text-[12px] text-white/50 font-light mb-3 hover:text-white transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 px-8 md:px-10 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-[11px] text-white/30 font-light">
          © {year} MiSaZi Art Gallery · 250 W. 50th St., New York, NY 10019
        </p>
        <div className="flex gap-6">
          {['Instagram', 'Facebook', 'LinkedIn'].map((platform) => (
            <a
              key={platform}
              href={`https://${platform.toLowerCase()}.com`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] tracking-widest uppercase text-white/30 hover:text-white transition-colors"
            >
              {platform}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

function NewsletterForm() {
  return (
    <form
      className="flex gap-0 shrink-0"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="email"
        placeholder="your@email.com"
        className="w-[220px] bg-white/5 border border-white/15 text-white placeholder:text-white/30
                   font-sans font-light text-[13px] px-4 py-3 outline-none
                   focus:border-white/40 transition-colors"
      />
      <button
        type="submit"
        className="bg-white text-gallery-black font-sans font-light text-[11px]
                   tracking-widest uppercase px-5 py-3 whitespace-nowrap
                   hover:bg-gallery-offwhite transition-colors"
      >
        Subscribe
      </button>
    </form>
  )
}
