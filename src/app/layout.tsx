import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleTagManager, GoogleTagManagerNoScript } from "@/components/layout/GoogleTagManager";
import { MetaPixel } from "@/components/layout/MetaPixel";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Arvernus – Wärmepumpen & Photovoltaik | Seit 2014",
    template: "%s | Arvernus",
  },
  description:
    "Arvernus ist Ihr Experte für Wärmepumpen und Photovoltaik. Seit 2014 installieren wir energieeffiziente Heizsysteme und Solaranlagen. Bis zu 70% Förderung möglich.",
  keywords: [
    "Wärmepumpe",
    "Photovoltaik",
    "Solaranlage",
    "Luft-Wasser-Wärmepumpe",
    "Förderung",
    "KfW",
    "BAFA",
    "Energieberatung",
  ],
  authors: [{ name: "Arvernus GmbH" }],
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "Arvernus",
  },
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${inter.variable} font-sans antialiased`}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-lg focus:bg-[var(--primary)] focus:px-4 focus:py-2 focus:text-white">
          Zum Inhalt springen
        </a>
        <GoogleTagManagerNoScript />
        <GoogleTagManager />
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
