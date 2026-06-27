import { createClient } from '@sanity/client'
const client = createClient({ projectId:'cbulz0js', dataset:'production', apiVersion:'2024-01-01', token:process.env.SANITY_API_TOKEN, useCdn:false })

// Catalog entries matched to Sanity image assets by filename/artist name
// assetId comes from the originalFilename scan, existingArtworkId where record already exists
const MATCHES = [
  // ── Artists already in Sanity ────────────────────────────────────────────
  {
    artist: 'Farshid Barghi', title: 'Untitled', year: 2024, dimensions: '40×60 cm', medium: 'Print on canvas',
    assetId: 'image-bc6f5c59f186f2f9b115399fe8d5378933b7fa4c-1920x1285-jpg', // farshid barghi 1.jpeg
    existingArtworkId: 'S5poxwXylF3o9ymdwleMxj',
  },
  {
    artist: 'Behnoosh Momeni', title: 'Untitled', year: 2024, dimensions: '100×120 cm', medium: 'Acrylic on canvas',
    assetId: 'image-ec0bd1305ef5a5c7c99a3fb52088c8b149b01e87-1920x2297-jpg', // behnoosh momeni.jpeg
    existingArtworkId: null, // new artwork for an existing artist
  },

  // ── New artists & artworks ───────────────────────────────────────────────
  { artist: 'Niloofar Khosravani',   title: 'Untitled',         year: 2024, dimensions: '10×10×10 cm',  medium: 'Plaster',                    assetId: 'image-2a540ce2e9bc557f8d92652daa74043063255ae7-1280x960-jpg'  },
  { artist: 'Sajad Ebrahimi',        title: 'Water of Life',    year: 2024, dimensions: '39×54 cm',      medium: 'Mixed Media',                 assetId: 'image-041661d5fe4de04f65c94a3202530cc2ace72775-1788x2560-jpg' },
  { artist: 'Koorosh Lornezhad',     title: 'Nostalgia',        year: 2024, dimensions: '32.5×49 cm',    medium: 'Oil on cardboard',            assetId: 'image-50a64a24003cd1c44be8b94c6d79ef04b81d3835-1715x2560-jpg' },
  { artist: 'Parniyan Amiri',        title: 'The Ocean',        year: 2023, dimensions: '21×29.7 cm',    medium: 'Pen on paper',                assetId: 'image-c931b659add8da711f836fa57c18cf7ece72111b-1920x2436-jpg' },
  { artist: 'Parniyan Amiri',        title: 'Untitled',         year: 2023, dimensions: '42×29.7 cm',    medium: 'Pen on paper',                assetId: 'image-34edab8c5746cb1608918081e332cedf5e32e93f-1920x2553-jpg' },
  { artist: 'Mansooreh Aslemarz',    title: 'Untitled',         year: 2022, dimensions: '25×35 cm',      medium: 'Oil on canvas',               assetId: 'image-cc6ad080ca66bbe6cc05c4c22c58ebab6f310b9c-1080x766-jpg'  },
  { artist: 'Mansooreh Aslemarz',    title: 'Untitled II',      year: 2022, dimensions: '25×35 cm',      medium: 'Oil on canvas',               assetId: 'image-04fd3a314dae89c1fe796b80b9a401f7c37096fd-1080x710-jpg'  },
  { artist: 'Jaleh Akhlaghi',        title: 'Untitled',         year: 2020, dimensions: '42×24×11 cm',   medium: 'Papier mache',                assetId: 'image-b8101e1601ed54bf3730293e94c1ed1115fb0128-1792x2560-jpg' },
  { artist: 'Javad Razavi',          title: 'Untitled',         year: 2024, dimensions: '21×29.7 cm',    medium: 'Mixed media',                 assetId: 'image-6cb0fd46034a5fda7ab53bdfdd9d086cd4a1c80d-1886x2560-jpg' },
  { artist: 'Javad Razavi',          title: 'Untitled II',      year: 2024, dimensions: '21×29.7 cm',    medium: 'Mixed media',                 assetId: 'image-9c4d4f69fc2037021e0cba04421afd8ef775a5cd-1920x2560-jpg' },
  { artist: 'Erfan Jami',            title: 'Once',             year: 2024, dimensions: '29×44 cm',      medium: 'Mixed media',                 assetId: 'image-91dc3740aa05e17d7ddb76bfd9d03d723e11bbc1-1582x2560-jpg' },
  { artist: 'Maryam Rangamiz',       title: 'Untitled',         year: 2023, dimensions: '80×60 cm',      medium: 'Oil on canvas',               assetId: 'image-303a947840662c1cf7c41c033857f0ecda277625-845x1136-jpg'  },
  { artist: 'Atena Aftabi',          title: 'Frostbite',        year: 2024, dimensions: '30×40 cm',      medium: 'Rapid on cardboard',          assetId: 'image-4bb47a890800d9babe625a467abce49adc4f392c-894x1280-jpg'  },
  { artist: 'Atena Aftabi',          title: 'Frostbite II',     year: 2024, dimensions: '30×40 cm',      medium: 'Rapid on cardboard',          assetId: 'image-a0579954e9975fc5c2a6cbe2eca79d22a24f020c-747x1125-jpg'  },
  { artist: 'Pardis Hosseini',       title: 'Untitled',         year: 2023, dimensions: '60×80 cm',      medium: 'Mixed media',                 assetId: 'image-e6db06d811648e7fafe439ae1b5812c070eb278a-640x416-jpg'   },
  { artist: 'Shirin Arasteh',        title: 'Destiny Sisters',  year: 2023, dimensions: '21×29.5 cm',    medium: 'Rapid on paper',              assetId: 'image-d70ad9ae21bd3ca8f3c9024d3fbb5651cd317b0f-925x1230-jpg'  },
  { artist: 'Shirin Arasteh',        title: 'Orpheus',          year: 2023, dimensions: '21×29.5 cm',    medium: 'Rapid on paper',              assetId: 'image-c9c011870667aa6eb21c4c6583204486f9fbb704-1170x969-jpg'  },
  { artist: 'Bahar Yousefi',         title: 'Untitled',         year: 2024, dimensions: '20 cm diameter',medium: 'Watercolor on canvas',        assetId: 'image-cf0acddd0264b76e027687c781f9f72f26949f0e-1077x1280-jpg' },
  { artist: 'Negar Refaee',          title: 'Untitled',         year: 2013, dimensions: '44×30 cm',      medium: 'Acrylic on cardboard',        assetId: 'image-291590d70baea88befe4139259e3dbc5599060de-790x1074-jpg'  },
  { artist: 'Abdolrahman Mojarrad',  title: 'Untitled',         year: 2013, dimensions: '70×100 cm',     medium: 'Photo print',                 assetId: 'image-3fe567bc52b39f9ece6d2259609e6f777166896c-1920x1265-jpg' },
  { artist: 'Artemis Lahsaei',       title: 'Untitled',         year: 2024, dimensions: '80×80 cm',      medium: 'Mixed media',                 assetId: 'image-7dcdf0a625b7e4b25815c45b75ed2a1968aef34f-1529x1429-jpg' },
  { artist: 'Artemis Lahsaei',       title: 'Untitled II',      year: 2024, dimensions: '80×80 cm',      medium: 'Mixed media',                 assetId: 'image-97ec8b2a13c942c23317cf26ebe45836668cf440-1514x1430-jpg' },
  { artist: 'Mahdieh Rezaei',        title: 'Untitled',         year: 2024, dimensions: '38×23 cm',      medium: 'Mixed media on cardboard',    assetId: 'image-ffc3b5fa4fe5cb3289b1c29a4e6844bc2796d0ed-1920x1170-jpg' },
  { artist: 'Mahdieh Rezaei',        title: 'Untitled II',      year: 2024, dimensions: '40×27 cm',      medium: 'Mixed media on cardboard',    assetId: 'image-7c646fd66c7418b78c60a05ec7ce67eee3f357e2-1920x1362-jpg' },
  { artist: 'Leila Sheybani',        title: 'Untitled',         year: 2022, dimensions: '36×50 cm',      medium: 'Cotton',                      assetId: 'image-682dd274443d93277751d8f8a5a5d90abd28c286-1743x1898-jpg' },
  { artist: 'Leila Sheybani',        title: 'Untitled II',      year: 2022, dimensions: '28×30 cm',      medium: 'Cotton',                      assetId: 'image-c1551c7d3cd772e8ea16a062176c92a732036d3e-716x881-jpg'   },
  { artist: 'Zahra Hasani',          title: 'Untitled',         year: 2024, dimensions: '50×70 cm',      medium: 'Disperse color on cardboard', assetId: 'image-6826fc927e090911559a7a15ecc293c5002f0c13-690x831-jpg'   },
  { artist: 'Razieh Khosravi',       title: 'Sarve Iranshahr',  year: 2024, dimensions: '27×42 cm',      medium: 'Digital',                     assetId: 'image-865649996ea79bee5e1a21b512f1e5a7b520ffa7-1280x1280-jpg' },
  { artist: 'Tuba Khani',            title: 'Untitled',         year: 2023, dimensions: '50×70 cm',      medium: 'Mixed media',                 assetId: 'image-11cacec879b57236f89734a644bd3d31c930d2e0-1890x2560-jpg' },
]

