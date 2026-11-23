# Ultravel web

Ultravel.vn, a Nha Trang travel guide written by locals: homepage, place review, guide post and the B2B marketing page. Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 3.4, GSAP and Lenis.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (the homepage prerenders as static HTML)
npm run start
npm run check      # typecheck + lint
```

Open the dev server at `localhost`, not `127.0.0.1`: Next blocks hot reload from other dev origins.

Canonical links, social previews and structured data use absolute URLs built from `NEXT_PUBLIC_SITE_URL` (default `https://ultravel.vn`, see `lib/site.ts`). Set it on staging so shared links point at staging.

## Structure

```
app/
  layout.tsx            Root: <html>, fonts, metadata, global CSS
  (site)/layout.tsx     Shared shell for public pages: header, footer, cursor, smooth scroll
  (site)/page.tsx       Homepage
  (site)/[city]/[category]/[slug]/page.tsx
                        Place review, e.g. /nha-trang/uong-gi/song-xanh-cafe
  (site)/cam-nang/page.tsx
                        Guides listing (published posts, then "coming soon")
  (site)/cam-nang/[slug]/page.tsx
                        Guide post, e.g. /cam-nang/lich-trinh-nha-trang-3-ngay-2-dem
  (site)/marketing-du-lich/page.tsx
                        B2B page: services, industries, process, results, plans, audit form
components/
  layout/               Header, Footer, footer Spotlight, custom Cursor
  home/                 One file per homepage section, top to bottom
    local-hub/          The pinned "Nha Trang, Khánh Hòa" hub (tabs, cards, map)
  review/               One file per review block (hero, gallery, scores, menu, reviews, map, FAQ, contact…)
  post/                 Post hero, body blocks (timeline, tip, note, table, place card), contents, reading progress
  b2b/                  B2B hero with sample report, services, industry tabs, steps, cases, plans, audit form
  motion/               SiteMotion (site-wide: Lenis, anchors, back-to-top, cursor)
                        MotionProvider (per page: hero entrance, scroll reveals, counters, score bars)
  ui/                   Shared building blocks: Photo, Section, Breadcrumb, NhaTrangMap, BrandWord,
                        FaqBoard ("ask a local" Q&A), SectionNav (sticky in-page tabs), SmartLink
content/                Page data: home.ts, photos.ts, social-links.ts, b2b.ts, reviews/<slug>.ts, posts/<slug>.ts
types/                  Content types (content.ts, review.ts, post.ts)
lib/                    Helpers: formatting, routes, reviews, posts, barcode, motion, use-hour
styles/                 Hand-written CSS, imported in order by app/globals.css
public/assets/          Logos and icons
public/legacy/          The original demo, still opened by hub places and posts that have no page yet
```

### Adding a review

1. Copy `content/reviews/song-xanh-cafe.ts`, fill in the new place (`hubName` must match its name in `content/home.ts` so the hub card links to it).
2. Add it to the `REVIEWS` list in `lib/reviews.ts`. The page is prerendered at build time from that list.

### Adding a post

1. Copy `content/posts/lich-trinh-nha-trang-3-ngay-2-dem.ts`. The body is a list of sections, each a list of blocks (`p`, `list`, `figure`, `tip`, `note`, `table`, `timeline`, `place`). Inline text supports `**bold**` and `[links](/path)` only.
2. Add it to `POSTS` in `lib/posts.ts`. A home feed item whose title matches the post's `title` or `shortTitle` links to it automatically.

### Conventions

- **Server components by default.** A file starts with `'use client'` only when it needs state, effects or browser APIs (header, vouchers, hub, carousel, lead form, tours, spotlight, motion).
- **Content lives in `content/`**, never inline in components. Swap the placeholder data for a CMS or API by replacing those modules; the component props stay the same.
- **Motion has one home per scope.** Smooth scrolling and the cursor live once in the shared layout (`SiteMotion`), so they survive page changes and work with Next's scroll-to-top. Per-page reveals live in `MotionProvider`, mounted at the end of each page. Section motion (hub pin, tour preview card, carousel, review tabs) lives in that section's component. Every GSAP setup runs inside `gsap.matchMedia()` and is reverted on unmount, so reduced-motion users get a calm, fully readable page.
- **Two ScrollTrigger rules** (both learned from client-side navigation bugs): create triggers through `afterLayout()` from `lib/motion.ts`, never in the mount frame, and don't use `once: true` (a once-trigger deletes itself while ScrollTrigger is refreshing). The default toggle actions already play a reveal only once.
- **Page-change curtain** (`components/layout/Curtain.tsx` + `CurtainController.tsx`, styles in `styles/transitions.css`). Internal link clicks are caught before Next's `<Link>`: the curtain covers the page, then `router.push` runs, and it lifts once the new pathname has rendered and its words have been on screen for about a second (never later than 7 s). The panel shows where you are going (titles from `lib/page-titles.ts`) and a random local tip. The first page of a browser session shows it as a short loader (`html.boot`, set by the motion-flag script in `app/layout.tsx`). Page entrances wait for the `ut:reveal` event, so they play as the curtain lifts. Skipped for same-page anchors, new tabs, modifier clicks, the legacy demo, links with `data-no-curtain`, and reduced motion.
- **404.** `app/not-found.tsx` (unknown URLs, brings the site shell itself) and `app/(site)/not-found.tsx` (a missing review or post) both render `components/layout/NotFoundView.tsx`.
- **Clock-dependent UI** (open now, today's date) renders through `useHour()` / `useSyncExternalStore` or after mount, so prerendered HTML and the first browser render always match.
- **Styling.** Layout and spacing use Tailwind utilities. The design system (tokens, type, photo frames, section strips, header, lead form, spotlight) lives in `styles/`. The partials are ordered so later files refine earlier ones, and Tailwind utilities load last. Colours are CSS variables (`styles/tokens.css`) exposed to Tailwind as `ink`, `paper`, `red` (brand orange), `deep` and so on.
- **Fonts** load through `next/font`: Archivo (display, with the width axis), Be Vietnam Pro (body), IBM Plex Mono (labels). CSS uses them as `var(--font-archivo)`, `var(--font-vietnam)` and `var(--font-plex)`.

## Before launch

- Replace the Wikimedia placeholder photos in `content/photos.ts` with Ultravel's own.
- Create the remaining section routes in `lib/routes.ts` (`/am-thuc/`, `/diem-den/` and the rest; `/cam-nang` exists). Until they exist, the browser console shows 404s when Next prefetches them.
- Write the remaining reviews and posts. Hub places and feed posts without a page still open the old demo (`legacy()` in `lib/routes.ts`).
- Wire `LeadForm`, the review form (`components/review/ReviewDialog.tsx`) and the B2B audit form (`components/b2b/AuditForm.tsx`) to real endpoints. All three validate but do not save yet; the review form promises moderation within 24 hours and the audit form promises a Zalo reply in office hours.
- Replace the B2B sample figures (`STATS`, `CASES` and the hero report in `content/b2b.ts` / `B2BHero.tsx`, all labelled "Số liệu mẫu") with real results, and confirm the plan prices.
- Re-check the times and cost ranges in the sample post before publishing; the author is a placeholder.
- Add the real social profile URLs in `content/social-links.ts`, and the café's real phone and Zalo number in its review file.
- Confirm the placeholder figures: hero stats, weather, the "Thổ địa đang trực" status and the voucher codes.
