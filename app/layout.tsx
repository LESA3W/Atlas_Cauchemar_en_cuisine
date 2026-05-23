import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "leaflet/dist/leaflet.css";
import "./globals.css";

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  display: "swap"
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600"],
  display: "swap"
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://carte-cauchemar-en-cuisine.vercel.app"),
  title: {
    default: "Carte Cauchemar en cuisine — Tous les restaurants de Philippe Etchebest",
    template: "%s · Carte Cauchemar en cuisine"
  },
  description:
    "Atlas interactif des 97 restaurants visités par Philippe Etchebest dans Cauchemar en cuisine sur M6. France métropolitaine et Corse, statut ouvert/fermé en direct, horaires, adresses, fiches détaillées.",
  keywords: [
    "Cauchemar en cuisine",
    "Philippe Etchebest",
    "M6",
    "restaurants",
    "carte",
    "France",
    "atlas",
    "épisodes",
    "Etchebest restaurants"
  ],
  authors: [{ name: "L'Atlas Cauchemar en cuisine" }],
  alternates: {
    canonical: "/"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  openGraph: {
    title: "Carte Cauchemar en cuisine — Tous les restaurants de Philippe Etchebest",
    description:
      "97 adresses, France métropolitaine et Corse. Carte interactive avec statut live, horaires et fiches.",
    locale: "fr_FR",
    type: "website",
    url: "https://carte-cauchemar-en-cuisine.vercel.app",
    siteName: "L'Atlas Cauchemar en cuisine",
    images: [
      {
        url: "/images/cauchemar-en-cuisine-logo.png",
        width: 1200,
        height: 630,
        alt: "Logo Cauchemar en cuisine — Atlas des restaurants"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Carte Cauchemar en cuisine",
    description:
      "97 restaurants de l'émission Cauchemar en cuisine cartographiés en France + Corse, statut live.",
    images: ["/images/cauchemar-en-cuisine-logo.png"]
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F5F0E8" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0A" }
  ],
  width: "device-width",
  initialScale: 1
};

const themeInitScript = `(function(){try{var t=localStorage.getItem('cec-theme');if(t!=='light'&&t!=='dark')t='light';document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`;

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Carte Cauchemar en cuisine",
  alternateName: "L'Atlas Cauchemar en cuisine",
  url: "https://carte-cauchemar-en-cuisine.vercel.app",
  description:
    "Atlas interactif des 97 restaurants visités par Philippe Etchebest dans Cauchemar en cuisine sur M6.",
  inLanguage: "fr-FR",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate:
        "https://carte-cauchemar-en-cuisine.vercel.app/?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr-FR" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body
        className={`${sans.variable} ${display.variable} ${mono.variable} bg-ink text-paper font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
