import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'MiSaZi Art Gallery — New York',
    template: '%s | MiSaZi Art Gallery',
  },
  description:
    'MiSaZi Art Gallery promotes the rise, growth, and empowerment of artists from Central Asia and minority communities worldwide. Based in New York.',
  keywords: ['art gallery', 'contemporary art', 'Central Asia', 'New York', 'emerging artists', 'MiSaZi'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://misaziart.com',
    siteName: 'MiSaZi Art Gallery',
    title: 'MiSaZi Art Gallery — New York',
    description: 'Contemporary art from Central Asia and beyond.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MiSaZi Art Gallery — New York',
    description: 'Contemporary art from Central Asia and beyond.',
  },
  alternates: {
    canonical: 'https://misaziart.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
