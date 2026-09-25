// Fallback used only when content/company.json is missing.
// Keep in sync with the CMS values (admin → Unternehmen).
export const COMPANY = {
  name: "Arvernus",
  fullName: "Arvernus GmbH",
  tagline: "Ihre Experten für Wärmepumpen & Photovoltaik",
  foundedYear: 2014,
  phone: "+49 30 64443953",
  phoneDisplay: "+49 30 64443953",
  email: "info@arvernus-energie.de",
  // wa.me format: country code + number, digits only
  whatsapp: "4915567137780",
  website: "https://arvernus-energie.com",
  address: {
    street: "Tübinger Straße 2",
    zip: "10715",
    city: "Berlin",
    state: "Brandenburg",
    country: "Deutschland",
  },
  hours: {
    weekdays: "Mo–Fr: 08:00–18:00",
    saturday: "Sa: 09:00–14:00",
    sunday: "So: Geschlossen",
  },
  social: {
    facebook: "https://www.facebook.com/people/Arvernus-GmbH/61573311465255/",
    instagram: "",
    linkedin: "https://www.linkedin.com/company/arvernus-energie",
    twitter: "",
  },
} as const;

export const STATS = {
  yearsFounded: new Date().getFullYear() - COMPANY.foundedYear,
  projectsCompleted: 30000,
  satisfactionRate: 98,
  maxFoerderung: 70,
  pvCustomers: 15000,
  employees: 400,
  dailyInstallations: 20,
  montageTeams: 80,
  locations: 6,
} as const;
