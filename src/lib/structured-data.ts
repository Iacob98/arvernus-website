import { COMPANY } from "./constants";

export function getLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: COMPANY.fullName,
    description: COMPANY.tagline,
    url: COMPANY.website,
    telephone: COMPANY.phone,
    email: COMPANY.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY.address.street,
      postalCode: COMPANY.address.zip,
      addressLocality: COMPANY.address.city,
      addressRegion: COMPANY.address.state,
      addressCountry: "DE",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "14:00",
      },
    ],
    sameAs: [
      COMPANY.social.facebook,
      COMPANY.social.instagram,
      COMPANY.social.linkedin,
    ],
    foundingDate: `${COMPANY.foundedYear}`,
    areaServed: {
      "@type": "State",
      name: COMPANY.address.state,
    },
    priceRange: "€€",
  };
}

export function getServiceJsonLd(name: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${COMPANY.website}${url}`,
    provider: {
      "@type": "LocalBusiness",
      name: COMPANY.fullName,
      url: COMPANY.website,
    },
    areaServed: {
      "@type": "State",
      name: COMPANY.address.state,
    },
  };
}

export function getFAQJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
