import { createClient } from '@sanity/client'
const client = createClient({ projectId:'cbulz0js', dataset:'production', apiVersion:'2024-01-01', token:process.env.SANITY_API_TOKEN, useCdn:false })

// Helper: inches to cm string
const inch = (w, h, d) => d
  ? `${Math.round(w*2.54)}×${Math.round(h*2.54)}×${Math.round(d*2.54)} cm`
  : `${Math.round(w*2.54)}×${Math.round(h*2.54)} cm`

// Price list from PDF — ordered as they appear per artist
const PRICELIST = {
  'Mojgan Miri': [
    { title: 'Unspoken I',       year: 2023, medium: 'Oil on Canvas', dimensions: inch(39.3,27.5), price: 3500 },
    { title: 'Unspoken II',      year: 2023, medium: 'Oil on Canvas', dimensions: inch(27.5,15.7), price: 2000 },
    { title: 'Stood in Doubts', year: 2023, medium: 'Oil on Canvas', dimensions: inch(27.5,23.6), price: 2300 },
    { title: 'Unreachable',      year: 2023, medium: 'Oil on Canvas', dimensions: inch(27.5,23.6), price: 2300 },
  ],
  'Jamal Arabzadeh': [
    { title: 'Iranian Living Room I',   year: 2016, medium: 'Mixed Media on Cardboard', dimensions: inch(15.7,11.8), price: 1200 },
    { title: 'Iranian Living Room II',  year: 2016, medium: 'Mixed Media on Cardboard', dimensions: inch(15.7,11.8), price: 1200 },
    { title: 'Iranian Living Room III', year: 2016, medium: 'Mixed Media on Cardboard', dimensions: inch(15.7,11.8), price: 1200 },
    { title: 'Iranian Living Room IV',  year: 2016, medium: 'Mixed Media on Cardboard', dimensions: inch(15.7,11.8), price: 1200 },
    { title: 'Iranian Living Room V',   year: 2016, medium: 'Mixed Media on Cardboard', dimensions: inch(15.7,11.8), price: 1200 },
    { title: 'Untitled',               year: 2022, medium: 'Etching and Aquatint',      dimensions: inch(6.6,3.9),   price: 700  },
    { title: 'Untitled',               year: 2021, medium: 'Etching and Aquatint',      dimensions: inch(10.2,7),    price: 700  },
    { title: 'Untitled',               year: 2020, medium: 'Etching and Aquatint',      dimensions: inch(10.2,7),    price: 700  },
  ],
  'Hamidreza Emami': [
    { title: 'Untitled, "Dolls" Series I',   year: 2010, medium: 'Oil on Wood', dimensions: inch(17.7,15.7), price: 1000 },
    { title: 'Untitled, "Dolls" Series II',  year: 2010, medium: 'Oil on Wood', dimensions: inch(21.4,15.3), price: 900  },
    { title: 'Untitled, "Dolls" Series III', year: 2010, medium: 'Oil on Wood', dimensions: inch(21.4,14.2), price: 1200 },
    { title: 'Untitled, "Dolls" Series IV',  year: 2010, medium: 'Oil on Wood', dimensions: inch(21.4,15.3), price: 1200 },
    { title: 'Untitled, "Dolls" Series V',   year: 2010, medium: 'Oil on Wood', dimensions: inch(21.4,14.5), price: 1200 },
  ],
  'Narges Mirnezhad': [
    { title: 'Bed',      year: 2022, medium: 'Oil on Canvas', dimensions: inch(27.5,19.6), price: 1800 },
    { title: 'Untitled', year: 2022, medium: 'Oil on Canvas', dimensions: inch(31.4,23.6), price: 2300 },
    { title: 'Untitled', year: 2022, medium: 'Oil on Canvas', dimensions: inch(31.4,23.6), price: 2300 },
  ],
  'Behnoosh Momeni': [
    { title: '8',    year: 2022, medium: 'Acrylic on Canvas', dimensions: inch(47.2,35.4), price: 3200 },
    { title: '29',   year: 2022, medium: 'Acrylic on Canvas', dimensions: inch(47.2,35.4), price: 3200 },
    { title: '1',    year: 2022, medium: 'Acrylic on Canvas', dimensions: inch(47.2,35.4), price: 3200 },
    { title: 'Afra', year: 2022, medium: 'Acrylic on Canvas', dimensions: inch(47.2,39.3), price: 3600 },
  ],
  'Armita Jafari': [
    { title: 'Decomposing Each Other', year: 2021, medium: 'Acrylic on Canvas', dimensions: inch(19.6,19.6), price: 1200 },
    { title: 'Emptying',               year: 2021, medium: 'Acrylic on Canvas', dimensions: inch(23.6,15.7), price: 1200 },
  ],
  'Mahsa Sohrabi': [
    { title: 'You Were Never Really Here', year: 2021, medium: 'Acrylic on Canvas', dimensions: inch(39.3,27.5), price: 1800 },
  ],
  'Zahra Jamshidi': [
    { title: 'Life Journey', year: 2023, medium: 'Gouache on Cardboard', dimensions: inch(27.5,19.6), price: 1100 },
  ],
  'Hamid Shiri': [
    { title: 'A House for All My Stories', year: 2019, medium: 'Wood, PVC and Metal', dimensions: `${Math.round(15.3*2.54)}×${Math.round(4.7*2.54)}×${Math.round(4.7*2.54)} cm`, price: 2300 },
  ],
  'Fariba Oni': [
    { title: 'Tree of Life',                     year: 2023, medium: 'Mixed Media on Satin Fabric, Digital Print, Sewed Photos and Mirrors', dimensions: inch(47.2,39.3), price: 2500 },
    { title: 'Meet Me at the Alter',             year: 2016, medium: 'Photography, Digital Print', dimensions: inch(7,4.7), price: 200, series: 'After My Death' },
    { title: 'Circle of My Pickled Garlics',     year: 2016, medium: 'Photography, Digital Print', dimensions: inch(7,4.7), price: 200, series: 'After My Death' },
    { title: 'My Being Here I',                  year: 2016, medium: 'Photography, Digital Print', dimensions: inch(7,4.7), price: 200, series: 'After My Death' },
    { title: 'The Great Gathering',              year: 2016, medium: 'Photography, Digital Print', dimensions: inch(7,4.7), price: 200, series: 'After My Death' },
    { title: 'In Search of My Lost Dreams I',    year: 2016, medium: 'Photography, Digital Print', dimensions: inch(7,4.7), price: 200, series: 'After My Death' },
    { title: 'In Search of My Lost Dreams II',   year: 2016, medium: 'Photography, Digital Print', dimensions: inch(7,4.7), price: 200, series: 'After My Death' },
    { title: 'My Being Here II',                 year: 2016, medium: 'Photography, Digital Print', dimensions: inch(7,4.7), price: 200, series: 'After My Death' },
    { title: 'Silent Dancers',                   year: 2016, medium: 'Photography, Digital Print', dimensions: inch(7,4.7), price: 200, series: 'After My Death' },
    { title: 'Me, Without Me I',                 year: 2016, medium: 'Photography, Digital Print', dimensions: inch(7,4.7), price: 200, series: 'After My Death' },
    { title: 'Me, Without Me II',                year: 2016, medium: 'Photography, Digital Print', dimensions: inch(7,4.7), price: 200, series: 'After My Death' },
    { title: 'I Am Staying Out of the Way',      year: 2016, medium: 'Photography, Digital Print', dimensions: inch(7,4.7), price: 200, series: 'After My Death' },
    { title: 'Collapse Point',                   year: 2016, medium: 'Photography, Digital Print', dimensions: inch(7,4.7), price: 200, series: 'After My Death' },
    { title: 'Wright Place, Wright Time',         year: 2016, medium: 'Photography, Digital Print', dimensions: inch(7,4.7), price: 200, series: 'After My Death' },
    { title: 'A Room for Me I',                  year: 2016, medium: 'Photography, Digital Print', dimensions: inch(7,4.7), price: 200, series: 'After My Death' },
    { title: 'A Room for Me II',                 year: 2016, medium: 'Photography, Digital Print', dimensions: inch(7,4.7), price: 200, series: 'After My Death' },
    { title: 'Inside Me',                        year: 2016, medium: 'Photography, Digital Print', dimensions: inch(7,4.7), price: 200, series: 'After My Death' },
    { title: 'Silent Vibes',                     year: 2016, medium: 'Photography, Digital Print', dimensions: inch(7,4.7), price: 200, series: 'After My Death' },
    { title: 'Long Lasting',                     year: 2016, medium: 'Photography, Digital Print', dimensions: inch(7,4.7), price: 200, series: 'After My Death' },
    { title: 'Even',                             year: 2016, medium: 'Photography, Digital Print', dimensions: inch(7,4.7), price: 200, series: 'After My Death' },
    { title: 'Saboon',                           year: 2016, medium: 'Photography, Digital Print', dimensions: inch(7,4.7), price: 200, series: 'After My Death' },
    { title: 'My Obsession, My Obligation',      year: 2016, medium: 'Photography, Digital Print', dimensions: inch(7,4.7), price: 200, series: 'After My Death' },
    { title: 'Value of Gravity I',               year: 2016, medium: 'Photography, Digital Print', dimensions: inch(7,4.7), price: 200, series: 'After My Death' },
    { title: 'Value of Gravity II',              year: 2016, medium: 'Photography, Digital Print', dimensions: inch(7,4.7), price: 200, series: 'After My Death' },
    { title: 'In Search of My Lost Dreams III',  year: 2016, medium: 'Photography, Digital Print', dimensions: inch(7,4.7), price: 200, series: 'After My Death' },
    { title: 'The Gathering Set of All Time',    year: 2016, medium: 'Photography, Digital Print', dimensions: inch(7,4.7), price: 200, series: 'After My Death' },
    { title: 'Pass Through I',                   year: 2016, medium: 'Photography, Digital Print', dimensions: inch(7,4.7), price: 200, series: 'After My Death' },
    { title: 'Pass Through II',                  year: 2016, medium: 'Photography, Digital Print', dimensions: inch(7,4.7), price: 200, series: 'After My Death' },
    { title: 'The Other Side',                   year: 2016, medium: 'Photography, Digital Print', dimensions: inch(7,4.7), price: 200, series: 'After My Death' },
    { title: 'A Room Inside Another Room I',     year: 2016, medium: 'Photography, Digital Print', dimensions: inch(7,4.7), price: 200, series: 'After My Death' },
    { title: 'A Room Inside Another Room II',    year: 2016, medium: 'Photography, Digital Print', dimensions: inch(7,4.7), price: 200, series: 'After My Death' },
    { title: 'You Shall Be My Witness',          year: 2016, medium: 'Photography, Digital Print', dimensions: inch(7,4.7), price: 200, series: 'After My Death' },
    { title: 'Ye Shall Be My Witness',           year: 2016, medium: 'Photography, Digital Print', dimensions: inch(7,4.7), price: 200, series: 'After My Death' },
    { title: 'Life Goes On',                     year: 2016, medium: 'Photography, Digital Print', dimensions: inch(7,4.7), price: 200, series: 'After My Death' },
    { title: 'All I Had',                        year: 2016, medium: 'Photography, Digital Print', dimensions: inch(7,4.7), price: 200, series: 'After My Death' },
    { title: 'Dashing Waves of Silence',         year: 2016, medium: 'Photography, Digital Print', dimensions: inch(7,4.7), price: 200, series: 'After My Death' },
    { title: 'I Was Born in a September Morning',year: 2016, medium: 'Photography, Digital Print', dimensions: inch(7,4.7), price: 200, series: 'After My Death' },
  ],
}

