import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'cbulz0js',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function main() {
  // Fix Women, Life, Freedom cover
  const wlf = await client.fetch(`*[_type == "exhibition" && slug.current == "women-life-freedom"][0]{ _id }`)
  const wlfAsset = await client.fetch(
    `*[_type == "sanity.imageAsset" && originalFilename == "WhatsApp Image 2023-04-28 at 11.54.47 AM.jpeg"][0]{ _id }`
  )
  if (wlf && wlfAsset) {
    await client.patch(wlf._id).set({
      coverImage: { _type: 'image', asset: { _type: 'reference', _ref: wlfAsset._id } }
    }).commit()
    console.log('✓ Women, Life, Freedom cover set')
  } else {
    console.log('✗ Could not find WLF exhibition or asset', { wlf, wlfAsset })
  }

  // Create Yazd "Morning Is White" exhibition with blob-670508d.png
  const yazdAsset = await client.fetch(
    `*[_type == "sanity.imageAsset" && originalFilename == "blob-670508d.png"][0]{ _id }`
  )
  const existing = await client.fetch(`*[_type == "exhibition" && slug.current == "morning-is-white-yazd"][0]{ _id }`)
  if (!existing && yazdAsset) {
    // Get artist refs from the existing Morning Is White NY exhibition
    const ny = await client.fetch(`*[_type == "exhibition" && slug.current == "morning-is-white"][0]{ artists }`)
    await client.create({
      _type: 'exhibition',
      title: 'Morning Is White — Yazd',
      slug: { _type: 'slug', current: 'morning-is-white-yazd' },
      status: 'past',
      startDate: '2023-01-01',
      location: 'Misazi & Jaryan Art Gallery, Yazd, Iran',
      description: 'A group exhibition held at Misazi & Jaryan Art Gallery in Yazd, Iran, bringing together a selection of contemporary works by Iranian artists.',
      coverImage: { _type: 'image', asset: { _type: 'reference', _ref: yazdAsset._id } },
      artists: ny?.artists || [],
    })
    console.log('✓ Created Yazd exhibition')
  } else if (existing && yazdAsset) {
    await client.patch(existing._id).set({
      coverImage: { _type: 'image', asset: { _type: 'reference', _ref: yazdAsset._id } }
    }).commit()
    console.log('✓ Updated Yazd exhibition cover')
  } else {
    console.log('✗ Yazd asset not found or exhibition already correct', { yazdAsset })
  }

  console.log('\n✅ Done')
}

main().catch(console.error)
