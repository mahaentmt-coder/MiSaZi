import { createClient } from '@sanity/client'
const client = createClient({ projectId:'cbulz0js', dataset:'production', apiVersion:'2024-01-01', token:process.env.SANITY_API_TOKEN, useCdn:false })

const artists = await client.fetch(`*[_type == "artist"] { name, "count": count(artworks) } | order(name asc)`)
const total = artists.reduce((s, a) => s + (a.count || 0), 0)

console.log(`${artists.length} artists, ${total} total artworks linked\n`)
artists.forEach(a => console.log(`  ${a.name}: ${a.count || 0} artworks`))
