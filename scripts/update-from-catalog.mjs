import { createClient } from '@sanity/client'
const client = createClient({ projectId:'cbulz0js', dataset:'production', apiVersion:'2024-01-01', token:process.env.SANITY_API_TOKEN, useCdn:false })

// All artworks extracted from the Spring 2024 catalog
// Matched by artist name + title to existing Sanity records
const CATALOG = [
  { title: 'Cubic life',            artist: 'Mariam Azad',             year: 2023, dimensions: '10×10×10 cm', medium: 'Plaster' },
  { title: 'Untitled',              artist: 'Niloofar Khosravani',      year: 2024, dimensions: '10×10×10 cm', medium: 'Plaster' },
  { title: 'Second Life',           artist: 'Sajad Ebrahimi',           year: 2024, dimensions: '38.5×52 cm',  medium: 'Mixed Media' },
  { title: 'Water of Life',         artist: 'Sajad Ebrahimi',           year: 2024, dimensions: '39×54 cm',    medium: 'Mixed Media' },
  { title: 'Nostalgia',             artist: 'Koorosh Lornezhad',        year: 2024, dimensions: '32.5×49 cm',  medium: 'Oil on cardboard' },
  { title: 'The Ocean',             artist: 'Parniyan Amiri',           year: 2023, dimensions: '21×29.7 cm',  medium: 'Pen on paper' },
  { title: 'Untitled',              artist: 'Parniyan Amiri',           year: 2023, dimensions: '42×29.7 cm',  medium: 'Pen on paper' },
  { title: 'Untitled',              artist: 'Mansooreh Aslemarz',       year: 2022, dimensions: '25×35 cm',    medium: 'Oil on canvas' },
  { title: 'Untitled',              artist: 'Mansooreh Aslemarz',       year: 2022, dimensions: '25×35 cm',    medium: 'Oil on canvas' },
  { title: 'Untitled',              artist: 'Jaleh Akhlaghi',           year: 2020, dimensions: '42×24×11 cm', medium: 'Papier mache' },
  { title: 'Untitled',              artist: 'Javad Razavi',             year: 2024, dimensions: '21×29.7 cm',  medium: 'Mixed media' },
  { title: 'Untitled',              artist: 'Javad Razavi',             year: 2024, dimensions: '21×29.7 cm',  medium: 'Mixed media' },
  { title: 'Once',                  artist: 'Erfan Jami',               year: 2024, dimensions: '29×44 cm',    medium: 'Mixed media' },
  { title: 'Untitled',              artist: 'Maryam Rangamiz',          year: 2023, dimensions: '80×60 cm',    medium: 'Oil on canvas' },
  { title: 'Frostbite',             artist: 'Atena Aftabi',             year: 2024, dimensions: '30×40 cm',    medium: 'Rapid on cardboard' },
  { title: 'Frostbite',             artist: 'Atena Aftabi',             year: 2024, dimensions: '30×40 cm',    medium: 'Rapid on cardboard' },
  { title: 'Untitled',              artist: 'Arezoo Alinezhad',         year: 2021, dimensions: '80×120 cm',   medium: 'Oil on canvas' },
  { title: 'Untitled',              artist: 'Arezoo Alinezhad',         year: 2021, dimensions: '100×70 cm',   medium: 'Oil on canvas' },
  { title: 'Untitled',              artist: 'Pardis Hosseini',          year: 2023, dimensions: '60×80 cm',    medium: 'Mixed media' },
  { title: 'Destiny Sisters',       artist: 'Shirin Arasteh',           year: 2023, dimensions: '21×29.5 cm',  medium: 'Rapid on paper' },
  { title: 'Orpheus',               artist: 'Shirin Arasteh',           year: 2023, dimensions: '21×29.5 cm',  medium: 'Rapid on paper' },
  { title: 'Hadyosh',               artist: 'Roohangiz Safarinezhad',   year: 2017, dimensions: '25×23×15 cm', medium: 'Brass & Bone' },
  { title: 'Untitled',              artist: 'Bahar Yousefi',            year: 2024, dimensions: '20 cm diameter', medium: 'Watercolor on canvas' },
  { title: 'Untitled',              artist: 'Negar Refaee',             year: 2013, dimensions: '44×30 cm',    medium: 'Acrylic on cardboard' },
  { title: 'Untitled',              artist: 'Abdolrahman Mojarrad',     year: 2013, dimensions: '70×100 cm',   medium: 'Photo print' },
  { title: 'Untitled',              artist: 'Artemis Lahsaei',          year: 2024, dimensions: '80×80 cm',    medium: 'Mixed media' },
  { title: 'Untitled',              artist: 'Artemis Lahsaei',          year: 2024, dimensions: '80×80 cm',    medium: 'Mixed media' },
  { title: 'Untitled',              artist: 'Mahdieh Rezaei',           year: 2024, dimensions: '38×23 cm',    medium: 'Mixed media on cardboard' },
  { title: 'Untitled',              artist: 'Mahdieh Rezaei',           year: 2024, dimensions: '40×27 cm',    medium: 'Mixed media on cardboard' },
  { title: 'Untitled',              artist: 'Farshid Barghi',           year: 2024, dimensions: '40×60 cm',    medium: 'Print on canvas' },
  { title: 'Untitled',              artist: 'Leila Sheybani',           year: 2022, dimensions: '36×50 cm',    medium: 'Cotton' },
  { title: 'Untitled',              artist: 'Leila Sheybani',           year: 2022, dimensions: '28×30 cm',    medium: 'Cotton' },
  { title: 'Untitled',              artist: 'Zahra Hasani',             year: 2024, dimensions: '50×70 cm',    medium: 'Disperse color on cardboard' },
  { title: 'Sarve Iranshahr',       artist: 'Razieh Khosravi',          year: 2024, dimensions: '27×42 cm',    medium: 'Digital' },
  { title: 'Untitled',              artist: 'Behnoosh Momeni',          year: 2024, dimensions: '100×120 cm',  medium: 'Acrylic on canvas' },
  { title: 'Untitled',              artist: 'Tuba Khani',               year: 2023, dimensions: '50×70 cm',    medium: 'Mixed media' },
  { title: 'Untitled',              artist: 'Tuba Khani',               year: 2023, dimensions: '50×70 cm',    medium: 'Mixed media' },
]

