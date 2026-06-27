import { createClient } from '@sanity/client'
const client = createClient({ projectId:'cbulz0js', dataset:'production', apiVersion:'2024-01-01', token:process.env.SANITY_API_TOKEN, useCdn:false })

const count = await client.fetch(`count(*[_type == "artwork"])`)
console.log('Standalone artwork docs:', count)

const artists = await client.fetch(`*[_type == "artist"]{ name, artworks[]->{ _id, title } }`)
for (const a of artists) {
  if (a.artworks?.length) console.log(`${a.name}: ${a.artworks.length} artworks`)
}
