# MiSaZi Art Gallery — Website

A full custom Next.js 14 website for MiSaZi Art Gallery, built with a prestige gallery aesthetic inspired by Hauser & Wirth, Gagosian, and David Zwirner.

---

## Tech Stack

| Layer       | Technology                          |
|-------------|-------------------------------------|
| Framework   | Next.js 14 (App Router, TypeScript) |
| Styling     | Tailwind CSS                        |
| CMS         | Sanity.io (free tier)               |
| Email       | Resend                              |
| Hosting     | Vercel (recommended)                |
| Fonts       | Playfair Display + Jost (Google)    |

---

## Pages

| Route                    | Description                             |
|--------------------------|-----------------------------------------|
| `/`                      | Homepage — hero, exhibitions, artists, about, inquiry form |
| `/artists`               | All artists grid (featured + emerging)  |
| `/artists/[slug]`        | Individual artist page with artworks    |
| `/exhibitions`           | All exhibitions (online, upcoming, past) |
| `/exhibitions/[slug]`    | Individual exhibition detail page       |
| `/workshops`             | Workshops and educational programs      |
| `/about`                 | Gallery story, mission, team            |
| `/contact`               | Contact + artwork inquiry form          |
| `/submissions`           | Artist portfolio submission form        |
| `/api/inquire`           | Email API — sends inquiry to gallery + auto-reply |
| `/api/submissions`       | Email API — artist submission notification |

---

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Set up Sanity CMS (free)
1. Go to [sanity.io](https://sanity.io) → Create account → New project
2. Choose "Blank" template, name it `misazi-art`
3. Copy your **Project ID** from the dashboard

### 3. Set up Resend for emails (free)
1. Go to [resend.com](https://resend.com) → Create account
2. Verify your domain `misaziart.com` under Domains
3. Create an API key → copy it

### 4. Configure environment variables
```bash
cp .env.example .env.local
```
Then fill in `.env.local`:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xyz
NEXT_PUBLIC_SANITY_DATASET=production
RESEND_API_KEY=re_xxxxxxxxxxxxxxxx
NEXT_PUBLIC_SITE_URL=https://misaziart.com
```

### 5. Run development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

---

## Sanity CMS — Content Management

The site uses **Sanity Studio** as its CMS. Once configured, you (or Mahsa, Mozhgan, or any team member) can:

- Add/edit **Artists** — name, photo, medium, bio, Instagram
- Add/edit **Artworks** — title, image, medium, dimensions, price, sold status
- Add/edit **Exhibitions** — title, dates, location, cover image, participating artists
- All content updates live immediately on the website

### Setting up Sanity Studio
```bash
npm create sanity@latest -- --project YOUR_PROJECT_ID --dataset production
```
When prompted, add these schema types from `/sanity/schemas/`:
- `artist.ts`
- `artwork.ts`
- `exhibition.ts`

Or use [Sanity's hosted Studio](https://sanity.io/manage) → your project → Launch Studio.

---

## Deployment (Vercel — recommended, free)

1. Push this project to GitHub
2. Go to [vercel.com](https://vercel.com) → Import repository
3. Add all environment variables from `.env.example`
4. Deploy → Vercel gives you a live URL instantly
5. Add your custom domain `misaziart.com` in Vercel → Domains
6. Update GoDaddy DNS to point to Vercel (they give you the nameservers)

---

## Design System

### Colors
| Token                   | Value     | Usage                        |
|-------------------------|-----------|------------------------------|
| `gallery-white`         | `#FFFFFF` | Primary background           |
| `gallery-offwhite`      | `#F8F6F2` | Section backgrounds          |
| `gallery-lightgray`     | `#E8E5E0` | Borders, dividers            |
| `gallery-gray`          | `#999999` | Secondary text, labels       |
| `gallery-darkgray`      | `#555555` | Body text                    |
| `gallery-black`         | `#0D0D0D` | Headlines, primary text      |
| `gallery-orange`        | `#C8581A` | Accent — from MiSaZi logo    |

### Typography
- **Display / Headings:** Playfair Display — light (300), italic for elegance
- **Body / UI:** Jost — extralight (200) to regular (400) only

### CSS Utility Classes (defined in `globals.css`)
- `label` — small uppercase tracking label
- `heading-xl / lg / md` — responsive serif headings
- `body-text` — standard body copy
- `btn-primary` — black fill button
- `btn-ghost` — outlined button
- `btn-text-link` — underline text link
- `form-input / form-select / form-textarea` — bottom-border form fields
- `pill-online / pill-upcoming / pill-past` — exhibition status badges

---

## Adding Content

### Adding a new artist
1. Open Sanity Studio
2. Click **Artist** → **New Document**
3. Fill in: Name, Slug (auto-generates), Photo, Medium, Bio
4. Check **Featured** or **Emerging** as appropriate
5. Publish → appears on site immediately

### Adding a new exhibition
1. Click **Exhibition** → **New Document**
2. Fill in: Title, Slug, Status (Online/Upcoming/Past), Dates, Location
3. Add a Cover Image and link Participating Artists
4. Publish

### Adding an artwork
1. Click **Artwork** → **New Document**
2. Link to the Artist, upload Image, add Title, Year, Medium, Dimensions
3. Optionally set a Price (or leave blank for "Price on Request")
4. Publish → appears on that artist's page

---

## Migrating from GoDaddy

1. **Keep your domain** on GoDaddy — just update the nameservers or DNS A records
2. **Export your images** from the current GoDaddy site (right-click → Save)
3. **Upload images** to Sanity for each artist and exhibition
4. **Redirect old URLs** via `next.config.js` redirects if needed
5. **Cancel** your GoDaddy website subscription (keep domain registration)

---

## Contact & Support

Gallery: info@misaziart.com  
Location: 250 W. 50th St., New York, NY 10019
