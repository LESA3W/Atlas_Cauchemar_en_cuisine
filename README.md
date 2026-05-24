# 🍽️ Atlas - Cauchemar en cuisine

Interactive atlas of the **97 restaurants** featured by chef **Philippe Etchebest** in the French TV show *Cauchemar en cuisine* on **M6** since April 18, 2011. Live open/closed status (computed in real time against Europe/Paris), region and city filters (autocompletion across every French commune), light/dark theme, detailed restaurant cards.

**Live:** [carte-cauchemar-en-cuisine.vercel.app](https://carte-cauchemar-en-cuisine.vercel.app)

**Built by [Paul Chenon](https://github.com/LESA3W).**

---

## Highlights

- **97 episodes** covered (April 18, 2011 → March 24, 2026)
- Tri-color pins on the map: **gold** = open right now, **red** = temporarily closed, **gray** = permanently closed
- Coverage across the **13 metropolitan regions** of France + Corsica
- Commune typeahead powered by the official [geo.api.gouv.fr](https://geo.api.gouv.fr) API
- Open/closed status recomputed every 60 seconds against Europe/Paris timezone
- Light and dark theme with persistent user preference
- Rich SEO + GEO setup: structured JSON-LD (`WebSite`, `Organization`, `TVSeries`, `FAQPage`, `ItemList`, `CollectionPage`, `Person`), `/llms.txt` for AI crawlers, `/sitemap.xml`, `/robots.txt` with AI bot allow-list, dynamic Open Graph image

## Stack

Next.js 16 (App Router) · React 19 · TypeScript strict · Tailwind CSS 4 · Leaflet + react-leaflet · CartoDB tiles (Positron and Dark Matter) · deployed on Vercel.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Project structure

```
app/             # App Router (layout, page, robots, sitemap, llms.txt, opengraph-image, icons)
components/      # BrandBar, IndexPanel, MapClient, RestaurantCard, ThemeProvider,
                 # AtlasFooter, ScrollPrompt, CityAutocomplete, ...
data/            # restaurants.ts (Wikipedia seed), addresses, hours
utils/           # filters, formatters, live-status (Europe/Paris), structured-data
types/           # TypeScript types
```

## Data sources & disclaimers

Restaurant data extracted from the [French Wikipedia article *Cauchemar en cuisine (France)*](https://fr.wikipedia.org/wiki/Cauchemar_en_cuisine_\(France\)), manually enriched for the latest episode. Illustrative photos from Unsplash.

This is an **independent, unofficial** project for documentary purposes. No commercial affiliation with M6, Studio 89 Productions, or Philippe Etchebest. The logo, show name, and trademarks belong to their respective owners.

## License

Code released under the [MIT License](./LICENSE). Data sourced from Wikipedia is provided under [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/).

---

Created by **[Paul Chenon](https://github.com/LESA3W)** · Paris, 2026
