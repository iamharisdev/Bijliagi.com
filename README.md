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

**Show or hide prices:** `showPrices` in `src/content/site.ts`. It is `false` now: no prices anywhere on the site (not even in the page data), and every service has a green "Contact us" button that opens WhatsApp with the service name. Set it to `true` to show the rates again.

**Rates:** change `price`. Set `from: true` to show "from Rs X". The **first rate** of each service is the headline rate on the home page and in Google descriptions. After updating rates, also update `RATES_LAST_UPDATED`.

**Photos:** replace `public/images/hero.jpg` and the files in `public/images/services/` with real JPGs, ideally 1200×800 (3:2). Keep the same file names, or change `image.src` in `services.ts`. Update the `alt` text too, since it helps SEO.

**Adding a service:** add an object to the `services` array. The page, sitemap, navigation, form dropdown and schema update automatically.

## SEO and GEO (AI search) included

- Per-page titles, descriptions (all unique, under 160 characters), canonical URLs, Open Graph and Twitter cards
- `sitemap.xml` with every public page and its photos; `robots.txt` (private review pages blocked)
- AI assistants (ChatGPT, Claude, Perplexity, Google AI, Apple) explicitly allowed in `robots.txt`
- `/llms.txt`: plain-text summary of the business, services, areas, hours and FAQs for AI assistants, built from the content files
- JSON-LD: `Electrician` + `LocalBusiness` (hours, WhatsApp contact point, areas, services catalog, Facebook), `WebSite`, `Service`, `FAQPage`, `AboutPage`, `ContactPage`, `CollectionPage`, `BreadcrumbList`, review rating
- About page "Quick facts" block; FAQs written around real search questions
- Search Console / Bing verification via env vars `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` and `NEXT_PUBLIC_BING_SITE_VERIFICATION`
- After changing content, bump `lastUpdated` in `src/content/site.ts`

Live domain: `https://www.bijliagi.com` (bijliagi.com redirects to it). Keep `NEXT_PUBLIC_SITE_URL` set to exactly this.

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
