import { createClient } from '@sanity/client'
const client = createClient({ projectId:'cbulz0js', dataset:'production', apiVersion:'2024-01-01', token:process.env.SANITY_API_TOKEN, useCdn:false })

const artists = await client.fetch(`*[_type == "artist"] | order(name asc) {
  name,
  artworks[]->{ _id, title, year, medium, dimensions, price,
    "imageUrl": image.asset->url,
    "filename": image.asset->originalFilename
  }
}`)

for (const artist of artists) {
  const aw = (artist.artworks || []).filter(a => a.imageUrl)
  if (!aw.length) continue
  console.log(`\n=== ${artist.name} ===`)
  aw.forEach(a => console.log(`  ${a._id} | "${a.title}" | ${a.filename}\n    ${a.imageUrl}`))
}
