import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'cbulz0js',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const BASE = 'https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/'

// GoDaddy filename → exhibition title keyword for matching
const COVER_MAP = [
  { filename: 'blob-5d318c5.png',                              matchTitle: 'morning is white' },
  { filename: 'WhatsApp Image 2023-04-28 at 11.54.47 AM.jpeg', matchTitle: 'woman' },
  { filename: 'photo_2022-10-19_09-45-15.jpg',                 matchTitle: 'echoes' },
  // Yazd / blob-670508d.png — need to download and upload this one
]

// Also need to upload blob-670508d.png for Yazd exhibition
const MISSING = { filename: 'blob-670508d.png', matchTitle: 'yazd' }

async function uploadFromUrl(filename) {
  const url = BASE + encodeURIComponent(filename)
  console.log(`Downloading ${filename}...`)
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${filename}`)
  const buffer = Buffer.from(await res.arrayBuffer())
  const ext = filename.split('.').pop().toLowerCase()
  const mimeType = ext === 'png' ? 'image/png' : 'image/jpeg'
  const asset = await client.assets.upload('image', buffer, { filename, contentType: mimeType })
  console.log(`  ✓ Uploaded → ${asset._id}`)
  return asset
}

async function findAssetByFilename(filename) {
  // Search by originalFilename
  const results = await client.fetch(
    `*[_type == "sanity.imageAsset" && originalFilename == $filename][0]{ _id }`,
    { filename }
  )
  return results
}

async function main() {
  // 1. List all exhibitions
  const exhibitions = await client.fetch(`*[_type == "exhibition"]{ _id, title, slug }`)
  console.log('\nExhibitions in Sanity:')
  exhibitions.forEach(e => console.log(`  ${e.slug.current} — "${e.title}"`))

  // 2. Upload missing Yazd cover
  let yazdAsset = await findAssetByFilename(MISSING.filename)
  if (!yazdAsset) {
    yazdAsset = await uploadFromUrl(MISSING.filename)
  } else {
    console.log(`\n${MISSING.filename} already in Sanity: ${yazdAsset._id}`)
  }

  // 3. Build full map including Yazd
  const fullMap = [...COVER_MAP, { filename: MISSING.filename, matchTitle: MISSING.matchTitle }]

  // 4. Find asset IDs and update exhibitions
  console.log('\nUpdating exhibition cover images...')
  for (const { filename, matchTitle } of fullMap) {
    let asset = await findAssetByFilename(filename)
    if (!asset) {
      try {
        asset = await uploadFromUrl(filename)
      } catch (err) {
        console.log(`  ✗ Could not get ${filename}: ${err.message}`)
        continue
      }
    }

    // Find matching exhibition
    const ex = exhibitions.find(e =>
      e.title.toLowerCase().includes(matchTitle.toLowerCase())
    )
    if (!ex) {
      console.log(`  ✗ No exhibition found matching "${matchTitle}"`)
      continue
    }

    await client
      .patch(ex._id)
      .set({ coverImage: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } } })
      .commit()

    console.log(`  ✓ "${ex.title}" → ${filename}`)
  }

  console.log('\n✅ Done')
}

main().catch(console.error)
