import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'cbulz0js',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// ── Artist bios ────────────────────────────────────────────────────────────────

const artistBios = {
  'fariba-oni': {
    bio: `Fariba Oni is an independent multi-media artist based in Dubai. She works with photography, fabrics, metals, and recycled objects to create tactile, visually rich pieces. Her practice emphasizes sustainability and narrative through repurposed materials. She holds a BA in Cinema from Art University in Tehran (2005) and since 2022 serves as GCC principal consultant at MiSaZi, advising on regional art opportunities and digital trends.`,
    instagram: 'fariba.oni',
    medium: 'Photography · Mixed Media',
  },
  'hamidreza-emami': {
    bio: `Hamidreza Emami focuses on surfaces, light, and shadows as core visual elements of his painting practice. He holds a BA in Painting from the Faculty of Fine Arts, University of Tehran (2002) and has exhibited extensively in Tehran and Khorasan province, winning multiple awards including placements in Iran's International Biennial of Cartoon competitions. His work explores the solitude of objects and the quiet poetry of everyday space.`,
    instagram: 'misazi_art_gallery',
    medium: 'Oil on Canvas · Graphite',
  },
  'behnoosh-momeni': {
    bio: `Behnoosh Momeni weaves deeply emotional, real-life stories into her artwork. She employs vibrant and varied color palettes to engage viewers with intricate painting details, merging the ordinary with the extraordinary to create meaningful connections between audience and artist narratives. She holds a BA in Visual Art Education from the University of Science and Culture, Tehran (2017) and is a member of the Association of Iranian Painters.`,
    instagram: 'misazi_art_gallery',
    medium: 'Acrylic on Canvas',
  },
  'mojtaba-asadi': {
    bio: `Mojtaba Asadi is a visual artist, graphic designer, and instructor who directs the Sirjan Visual Art Institute and teaches at Applied Science University. He holds a BA and MA in Graphic Design and Painting from the University of Tehran and has championed innovative pedagogical methods throughout Iran's southern regions. His work has earned multiple national prizes including third place at the National Festival of Art for University Professors.`,
    instagram: 'misazi_art_gallery',
    medium: 'Acrylic · Oil on Canvas',
  },
  'narges-mirnezhad': {
    bio: `Narges Mirnezhad creates intimate narratives exploring loneliness and confusion in the chaotic world through detailed observations of daily life. Her work features Iranian women and examines human existence, religious beliefs, and politics while expressing desires for freedom and peace. She studied at the Faculty of Fine Arts, University of Tehran and holds a Bac+4 in plastic arts from the University of Strasbourg.`,
    instagram: 'misazi_art_gallery',
    medium: 'Painting · Drawing · Engraving',
  },
  'hamid-shiri': {
    bio: `Hamid Shiri was born in 1983 in Iran and holds a BA in Graphic Design from Ferdowsi University of Mashhad's Fine Arts Faculty. He has worked as a professional sculptor and urban art designer since 2004 and is a member of the Iranian Sculpture Association. His sculptures and environmental installations have been presented at international symposia in Denmark, Turkey, and across Iran, earning multiple first-prize awards at national festivals.`,
    instagram: 'misazi_art_gallery',
    medium: 'Sculpture · Urban Art',
  },
  'mahsa-sohrabi': {
    bio: `Mahsa Sohrabi creates surrealistic paintings through interactive dialogue with viewers, exploring her personal fears and hesitations. She holds both BA and MA degrees in Painting (Alzahra University, Tehran 2019; Shiraz Azad University 2013) and teaches at Chaav Fine Arts Academy. Her practice invites viewers into an intimate space where the subconscious and daily reality intertwine.`,
    instagram: '_mahsa.sohrabi',
    medium: 'Painting',
  },
  'farshid-barghi': {
    bio: `Farshid Barghi was born in 1985 in Tehran and developed a deep passion for cubism and portrait art from an early age. He established his first photography studio in 2013 and is recognized as a composer photographer blending multiple visual forms with poetic symbolism. His work challenges the long-imposed constraints on Iranian women, portraying their journey from enforced veiling to reclaiming freedom and pride in their femininity.`,
    instagram: 'misazi_art_gallery',
    medium: 'Photography · Mixed Media',
  },
  'jamal-arabzadeh': {
    bio: `Jamal Arabzadeh is a photographer whose work captures the human condition with quiet intensity. His series explore portraiture, cultural identity, and the textures of lived experience. He has exhibited at MiSaZi Art Gallery's group shows in New York including the landmark "Morning Is White" exhibition at High Line Nine Gallery in 2023.`,
    instagram: 'misazi_art_gallery',
    medium: 'Photography',
  },
  'mojgan-miri': {
    bio: `Mojgan Miri is an artist, curator, instructor, researcher, and art entrepreneur based in Toronto and Shiraz. She is the director and founder of MiSaZi Art Gallery. Her painting practice draws from daily life and socio-political concerns globally and domestically. She holds an MA in Painting and an MA in Art Research from Art University Tehran, and a BA in Painting from the University of Shahed Tehran.`,
    instagram: 'misazi_art_gallery',
    website: 'https://misaziart.com',
    medium: 'Painting · Watercolor · Batik',
  },
}

// ── Exhibitions ────────────────────────────────────────────────────────────────

