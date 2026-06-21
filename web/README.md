# IbraFonts

Font marketplace for ibrafonts.com — Next.js (App Router) + Tailwind, built for SEO
(static font product pages, sitemap, JSON-LD) with checkout via PayPal and Lemon Squeezy.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in PayPal / Lemon Squeezy keys
npm run dev
```

Open http://localhost:3000.

## Replacing placeholder content

- `src/lib/fonts.ts` — the 20-font catalog. Swap in the real font names, categories,
  prices, and a `previewFamily` that points at an actual `@font-face` once you add the
  font files under `public/fonts/`.
- `src/lib/site.ts` — site name, domain, bundle price.

## Payments

Two checkout paths are wired up per the Indonesia payment constraint (no Stripe access):

- **Lemon Squeezy** — Merchant of Record, handles global VAT/sales tax, accepts cards
  and PayPal at checkout. Create products in the Lemon Squeezy dashboard with slugs
  matching `{font-slug}-desktop` / `{font-slug}-web-app` / `full-collection`, then set
  `NEXT_PUBLIC_LEMONSQUEEZY_STORE_URL`.
- **Direct PayPal button** — for buyers who specifically want to pay via PayPal
  directly. Requires `PAYPAL_CLIENT_ID`, `PAYPAL_CLIENT_SECRET`, and
  `NEXT_PUBLIC_PAYPAL_CLIENT_ID` (see `src/lib/paypal.ts` and
  `src/app/api/checkout/paypal/*`).

Order capture currently just confirms payment status — wire up real license/file
delivery (e.g. email the purchased font + license key) in
`src/app/api/checkout/paypal/capture-order/route.ts` and via Lemon Squeezy webhooks
once you have a fulfillment system.

## SEO

- Per-font static pages at `/fonts/[slug]` with metadata + `Product` JSON-LD
  (`src/app/fonts/[slug]/page.tsx`)
- `sitemap.xml` and `robots.txt` generated from the font catalog
  (`src/app/sitemap.ts`, `src/app/robots.ts`)
- Store-level `Store` JSON-LD in the root layout

## Deploy

Built for Vercel (matches the Next.js App Router architecture). Run `npm run build`
to verify before deploying.
