# 🍽️ Atlas — Cauchemar en cuisine

Carte interactive qui répertorie les **97 restaurants** visités par le chef **Philippe Etchebest** dans l'émission *Cauchemar en cuisine* sur **M6** depuis 2011. Statut d'ouverture calculé en direct à l'heure de Paris, filtres par région et par ville (autocomplete sur toutes les communes de France), mode clair / sombre, fiches détaillées.

**Live** : [carte-cauchemar-en-cuisine.vercel.app](https://carte-cauchemar-en-cuisine.vercel.app)

---

## Aperçu

- **97 épisodes** couverts (du 18 avril 2011 à mars 2026)
- Pins tricolores : **or** = ouvert maintenant, **rouge** = fermé temporairement, **gris** = définitivement fermé
- **13 régions** de France métropolitaine + Corse
- Recherche commune via l'**API officielle** [geo.api.gouv.fr](https://geo.api.gouv.fr)
- Re-calcul du statut toutes les 60 s selon l'heure de Paris

## Stack

Next.js 16 (App Router) · React 19 · TypeScript strict · Tailwind 4 · Leaflet + react-leaflet · CartoDB tiles (Positron / Dark Matter) · déployé sur Vercel.

## Lancer en local

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de production
```

## Structure

```
app/             # App Router (layout, page, robots, sitemap, llms.txt, opengraph-image)
components/     # BrandBar, IndexPanel, MapClient, RestaurantCard, ThemeProvider, …
data/           # restaurants.ts (seed Wikipédia), addresses, hours
utils/          # filters, formatters, live-status (Europe/Paris), structured-data
types/          # types TypeScript
```

## Sources & mentions

Données extraites de l'article [Wikipédia *Cauchemar en cuisine (France)*](https://fr.wikipedia.org/wiki/Cauchemar_en_cuisine_\(France\)), enrichies manuellement. Photos d'illustration via Unsplash.

Site **indépendant et non officiel**. Aucun lien commercial avec M6, Studio 89 Productions ou Philippe Etchebest. Le logo et les noms appartiennent à leurs ayants droit.