const exhibitions = [
  {
    _type: 'exhibition',
    title: 'Morning Is White',
    slug: { _type: 'slug', current: 'morning-is-white' },
    status: 'past',
    startDate: '2023-05-01',
    endDate: '2023-06-30',
    location: 'High Line Nine Gallery, New York',
    description: 'A landmark group exhibition featuring works by MiSaZi artists exploring themes of identity, displacement, and cultural memory. Held at High Line Nine Gallery in New York, the show brought together artists from Iran and the diaspora whose practices span painting, photography, sculpture, and mixed media.',
    artistSlugs: ['fariba-oni', 'hamidreza-emami', 'behnoosh-momeni', 'narges-mirnezhad', 'hamid-shiri', 'mahsa-sohrabi', 'mojgan-miri'],
  },
  {
    _type: 'exhibition',
    title: 'Women, Life, Freedom',
    slug: { _type: 'slug', current: 'women-life-freedom' },
    status: 'past',
    startDate: '2023-09-01',
    endDate: '2023-10-31',
    location: 'Sahar K. Boluki Gallery, Toronto',
    description: 'A powerful group exhibition responding to the women-led uprising in Iran. Works by MiSaZi artists explore themes of resistance, femininity, freedom, and the ongoing struggle for human rights through diverse mediums including painting, photography, and mixed media.',
    artistSlugs: ['fariba-oni', 'narges-mirnezhad'],
  },
  {
    _type: 'exhibition',
    title: 'Echoes of Eternity & Sustainable Dreams',
    slug: { _type: 'slug', current: 'echoes-of-eternity' },
    status: 'past',
    startDate: '2024-03-01',
    endDate: '2024-04-30',
    location: 'Misazi & Jaryan Art Gallery, Yazd',
    description: 'A joint exhibition with Jaryan Art Gallery in Yazd, Iran, exploring themes of permanence, memory, and ecological consciousness. The show featured works that bridge classical mythology and contemporary environmental concerns.',
    artistSlugs: ['behnoosh-momeni', 'mojgan-miri', 'farshid-barghi'],
  },
  {
    _type: 'exhibition',
    title: 'Affordable Art Fair New York 2024',
    slug: { _type: 'slug', current: 'aaf-new-york-2024' },
    status: 'past',
    startDate: '2024-11-01',
    endDate: '2024-11-05',
    location: 'New York',
    description: 'MiSaZi Art Gallery participated in the Affordable Art Fair New York 2024, showcasing works by represented artists with a focus on accessible pricing and broader audiences.',
    artistSlugs: ['behnoosh-momeni'],
  },
  {
    _type: 'exhibition',
    title: 'Affordable Art Fair Berlin',
    slug: { _type: 'slug', current: 'aaf-berlin' },
    status: 'past',
    startDate: '2024-09-01',
    endDate: '2024-09-30',
    location: 'Berlin, Germany',
    description: 'MiSaZi Art Gallery at Affordable Art Fair Berlin, presenting contemporary works by Central Asian and Iranian artists to European audiences.',
    artistSlugs: [],
  },
  {
    _type: 'exhibition',
    title: 'Online Exhibition: Diaspora Dialogues',
    slug: { _type: 'slug', current: 'diaspora-dialogues' },
    status: 'online',
    startDate: '2024-01-01',
    location: 'Virtual',
    description: 'An ongoing online exhibition featuring works by MiSaZi artists exploring the experience of diaspora — identity, displacement, belonging, and the negotiation between cultures. Viewable worldwide.',
    artistSlugs: ['fariba-oni', 'hamidreza-emami', 'behnoosh-momeni', 'mojtaba-asadi', 'narges-mirnezhad', 'hamid-shiri', 'mahsa-sohrabi', 'farshid-barghi', 'jamal-arabzadeh', 'mojgan-miri'],
  },
]

async function main() {
  console.log('Fetching existing artists from Sanity...')
  const existingArtists = await client.fetch(
    `*[_type == "artist"] { _id, slug }`
  )
  const slugToId = {}
  for (const a of existingArtists) {
    slugToId[a.slug.current] = a._id
  }
  console.log(`Found ${existingArtists.length} artists`)

  // ── Update artist bios ────────────────────────────────────────
  console.log('\nUpdating artist bios...')
  for (const [slug, data] of Object.entries(artistBios)) {
    const id = slugToId[slug]
    if (!id) { console.log(`  ⚠ Artist not found: ${slug}`); continue }
    await client.patch(id).set({
      bio: data.bio,
      instagram: data.instagram,
      medium: data.medium,
      ...(data.website ? { website: data.website } : {}),
    }).commit()
    console.log(`  ✓ Updated bio: ${slug}`)
  }

  // ── Create exhibitions ────────────────────────────────────────
  console.log('\nCreating exhibitions...')
  for (const ex of exhibitions) {
    const { artistSlugs, ...exData } = ex

    // Resolve artist references
    const artistRefs = artistSlugs
      .map((s) => slugToId[s])
      .filter(Boolean)
      .map((id) => ({ _type: 'reference', _ref: id, _key: id }))

    const doc = {
      ...exData,
      ...(artistRefs.length > 0 ? { artists: artistRefs } : {}),
    }

    try {
      const created = await client.create(doc)
      console.log(`  ✓ Created exhibition: ${ex.title} (${created._id})`)
    } catch (err) {
      console.error(`  ✗ Failed: ${ex.title} —`, err.message)
    }
  }

  console.log('\n✅ All done!')
}

main().catch(console.error)
