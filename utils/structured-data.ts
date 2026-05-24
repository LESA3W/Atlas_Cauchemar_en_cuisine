import { restaurants, TOTAL_EPISODES_AIRED } from "@/data/restaurants";

const SITE = "https://carte-cauchemar-en-cuisine.vercel.app";
const GITHUB = "https://github.com/LESA3W/Atlas_Cauchemar_en_cuisine";
const LAST_BUILD = new Date().toISOString();

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE}#website`,
  name: "Carte Cauchemar en cuisine",
  alternateName: "L'Atlas Cauchemar en cuisine",
  url: SITE,
  description:
    "Atlas interactif des 97 restaurants visités par Philippe Etchebest dans Cauchemar en cuisine sur M6, France métropolitaine et Corse.",
  inLanguage: "fr-FR",
  dateModified: LAST_BUILD,
  publisher: { "@id": `${SITE}#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE}/?q={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  }
};

const curatorSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE}#curator`,
  name: "Paul Chenon",
  alternateName: "LESA3W",
  url: "https://github.com/LESA3W",
  sameAs: ["https://github.com/LESA3W", GITHUB],
  jobTitle: "Développeur web",
  description:
    "Créateur et développeur indépendant de l'Atlas Cauchemar en cuisine. Compilation et maintenance des données issues de sources publiques (Wikipédia, M6, vérifications manuelles)."
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE}#organization`,
  name: "L'Atlas Cauchemar en cuisine",
  alternateName: "Carte Cauchemar en cuisine",
  url: SITE,
  sameAs: [
    GITHUB,
    "https://fr.wikipedia.org/wiki/Cauchemar_en_cuisine_(France)",
    "https://www.m6.fr/cauchemar-en-cuisine-avec-philippe-etchebest-p_841"
  ],
  founder: { "@id": `${SITE}#curator` },
  logo: {
    "@type": "ImageObject",
    url: `${SITE}/images/cauchemar-en-cuisine-logo.png`,
    width: 512,
    height: 512
  },
  description:
    "Atlas indépendant non-officiel répertoriant tous les restaurants où l'émission Cauchemar en cuisine de Philippe Etchebest est allée tourner depuis 2011."
};

const tvSeriesSchema = {
  "@context": "https://schema.org",
  "@type": "TVSeries",
  "@id": `${SITE}#tvseries`,
  name: "Cauchemar en cuisine",
  alternateName: "Cauchemar en cuisine avec Philippe Etchebest",
  countryOfOrigin: { "@type": "Country", name: "France" },
  inLanguage: "fr",
  startDate: "2011-04-18",
  numberOfEpisodes: TOTAL_EPISODES_AIRED,
  productionCompany: {
    "@type": "Organization",
    name: "Studio 89 Productions"
  },
  publication: {
    "@type": "PublicationEvent",
    publishedBy: { "@type": "Organization", name: "M6", url: "https://www.m6.fr" }
  },
  actor: [
    {
      "@type": "Person",
      name: "Philippe Etchebest",
      jobTitle: "Chef cuisinier",
      nationality: "France",
      sameAs: ["https://fr.wikipedia.org/wiki/Philippe_Etchebest"]
    }
  ],
  genre: ["Téléréalité", "Cuisine", "Gastronomie"],
  url: "https://www.m6.fr/cauchemar-en-cuisine-avec-philippe-etchebest-p_841"
};

const collectionPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${SITE}#collection`,
  url: SITE,
  name: "Carte des restaurants Cauchemar en cuisine",
  description:
    "Collection complète des 97 restaurants visités par Philippe Etchebest dans Cauchemar en cuisine, géolocalisés sur une carte interactive avec statut d'ouverture en direct.",
  inLanguage: "fr-FR",
  isPartOf: { "@id": `${SITE}#website` },
  about: { "@id": `${SITE}#tvseries` },
  author: { "@id": `${SITE}#curator` },
  dateModified: LAST_BUILD,
  mainEntity: { "@id": `${SITE}#restaurants` }
};

function buildItemList() {
  const items = restaurants
    .filter((r) => r.status !== "permanently_closed")
    .map((r, index) => {
      const restaurant: Record<string, unknown> = {
        "@type": "Restaurant",
        "@id": `${SITE}#restaurant-${r.id}`,
        name: r.name,
        address: {
          "@type": "PostalAddress",
          addressLocality: r.city,
          addressRegion: r.region ?? r.department,
          addressCountry: "FR"
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: r.lat,
          longitude: r.lng
        },
        identifier: `episode-${r.episodeNumber}`
      };

      if (r.address && r.address.length > 4 && !/à confirmer/i.test(r.address)) {
        (restaurant.address as Record<string, string>).streetAddress = r.address;
      }

      return {
        "@type": "ListItem",
        position: index + 1,
        item: restaurant
      };
    });

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE}#restaurants`,
    name: "Restaurants de Cauchemar en cuisine encore en activité",
    description:
      "Liste des restaurants encore en activité visités par Philippe Etchebest dans Cauchemar en cuisine sur M6.",
    numberOfItems: items.length,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: items
  };
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Combien d'épisodes de Cauchemar en cuisine ont été diffusés en France ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `Depuis le 18 avril 2011, ${TOTAL_EPISODES_AIRED} épisodes standard de Cauchemar en cuisine avec Philippe Etchebest ont été diffusés sur M6, le dernier en date étant l'épisode 97 (La Sarriette à Médière) le 24 mars 2026.`
      }
    },
    {
      "@type": "Question",
      name: "Où trouver la liste de tous les restaurants visités dans Cauchemar en cuisine ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "L'atlas interactif sur carte-cauchemar-en-cuisine.vercel.app recense les 97 adresses sur une carte de France et de Corse, avec leur statut d'ouverture en direct, leurs horaires et leur ville."
      }
    },
    {
      "@type": "Question",
      name: "Combien de restaurants de Cauchemar en cuisine sont encore ouverts ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `Selon les données disponibles, environ ${restaurants.filter((r) => r.status !== "permanently_closed").length} des restaurants tournés dans l'émission seraient toujours en activité, les autres ayant définitivement fermé ou changé de propriétaire.`
      }
    },
    {
      "@type": "Question",
      name: "Qui présente Cauchemar en cuisine en France ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Philippe Etchebest, chef cuisinier français Meilleur Ouvrier de France et étoilé Michelin, présente l'émission Cauchemar en cuisine sur M6 depuis 2011."
      }
    },
    {
      "@type": "Question",
      name: "Dans quelle ville s'est tourné le premier épisode de Cauchemar en cuisine ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le tout premier épisode de Cauchemar en cuisine avec Philippe Etchebest a été tourné au restaurant The House à Toulon (Var), et diffusé le 18 avril 2011."
      }
    }
  ]
};

export function getAllJsonLd() {
  return [
    websiteSchema,
    curatorSchema,
    organizationSchema,
    tvSeriesSchema,
    collectionPageSchema,
    faqSchema,
    buildItemList()
  ];
}
