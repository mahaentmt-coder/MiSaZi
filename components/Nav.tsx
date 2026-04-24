'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-[0_1px_0_#E8E5E0]' : 'bg-white border-b border-gallery-lightgray'
      }`}
    >
      <nav className="flex items-center justify-between px-8 md:px-10 h-[60px]">
        {/* Logo */}
        <Link href="/" className="font-sans font-extralight text-sm tracking-widest uppercase text-gallery-black no-underline">
          Mi<span className="text-gallery-orange">S</span>a<span className="text-gallery-orange">Z</span>i
          <span className="ml-2 text-[10px] font-light text-gallery-gray tracking-widest hidden sm:inline">
            ART GALLERY
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-8 list-none">
          {[
            { href: '/exhibitions', label: 'Exhibitions' },
            { href: '/artists',     label: 'Artists'     },
            { href: '/workshops',   label: 'Workshops'   },
            { href: '/about',       label: 'About'       },
          ].map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className="nav-link">
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/contact" className="btn-text-link-orange">
            Inquire About Artwork
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-px bg-gallery-black transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-px bg-gallery-black transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-px bg-gallery-black transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gallery-lightgray px-8 py-6 flex flex-col gap-5">
          {[
            { href: '/exhibitions', label: 'Exhibitions' },
            { href: '/artists',     label: 'Artists'     },
            { href: '/workshops',   label: 'Workshops'   },
            { href: '/about',       label: 'About'       },
            { href: '/contact',     label: 'Inquire'     },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
