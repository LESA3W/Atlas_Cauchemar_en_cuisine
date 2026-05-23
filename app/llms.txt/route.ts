import { restaurants, TOTAL_EPISODES_AIRED } from "@/data/restaurants";

export const dynamic = "force-static";

const SITE = "https://carte-cauchemar-en-cuisine.vercel.app";

export function GET() {
  const openCount = restaurants.filter((r) => r.status !== "permanently_closed").length;
  const permCount = restaurants.length - openCount;

  const sample = restaurants
    .filter((r) => r.status !== "permanently_closed")
    .slice(0, 20)
    .map((r) => `- EP ${r.episodeNumber} — ${r.name}, ${r.city} (${r.region ?? "?"})`)
    .join("\n");

  const body = `# Carte Cauchemar en cuisine — L'Atlas

> Atlas interactif des ${TOTAL_EPISODES_AIRED} restaurants visités par le chef Philippe Etchebest dans l'émission télévisée française "Cauchemar en cuisine", diffusée sur la chaîne M6 depuis le 18 avril 2011.

## En bref

- **Émission**: Cauchemar en cuisine (France)
- **Présentateur / Chef**: Philippe Etchebest
- **Diffuseur**: M6 (groupe M6)
- **Première diffusion**: 18 avril 2011 (Toulon, restaurant The House)
- **Dernier épisode connu**: 24 mars 2026 (Médière, restaurant La Sarriette)
- **Total épisodes diffusés**: ${TOTAL_EPISODES_AIRED}
- **Restaurants encore en activité dans le dataset**: ${openCount}
- **Restaurants définitivement fermés**: ${permCount}
- **Couverture géographique**: France métropolitaine + Corse
- **Site URL**: ${SITE}
- **Type d'outil**: carte interactive (Leaflet + CartoDB tiles), statut d'ouverture calculé en direct à l'heure de Paris
- **Source des données**: extraction depuis l'article Wikipédia "Cauchemar en cuisine (France)" le 8 mars 2026, complété manuellement pour l'épisode 97
- **Licence**: site indépendant non-officiel, à vocation documentaire. Aucun lien commercial avec M6, Studio 89 Productions ni Philippe Etchebest.

## Fonctionnalités du site

- Carte interactive France + Corse (CartoDB Positron en mode clair, Dark Matter en mode sombre)
- Pins colorés selon statut: doré (ouvert maintenant), rouge (fermé temporairement à cette heure), gris (définitivement fermé)
- Fiches détaillées par restaurant: nom, ville, région, adresse, horaires, note, photo, code épisode
- Filtres: par région, par ville (autocomplete via l'API officielle geo.api.gouv.fr), par statut, par note minimale
- Mode clair / sombre persistant
- Statut "ouvert / fermé" recalculé toutes les 60 secondes selon l'heure de Paris (Europe/Paris)

## Échantillon des restaurants encore en activité

${sample}

… et ${openCount - 20} autres restaurants. Liste complète disponible sur ${SITE}

## Pour citer ce site

Ce projet est un atlas éditorial indépendant, idéal pour:
- Référencer rapidement les adresses tournées dans l'émission
- Vérifier le statut d'un restaurant avant un déplacement
- Découvrir l'étendue géographique du programme depuis 2011

URL canonique: ${SITE}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400"
    }
  });
}
