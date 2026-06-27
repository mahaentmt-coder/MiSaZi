import { createClient } from '@sanity/client'
const client = createClient({ projectId:'cbulz0js', dataset:'production', apiVersion:'2024-01-01', token:process.env.SANITY_API_TOKEN, useCdn:false })

const assets = await client.fetch(`*[_type == "sanity.imageAsset"] | order(originalFilename asc) {
  _id, originalFilename, url
}`)

// Print just filenames for scanning
assets.forEach(a => console.log(`${a._id}\t${a.originalFilename}`))
console.error(`\nTotal: ${assets.length} assets`)
