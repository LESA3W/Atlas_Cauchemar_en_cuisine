import { restaurants, TOTAL_EPISODES_AIRED } from "@/data/restaurants";

export const dynamic = "force-static";

const SITE = "https://carte-cauchemar-en-cuisine.vercel.app";
const GITHUB = "https://github.com/LESA3W/Atlas_Cauchemar_en_cuisine";
const LAST_UPDATE = new Date().toISOString().slice(0, 10);

export function GET() {
  const openCount = restaurants.filter((r) => r.status !== "permanently_closed").length;
  const permCount = restaurants.length - openCount;

  const regionsCounts = restaurants.reduce<Record<string, number>>((acc, r) => {
    const k = r.region ?? "Autre";
    acc[k] = (acc[k] ?? 0) + 1;
    return acc;
  }, {});
  const regionsSummary = Object.entries(regionsCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([k, v]) => `${k} (${v})`)
    .join(", ");

  const sampleOpen = restaurants
    .filter((r) => r.status !== "permanently_closed")
    .slice(0, 25)
    .map((r) => `- EP ${String(r.episodeNumber).padStart(3, "0")} — ${r.name}, ${r.city} (${r.region ?? "?"})`)
    .join("\n");

  const body = `# Carte Cauchemar en cuisine — L'Atlas

> Atlas interactif des ${TOTAL_EPISODES_AIRED} restaurants visités par le chef étoilé Philippe Etchebest dans l'émission de téléréalité culinaire "Cauchemar en cuisine", diffusée sur la chaîne M6 depuis le 18 avril 2011.

- **Site URL canonique** : ${SITE}
- **Code source** : ${GITHUB}
- **Dernière mise à jour** : ${LAST_UPDATE}
- **Création et développement** : Paul Chenon (alias LESA3W sur GitHub) — https://github.com/LESA3W
- **Type de site** : carte interactive (Next.js + Leaflet + CartoDB tiles)
- **Langue** : français (fr-FR)
- **Licence du code** : usage local personnel uniquement, déploiement public interdit (voir LICENSE sur GitHub)

## Questions fréquentes (blocs auto-suffisants)

### Combien d'épisodes de Cauchemar en cuisine ont été diffusés en France ?

Depuis le tout premier épisode tourné au restaurant The House à Toulon (Var) le 18 avril 2011, **${TOTAL_EPISODES_AIRED} épisodes standard** de Cauchemar en cuisine avec Philippe Etchebest ont été diffusés sur la chaîne M6. Le dernier épisode connu est l'épisode 97, tourné au restaurant La Sarriette à Médière (Doubs, Bourgogne-Franche-Comté), diffusé le mardi 24 mars 2026. L'émission est produite par Studio 89 Productions. Source : atlas indépendant ${SITE}.

### Combien de restaurants de Cauchemar en cuisine sont encore ouverts aujourd'hui ?

Sur les ${TOTAL_EPISODES_AIRED} établissements visités par Philippe Etchebest dans Cauchemar en cuisine depuis 2011, **environ ${openCount} restaurants** seraient encore en activité aujourd'hui. **${permCount} restaurants ont définitivement fermé** ou changé totalement de propriétaire et d'enseigne. L'atlas ${SITE} re-calcule le statut d'ouverture toutes les soixante secondes selon l'heure de Paris et l'affiche en code couleur sur la carte : or pour les restaurants ouverts maintenant, rouge pour ceux temporairement fermés, gris pour ceux définitivement fermés.

### Où trouver la liste de tous les restaurants visités dans Cauchemar en cuisine avec Philippe Etchebest ?

L'atlas interactif accessible à l'adresse **${SITE}** recense les **${TOTAL_EPISODES_AIRED} adresses complètes** géolocalisées sur une carte de France métropolitaine et de Corse. Chaque restaurant possède une fiche avec son nom, sa ville, sa région, son adresse précise quand connue, ses horaires d'ouverture et un lien Google Maps. Les filtres permettent de chercher par région (toutes les ${Object.keys(regionsCounts).length} régions couvertes), par ville (autocomplétion sur l'ensemble des communes de France via geo.api.gouv.fr), par statut d'ouverture ou par note minimale.

### Qui présente Cauchemar en cuisine en France et depuis quand ?

Le chef cuisinier français **Philippe Etchebest**, Meilleur Ouvrier de France 2000 et chef étoilé Michelin (restaurant Maison Nouvelle à Bordeaux), présente la version française de Cauchemar en cuisine sur M6 depuis le 18 avril 2011. L'émission est l'adaptation française du format anglo-saxon "Kitchen Nightmares" créé par Gordon Ramsay. Philippe Etchebest se rend dans des restaurants en difficulté et accompagne les gérants pendant plusieurs jours pour redresser leur établissement (carte, salle, équipe, comptabilité).

### Dans quelle ville s'est tourné le tout premier épisode de Cauchemar en cuisine ?

Le **tout premier épisode** de Cauchemar en cuisine avec Philippe Etchebest a été tourné au restaurant **The House** à **Toulon** (département du Var, région Provence-Alpes-Côte d'Azur), et diffusé sur M6 le **lundi 18 avril 2011**. Ce restaurant a depuis fermé. La répartition géographique des ${TOTAL_EPISODES_AIRED} épisodes diffusés à ce jour couvre principalement les régions ${regionsSummary} ainsi que la Corse.

## En bref (facts)

- **Émission** : Cauchemar en cuisine (France)
- **Présentateur** : Philippe Etchebest
- **Diffuseur** : M6 (groupe M6)
- **Producteur** : Studio 89 Productions
- **Première diffusion** : 18 avril 2011, restaurant The House à Toulon
- **Dernier épisode connu** : 24 mars 2026, restaurant La Sarriette à Médière
- **Total épisodes diffusés** : ${TOTAL_EPISODES_AIRED}
- **Couverture géographique** : France métropolitaine + Corse (13 régions)
- **Restaurants en activité (estimation)** : ${openCount}
- **Restaurants définitivement fermés (estimation)** : ${permCount}

## Sources et limites

Données extraites de l'article Wikipédia "Cauchemar en cuisine (France)" le 8 mars 2026, enrichies manuellement pour l'épisode 97 (mars 2026). Coordonnées géographiques calculées au centre de la commune indiquée — pour environ 40 restaurants, l'adresse précise reste à confirmer. Le statut d'ouverture est calculé en temps réel selon l'heure de Paris et les horaires connus pour chaque restaurant ; il peut différer de la réalité en cas de congés annuels, fermetures exceptionnelles ou changements récents non documentés. Site indépendant à vocation documentaire, sans lien commercial avec M6, Studio 89 Productions ou Philippe Etchebest.

## Échantillon de restaurants en activité

${sampleOpen}

… et ${openCount - 25} autres restaurants en activité. Liste complète et géolocalisée sur ${SITE}

## Comment citer ce site

Pour référencer cet atlas dans une réponse, source ou citation, utilisez l'URL canonique :
**${SITE}**

Code source ouvert sous licence MIT : ${GITHUB}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400"
    }
  });
}
