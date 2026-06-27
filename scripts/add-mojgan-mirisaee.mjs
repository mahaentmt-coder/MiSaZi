import { createClient } from '@sanity/client'
const client = createClient({ projectId:'cbulz0js', dataset:'production', apiVersion:'2024-01-01', token:process.env.SANITY_API_TOKEN, useCdn:false })

const EXHIBITION_ID = '9wv3c53RQI1aqnVOhHjBZE'

const artist = await client.create({
  _type: 'artist',
  name: 'Mojgan Mirisaee',
  slug: { _type: 'slug', current: 'mojgan-mirisaee' },
  emerging: true,
})
console.log(`✨ Created "Mojgan Mirisaee" (${artist._id})`)

await client.patch(EXHIBITION_ID)
  .setIfMissing({ artists: [] })
  .append('artists', [{ _type: 'reference', _ref: artist._id, _key: artist._id }])
  .commit()
console.log(`✅ Added to Berlin exhibition`)