// Fetch all artists + artworks
const artists = await client.fetch(`*[_type == "artist"] {
  _id, name,
  artworks[]->{ _id, title, medium, dimensions, year, price }
} | order(name asc)`)

const byName = {}
artists.forEach(a => { byName[a.name] = a })

let updated = 0, created = 0

for (const [artistName, entries] of Object.entries(PRICELIST)) {
  const artist = byName[artistName]
  if (!artist) { console.log(`⚠ Artist not found: ${artistName}`); continue }

  const existing = artist.artworks || []
  console.log(`\n── ${artistName} (${existing.length} in Sanity, ${entries.length} in PDF) ──`)

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i]
    const sanity = existing[i] // match by position (same visual order)

    if (sanity) {
      // Update existing artwork
      await client.patch(sanity._id).set({
        title:      entry.title,
        year:       entry.year,
        medium:     entry.medium,
        dimensions: entry.dimensions,
        price:      entry.price,
      }).commit()
      console.log(`  ✓ Updated "${sanity.title}" → "${entry.title}" | ${entry.dimensions} | $${entry.price}`)
      updated++
    } else {
      // Create new artwork and add to artist
      const doc = await client.create({
        _type: 'artwork',
        title: entry.title,
        year: entry.year,
        medium: entry.medium,
        dimensions: entry.dimensions,
        price: entry.price,
        sold: false,
      })
      await client.patch(artist._id).setIfMissing({ artworks: [] })
        .append('artworks', [{ _type: 'reference', _ref: doc._id, _key: doc._id }]).commit()
      console.log(`  ✨ Created "${entry.title}" | ${entry.dimensions} | $${entry.price}`)
      created++
    }
  }
}

console.log(`\n✅ Updated: ${updated} | Created: ${created}`)
