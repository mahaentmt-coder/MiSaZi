import { createClient } from '@sanity/client'
const client = createClient({ projectId: 'cbulz0js', dataset: 'production', apiVersion: '2024-01-01', token: process.env.SANITY_API_TOKEN, useCdn: false })
const artist = await client.fetch('*[_type=="artist" && slug.current == "mojgan-miri"][0]{ _id }')
await client.patch(artist._id).set({
  bio: `Mojgan Miri is an artist, curator, instructor, researcher, and art entrepreneur based in Toronto and Shiraz. She is the founder and artistic director of MiSaZi Art Gallery, working closely with artists residing in the diaspora and in Iran.\n\nHer paintings draw from daily life happenings and are impacted by socio-political issues in her country and around the world. She explores the blurry borders of truth and uncertainty as well as reality and dreams.\n\nShe holds an MA in Painting and an MA in Art Research from Art University Tehran, and a BA in Painting from the University of Shahed Tehran. From 2010 to 2022 she taught painting, batik, landscape, figurative drawing, watercolour, art history, and visual analysis at multiple institutions including Shiraz Art University, Azad University, and Apadana Institute.`,
  website: 'https://misaziart.com',
  medium: 'Painting · Watercolour · Batik',
}).commit()
console.log('✓ Updated Mojgan Miri')
