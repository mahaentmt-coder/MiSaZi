import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const imagesDir = path.join(__dirname, '../public/images')

const client = createClient({
  projectId: 'cbulz0js',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function uploadImage(filePath) {
  const buffer = fs.readFileSync(filePath)
  const filename = path.basename(filePath)
  const ext = path.extname(filename).toLowerCase().replace('.', '')
  const mimeType = ext === 'png' ? 'image/png' : 'image/jpeg'
  try {
    const asset = await client.assets.upload('image', buffer, { filename, contentType: mimeType })
    return asset
  } catch (err) {
    console.error(`  Failed to upload ${filename}:`, err.message)
    return null
  }
}

function img(file) {
  const p = path.join(imagesDir, file)
  return fs.existsSync(p) ? p : null
}

// ── Missing artists ────────────────────────────────────────────────────────────

const newArtists = [
  {
    name: 'Zahra Jamshidi',
    slug: 'zahra-jamshidi',
    medium: 'Painting · Photography · Graphic Design',
    featured: true,
    emerging: false,
    bio: `Zahra Jamshidi is a visual artist, graphic designer, and instructor who has been very active in promoting the artistic work of Iranian young artists. She holds an MA and BA in Graphic Design from Islamic Azad University, Tehran (2004, 2001) and has participated in over 60 exhibitions across Iran, Turkey, Armenia, Georgia, Qatar, Greece, and Oman. She is an established author in the field of graphic design education. In 2023 she participated in the "Morning Is White" group exhibition at High Line Nine Gallery, New York.`,
    instagram: 'misazi_art_gallery',
    photos: [],
    artworks: [],
  },
  {
    name: 'Ghazaleh Tavakolmand',
    slug: 'ghazaleh-tavakolmand',
    medium: 'Painting · Graphic Design',
    featured: true,
    emerging: false,
    bio: `Ghazaleh Tavakolmand was born in Tehran in 1979. She focuses on social issues, particularly women's experiences and domestic violence, pairing her paintings with contrasting poetry by renowned poets such as Rumi to create a series of contrasting feelings for the audience. Over the past four years she has conducted expressive art sessions for children with special needs and curated collaborative exhibitions. She holds a BA in Graphic Design from Shahed University, Tehran (2005).`,
    instagram: 'misazi_art_gallery',
    photos: [],
    artworks: [],
  },
  {
    name: 'Atefeh Etemadi',
    slug: 'atefeh-etemadi',
    medium: 'Painting',
    featured: false,
    emerging: true,
    bio: `Atefeh Etemadi is a painter from Shiraz who draws inspiration from her surroundings and daily life objects. She holds a BA in Painting from Shiraz Azad University (2020) and is developing a new collection for an upcoming solo exhibition. She teaches at Shiraz House of Art and Chaav Art Academy. Her work has been shown in exhibitions across Iran, the USA, Turkey, and online platforms internationally.`,
    instagram: 'etemadi.atefehpainting',
    photos: [],
    artworks: [],
  },
  {
    name: 'Maryam Zahraei',
    slug: 'maryam-zahraei',
    medium: 'Painting · Multimedia',
    featured: false,
    emerging: true,
    bio: `Maryam Zahraei is a young talented artist using multimedia techniques to express her artistic ideas. She believes creativity has no limitation and is always exploring novel approaches. She holds an MA in Painting from Art University Neishaboor (2022) and a BA in Painting from Shiraz Azad University (2018). She has shown her work at Sarvnaz Gallery in Shiraz and Mellat Gallery in Tehran.`,
    instagram: 'misazi_art_gallery',
    photos: ['maryam.JPG'],
    artworks: [],
  },
  {
    name: 'Armita Jafari',
    slug: 'armita-jafari',
    medium: 'Painting',
    featured: false,
    emerging: true,
    bio: `Armita A.S. Jafari holds a BA in Painting from Shiraz Azad University (2020) and serves as COO of MiSaZi Art Gallery. Her artistic practice explores the intersection of innovation and strategy through storytelling. She has exhibited at the "Morning Is White" group exhibition at High Line Nine Gallery, New York (2023) and at Echoes of Eternity and Sustainable Dreams, Jaryan Art Gallery, Yazd (2024).`,
    instagram: 'misazi_art_gallery',
    photos: [],
    artworks: [],
  },
]

// ── Workshops ──────────────────────────────────────────────────────────────────

const workshops = [
  {
    title: 'Art & Aural Imagination',
    slug: 'art-aural-imagination',
    status: 'past',
    instructor: 'Dr. Mahsa Pakravan',
    description: `Organized by Dr. Mahsa Pakravan, an ethnomusicologist, art educator, and researcher based in Toronto, Canada. This series explored the impacts of sound and sonic environments on artistic creativity. Participants engaged with multi-media visual art approaches, becoming active listeners while examining surrounding soundscapes and landscapes.\n\nWorkshops in the series included:\n\n• Sing, Play, and Jam Along — Based on the Orff Schulwerk approach, combining speech, rhythm, movement, dance, and song for children and families. Parents and caregivers participated actively.\n\n• Soundscape, Landscape, and Creativity (with Mojgan Mirisaee) — Engaging visual artists in observing sonic environments and integrating sound into their visual practice.\n\n• Active Movement Meditation Dance (instructor: Shima Mahdavi) — Featuring Bharatanatyam, an Indian classical dance form, as a meditative practice.\n\n• World Music and Multilingual Children — Interactive sessions representing diverse musical traditions to motivate families teaching heritage languages.`,
    topics: ['Sound & Art', 'Ethnomusicology', 'Movement', 'Multilingual Learning', 'Meditation'],
    category: 'Music',
    coverImage: 'family-workshop.jpg',
  },
  {
    title: 'Collage Art',
    slug: 'collage-art',
    status: 'past',
    instructor: 'Fariba Oni',
    description: `Led by multi-media artist Fariba Oni, this workshop series explored collage, jewellery design, and sustainable art practices.\n\n• Mixed Media Collage — Students explored art creation methods and learned to craft diverse colour palettes and forms, selecting from available materials to create original pieces.\n\n• Creative Jewellery Design — A narrative-focused approach where students mastered diverse jewellery design techniques and materials' chemical reactions, developing sketches before producing finished work.\n\n• Recycled Art Project — Students examined sustainability and waste reduction by gathering cloth, plastic, paper, and similar items to craft artwork inspired by personal concepts.`,
    topics: ['Collage', 'Mixed Media', 'Jewellery Design', 'Sustainability', 'Recycled Art'],
    category: 'Mixed Media',
    coverImage: null,
  },
  {
    title: 'Innovative Art',
    slug: 'innovative-art',
    status: 'past',
    instructor: 'Mojgan Mirisaee',
    description: `Led by artist, instructor, and researcher Mojgan Mirisaee, this series introduced participants to diverse visual art approaches across painting, printmaking, and drawing.\n\n• Abstract Painting — Exploring new ways of looking at nature and the surrounding environment through colour application techniques between realistic and abstract styles.\n\n• Indonesian Batik Techniques — Interactive series introducing multiple printmaking methods including batik, eco-print, monoprint, relief, etching, digital, and hybrid approaches.\n\n• Japanese Marbling: Suminagashi — A meditative practice working with ink and colour mixing to explore improvisation and design decision-making.\n\n• Creative Figure Painting — Classical portrait skills with creative departures from photographic references, focusing on likeness and light/shadow.\n\n• Still-Life Drawing — Examining daily life through painting familiar objects and personal spaces as a form of stress management.`,
    topics: ['Abstract Painting', 'Batik', 'Printmaking', 'Marbling', 'Portrait', 'Still Life'],
    category: 'Painting',
    coverImage: 'Jaanese-marbling.jpg',
  },
]

// ── Main ───────────────────────────────────────────────────────────────────────

async function main() {
  console.log('Fetching existing data...')
  const existing = await client.fetch(`*[_type == "artist"] { _id, slug }`)
  const slugToId = Object.fromEntries(existing.map((a) => [a.slug.current, a._id]))
  console.log(`Found ${existing.length} existing artists`)

  // ── Add missing artists ──────────────────────────────────────────────────
  console.log('\n── Adding missing artists')
  for (const artist of newArtists) {
    if (slugToId[artist.slug]) {
      console.log(`  Skipping (exists): ${artist.name}`)
      continue
    }

    let photoRef = null
    for (const photoFile of artist.photos) {
      const p = img(photoFile)
      if (p) {
        console.log(`  Uploading photo: ${photoFile}`)
        const asset = await uploadImage(p)
        if (asset) {
          photoRef = { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
          break
        }
      }
    }

    const doc = {
      _type: 'artist',
      name: artist.name,
      slug: { _type: 'slug', current: artist.slug },
      medium: artist.medium,
      bio: artist.bio,
      featured: artist.featured,
      emerging: artist.emerging,
      instagram: artist.instagram,
      ...(photoRef && { photo: photoRef }),
    }

    const created = await client.create(doc)
    slugToId[artist.slug] = created._id
    console.log(`  ✓ Created: ${artist.name} (${created._id})`)
  }

  // ── Create workshops ─────────────────────────────────────────────────────
  console.log('\n── Creating workshops')
  const existingWorkshops = await client.fetch(`*[_type == "workshop"] { slug }`)
  const workshopSlugs = new Set(existingWorkshops.map((w) => w.slug?.current))

  for (const ws of workshops) {
    if (workshopSlugs.has(ws.slug)) {
      console.log(`  Skipping (exists): ${ws.title}`)
      continue
    }

    let coverRef = null
    if (ws.coverImage) {
      const p = img(ws.coverImage)
      if (p) {
        console.log(`  Uploading cover: ${ws.coverImage}`)
        const asset = await uploadImage(p)
        if (asset) coverRef = { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
      }
    }

    // Link instructor artist ref if exists
    const instructorSlugMap = {
      'Fariba Oni': 'fariba-oni',
      'Mojgan Mirisaee': 'mojgan-miri',
    }
    const instructorSlug = Object.entries(instructorSlugMap).find(([name]) =>
      ws.instructor.includes(name)
    )?.[1]
    const instructorId = instructorSlug ? slugToId[instructorSlug] : null

    const doc = {
      _type: 'workshop',
      title: ws.title,
      slug: { _type: 'slug', current: ws.slug },
      status: ws.status,
      instructor: ws.instructor,
      description: ws.description,
      topics: ws.topics,
      category: ws.category,
      ...(coverRef && { coverImage: coverRef }),
      ...(instructorId && { instructorRef: { _type: 'reference', _ref: instructorId } }),
    }

    const created = await client.create(doc)
    console.log(`  ✓ Created workshop: ${ws.title} (${created._id})`)
  }

  // ── Update NY Exhibition with all artists ────────────────────────────────
  console.log('\n── Updating NY Exhibition (Morning Is White)')
  const nyEx = await client.fetch(`*[_type == "exhibition" && slug.current == "morning-is-white"][0]{ _id }`)
  if (nyEx) {
    const nySlugs = ['fariba-oni', 'hamidreza-emami', 'behnoosh-momeni', 'narges-mirnezhad', 'hamid-shiri', 'mahsa-sohrabi', 'mojgan-miri', 'zahra-jamshidi', 'jamal-arabzadeh', 'armita-jafari']
    const nyRefs = nySlugs.map((s) => slugToId[s]).filter(Boolean).map((id) => ({ _type: 'reference', _ref: id, _key: id }))
    await client.patch(nyEx._id).set({ artists: nyRefs }).commit()
    console.log(`  ✓ Updated Morning Is White with ${nyRefs.length} artists`)
  }

  // ── Update Yazd Exhibition ───────────────────────────────────────────────
  console.log('\n── Updating Yazd Exhibition')
  const yazdEx = await client.fetch(`*[_type == "exhibition" && slug.current == "echoes-of-eternity"][0]{ _id }`)
  if (yazdEx) {
    const yazdSlugs = ['behnoosh-momeni', 'mojgan-miri', 'farshid-barghi', 'armita-jafari']
    const yazdRefs = yazdSlugs.map((s) => slugToId[s]).filter(Boolean).map((id) => ({ _type: 'reference', _ref: id, _key: id }))
    await client.patch(yazdEx._id).set({ artists: yazdRefs }).commit()
    console.log(`  ✓ Updated Yazd Exhibition with ${yazdRefs.length} artists`)
  }

  console.log('\n✅ All done!')
}

main().catch(console.error)
