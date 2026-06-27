import { createClient } from '@sanity/client'
const client = createClient({ projectId:'cbulz0js', dataset:'production', apiVersion:'2024-01-01', token:process.env.SANITY_API_TOKEN, useCdn:false })

const artworks = await client.fetch(`*[_type == "artwork"][0..2] { _id, title, artist->{ _id, name } }`)
console.log(JSON.stringify(artworks, null, 2))