// Fetch existing artists
const existingArtists = await client.fetch(`*[_type == "artist"] { _id, name }`)
const artistMap = {}
existingArtists.forEach(a => { artistMap[a.name.toLowerCase()] = a._id })

console.log('Existing artists:', Object.keys(artistMap))

// Helper: get or create artist
async function getOrCreateArtist(name) {
  const key = name.toLowerCase()
  if (artistMap[key]) return artistMap[key]

  const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  const doc = await client.create({
    _type: 'artist',
    name,
    slug: { _type: 'slug', current: slug },
    featured: false,
    emerging: true,
    medium: '',
    bio: '',
  })
  artistMap[key] = doc._id
  console.log(`  ✨ Created artist: ${name} (${doc._id})`)
  return doc._id
}

let created = 0
let updated = 0

for (const entry of MATCHES) {
  const image = { _type: 'image', asset: { _type: 'reference', _ref: entry.assetId } }

  if (entry.existingArtworkId) {
    // Update existing artwork record
    await client.patch(entry.existingArtworkId).set({
      image,
      year: entry.year,
      dimensions: entry.dimensions,
      medium: entry.medium,
    }).commit()
    console.log(`✓ Updated existing "${entry.title}" by ${entry.artist}`)
    updated++
  } else {
    // Get or create artist
    const artistId = await getOrCreateArtist(entry.artist)

    // Create new artwork
    const artwork = await client.create({
      _type: 'artwork',
      title: entry.title,
      year: entry.year,
      dimensions: entry.dimensions,
      medium: entry.medium,
      image,
      sold: false,
    })

    // Add artwork to artist's artworks array
    await client.patch(artistId).setIfMissing({ artworks: [] }).append('artworks', [
      { _type: 'reference', _ref: artwork._id, _key: artwork._id }
    ]).commit()

    console.log(`✓ Created "${entry.title}" by ${entry.artist} → ${artwork._id}`)
    created++
  }
}

console.log(`\n✅ Done: ${updated} updated, ${created} created`)
