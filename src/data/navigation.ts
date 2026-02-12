import type { NavItem } from "@/types";

export const mainNavigation: NavItem[] = [
  {
    label: "Wärmepumpen",
    href: "/waermepumpen",
    children: [
      { label: "Luft-Wasser-Wärmepumpe", href: "/waermepumpen/luft-wasser-waermepumpe" },
      { label: "Sole-Wasser-Wärmepumpe", href: "/waermepumpen/sole-wasser-waermepumpe" },
      { label: "Wasser-Wasser-Wärmepumpe", href: "/waermepumpen/wasser-wasser-waermepumpe" },
    ],
  },
  { label: "Photovoltaik", href: "/photovoltaik" },
  { label: "Rechner", href: "/waermepumpen-rechner" },
  { label: "Förderung", href: "/foerderung" },
  { label: "Referenzen", href: "/referenzen" },
  { label: "Über uns", href: "/ueber-uns" },
  { label: "Kontakt", href: "/kontakt" },
];

export const footerNavigation = {
  services: [
    { label: "Wärmepumpen", href: "/waermepumpen" },
    { label: "Luft-Wasser-Wärmepumpe", href: "/waermepumpen/luft-wasser-waermepumpe" },
    { label: "Sole-Wasser-Wärmepumpe", href: "/waermepumpen/sole-wasser-waermepumpe" },
    { label: "Wasser-Wasser-Wärmepumpe", href: "/waermepumpen/wasser-wasser-waermepumpe" },
    { label: "Photovoltaik", href: "/photovoltaik" },
  ],
  company: [
    { label: "Über uns", href: "/ueber-uns" },
    { label: "Referenzen", href: "/referenzen" },
    { label: "Förderung", href: "/foerderung" },
    { label: "Kontakt", href: "/kontakt" },
  ],
  resources: [
    { label: "Wärmepumpen-Rechner", href: "/waermepumpen-rechner" },
    { label: "Förderungsrechner", href: "/foerderung" },
  ],
  legal: [
    { label: "Impressum", href: "/impressum" },
    { label: "Datenschutz", href: "/datenschutz" },
  ],
};
