import { createClient } from '@sanity/client'
const client = createClient({ projectId:'cbulz0js', dataset:'production', apiVersion:'2024-01-01', token:process.env.SANITY_API_TOKEN, useCdn:false })

const EXHIBITION_ID = '9wv3c53RQI1aqnVOhHjBZE'
const MOJGAN_ID = 'voupnMNE9rrQS0V5SLLG57'

await client.patch(EXHIBITION_ID)
  .setIfMissing({ artists: [] })
  .append('artists', [{ _type: 'reference', _ref: MOJGAN_ID, _key: MOJGAN_ID }])
  .commit()
console.log('✅ Added Mojgan Miri to Berlin exhibition')
