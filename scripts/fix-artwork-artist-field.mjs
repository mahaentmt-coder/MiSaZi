import { createClient } from '@sanity/client'
const client = createClient({ projectId:'cbulz0js', dataset:'production', apiVersion:'2024-01-01', token:process.env.SANITY_API_TOKEN, useCdn:false })

// Find artworks missing the artist field
const orphans = await client.fetch(`*[_type == "artist"]{
  _id, name,
  artworks[]->{ _id, title, artist }
}`)

let fixed = 0
for (const artist of orphans) {
  for (const aw of (artist.artworks || [])) {
    if (!aw?.artist) {
      await client.patch(aw._id).set({
        artist: { _type: 'reference', _ref: artist._id }
      }).commit()
      console.log(`✓ Fixed "${aw.title || 'Untitled'}" → ${artist.name}`)
      fixed++
    }
  }
}

console.log(`\n✅ Fixed ${fixed} artworks`)
