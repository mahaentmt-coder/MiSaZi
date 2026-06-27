import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'cbulz0js',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// Paste all GoDaddy URLs here — duplicates and transform params are handled automatically
const RAW_URLS = `https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/Logo-Orange-PNG%404x.png/:/rs=h:77,cg:true,m/qt=q:95
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/WhatsApp%20Image%202022-12-25%20at%208.50.18%20AM.jpeg/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:400,cg:true/fx-gs
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/Screenshot%202022-10-10%20at%2010-41-26%20%D8%B7%D8%B1%D8%A7%D8%AD%20%DA%AF%D8%B1%D8%A7%D9%81%DB%8C%DA%A9%20.png/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:370,cg:true
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/Screenshot%202022-10-10%20at%2010-42-45%20%D8%B7%D8%B1%D8%A7%D8%AD%20%DA%AF%D8%B1%D8%A7%D9%81%DB%8C%DA%A9%20.png/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:370,cg:true
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/Screenshot%202022-10-10%20at%2010-48-42%20%D8%B7%D8%B1%D8%A7%D8%AD%20%DA%AF%D8%B1%D8%A7%D9%81%DB%8C%DA%A9%20.png/:/cr=t:13.24%25,l:13.24%25,w:73.53%25,h:73.53%25/rs=w:370,cg:true,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/Screenshot%202022-10-10%20at%2010-49-37%20%D8%B7%D8%B1%D8%A7%D8%AD%20%DA%AF%D8%B1%D8%A7%D9%81%DB%8C%DA%A9%20.png/:/cr=t:5.56%25,l:10.68%25,w:73.53%25,h:73.53%25/rs=w:370,cg:true,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/Screenshot%202022-10-10%20at%2010-44-31%20%D8%B7%D8%B1%D8%A7%D8%AD%20%DA%AF%D8%B1%D8%A7%D9%81%DB%8C%DA%A9%20.png/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:370,cg:true
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/Screenshot%202022-10-10%20at%2010-43-30%20%D8%B7%D8%B1%D8%A7%D8%AD%20%DA%AF%D8%B1%D8%A7%D9%81%DB%8C%DA%A9%20.png/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:370,cg:true
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/0A7A5278.jpg/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:370,cg:true
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/WhatsApp%20Image%202022-12-25%20at%208.50.18%20AM.jpeg
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/blob-047c804.png/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/blob-0c1cae7.png/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/blob-5f950d1.png/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/blob-cdda505.png/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/blob-7879e8d.png/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/blob-b1f5624.png/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/artfair-berlin-13-15-jun.png/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/blob-fa7ed0b.png/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/blob-6830c23.png/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/blob-c6f44b7.png/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/blob-bd3fe03.png/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/ChatGPT%20Image%20Jun%207%2C%202025%2C%2010_03_44%20PM.png/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/blob-6e8520b.png/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/blob-dc7f897.png/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/blob-231dd15.png/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/Logo-Orange-PNG%404x.png/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/blob-a1dee96.png/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/artfair-berlin-13-15-jun-Final.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/blob-d7dfc29.png/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/blob-28f8989.png/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/PSX_20250326_004824-a5444ad.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/DSC_6794-e.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/IMG_0869.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/IMG_0893.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/IMG_0862.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/IMG_0855.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/PSX_20250326_004824.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/DSC_8347_bw2.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/DSC_6782_bw.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/IMG-20221014-WA0004.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/IMG-20221014-WA0000.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/IMG-20221014-WA0001.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/IMG-20221014-WA0002.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/blob-3db39ec.png/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/Farshid-profile.JPG/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/Asset%2024.png/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/IMG_3850.JPG/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/Asset%201%404x-100.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/poster-b931491.png/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/poster.persian.png/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/blob-7399452.png/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/Studio-Project.png/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/poster.png/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/Asset%201-d4e6907.png/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/Asset%203-5df36b4.png/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/Asset%204-a8524f1.png/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/Asset%202-b228b97.png/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/tooba%20bahar1.jpeg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/behnoosh%20momeni.jpeg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/razie%20khosravi3.jpeg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/sahar%20najafi%202-7461ecd.jpeg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/sahar%20najafi%202.jpeg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/zahra%20hasani%204.png/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/leila%20shibani%203_%D8%B2%DB%8C%D8%B3%D8%AA%D8%A7%D8%B1%20%D8%8C%20%D8%B3%D8%A7%DB%8C%D8%B2%20%DB%B3%DB%B0%C3%97%DB%B2%DB%B8%D8%8C%20%D8%AA%DA%A9%D9%86%DB%8C%DA%A9%20%DA%86%D8%A7.jpeg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/%20%D8%B3%D8%A7%DB%8C%D8%B2%20%DB%B3%DB%B0%C3%97%DB%B3%DB%B6%D8%8C%20%D8%AA%DA%A9%D9%86%DB%8C%DA%A9%20%DA%86%D8%A7%D9%BE%20%D8%AF%D8%B3%D8%AA%DB%8C%20%D8%A7%DA%A9%D9%88%D9%BE%D8%B1%DB%8C%D9%86%D8%AA.%20leila%20s.jpeg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/farshid%20barghi%201.jpeg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/mah%20rezayi%203.jpeg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/mah%20rezayi%201.jpeg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/artemis%20lahasaee%202-4621f69.jpeg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/artemis%20lahasaee%201-900ac7a.jpeg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/artemis%20lahasaee%202.jpeg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/artemis%20lahasaee%201-438a28c.jpeg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/artemis%20lahasaee%201.jpeg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/rahman%20mojarrad%201-663c9a6.jpeg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/rahman%20mojarrad%201.jpeg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/negar.refae1.jpeg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/bahar%20yusefi2.jpeg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/IMG_4080.JPG/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/shirin%20arasteh%202.jpeg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/shirin%20arasteh%201.jpeg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/pardis%20hoseini%201.jpeg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/IMG_0761.jpeg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/IMG_0764.jpeg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/atena%20aftabi1-860621b.jpeg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/atena%20aftabi2.jpeg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/atena%20aftabi1.jpeg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/msryam%20rangamiz2.jpeg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/erif%20jamo3.jpeg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/parnian%20amiri%203.jpeg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/javad%20razavi2.jpeg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/javad%20razavi1-0295601.jpeg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/javad%20razavi1.jpeg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/jale%20akhlaghi1.jpeg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/mansoore2_%D9%85%D9%86%D8%B5%D9%88%D8%B1%D9%87%20%D8%A7%D8%B5%D9%84%20%D9%85%D8%B1%D8%B2.%D8%B1%D9%86%DA%AF%20%D8%B1%D9%88%D8%BA%D9%86%20%D8%B1%D9%88%DB%8C%20%D8%A8%D9%88%D9%85.%D8%B3%D8%A7%DB%8C.jpeg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/mansoore3%20%D8%A7%D8%B5%D9%84%20%D9%85%D8%B1%D8%B2.%D8%B1%D9%86%DA%AF%20%D8%B1%D9%88%D8%BA%D9%86%20%D8%B1%D9%88%DB%8C%20%D8%A8%D9%88%D9%85.%D8%B3%D8%A7%DB%8C%D8%B2%DB%B4%DB%B0%D8%AF%D8%B1%DB%B6%DB%B0.jpeg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/parnian%20amiri%202.jpeg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/koorosh%20lornezhad.jpeg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/IMG_4460.JPG/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/IMG_4459.JPG/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/niloofar%20khosravani%202.jpeg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/mariam%20agout3.png/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/H35.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/OBJECT2.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/mask1.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/mask7.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/NOOR2.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/OBJECT4.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/H37.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/NOOR1.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/my%20mirrors%20a%20place%20to%20hide.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/H26.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/mask6.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/OBJECT3.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/Wedding%20final.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/IMG_1784.JPG/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/IMG_1785.JPG/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/IMG_1779.JPG/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/IMG_1782.JPG/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/IMG_1783.JPG/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/IMG_1781.JPG/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/IMG_1780.JPG/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/blob-e79846f.png/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/IMG_9965.JPG/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/IMG_9958.JPG/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/IMG_9956%20(1).JPG/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/Flyer-Page02-New.png%20(1).jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/Flyer-Page04-English.png.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/Flyer-Page03-English.png.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/Flyer-Page03-New.png.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/Flyer-Page02-New.png.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/Flyer-Page02-English.png.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/Flyer-Page01-English.png.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/Flyer-Page01-New.png.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/Flyer-Page03-1f7cbfa.png/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/Flyer-Page01.png/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/Flyer-Page03.png/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/Flyer-Page02.png/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/photo_2023-08-04_16-36-59.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/photo1684788451-3.jpeg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/photo1684788451-2.jpeg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/photo1684788451-4.jpeg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/photo1684788451.jpeg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/photo_2023-07-24_22-29-36%20(2).jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/photo_2023-07-24_22-29-39.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/photo_2023-07-24_22-29-38.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/photo_2023-07-24_22-29-40.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/photo_2023-07-24_22-29-37.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/photo_2023-07-24_22-29-36.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/photo_2023-07-24_22-28-32.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/photo_2023-07-24_22-29-42.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/photo_2023-07-24_22-29-41.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/photo_2023-07-24_22-28-34.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/photo_2023-07-24_22-27-30.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/photo_2023-07-24_22-27-29.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/photo_2023-07-24_22-27-31.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/photo_2023-07-24_22-28-32%20(2).jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/photo_2023-07-24_22-28-33.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/photo_2023-07-24_22-27-29%20(2).jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/IMG_3083.JPG/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/48.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/37.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/12-9a80c6c.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/Haroon%20Textile6-c0412af.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/23.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/40.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/3-9ee2b5a.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/0A7A5278.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/A.Home.2020.acrylic%20on%20canvas.60X40%20cm.jpeg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/5433.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/0A7A5234-2.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/0A7A5228.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/0A7A5217.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/0A7A5407-Edit.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/0A7A5251.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/0A7A5378-Edit.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/0A7A5258.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/0A7A5257.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/0A7A5415.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/0A7A5385.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/0A7A5395-Edit.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/0A7A5388-Edit.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/0A7A5263.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/0A7A5392-Edit.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/979e993d-fa7c-4caa-9d2d-e75877393c34.JPG/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/0A7A5587-2.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/0A7A5575-2.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/0A7A5595-2.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/0A7A5586-2.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/0A7A5587.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/0A7A5597-2-2.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/0A7A5595.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/Closing%20night.png/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/WebsiteImage.png/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/0A7A5597-2-4-225926e.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/03_DSCF6609_39x54.5cm.JPG/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/thumbnail_image3.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/thumbnail_image0.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/WhatsApp%20Image%202023-05-10%20at%204.47.03%20PM.jpeg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/Haroon%20Textile6.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/26.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/Draft2-4ded997.png/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/blob-4c65534.png/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/Draft1.png/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/Draft2.png/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/IMG_7530-c03cd9e.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/Jamal_NY.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/Haroon_Fariba-b18b3c4.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/IMG_1215.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/IMG_1295-6424a7d.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/IMG_1295.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/2d414b70-efac-49e1-af69-4c61938b788f.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/Site.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/Wish_Fariba%20Ouni.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/No.%2010%2C%2090x120%2C%20Acrylic%2C%202021.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/No.%2009%2C%2080x120%2C%20Acrylic%2C%202022.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/No.%2017%2C%2080x120%2C%20Acrylic%2C%202021.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/No.%2030%2C%2090X120%2C%20Acrylic%2C%202021.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/No.%2016%2C%2080x120%2C%20Acrylic%2C%202022.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/No.%2018%2C%2080x120%2C%20Acrylic%2C%202022.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/No.%2029%2C%2090x120%2C%20Acrylic%2C%202022.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/No.%2014%2C%2080x120%2C%20Acrylic%2C%202021.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/No.%2001%2C%2080x120%2C%20Acrylic%2C%202021.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/No.%2005%2C%2090x120%2C%20Acrylic%2C%202022.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/No.%2004%2C%2090x120%2C%20Acrylic%2C%202022.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/Plan%20de%20travail%2042.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/Hamidreza.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/Jamal.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/Mojtaba.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/Saghar.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/Mojgan.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/Plan%20de%20travail%2027_5.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/Mahsa-Photo.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/maryam.JPG/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/fariba_Tube03.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/fariba.JPG/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/Farshid-profile.JPG/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/nature%206.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/nature%203.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/nature%205.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/nature%201.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/nature%202.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/portrait%2032.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/portrait%2030.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/portrait%2028.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/portrait%2014.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/portrait%2021.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/portrait%2020.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/portrait%2022.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/family-workshop.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/Jaanese-marbling.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/Celebration.jpeg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/Dialogue.jpeg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/Mojgan-Home01.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/Mojgan-Home02.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/Mojgan%20Mirisaee_No.2_Oil%20on%20Canvas_60cm%20x%2070cm.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/Mojgan%20Mirisaee_No.1_Oil%20on%20Canvas_60cm%20x%2070cm.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/IMG_7521.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/IMG_7513.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/IMG_7530.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/Haroon%20SB9%20BW.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/IMG_3083.JPG/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/H35.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/OBJECT2.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/mask1.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/mask7.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/NOOR2.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/OBJECT4.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/H37.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/NOOR1.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/H26.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/mask6.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/OBJECT3.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/Wedding%20final.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/IMG-20221220-WA0008.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/fariba_Avene03.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/fariba_Avene02.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/fariba_Avene01.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/A%20Thousand%20Roses.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/The%20weather%20was%20nice.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/nature%207%20-%2030%20_30%20cm.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/nature%2010%20-%2080%20_120%20cm.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/nature%206%20-%20100%20_400%20cm.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/nature%205%20-%20100%20_70cm%20(2).jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/nature%209%20-%20100%20_100%20cm.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/nature%203%20-%2060%20_40%20cm.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/nature%204%20-%2070%20_50%20cm.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/nature%201%20-%2030%20_40%20cm.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/nature%202%20-%2030%20_40%20cm.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/In%20memory%20of%20life.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/brooch1.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/Parrot2%20final.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/IMG-20221204-WA0009.jpg/:/rs=h:175,m
https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/IMG-20220711-WA0009.jpg/:/rs=h:175,m`

