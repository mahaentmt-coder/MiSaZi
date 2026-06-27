import { createClient } from '@sanity/client'
const client = createClient({ projectId:'cbulz0js', dataset:'production', apiVersion:'2024-01-01', token:process.env.SANITY_API_TOKEN, useCdn:false })

const artists = await client.fetch(`*[_type == "artist"] {
  _id, name, medium,
  artworks[]->{ _id, title, medium, dimensions, year }
}`)

const hamidreza = artists.find(a => a.name === 'Hamidreza Emami')
const farshid   = artists.find(a => a.name === 'Farshid Barghi')
const mahsa     = artists.find(a => a.name === 'Mahsa Sohrabi')

// ── Hamidreza Emami: painter, not photographer ───────────────────────────────
// Old site: "Oil on canvas, 200×150 cm, 220×110 cm, 160×140 cm, 80×60 cm..."
// Sanity: medium = "Photography" ✗ → should be "Oil on Canvas"
console.log('\nHamidreza Emami artworks:')
hamidreza?.artworks?.forEach(a => console.log(`  "${a.title}"  ${a.medium}  ${a.dimensions}`))

await client.patch(hamidreza._id).set({ medium: 'Painting · Oil on Canvas' }).commit()
console.log('✓ Fixed Hamidreza Emami artist medium → Painting · Oil on Canvas')

for (const a of (hamidreza?.artworks || [])) {
  if (a.medium === 'Photography') {
    await client.patch(a._id).set({ medium: 'Oil on Canvas' }).commit()
    console.log(`  ✓ Fixed "${a.title}" medium → Oil on Canvas`)
  }
}

// Also update dimensions for Hamidreza's artworks from old site data
// Old site: Oil on canvas, 200×150 cm / 220×110 cm / 160×140 cm / 80×60 cm / 55×80 cm
// Artworks in Sanity: Untitled I, II, III, Exhibition Shot I — match sizes as best we can
const hamidrezaArtworks = hamidreza?.artworks || []
const sizeMap = {
  'Untitled I':       { dimensions: '200×150 cm', medium: 'Oil on Canvas' },
  'Untitled II':      { dimensions: '220×110 cm', medium: 'Oil on Canvas' },
  'Untitled III':     { dimensions: '160×140 cm', medium: 'Oil on Canvas' },
  'Exhibition Shot I':{ dimensions: null,          medium: 'Photography'   }, // exhibition shot stays photography
}
for (const a of hamidrezaArtworks) {
  const fix = sizeMap[a.title]
  if (fix) {
    const patch = {}
    if (fix.dimensions && !a.dimensions) patch.dimensions = fix.dimensions
    if (fix.medium) patch.medium = fix.medium
    if (Object.keys(patch).length) {
      await client.patch(a._id).set(patch).commit()
      console.log(`  ✓ Updated "${a.title}":`, patch)
    }
  }
}

// ── Farshid Barghi: photographer, not mixed media ───────────────────────────
console.log('\nFarshid Barghi artworks:')
farshid?.artworks?.forEach(a => console.log(`  "${a.title}"  ${a.medium}  ${a.dimensions}`))

await client.patch(farshid._id).set({ medium: 'Photography' }).commit()
console.log('✓ Fixed Farshid Barghi artist medium → Photography')

for (const a of (farshid?.artworks || [])) {
  if (a.medium === 'Mixed Media' || a.medium === 'Print on canvas') {
    await client.patch(a._id).set({ medium: 'Photography · Print on Canvas' }).commit()
    console.log(`  ✓ Fixed "${a.title}" medium → Photography · Print on Canvas`)
  }
}

// ── Mahsa Sohrabi: painter (surrealistic paintings) ──────────────────────────
console.log('\nMahsa Sohrabi artworks:')
mahsa?.artworks?.forEach(a => console.log(`  "${a.title}"  ${a.medium}  ${a.dimensions}`))

for (const a of (mahsa?.artworks || [])) {
  if (a.medium === 'Painting') {
    await client.patch(a._id).set({ medium: 'Oil on Canvas' }).commit()
    console.log(`  ✓ Fixed "${a.title}" medium → Oil on Canvas`)
  }
}

console.log('\n✅ Done')
