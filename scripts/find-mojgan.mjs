import { createClient } from '@sanity/client'
const client = createClient({ projectId:'cbulz0js', dataset:'production', apiVersion:'2024-01-01', token:process.env.SANITY_API_TOKEN, useCdn:false })
const r = await client.fetch(`*[_type == "artist" && name match "Mojgan*"]{_id, name}`)
console.log(r)
