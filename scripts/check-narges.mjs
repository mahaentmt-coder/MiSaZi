import { createClient } from '@sanity/client'
const client = createClient({ projectId:'cbulz0js', dataset:'production', apiVersion:'2024-01-01', token:process.env.SANITY_API_TOKEN, useCdn:false })

const narges = await client.fetch(`*[_type == "artist" && name == "Narges Mirnezhad"][0]{_id, artworks[]->{_id, title, image}}`)
console.log('Artist ID:', narges._id)
console.log('Artworks:')
narges.artworks?.forEach(a => console.log(a._id, '|', a.title, '|', a.image ? 'HAS IMAGE' : 'NO IMAGE'))
