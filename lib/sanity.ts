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

export interface Workshop {
  _id: string
  title: string
  slug: { current: string }
  status: 'upcoming' | 'past'
  date?: string
  instructor: string
  description: string
  topics?: string[]
  category?: string
  coverImage?: any
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
  artists: {
    name: string
    slug: { current: string }
    photo?: any
    bio?: string
    medium?: string
    artworks?: { _id: string; title?: string; image: any; year?: string; medium?: string; dimensions?: string }[]
  }[]
}

// ── GROQ queries ───────────────────────────────────────

export const ARTISTS_QUERY = `*[_type == "artist" && name != "Jamal Arabzadeh"] | order(featured desc, name asc) {
  _id, name, slug, photo, medium, bio, featured, emerging
}`

export const ARTIST_QUERY = `*[_type == "artist" && slug.current == $slug && name != "Jamal Arabzadeh"][0] {
  _id, name, slug, photo, medium, bio, featured, emerging,
  website, instagram,
  artworks[]-> { _id, title, year, medium, dimensions, image, price, sold }
}`

export const WORKSHOPS_QUERY = `*[_type == "workshop"] | order(status asc, date desc) {
  _id, title, slug, status, date, instructor, description, topics, category, coverImage
}`

export const EXHIBITIONS_QUERY = `*[_type == "exhibition"] | order(startDate desc) {
  _id, title, slug, status, startDate, endDate, location, description, coverImage,
  artists[]-> { name, slug, photo, artworks[]-> { image } }
}`

export const ARTWORKS_QUERY = `*[_type == "artwork"] | order(_createdAt desc) {
  _id, title, year, medium, dimensions, image, price, sold,
  artist->{ _id, name, slug, photo, medium, featured }
}`

export const ARTWORKS_WITH_ARTIST_QUERY = `*[_type == "artist" && name != "Jamal Arabzadeh"] {
  _id, name, slug, featured,
  artworks[]->{ _id, title, year, medium, dimensions, image, price, sold, featured }
}`

export const EXHIBITION_QUERY = `*[_type == "exhibition" && slug.current == $slug][0] {
  _id, title, slug, status, startDate, endDate, location, description, coverImage,
  artists[]-> { name, slug, photo, bio, medium, artworks[]-> { _id, title, year, medium, dimensions, image } }
}`
