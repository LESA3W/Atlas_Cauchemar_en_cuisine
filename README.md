# 🍽️ Atlas — Cauchemar en cuisine

Interactive map of the **97 restaurants** featured by chef **Philippe Etchebest** in the French TV show *Cauchemar en cuisine* on **M6** since 2011. Live open/closed status (computed in real time against Paris time), region and city filters (autocompletion across every French commune), light/dark theme, detailed restaurant cards.

**Live**: [carte-cauchemar-en-cuisine.vercel.app](https://carte-cauchemar-en-cuisine.vercel.app)

---

## Overview

- **97 episodes** covered (April 18, 2011 → March 2026)
- Tri-color pins: **gold** = open right now, **red** = temporarily closed, **gray** = permanently closed
- **13 metropolitan regions** of France + Corsica
- Commune search via the official [geo.api.gouv.fr](https://geo.api.gouv.fr) API
- Open/closed status recomputed every 60 s against Europe/Paris timezone
- Rich SEO + GEO: JSON-LD (WebSite, Organization, TVSeries, FAQPage, ItemList, CollectionPage, Person), `/llms.txt`, `/sitemap.xml`, `/robots.txt` with AI crawler allow-list, dynamic OpenGraph image

## Stack

Next.js 16 (App Router) · React 19 · TypeScript strict · Tailwind 4 · Leaflet + react-leaflet · CartoDB tiles (Positron / Dark Matter) · deployed on Vercel.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Project structure

```
app/             # App Router (layout, page, robots, sitemap, llms.txt, opengraph-image)
components/      # BrandBar, IndexPanel, MapClient, RestaurantCard, ThemeProvider, AtlasFooter, …
data/            # restaurants.ts (Wikipedia seed), addresses, hours
utils/           # filters, formatters, live-status (Europe/Paris), structured-data
types/           # TypeScript types
```

## Sources & disclaimers

Data extracted from the [French Wikipedia article *Cauchemar en cuisine (France)*](https://fr.wikipedia.org/wiki/Cauchemar_en_cuisine_\(France\)), manually enriched. Illustration photos from Unsplash.

This is an **independent, unofficial** site for documentary purposes. No commercial affiliation with M6, Studio 89 Productions, or Philippe Etchebest. The logo, show name, and trademarks belong to their respective owners.

## License

Code released under the [MIT License](./LICENSE). Data sourced from Wikipedia is under [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/).
