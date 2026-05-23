import { restaurants, TOTAL_EPISODES_AIRED } from "@/data/restaurants";

const SITE = "https://carte-cauchemar-en-cuisine.vercel.app";

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
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE}/?q={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  }
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE}#organization`,
  name: "L'Atlas Cauchemar en cuisine",
  url: SITE,
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
  actor: {
    "@type": "Person",
    name: "Philippe Etchebest",
    jobTitle: "Chef cuisinier",
    nationality: "France"
  },
  genre: ["Téléréalité", "Cuisine", "Gastronomie"],
  url: "https://www.m6.fr/cauchemar-en-cuisine-avec-philippe-etchebest-p_841"
};

function buildItemList() {
  const items = restaurants
    .filter((r) => r.status !== "permanently_closed")
    .map((r, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
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
        url: SITE,
        identifier: `episode-${r.episodeNumber}`,
        aggregateRating: r.rating
          ? {
              "@type": "AggregateRating",
              ratingValue: r.rating.toFixed(1),
              bestRating: "5",
              worstRating: "0",
              ratingCount: 1
            }
          : undefined
      }
    }));

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE}#restaurants`,
    name: "Restaurants de Cauchemar en cuisine",
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

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Accueil",
      item: SITE
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Carte des restaurants Cauchemar en cuisine",
      item: SITE
    }
  ]
};

export function getAllJsonLd() {
  return [
    websiteSchema,
    organizationSchema,
    tvSeriesSchema,
    breadcrumbSchema,
    faqSchema,
    buildItemList()
  ];
}
