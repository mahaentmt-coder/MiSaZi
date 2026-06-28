import puppeteer from 'puppeteer'
import { createClient } from '@sanity/client'
import { createReadStream, createWriteStream, mkdirSync } from 'fs'
import { join, extname } from 'path'
import https from 'https'
import http from 'http'
import { fileURLToPath } from 'url'

const client = createClient({
  projectId: 'cbulz0js',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const NARGES_ID = 'voupnMNE9rrQS0V5SLLAYZ'
const TMP_DIR = 'C:/Users/hmiri/AppData/Local/Temp/narges-images'
mkdirSync(TMP_DIR, { recursive: true })

// Strip resize params to get full resolution from wsimg.com CDN
function toHighRes(url) {
  return url.replace(/\/:\/.+$/, '')
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const proto = url.startsWith('https') ? https : http
    const file = createWriteStream(dest)
    const req = proto.get(url, res => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close()
        return download(res.headers.location, dest).then(resolve).catch(reject)
      }
      if (res.statusCode !== 200) {
        file.close()
        return reject(new Error(`HTTP ${res.statusCode}`))
      }
      res.pipe(file)
      file.on('finish', () => file.close(resolve))
    })
    req.on('error', reject)
  })
}

async function uploadToSanity(filePath, filename) {
  const stream = createReadStream(filePath)
  return await client.assets.upload('image', stream, { filename })
}

async function main() {
  console.log('Launching browser...')
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.setViewport({ width: 1400, height: 900 })

  console.log('Navigating to page...')
  await page.goto('https://misaziart.com/narges-mirnezhad', { waitUntil: 'networkidle2', timeout: 60000 })
  await new Promise(r => setTimeout(r, 3000))

  await page.evaluate(async () => {
    for (let i = 0; i < 15; i++) {
      window.scrollBy(0, 500)
      await new Promise(r => setTimeout(r, 400))
    }
  })
  await new Promise(r => setTimeout(r, 2000))

  const images = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('img'))
      .map(img => ({ src: img.src, alt: img.alt, w: img.naturalWidth, h: img.naturalHeight }))
      .filter(i => i.src && !i.src.startsWith('data:') && i.w > 200 && !i.src.includes('Logo') && !i.src.includes('logo'))
  })

  await browser.close()
  console.log(`Found ${images.length} artwork images`)

  for (let i = 0; i < images.length; i++) {
    const img = images[i]
    const hiResUrl = toHighRes(img.src)
    const ext = extname(new URL(hiResUrl).pathname) || '.jpg'
    const filename = `narges-${String(i+1).padStart(2,'0')}${ext}`
    const dest = join(TMP_DIR, filename)

    console.log(`\n[${i+1}/${images.length}] Downloading ${filename}...`)
    console.log(`  URL: ${hiResUrl}`)
    try {
      await download(hiResUrl, dest)
      console.log(`  Downloaded OK`)
    } catch (e) {
      console.log(`  Download failed: ${e.message}`)
      continue
    }

    console.log(`  Uploading to Sanity...`)
    let asset
    try {
      asset = await uploadToSanity(dest, filename)
      console.log(`  Uploaded: ${asset._id}`)
    } catch (e) {
      console.log(`  Upload failed: ${e.message}`)
      continue
    }

    const title = img.alt || `Untitled ${i + 1}`
    const artwork = await client.create({
      _type: 'artwork',
      title,
      artist: { _type: 'reference', _ref: NARGES_ID },
      image: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } },
      sold: false,
    })
    console.log(`  Created artwork: "${artwork.title}" (${artwork._id})`)

    await client.patch(NARGES_ID)
      .setIfMissing({ artworks: [] })
      .append('artworks', [{ _type: 'reference', _ref: artwork._id, _key: artwork._id }])
      .commit()
    console.log(`  Linked to Narges ✓`)
  }

  console.log(`\n✅ Done — processed ${images.length} images for Narges Mirnezhad`)
}

main().catch(console.error)
