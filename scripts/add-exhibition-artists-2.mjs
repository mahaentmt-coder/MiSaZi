import { createClient } from '@sanity/client'
const client = createClient({ projectId:'cbulz0js', dataset:'production', apiVersion:'2024-01-01', token:process.env.SANITY_API_TOKEN, useCdn:false })

const EXHIBITION_ID = '9wv3c53RQI1aqnVOhHjBZE'

// Check exhibition first
const ex = await client.fetch(`*[_id == "${EXHIBITION_ID}"][0]{title, status, startDate, artists[]->{ name }}`)
console.log('Exhibition:', JSON.stringify(ex, null, 2))

// All artists from the Yazd Spring Catalog 2024
const CATALOG_ARTISTS = [
  'Mariam Azad',
  'Niloofar Khosravani',
  'Sajad Ebrahimi',
  'Koorosh Lornezhad',
  'Parniyan Amiri',
  'Mansooreh Aslemarz',
  'Jaleh Akhlaghi',
  'Javad Razavi',
  'Erfan Jami',
  'Maryam Rangamiz',
  'Atena Aftabi',
  'Arezoo Alinezhad',
  'Pardis Hosseini',
  'Shirin Arasteh',
  'Roohangiz Safarinezhad',
  'Bahar Yousefi',
  'Negar Refaee',
  'Abdolrahman Mojarrad',
  'Artemis Lahsaei',
  'Mahdieh Rezaei',
  'Farshid Barghi',
  'Leila Sheybani',
  'Zahra Hasani',
  'Razieh Khosravi',
  'Behnoosh Momeni',
  'Tuba Khani',
]

const slug = (name) => name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

const existing = await client.fetch(`*[_type == "artist"]{_id, name}`)
const existingMap = new Map(existing.map(a => [a.name.toLowerCase(), a._id]))

const artistIds = []
for (const name of CATALOG_ARTISTS) {
  const existingId = existingMap.get(name.toLowerCase())
  if (existingId) {
    console.log(`  ✓ Exists: "${name}"`)
    artistIds.push(existingId)
  } else {
    const doc = await client.create({ _type: 'artist', name, slug: { _type: 'slug', current: slug(name) }, emerging: true })
    console.log(`  ✨ Created: "${name}" (${doc._id})`)
    artistIds.push(doc._id)
  }
}

const currentRefs = new Set((ex?.artists || []).map(r => r?._ref).filter(Boolean))
const toAdd = artistIds.filter(id => !currentRefs.has(id)).map(id => ({ _type: 'reference', _ref: id, _key: id }))

if (toAdd.length === 0) {
  console.log('\nAll artists already in exhibition.')
} else {
  await client.patch(EXHIBITION_ID).setIfMissing({ artists: [] }).append('artists', toAdd).commit()
  console.log(`\n✅ Added ${toAdd.length} artists to exhibition "${ex?.title}"`)
}
