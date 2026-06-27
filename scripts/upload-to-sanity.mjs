import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const client = createClient({
  projectId: 'cbulz0js',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const imagesDir = path.join(__dirname, '../public/images')

// Artist definitions — maps filenames to artist data
const artists = [
  {
    name: 'Fariba Oni',
    slug: 'fariba-oni',
    medium: 'Painting · Mixed Media',
    featured: true,
    instagram: 'fariba.oni',
    photos: ['fariba_Tube03.jpg', 'fariba.JPG'],
    artworks: [
      { file: 'Wish_Fariba Ouni.jpg', title: 'Wish' },
      { file: 'A Thousand Roses.jpg', title: 'A Thousand Roses' },
      { file: 'The weather was nice.jpg', title: 'The Weather Was Nice' },
      { file: 'In memory of life.jpg', title: 'In Memory of Life' },
      { file: 'brooch1.jpg', title: 'Brooch 1' },
      { file: 'Parrot2 final.jpg', title: 'Parrot 2' },
    ],
  },
  {
    name: 'Hamidreza Emami',
    slug: 'hamidreza-emami',
    medium: 'Photography',
    featured: true,
    photos: ['Hamidreza.jpg'],
    artworks: [
      { file: 'DSC_8347_bw2.jpg', title: 'Untitled I' },
      { file: 'DSC_6782_bw.jpg', title: 'Untitled II' },
      { file: 'DSC_6794-e.jpg', title: 'Untitled III' },
      { file: '0A7A5278.jpg', title: 'Exhibition Shot I' },
      { file: '0A7A5228.jpg', title: 'Exhibition Shot II' },
      { file: '0A7A5217.jpg', title: 'Exhibition Shot III' },
    ],
  },
  {
    name: 'Behnoosh Momeni',
    slug: 'behnoosh-momeni',
    medium: 'Digital · Installation',
    featured: true,
    photos: ['behnoosh momeni.jpeg'],
    artworks: [
      { file: 'H35.jpg', title: 'H35' },
      { file: 'H37.jpg', title: 'H37' },
      { file: 'H26.jpg', title: 'H26' },
      { file: 'NOOR1.jpg', title: 'Noor 1' },
      { file: 'NOOR2.jpg', title: 'Noor 2' },
      { file: 'my mirrors a place to hide.jpg', title: 'My Mirrors — A Place to Hide' },
    ],
  },
  {
    name: 'Mojtaba Asadi',
    slug: 'mojtaba-asadi',
    medium: 'Sculpture',
    featured: true,
    photos: ['Mojtaba.jpg'],
    artworks: [
      { file: 'mask1.jpg', title: 'Mask 1' },
      { file: 'mask6.jpg', title: 'Mask 6' },
      { file: 'mask7.jpg', title: 'Mask 7' },
      { file: 'OBJECT2.jpg', title: 'Object 2' },
      { file: 'OBJECT3.jpg', title: 'Object 3' },
      { file: 'OBJECT4.jpg', title: 'Object 4' },
    ],
  },
  {
    name: 'Narges Mirnezhad',
    slug: 'narges-mirnezhad',
    medium: 'Painting · Textile',
    featured: true,
    photos: ['Plan de travail 27_5.jpg'],
    artworks: [
      { file: 'nature 1.jpg', title: 'Nature 1' },
      { file: 'nature 2.jpg', title: 'Nature 2' },
      { file: 'nature 3.jpg', title: 'Nature 3' },
      { file: 'nature 4.jpg', title: 'Nature 4' },
      { file: 'nature 5.jpg', title: 'Nature 5' },
      { file: 'nature 6.jpg', title: 'Nature 6' },
      { file: 'portrait 32.jpg', title: 'Portrait 32' },
      { file: 'portrait 30.jpg', title: 'Portrait 30' },
      { file: 'portrait 28.jpg', title: 'Portrait 28' },
    ],
  },
  {
    name: 'Hamid Shiri',
    slug: 'hamid-shiri',
    medium: 'Drawing · Print',
    featured: true,
    photos: ['IMG_3083.JPG'],
    artworks: [
      { file: 'No. 01, 80x120, Acrylic, 2021.jpg', title: 'No. 01', year: 2021, medium: 'Acrylic', dimensions: '80×120 cm' },
      { file: 'No. 04, 90x120, Acrylic, 2022.jpg', title: 'No. 04', year: 2022, medium: 'Acrylic', dimensions: '90×120 cm' },
      { file: 'No. 05, 90x120, Acrylic, 2022.jpg', title: 'No. 05', year: 2022, medium: 'Acrylic', dimensions: '90×120 cm' },
      { file: 'No. 09, 80x120, Acrylic, 2022.jpg', title: 'No. 09', year: 2022, medium: 'Acrylic', dimensions: '80×120 cm' },
      { file: 'No. 10, 90x120, Acrylic, 2021.jpg', title: 'No. 10', year: 2021, medium: 'Acrylic', dimensions: '90×120 cm' },
      { file: 'No. 14, 80x120, Acrylic, 2021.jpg', title: 'No. 14', year: 2021, medium: 'Acrylic', dimensions: '80×120 cm' },
      { file: 'No. 16, 80x120, Acrylic, 2022.jpg', title: 'No. 16', year: 2022, medium: 'Acrylic', dimensions: '80×120 cm' },
      { file: 'No. 17, 80x120, Acrylic, 2021.jpg', title: 'No. 17', year: 2021, medium: 'Acrylic', dimensions: '80×120 cm' },
    ],
  },
  {
    name: 'Mahsa Sohrabi',
    slug: 'mahsa-sohrabi',
    medium: 'Painting',
    emerging: true,
    photos: ['Mahsa-Photo.jpg'],
    artworks: [
      { file: 'Wedding final.jpg', title: 'Wedding' },
    ],
  },
  {
    name: 'Farshid Barghi',
    slug: 'farshid-barghi',
    medium: 'Mixed Media',
    emerging: true,
    photos: ['Farshid-profile.JPG'],
    artworks: [
      { file: 'farshid barghi 1.jpeg', title: 'Untitled' },
    ],
  },
  {
    name: 'Jamal Arabzadeh',
    slug: 'jamal-arabzadeh',
    medium: 'Photography',
    featured: true,
    photos: ['Jamal.jpg', 'Jamal Arabzadeh.jpg'],
    artworks: [
      { file: 'IMG_7521.jpg', title: 'Untitled I' },
      { file: 'IMG_7513.jpg', title: 'Untitled II' },
      { file: 'IMG_7530.jpg', title: 'Untitled III' },
      { file: 'Haroon SB9 BW.jpg', title: 'Haroon SB9 BW' },
      { file: 'Haroon Textile6.jpg', title: 'Haroon Textile 6' },
    ],
  },
  {
    name: 'Mojgan Miri',
    slug: 'mojgan-miri',
    medium: 'Painting',
    featured: true,
    photos: ['Mojgan.jpg'],
    artworks: [
      { file: 'Mojgan Mirisaee_No.1_Oil on Canvas_60cm x 70cm.jpg', title: 'No. 1', medium: 'Oil on Canvas', dimensions: '60×70 cm' },
      { file: 'Mojgan Mirisaee_No.2_Oil on Canvas_60cm x 70cm.jpg', title: 'No. 2', medium: 'Oil on Canvas', dimensions: '60×70 cm' },
      { file: 'Mojgan-Home01.jpg', title: 'Home 1' },
      { file: 'Mojgan-Home02.jpg', title: 'Home 2' },
    ],
  },
]

async function uploadImage(filePath) {
  const buffer = fs.readFileSync(filePath)
  const filename = path.basename(filePath)
  const ext = path.extname(filename).toLowerCase().replace('.', '')
  const mimeType = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : ext === 'png' ? 'image/png' : 'image/jpeg'

  try {
    const asset = await client.assets.upload('image', buffer, {
      filename,
      contentType: mimeType,
    })
    return asset
  } catch (err) {
    console.error(`  Failed to upload ${filename}:`, err.message)
    return null
  }
}

async function main() {
  console.log('Starting Sanity upload...\n')

  for (const artist of artists) {
    console.log(`\n── ${artist.name}`)

    // Upload portrait photo
    let photoRef = null
    for (const photoFile of (artist.photos || [])) {
      const photoPath = path.join(imagesDir, photoFile)
      if (fs.existsSync(photoPath)) {
        console.log(`  Uploading photo: ${photoFile}`)
        const asset = await uploadImage(photoPath)
        if (asset) {
          photoRef = { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
          break
        }
      }
    }

    // Upload artworks
    const artworkRefs = []
    for (const aw of (artist.artworks || [])) {
      const awPath = path.join(imagesDir, aw.file)
      if (!fs.existsSync(awPath)) {
        console.log(`  Skipping (not found): ${aw.file}`)
        continue
      }
      console.log(`  Uploading artwork: ${aw.file}`)
      const asset = await uploadImage(awPath)
      if (!asset) continue

      const artworkDoc = await client.create({
        _type: 'artwork',
        title: aw.title,
        year: aw.year || null,
        medium: aw.medium || artist.medium || null,
        dimensions: aw.dimensions || null,
        sold: false,
        image: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } },
      })
      artworkRefs.push({ _type: 'reference', _ref: artworkDoc._id, _key: artworkDoc._id })
      console.log(`    ✓ Created artwork: ${aw.title}`)
    }

    // Create artist document
    const artistDoc = {
      _type: 'artist',
      name: artist.name,
      slug: { _type: 'slug', current: artist.slug },
      medium: artist.medium,
      featured: artist.featured || false,
      emerging: artist.emerging || false,
      ...(artist.instagram && { instagram: artist.instagram }),
      ...(photoRef && { photo: photoRef }),
      ...(artworkRefs.length > 0 && { artworks: artworkRefs }),
    }

    const created = await client.create(artistDoc)
    console.log(`  ✓ Created artist: ${artist.name} (${created._id})`)
  }

  console.log('\n✅ All done!')
}

main().catch(console.error)
