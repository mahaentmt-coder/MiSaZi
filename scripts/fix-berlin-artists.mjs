import { createClient } from '@sanity/client'
const client = createClient({ projectId:'cbulz0js', dataset:'production', apiVersion:'2024-01-01', token:process.env.SANITY_API_TOKEN, useCdn:false })

const EXHIBITION_ID = '9wv3c53RQI1aqnVOhHjBZE'

const BERLIN_ARTISTS = [
  'Fariba Oni',
  'Behnoosh Momeni',
  'Mojgan Mirisaee',
  'Farshid Barghi',
]

const existing = await client.fetch(`*[_type == "artist"]{_id, name}`)
const existingMap = new Map(existing.map(a => [a.name.toLowerCase(), a._id]))

const refs = []
for (const name of BERLIN_ARTISTS) {
  const id = existingMap.get(name.toLowerCase())
  if (id) {
    console.log(`✓ Found: "${name}" (${id})`)
    refs.push({ _type: 'reference', _ref: id, _key: id })
  } else {
    console.log(`✗ NOT FOUND: "${name}"`)
  }
}

// Replace artists array entirely
await client.patch(EXHIBITION_ID).set({ artists: refs }).commit()
console.log(`\n✅ Set ${refs.length} artists on "Affordable Art Fair Berlin"`)
