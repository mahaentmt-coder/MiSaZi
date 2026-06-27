import { createClient } from '@sanity/client'
const client = createClient({ projectId:'cbulz0js', dataset:'production', apiVersion:'2024-01-01', token:process.env.SANITY_API_TOKEN, useCdn:false })

const p = (id, fields) => client.patch(id).set(fields).commit().then(() => console.log(`  ✓ ${id} →`, JSON.stringify(fields)))

// ── Behnoosh Momeni: NOOR/Mirrors/catalog were wrongly renamed ───────────────
// These are textile/mesh INSTALLATIONS, not numbered acrylic paintings.
// Revert their titles and fix medium. Remove the wrong acrylic price/dims.
console.log('\n── Behnoosh Momeni: revert NOOR/Mirrors/catalog ──')
await Promise.all([
  p('voupnMNE9rrQS0V5SLL7Q9', { title:'Noor 1', medium:'Textile · Mixed Media · Installation', price:null, dimensions:null, year:null }),
  p('9wv3c53RQI1aqnVOhHgMTk', { title:'Noor 2', medium:'Textile · Mixed Media · Installation', price:null, dimensions:null, year:null }),
  p('S5poxwXylF3o9ymdwle79U', { title:'My Mirrors — A Place to Hide', medium:'Textile · Mixed Media · Installation', price:null, dimensions:null, year:null }),
  p('9wv3c53RQI1aqnVOhI4btM', { title:'Untitled', medium:'Acrylic on Canvas', price:null, dimensions:null }), // Spring Catalog piece
])

// No. 01 IS confirmed match for price-list "1" (teal blue interior, woman in blue)
console.log('\n── Behnoosh Momeni: rename No.01 → "1" ──')
await p('9wv3c53RQI1aqnVOhHgUfe', { title:'1', year:2022, medium:'Acrylic on Canvas', dimensions:'120×90 cm', price:3200 })

// ── Mojgan Miri: swap Unspoken I ↔ Stood in Doubts ──────────────────────────
// No.1 image = woman's back with blood = "Stood in Doubts"
// Home1 image = forest/house scene = "Unspoken I" (by elimination)
console.log('\n── Mojgan Miri: fix title/price swap ──')
await Promise.all([
  p('voupnMNE9rrQS0V5SLLFIB', { title:'Stood in Doubts', year:2023, medium:'Oil on Canvas', dimensions:'70×60 cm', price:2300 }),
  p('9wv3c53RQI1aqnVOhHghRp', { title:'Unspoken I',      year:2023, medium:'Oil on Canvas', dimensions:'100×70 cm', price:3500 }),
])

// ── Narges Mirnezhad: nature1/2/3 are landscapes, NOT bed/dark paintings ─────
console.log('\n── Narges Mirnezhad: revert nature series ──')
await Promise.all([
  p('voupnMNE9rrQS0V5SLL9IX', { title:'Nature 1', medium:'Oil on Canvas', price:null, dimensions:null, year:null }),
  p('voupnMNE9rrQS0V5SLL9Vl', { title:'Nature 2', medium:'Oil on Canvas', price:null, dimensions:null, year:null }),
  p('9wv3c53RQI1aqnVOhHgQS7', { title:'Nature 3', medium:'Oil on Canvas', price:null, dimensions:null, year:null }),
])

// ── Jamal Arabzadeh: Haroon series ≠ Iranian Living Room ─────────────────────
// Haroon BW = b&w portrait photo of man; Haroon Textile = Menorah mixed media textile
console.log('\n── Jamal Arabzadeh: revert Haroon artworks ──')
await Promise.all([
  p('S5poxwXylF3o9ymdwlePmO', { title:'Haroon SB9 BW',  medium:'Photography',         price:null, dimensions:null, year:null }),
  p('voupnMNE9rrQS0V5SLLEjn', { title:'Haroon Textile 6', medium:'Mixed Media · Textile', price:null, dimensions:null, year:null }),
])

// ── Fariba Oni: "Wish" image (Iranian banknote) ≠ "Tree of Life" (large textile) ──
// "Tree of Life" is a 120×100cm fabric/mirror piece — the banknote image is different
console.log('\n── Fariba Oni: revert Wish image ──')
await p('voupnMNE9rrQS0V5SLL5Ht', { title:'Wish', medium:'Photography', price:null, dimensions:null, year:null })

// ── CREATE correct records without wrong images ───────────────────────────────
// These are confirmed from price list but have no matching image in Sanity yet
console.log('\n── Creating records for artworks without Sanity images ──')

const behnoosh = await client.fetch(`*[_type=="artist" && name=="Behnoosh Momeni"][0]{_id}`)
const narges   = await client.fetch(`*[_type=="artist" && name=="Narges Mirnezhad"][0]{_id}`)
const fariba   = await client.fetch(`*[_type=="artist" && name=="Fariba Oni"][0]{_id}`)

const create = async (artistId, doc) => {
  const d = await client.create({ _type:'artwork', sold:false, ...doc })
  await client.patch(artistId).setIfMissing({ artworks:[] }).append('artworks',[{ _type:'reference', _ref:d._id, _key:d._id }]).commit()
  console.log(`  ✨ Created "${doc.title}" under ${artistId}`)
}

// Behnoosh: painting "8" and "29" and "Afra" (numbered acrylics not in Sanity)
await create(behnoosh._id, { title:'8',    year:2022, medium:'Acrylic on Canvas', dimensions:'120×90 cm',  price:3200 })
await create(behnoosh._id, { title:'29',   year:2022, medium:'Acrylic on Canvas', dimensions:'120×90 cm',  price:3200 })
await create(behnoosh._id, { title:'Afra', year:2022, medium:'Acrylic on Canvas', dimensions:'120×100 cm', price:3600 })

// Narges: "Bed" and two "Untitled" — different from her nature/portrait series
await create(narges._id, { title:'Bed',      year:2022, medium:'Oil on Canvas', dimensions:'70×50 cm', price:1800 })
await create(narges._id, { title:'Untitled', year:2022, medium:'Oil on Canvas', dimensions:'80×60 cm', price:2300 })
await create(narges._id, { title:'Untitled', year:2022, medium:'Oil on Canvas', dimensions:'80×60 cm', price:2300 })

// Fariba: actual "Tree of Life" (textile piece)
await create(fariba._id, { title:'Tree of Life', year:2023, medium:'Mixed Media on Satin Fabric, Digital Print, Sewed Photos and Mirrors', dimensions:'120×100 cm', price:2500 })

console.log('\n✅ Done')
