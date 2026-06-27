import { createClient } from '@sanity/client'
const client = createClient({ projectId:'cbulz0js', dataset:'production', apiVersion:'2024-01-01', token:process.env.SANITY_API_TOKEN, useCdn:false })

const EMPTY_ID  = '9wv3c53RQI1aqnVOhI8ZLV'
const FARIBA_ID = 'S5poxwXylF3o9ymdwle1Zj'

const fariba = await client.fetch(`*[_id=="${FARIBA_ID}"][0]{artworks}`)
const cleaned = (fariba.artworks || []).filter(r => r._ref !== EMPTY_ID)
await client.patch(FARIBA_ID).set({ artworks: cleaned }).commit()
console.log('✓ Removed empty Tree of Life ref from Fariba artworks')

await client.delete(EMPTY_ID)
console.log('✓ Deleted empty Tree of Life placeholder')
