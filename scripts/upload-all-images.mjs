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

const VALID_EXTS = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp'])

async function uploadImage(filePath) {
  const filename = path.basename(filePath)
  const ext = path.extname(filename).toLowerCase()
  if (!VALID_EXTS.has(ext)) return null

  const buffer = fs.readFileSync(filePath)
  const mimeType = ext === '.png' ? 'image/png' : ext === '.gif' ? 'image/gif' : ext === '.webp' ? 'image/webp' : 'image/jpeg'

  try {
    const asset = await client.assets.upload('image', buffer, { filename, contentType: mimeType })
    return asset
  } catch (err) {
    console.error(`  ✗ ${filename}: ${err.message}`)
    return null
  }
}

async function main() {
  const files = fs.readdirSync(imagesDir).filter(f => VALID_EXTS.has(path.extname(f).toLowerCase()))
  console.log(`Found ${files.length} images to upload\n`)

  let uploaded = 0
  let skipped = 0

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const filePath = path.join(imagesDir, file)
    process.stdout.write(`[${i + 1}/${files.length}] ${file} ... `)
    const asset = await uploadImage(filePath)
    if (asset) {
      console.log(`✓`)
      uploaded++
    } else {
      skipped++
    }
  }

  console.log(`\n✅ Done: ${uploaded} uploaded, ${skipped} failed`)
}

main().catch(console.error)
