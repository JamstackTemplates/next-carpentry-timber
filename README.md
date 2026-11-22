# Heartwood Carpentry

Warm timber-grain Next.js static website for **Heartwood Carpentry**, a fictitious Hobart joinery
workshop building custom furniture, solid-timber kitchens and hardwood decks. Built as a self-contained
Jamstacks static export (`output: 'export'`). Local development requires Node 24+ and npm.

## Quick start

```sh
npm ci
npm run dev      # local development server
npm run check    # unit tests + Next typegen/tsc + static export
npm start        # preview the static export in out/
```

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Home: light and dark blackwood table hero images, three trades on timber planks, featured work sheets, timber rack row, commission steps, Hobart workshop hours & `HomeAndConstructionBusiness` JSON-LD |
| `/work/` | Craftsmanship gallery with category filter (`#furniture`, `#kitchens`, `#decks`, `#built-ins`) and four exploded joinery drawings |
| `/services/` | Ruled cutting list with AUD "from" prices, 0–20 week folding-rule lead times, availability stamps, five-step process, radial price factors and `<details>` FAQ |
| `/timbers/` | Timber rack of eight species drawn in their own swatch colours with use filter, Janka hardness scale, oil finishes shelf and sourcing |
| `/contact/` | Hosted Jamstacks support form when configured, visible email/phone fallback, message checklist, workshop hours and enquiry wording |
| `/404.html` | Themed "Measure twice, cut once" sawn-short error page |

## Owner edits and file ownership

| File | Owns |
| --- | --- |
| `content/business.ts` | Workshop name, subtitle, founded year, email, phone, locality/map query, service area, weekly hours and Contact checklist/enquiry copy |
| `content/services.ts` | Six services: `fromPrice` (AUD), `priceUnit`, `leadWeeks` (`[min, max]`), `availability` (`booking` \| `waitlist` \| `paused`), `availabilityNote`, `includes`, `timbers`, plus `HOME_TRADES` |
| `content/timbers.ts` | Eight timber species: `stock` (`in-stock` \| `limited` \| `by-order`), `jankaKn`, `uses`, `priceBand`, `note` and `swatch` (`base`, `grain`, `heart` hex colours) |
| `content/projects.ts` | Workshop archive (`projects`): add new projects here; keep exactly three marked `featured: true` |
| `app/page.tsx`, `app/work/page.tsx`, `app/services/page.tsx`, `app/timbers/page.tsx`, `app/contact/page.tsx`, `app/not-found.tsx` | Page-specific headings, introductions, process steps, FAQs, finish descriptions and calls to action |
| `site.config.json` | Public site name, meta description, hostname, IANA `timeZone` (`Australia/Hobart`) and Jamstacks integration |
| `app/tailwind.input.css` | Light ("Oiled ash in daylight") and dark ("Workshop after dusk") tokens, wood-grain/graph textures, pinned sheets, folding-rule and accordion styles |
| `components/art/` | Inline SVG artwork (`end-grain-round.tsx`, `hero-bench.tsx`, `folding-rule.tsx`, `timber-plank.tsx`, `shop-drawings.tsx`, `joint-drawings.tsx`, `workshop-art.tsx`, `icons.tsx`) |
| `components/site-header.tsx`, `components/site-footer.tsx` | Responsive popover navigation shell and dark walnut plank footer |
| `lib/structured-data.ts` | `HomeAndConstructionBusiness` JSON-LD derived from `content/business.ts` and `content/services.ts` |
| `app/sitemap.ts` | Public static routes (`/`, `/work/`, `/services/`, `/timbers/`, `/contact/`) |

### Common owner edits

- **Update timber stock**: edit `stock` on a species in `content/timbers.ts` (for example changing `huon-pine` from `'limited'` to `'by-order'`) and run `npm run check`. `/timbers/` and the Home rack row update automatically.
- **Update service lead times or availability**: edit `availability`, `availabilityNote` or `leadWeeks` on an item in `content/services.ts` (for example setting `kitchens` to `availability: 'booking'` and `leadWeeks: [12, 16]`) and run `npm run check`. Both `/services/` and the Home trades band update automatically.
- **Add a new project**: append a project object to `content/projects.ts` referencing an existing `service` and `timbers` ID (keep `featured: false` unless swapping one of the three featured projects). Run `npm run check` to verify references, then rebuild.
- **Edit page copy**: edit headings, intro prose, process steps or FAQ answers directly inside the corresponding `app/**/page.tsx` file.
- **Replace the homepage hero images** by updating `public/carpentry-light.webp` and `public/carpentry-dark.webp`. Use the same framing and 75:56 aspect ratio for both. If the subject changes, update the image description in `components/home-sections.tsx`.

## Fonts and licences

All typography is self-hosted via npm packages with no external font CDN requests:

- **Zilla Slab** (`@fontsource/zilla-slab`, weights 600 & 700) — SIL Open Font License 1.1
- **Alegreya Sans** (`@fontsource/alegreya-sans`, weights 400, 500 & 700) — SIL Open Font License 1.1
- **Reenie Beanie** (`@fontsource/reenie-beanie`, weight 400) — SIL Open Font License 1.1

## Public configuration and Jamstacks Contact form

`site.config.json` keeps the provisioner's shape (`name`, `description`, `domain`, `timeZone`, `jamstacks.siteId`, `jamstacks.cdnUrl`, optional `provisioningId`). Never store business content or private credentials in `site.config.json`.

- When `JAMSTACKS_SITE` (or `site.config.json`'s `jamstacks.siteId`) is configured, `/contact/` renders `<jamstacks-support-form>` and loads `{cdn}/sites/{siteId}/embed.js` only on `/contact/`.
- Without a site ID, `/contact/` renders the direct email and phone fallback with no embed host or script request.
- Email (`hello@heartwoodcarpentry.example`) and phone (`(03) 5550 4127`) remain visible in either state.
- Navigation to and from `/contact/` uses full-document links via `components/site-link.tsx`.

| Environment variable | Public build-time meaning |
| --- | --- |
| `JAMSTACKS_SITE` | Website ID; blank retains file default, absent ID gives email fallback |
| `NEXT_PUBLIC_JAMSTACKS_CDN_URL` | CDN asset base; default `https://cdn.jamstacks.net` |
| `NEXT_PUBLIC_SITE_DOMAIN` | Hostname overriding config domain |
| `SITE_TIME_ZONE` | IANA zone overriding config `timeZone` (`Australia/Hobart`) |
| `PAGES_BASE_PATH` | Project path such as `/preview`; blank for custom domain/root |
| `PAGES_BASE_URL` | Actual Pages origin and path; takes precedence for canonical URLs |
| `JAMSTACKS_ALLOW_LOCAL_CDN` | Explicit localhost-only testing opt-in; disallowed in Actions |

Social previews use `public/og.png` at the configured public URL, including the Pages project path.
Set `domain` or `PAGES_BASE_URL` to include the image in social previews.

## Checks, preview and gallery publishing

```sh
npm run check
PAGES_BASE_PATH=/preview PAGES_BASE_URL=https://owner.github.io/preview npm run build
npm start -- --base /preview --port 3000
```

`jamstacks/` holds optional gallery-only metadata and captures and can be deleted cleanly by
customer sites without affecting builds, tests or GitHub Pages deployment. Run gallery metadata
verification separately with `node --test jamstacks/config.test.mjs`.
