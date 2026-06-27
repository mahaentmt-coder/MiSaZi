import { createClient } from '@sanity/client'
const client = createClient({ projectId:'cbulz0js', dataset:'production', apiVersion:'2024-01-01', token:process.env.SANITY_API_TOKEN, useCdn:false })

// These 3 artwork IDs are Behnoosh Momeni's numbered acrylic paintings
// currently mis-filed under Jamal Arabzadeh (originally "Untitled I/II/III")
const MOVE_IDS = [
  'S5poxwXylF3o9ymdwleNpC',  // green/teal room, arch, orange figure → was "Iranian Living Room I"
  '9wv3c53RQI1aqnVOhHgdEI',  // pink/orange room, teal sofa, floating woman → was "Iranian Living Room II"
  'voupnMNE9rrQS0V5SLLERH',  // terracotta room, ghostly figures, landscape → was "Iranian Living Room III"
]

const jamal    = await client.fetch(`*[_type=="artist" && name=="Jamal Arabzadeh"][0]{_id, artworks}`)
const behnoosh = await client.fetch(`*[_type=="artist" && name=="Behnoosh Momeni"][0]{_id, artworks}`)

// Remove from Jamal
const newJamalArtworks = (jamal.artworks || []).filter(ref => !MOVE_IDS.includes(ref._ref))
await client.patch(jamal._id).set({ artworks: newJamalArtworks }).commit()
console.log(`✓ Jamal artworks: ${jamal.artworks?.length} → ${newJamalArtworks.length}`)

// Add to Behnoosh
const alreadyInBehnoosh = new Set((behnoosh.artworks || []).map(r => r._ref))
const toAdd = MOVE_IDS.filter(id => !alreadyInBehnoosh.has(id)).map(id => ({ _type:'reference', _ref:id, _key:id }))
await client.patch(behnoosh._id).setIfMissing({ artworks:[] }).append('artworks', toAdd).commit()
console.log(`✓ Behnoosh artworks: ${behnoosh.artworks?.length} → ${(behnoosh.artworks?.length || 0) + toAdd.length}`)

// Fix medium + rename to numbered-series style
await client.patch('S5poxwXylF3o9ymdwleNpC').set({ title:'No. 05', medium:'Acrylic on Canvas', year:2022 }).commit()
await client.patch('9wv3c53RQI1aqnVOhHgdEI').set({ title:'No. 10', medium:'Acrylic on Canvas', year:2022 }).commit()
await client.patch('voupnMNE9rrQS0V5SLLERH').set({ title:'No. 14', medium:'Acrylic on Canvas', year:2021 }).commit()

console.log('✓ Renamed: No.05 (green arch), No.10 (pink teal sofa), No.14 (terracotta room)')
console.log('\n✅ Done')
