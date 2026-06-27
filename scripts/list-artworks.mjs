import { createClient } from '@sanity/client'
const client = createClient({ projectId:'cbulz0js', dataset:'production', apiVersion:'2024-01-01', token:process.env.SANITY_API_TOKEN, useCdn:false })

const artworks = await client.fetch(`*[_type == "artwork"] | order(_createdAt asc) {
  _id, title, year, medium, dimensions,
  "artistName": *[_type=="artist" && references(^._id)][0].name
}`)

console.log(JSON.stringify(artworks, null, 2))
