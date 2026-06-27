import { createClient } from '@sanity/client'
const client = createClient({ projectId:'cbulz0js', dataset:'production', apiVersion:'2024-01-01', token:process.env.SANITY_API_TOKEN, useCdn:false })

const FARIBA_ID = 'S5poxwXylF3o9ymdwle1Zj'

// Find all Mask artworks
const masks = await client.fetch(`*[_type == "artwork" && title match "Mask*"]{_id, title, artist->{_id, name}}`)
console.log('Mask artworks found:', masks.map(m => `"${m.title}" (${m.artist?.name})`))

const maskIds = masks.map(m => m._id)

// Remove from current artists' arrays
const currentArtists = [...new Set(masks.map(m => m.artist?._id).filter(Boolean))]
for (const artistId of currentArtists) {
  const artist = await client.fetch(`*[_id == "${artistId}"][0]{artworks}`)
  const cleaned = (artist.artworks || []).filter(r => !maskIds.includes(r._ref))
  await client.patch(artistId).set({ artworks: cleaned }).commit()
  console.log(`✓ Removed Mask artworks from ${masks.find(m => m.artist?._id === artistId)?.artist?.name}`)
}

// Add to Fariba
const fariba = await client.fetch(`*[_id == "${FARIBA_ID}"][0]{artworks}`)
const already = new Set((fariba.artworks || []).map(r => r._ref))
const toAdd = maskIds.filter(id => !already.has(id)).map(id => ({ _type: 'reference', _ref: id, _key: id }))
await client.patch(FARIBA_ID).setIfMissing({ artworks: [] }).append('artworks', toAdd).commit()
console.log(`✓ Added ${toAdd.length} Mask artworks to Fariba Oni`)

// Update artist field on each artwork
for (const mask of masks) {
  await client.patch(mask._id).set({ artist: { _type: 'reference', _ref: FARIBA_ID } }).commit()
  console.log(`✓ "${mask.title}" artist → Fariba Oni`)
}

console.log('\n✅ Done')
