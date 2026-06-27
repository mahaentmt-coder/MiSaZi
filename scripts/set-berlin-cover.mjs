import { createClient } from '@sanity/client'
const client = createClient({ projectId:'cbulz0js', dataset:'production', apiVersion:'2024-01-01', token:process.env.SANITY_API_TOKEN, useCdn:false })

const berlin = await client.fetch(`*[_type=="exhibition" && slug.current == "aaf-berlin"][0]{ _id }`)
const asset = await client.fetch(`*[_type=="sanity.imageAsset" && originalFilename == "artfair-berlin-13-15-jun-Final.jpg"][0]{ _id }`)
console.log('berlin:', berlin, '  asset:', asset)
if (berlin && asset) {
  await client.patch(berlin._id).set({ coverImage: { _type:'image', asset: { _type:'reference', _ref: asset._id } } }).commit()
  console.log('✓ Berlin cover set')
}

// Also set Morning Is White cover if not set (using blob-5d318c5.png)
const miwAsset = await client.fetch(`*[_type=="sanity.imageAsset" && originalFilename == "blob-5d318c5.png"][0]{ _id }`)
const miw = await client.fetch(`*[_type=="exhibition" && slug.current == "morning-is-white"][0]{ _id, coverImage }`)
if (miw && miwAsset && !miw.coverImage) {
  await client.patch(miw._id).set({ coverImage: { _type:'image', asset: { _type:'reference', _ref: miwAsset._id } } }).commit()
  console.log('✓ Morning Is White cover set')
} else {
  console.log('Morning Is White already has cover or asset missing')
}
