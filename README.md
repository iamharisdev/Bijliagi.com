# Bijliagi.com website

Next.js 16 (App Router, TypeScript, Tailwind CSS 4). All pages are static. The inquiry form opens WhatsApp with the message filled in, so no backend is needed.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to the live domain. On Vercel, set it under Environment Variables.

## Update content (no component changes needed)

| What | Where |
|---|---|
| Phone, WhatsApp number, email, hours, areas, address | `src/content/site.ts` |
| Services, rates, what's included, FAQs | `src/content/services.ts` |
| Banner text, stats, video list, process steps, promises, FAQs, "what we don't do" | `src/content/general.ts` |
| Videos | `public/videos/` (MP4, short, no audio) + poster JPG in `public/images/videos/`, listed in `videos` in `general.ts` |
| Brand colours | `@theme` block at the top of `src/app/globals.css` |
| Photos | `public/images/` (replace a file with the same name) |

**Rates:** change `price`. Set `from: true` to show "from Rs X". The **first rate** of each service is the headline rate on the home page and in Google descriptions. After updating rates, also update `RATES_LAST_UPDATED`.

**Photos:** replace `public/images/hero.jpg` and the files in `public/images/services/` with real JPGs, ideally 1200×800 (3:2). Keep the same file names, or change `image.src` in `services.ts`. Update the `alt` text too, since it helps SEO.

**Adding a service:** add an object to the `services` array. The page, sitemap, navigation, form dropdown and schema update automatically.

## SEO included

- Per-page titles, descriptions, canonical URLs, Open Graph and Twitter cards
- Generated Open Graph image (`src/app/opengraph-image.tsx`)
- `sitemap.xml`, `robots.txt`, web manifest
- JSON-LD: `Electrician` (local business with areas served and hours), `Service` with PKR offers, `FAQPage`, `BreadcrumbList`
- Semantic HTML, one `h1` per page, statically generated pages, `next/image`

After going live: add the site to Google Search Console, submit `/sitemap.xml`, and create a Google Business Profile that uses the same name, phone and area.

## Customer reviews (private link)

Customers leave a review through a private link; it appears on the home page straight away.

| Page | URL |
|---|---|
| Review form (send to customers) | `/review/<REVIEW_FORM_KEY>` |
| Your admin page (copy link, hide, delete) | `/review-admin/<REVIEW_ADMIN_KEY>` |

Both pages are hidden from Google and give "not found" without the right key. To stop an old customer link working, change `REVIEW_FORM_KEY`.

**On your computer:** keys are in `.env.local`, reviews are saved in `.data/reviews.json`.

**On the live site (Vercel):**
1. Vercel → your project → Storage (or Marketplace) → add **Upstash for Redis** (free). It adds `KV_REST_API_URL` and `KV_REST_API_TOKEN` automatically. Any Upstash Redis works too: set `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`.
2. Settings → Environment Variables: add `REVIEW_FORM_KEY` (6+ random letters/numbers, e.g. `Bqx426`) and `REVIEW_ADMIN_KEY` (12+, e.g. from `openssl rand -hex 16`).
3. Redeploy. Open `/review-admin/<your admin key>` and use "Send on WhatsApp".

Reviews you type yourself can still go in `testimonials` in `src/content/general.ts`.
