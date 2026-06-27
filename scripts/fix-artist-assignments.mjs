import { createClient } from '@sanity/client'
const client = createClient({ projectId:'cbulz0js', dataset:'production', apiVersion:'2024-01-01', token:process.env.SANITY_API_TOKEN, useCdn:false })

// Fetch current state
const artists = await client.fetch(`*[_type == "artist"] {
  _id, name,
  artworks[]->{ _id, title, medium, dimensions, year }
}`)

const behnoosh = artists.find(a => a.name === 'Behnoosh Momeni')
const hamid    = artists.find(a => a.name === 'Hamid Shiri')

console.log('\nCurrent Behnoosh Momeni artworks:')
behnoosh.artworks?.forEach(a => console.log(`  ${a._id}  "${a.title}"  ${a.medium}  ${a.dimensions}`))

console.log('\nCurrent Hamid Shiri artworks:')
hamid.artworks?.forEach(a => console.log(`  ${a._id}  "${a.title}"  ${a.medium}  ${a.dimensions}`))

// ── CORRECTIONS based on misaziart.com ──────────────────────────────────────
//
// Old site Behnoosh Momeni page: "No. 01–30, Acrylic, 80×120 / 90×120 cm, 2021–2022"
// Old site Hamid Shiri page:     sculptor — "H" prefix series (H26, H35, H37)
//
// Fix 1: Move all "No." numbered Acrylic paintings from Hamid Shiri → Behnoosh Momeni
// Fix 2: Move H26, H35, H37 artworks from Behnoosh Momeni → Hamid Shiri
// Fix 3: Correct mediums (Behnoosh → Acrylic, H-series → Sculpture · Installation)

const noSeriesIds  = hamid.artworks?.map(a => a._id) || []         // the numbered Acrylic paintings
const hSeriesIds   = behnoosh.artworks?.filter(a => /^H\d+$/.test(a.title)).map(a => a._id) || []
const keepBehnoosh = behnoosh.artworks?.filter(a => !/^H\d+$/.test(a.title)).map(a => ({
  _type: 'reference', _ref: a._id, _key: a._id
})) || []

console.log('\nNo. series to move to Behnoosh:', noSeriesIds)
console.log('H series to move to Hamid:', hSeriesIds)

// Build new artworks arrays
const newBehnooshArtworks = [
  ...keepBehnoosh,
  ...noSeriesIds.map(id => ({ _type: 'reference', _ref: id, _key: id })),
]
const newHamidArtworks = hSeriesIds.map(id => ({ _type: 'reference', _ref: id, _key: id }))

// Update artist artwork arrays
await client.patch(behnoosh._id).set({ artworks: newBehnooshArtworks }).commit()
console.log(`\n✓ Behnoosh Momeni now has ${newBehnooshArtworks.length} artworks`)

await client.patch(hamid._id).set({ artworks: newHamidArtworks }).commit()
console.log(`✓ Hamid Shiri now has ${newHamidArtworks.length} artworks`)

// Fix mediums on the moved artworks
// Acrylic paintings (No. series) → Behnoosh Momeni
for (const id of noSeriesIds) {
  await client.patch(id).set({ medium: 'Acrylic' }).commit()
}
console.log(`✓ Set medium "Acrylic" on ${noSeriesIds.length} No.-series artworks`)

// H-series → Hamid Shiri: fix medium to Sculpture
for (const id of hSeriesIds) {
  await client.patch(id).set({ medium: 'Sculpture · Mixed Media' }).commit()
}
console.log(`✓ Set medium "Sculpture · Mixed Media" on ${hSeriesIds.length} H-series artworks`)

// Fix remaining Behnoosh Momeni artworks that still say "Digital · Installation"
const behnooshOtherWrong = behnoosh.artworks?.filter(
  a => !/^H\d+$/.test(a.title) && a.medium === 'Digital · Installation'
)
for (const a of (behnooshOtherWrong || [])) {
  await client.patch(a._id).set({ medium: 'Acrylic' }).commit()
  console.log(`✓ Fixed medium on Behnoosh "${a.title}" → Acrylic`)
}

// Fix Hamid Shiri artist medium field
await client.patch(hamid._id).set({ medium: 'Sculpture' }).commit()
console.log('\n✓ Fixed Hamid Shiri artist medium → Sculpture')

console.log('\n✅ Done')
