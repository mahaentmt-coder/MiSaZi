import { createClient } from '@sanity/client'
const client = createClient({ projectId:'cbulz0js', dataset:'production', apiVersion:'2024-01-01', token:process.env.SANITY_API_TOKEN, useCdn:false })

const natures = await client.fetch(`*[_type == "artwork" && title match "Nature*"]{_id, title, artist->{_id, name}}`)
console.log('Found:', natures.map(a => `"${a.title}" (${a.artist?.name})`))

const natureIds = new Set(natures.map(a => a._id))

// Remove from artist arrays
const artistIds = [...new Set(natures.map(a => a.artist?._id).filter(Boolean))]
for (const artistId of artistIds) {
  const artist = await client.fetch(`*[_id == "${artistId}"][0]{artworks}`)
  const cleaned = (artist.artworks || []).filter(r => !natureIds.has(r._ref))
  await client.patch(artistId).set({ artworks: cleaned }).commit()
  console.log(`✓ Removed from artist array`)
}

// Delete artwork documents
for (const a of natures) {
  await client.delete(a._id)
  console.log(`✓ Deleted "${a.title}"`)
}

console.log('\n✅ Done')
