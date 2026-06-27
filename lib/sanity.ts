import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder',
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn:    false,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// ── Typed queries ──────────────────────────────────────

export interface Artist {
  _id: string
  name: string
  slug: { current: string }
  photo: any
  medium: string
  bio: string
  featured: boolean
  emerging: boolean
  artworks: Artwork[]
  website?: string
  instagram?: string
}

export interface Artwork {
  _id: string
  title: string
  year: number
  medium: string
  dimensions: string
  image: any
  price?: number
  sold: boolean
  artist: { name: string; slug: { current: string } }
}

export interface Exhibition {
  _id: string
  title: string
  slug: { current: string }
  status: 'online' | 'upcoming' | 'past'
  startDate: string
  endDate?: string
  location: string
  description: string
  coverImage: any
  artists: { name: string; slug: { current: string }; photo?: any; artworks?: { image: any }[] }[]
}

// ── GROQ queries ───────────────────────────────────────

export const ARTISTS_QUERY = `*[_type == "artist"] | order(featured desc, name asc) {
  _id, name, slug, photo, medium, bio, featured, emerging
}`

export const ARTIST_QUERY = `*[_type == "artist" && slug.current == $slug][0] {
  _id, name, slug, photo, medium, bio, featured, emerging,
  website, instagram,
  artworks[]-> { _id, title, year, medium, dimensions, image, price, sold }
}`

export const EXHIBITIONS_QUERY = `*[_type == "exhibition"] | order(startDate desc) {
  _id, title, slug, status, startDate, endDate, location, description, coverImage,
  artists[]-> { name, slug, photo, artworks[]-> { image } }
}`

export const EXHIBITION_QUERY = `*[_type == "exhibition" && slug.current == $slug][0] {
  _id, title, slug, status, startDate, endDate, location, description, coverImage,
  artists[]-> { name, slug, photo, medium }
}`
