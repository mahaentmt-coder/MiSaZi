import { client, ARTWORKS_WITH_ARTIST_QUERY } from '@/lib/sanity'
import CollectClient from './CollectClient'

export const metadata = {
  title: 'Collect',
  description: 'Browse and acquire original artworks by contemporary artists from Iran and the diaspora. Authenticated originals with worldwide shipping.',
}

export default async function CollectPage() {
  const artists: any[] = await client.fetch(ARTWORKS_WITH_ARTIST_QUERY, {}, { cache: 'no-store' })

  // Flatten artworks with artist info attached to each
  const artworks = (artists || []).flatMap(artist =>
    (artist.artworks || []).map((aw: any) => ({
      ...aw,
      artist: { _id: artist._id, name: artist.name, slug: artist.slug, featured: artist.featured },
    }))
  )

  return (
    <div className="mt-[60px]">
      <CollectClient artworks={artworks} />
    </div>
  )
}
