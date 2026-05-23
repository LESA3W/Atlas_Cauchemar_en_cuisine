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
  title: "Cauchemar en cuisine — L'Atlas",
  description:
    "Atlas éditorial des 96 restaurants visités par Philippe Etchebest dans Cauchemar en cuisine, en France métropolitaine et en Corse.",
  openGraph: {
    title: "Cauchemar en cuisine — L'Atlas",
    description:
      "96 adresses, France & Corse. Une carte éditoriale des restaurants de Philippe Etchebest.",
    locale: "fr_FR",
    type: "website"
  }
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr-FR">
      <body
        className={`${sans.variable} ${display.variable} ${mono.variable} bg-ink text-paper font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
