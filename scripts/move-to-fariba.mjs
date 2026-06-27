import { createClient } from '@sanity/client'
const client = createClient({ projectId:'cbulz0js', dataset:'production', apiVersion:'2024-01-01', token:process.env.SANITY_API_TOKEN, useCdn:false })

const HAROON_BW      = 'S5poxwXylF3o9ymdwlePmO'  // b&w portrait photo of man on wall
const HAROON_TEXTILE = 'voupnMNE9rrQS0V5SLLEjn'  // Menorah textile with sewed family photos = Tree of Life

const jamal  = await client.fetch(`*[_type=="artist" && name=="Jamal Arabzadeh"][0]{_id, artworks}`)
const fariba = await client.fetch(`*[_type=="artist" && name=="Fariba Oni"][0]{_id, artworks}`)

// ── Remove both from Jamal ───────────────────────────────────────────────────
const MOVE = [HAROON_BW, HAROON_TEXTILE]
const newJamal = (jamal.artworks || []).filter(r => !MOVE.includes(r._ref))
await client.patch(jamal._id).set({ artworks: newJamal }).commit()
console.log(`✓ Jamal: ${jamal.artworks?.length} → ${newJamal.length} artworks`)

// ── Add to Fariba (only if not already there) ────────────────────────────────
const inFariba = new Set((fariba.artworks || []).map(r => r._ref))
const toAdd = MOVE.filter(id => !inFariba.has(id)).map(id => ({ _type:'reference', _ref:id, _key:id }))
await client.patch(fariba._id).setIfMissing({ artworks:[] }).append('artworks', toAdd).commit()
console.log(`✓ Fariba: ${fariba.artworks?.length} → ${(fariba.artworks?.length||0)+toAdd.length} artworks`)

// ── "Haroon Textile 6" IS Fariba's "Tree of Life" ───────────────────────────
// Menorah-shaped fabric with sewed family photos = Tree of Life
await client.patch(HAROON_TEXTILE).set({
  title: 'Tree of Life',
  year: 2023,
  medium: 'Mixed Media on Satin Fabric, Digital Print, Sewed Photos and Mirrors',
  dimensions: '120×100 cm',
  price: 2500,
}).commit()
console.log('✓ Haroon Textile 6 → "Tree of Life"  120×100 cm  $2,500')

// ── "Haroon SB9 BW" = Fariba's photography, "Meet Me at the Alter" ──────────
// B&W portrait photo mounted on wall — from "After My Death" series
await client.patch(HAROON_BW).set({
  title: 'Meet Me at the Alter',
  year: 2016,
  medium: 'Photography, Digital Print on Epson Proofing Paper White Semimatte',
  dimensions: '18×12 cm',
  price: 200,
}).commit()
console.log('✓ Haroon SB9 BW → "Meet Me at the Alter"  18×12 cm  $200')

// ── Delete the empty "Tree of Life" placeholder we created earlier ────────────
const emptyTreeOfLife = await client.fetch(
  `*[_type=="artwork" && title=="Tree of Life" && !defined(image)][0]{_id}`
)
if (emptyTreeOfLife) {
  await client.delete(emptyTreeOfLife._id)
  console.log(`✓ Deleted empty "Tree of Life" placeholder ${emptyTreeOfLife._id}`)
}

// ── Also rename the "A Thousand Roses" image → it stays as Fariba's "Meet Me…"
// but since we just set HAROON_BW as "Meet Me at the Alter", rename A Thousand Roses back
const thousandRoses = await client.fetch(
  `*[_type=="artwork" && title=="A Thousand Roses"][0]{_id}`
)
if (thousandRoses) {
  // The A Thousand Roses image was originally set as "Meet Me at the Alter" in our
  // positional script — but that was already wrong. Revert to original title.
  await client.patch(thousandRoses._id).set({ title:'A Thousand Roses' }).commit()
  console.log('✓ Reverted "A Thousand Roses" back to original title')
}

console.log('\n✅ Done')