// Fetch all existing artworks with their artist name
const existing = await client.fetch(`*[_type == "artwork"] {
  _id, title, year, medium, dimensions,
  "artistName": *[_type=="artist" && references(^._id)][0].name
}`)

console.log(`\nFound ${existing.length} artworks in Sanity`)
console.log(`Catalog has ${CATALOG.length} entries\n`)

let updated = 0
let skipped = 0
const unmatched = []

for (const entry of CATALOG) {
  // Find matching record: same artist name + same title (case-insensitive)
  const match = existing.find(e =>
    e.artistName?.toLowerCase() === entry.artist.toLowerCase() &&
    e.title?.toLowerCase() === entry.title.toLowerCase()
  )

  if (match) {
    // Only update fields that are missing or different
    const updates = {}
    if (!match.year && entry.year)             updates.year = entry.year
    if (!match.dimensions && entry.dimensions) updates.dimensions = entry.dimensions
    if (!match.medium && entry.medium)         updates.medium = entry.medium

    if (Object.keys(updates).length > 0) {
      await client.patch(match._id).set(updates).commit()
      console.log(`✓ Updated "${entry.title}" by ${entry.artist}:`, updates)
      updated++
    } else {
      console.log(`– Skipped "${entry.title}" by ${entry.artist} (already complete)`)
      skipped++
    }
  } else {
    unmatched.push(entry)
  }
}

console.log(`\n✅ Updated: ${updated}`)
console.log(`– Skipped (already complete): ${skipped}`)
console.log(`✗ No existing record found for ${unmatched.length} catalog entries:`)
unmatched.forEach(e => console.log(`  • "${e.title}" — ${e.artist} (${e.year})`))