const BASE = 'https://img1.wsimg.com/isteam/ip/9e1e1efe-16be-40d4-a649-4f5c4de71b13/'

function parseUrls(raw) {
  const seen = new Set()
  const result = []
  for (const line of raw.split('\n')) {
    const url = line.trim()
    if (!url) continue
    // Extract filename portion between base and the /: transform
    const after = url.replace(BASE, '')
    const filename = decodeURIComponent(after.split('/:/')[0])
    if (!filename || seen.has(filename)) continue
    seen.add(filename)
    // Build clean download URL (no transforms = full quality)
    result.push({ filename, downloadUrl: BASE + encodeURIComponent(filename) })
  }
  return result
}

async function downloadAndUpload(filename, downloadUrl) {
  const ext = filename.split('.').pop().toLowerCase()
  const mimeType = ext === 'png' ? 'image/png' : ext === 'gif' ? 'image/gif' : ext === 'webp' ? 'image/webp' : 'image/jpeg'

  const res = await fetch(downloadUrl)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const buffer = Buffer.from(await res.arrayBuffer())

  const asset = await client.assets.upload('image', buffer, { filename, contentType: mimeType })
  return asset
}

async function main() {
  const items = parseUrls(RAW_URLS)
  console.log(`Found ${items.length} unique images to upload\n`)

  let uploaded = 0, failed = 0

  for (let i = 0; i < items.length; i++) {
    const { filename, downloadUrl } = items[i]
    process.stdout.write(`[${i + 1}/${items.length}] ${filename.slice(0, 50)} ... `)
    try {
      await downloadAndUpload(filename, downloadUrl)
      console.log('✓')
      uploaded++
    } catch (err) {
      console.log(`✗ ${err.message}`)
      failed++
    }
  }

  console.log(`\n✅ Done: ${uploaded} uploaded, ${failed} failed`)
}

main().catch(console.error)
