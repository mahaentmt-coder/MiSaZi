import { createClient } from '@sanity/client'
const client = createClient({ projectId:'cbulz0js', dataset:'production', apiVersion:'2024-01-01', token:process.env.SANITY_API_TOKEN, useCdn:false })

const NARGES_ID = 'voupnMNE9rrQS0V5SLLAYZ'

const narges = await client.fetch(`*[_id == "${NARGES_ID}"][0]{artworks[]->{_id, title, image}}`)

const noImage = narges.artworks.filter(a => !a.image)
const withImage = narges.artworks.filter(a => a.image)

console.log('Keeping:', withImage.map(a => a.title))
console.log('Removing:', noImage.map(a => a.title))

// Update Narges artworks array to only keep those with images
const kept = withImage.map(a => ({ _type: 'reference', _ref: a._id, _key: a._id }))
await client.patch(NARGES_ID).set({ artworks: kept }).commit()
console.log('✓ Updated Narges artworks array')

// Delete the no-image artwork documents
for (const a of noImage) {
  await client.delete(a._id)
  console.log(`✓ Deleted "${a.title}" (${a._id})`)
}

console.log('\n✅ Done')
