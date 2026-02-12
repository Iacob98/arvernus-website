/**
 * Seed script: exports hardcoded data into JSON files in content/
 * Run with: npx tsx scripts/seed-content.ts
 */
import fs from "fs/promises";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "content");

async function writeJSON(filename: string, data: unknown) {
  const filePath = path.join(CONTENT_DIR, filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
  console.log(`  Written: ${filename}`);
}

async function seed() {
  console.log("Seeding content...\n");
  await fs.mkdir(CONTENT_DIR, { recursive: true });

  // Company
  await writeJSON("company.json", {
    name: "Arvernus",
    fullName: "Arvernus GmbH",
    tagline: "Ihre Experten für Wärmepumpen & Photovoltaik",
    foundedYear: 2014,
    phone: "+49 123 456789",
    phoneDisplay: "0123 456789",
    email: "info@arvernus.de",
    whatsapp: "49123456789",
    website: "https://www.arvernus.de",
    address: {
      street: "Musterstraße 1",
      zip: "12345",
      city: "Musterstadt",
      state: "Bayern",
      country: "Deutschland",
    },
    hours: {
      weekdays: "Mo–Fr: 08:00–18:00",
      saturday: "Sa: 09:00–14:00",
      sunday: "So: Geschlossen",
    },
    social: {
      facebook: "https://facebook.com/arvernus",
      instagram: "https://instagram.com/arvernus",
      linkedin: "https://linkedin.com/company/arvernus",
    },
    stats: {
      projectsCompleted: 1000,
      satisfactionRate: 98,
      maxFoerderung: 70,
    },
  });

  // Testimonials
  await writeJSON("testimonials.json", [
    {
      id: "1",
      name: "Familie Müller",
      location: "München",
      rating: 5,
      text: "Von der ersten Beratung bis zur Inbetriebnahme war alles perfekt organisiert. Unsere Luft-Wasser-Wärmepumpe läuft seit einem Jahr einwandfrei und wir sparen über 60% Heizkosten.",
      service: "Luft-Wasser-Wärmepumpe",
      date: "2024",
      order: 0,
    },
    {
      id: "2",
      name: "Herr Schmidt",
      location: "Augsburg",
      rating: 5,
      text: "Arvernus hat uns eine Photovoltaikanlage mit Speicher installiert. Die Beratung zur Förderung war hervorragend — wir haben 45% Zuschuss erhalten. Sehr empfehlenswert!",
      service: "Photovoltaik mit Speicher",
      date: "2024",
      order: 1,
    },
    {
      id: "3",
      name: "Familie Weber",
      location: "Nürnberg",
      rating: 5,
      text: "Wir haben uns für eine Sole-Wasser-Wärmepumpe entschieden und sind begeistert. Das Team war kompetent, pünktlich und hat sauber gearbeitet. Top Service!",
      service: "Sole-Wasser-Wärmepumpe",
      date: "2023",
      order: 2,
    },
  ]);

  // Projects
  await writeJSON("projects.json", [
    { id: "1", title: "Einfamilienhaus München", description: "Luft-Wasser-Wärmepumpe mit 12 kW Leistung und Fußbodenheizung. Austausch der alten Gasheizung.", category: "waermepumpe", location: "München", year: 2024, specs: ["Luft-Wasser WP 12 kW", "Fußbodenheizung", "BEG-Förderung 50%"], image: "/images/wp-outdoor.jpg", order: 0 },
    { id: "2", title: "Mehrfamilienhaus Augsburg", description: "Sole-Wasser-Wärmepumpe mit Tiefenbohrung für 6 Wohneinheiten. Inklusive passive Kühlung.", category: "waermepumpe", location: "Augsburg", year: 2024, specs: ["Sole-Wasser WP 25 kW", "2x Erdsonde 100m", "Passive Kühlung"], image: "/images/wp-indoor-unit.jpg", order: 1 },
    { id: "3", title: "PV-Anlage Nürnberg", description: "15 kWp Photovoltaikanlage mit 10 kWh Speicher auf Satteldach. Eigenverbrauchsquote 75%.", category: "photovoltaik", location: "Nürnberg", year: 2024, specs: ["15 kWp Module", "10 kWh Speicher", "Eigenverbrauch 75%"], image: "/images/pv-roof-close.jpg", order: 2 },
    { id: "4", title: "Kombi-Projekt Regensburg", description: "Wärmepumpe und Photovoltaik in Kombination für maximale Unabhängigkeit.", category: "kombiniert", location: "Regensburg", year: 2023, specs: ["Luft-Wasser WP 10 kW", "12 kWp PV", "8 kWh Speicher"], image: "/images/pv-house-full.jpg", order: 3 },
    { id: "5", title: "Neubau Ingolstadt", description: "Energieeffizientes Einfamilienhaus mit Sole-Wasser-Wärmepumpe und PV-Anlage.", category: "kombiniert", location: "Ingolstadt", year: 2023, specs: ["Sole-Wasser WP 8 kW", "10 kWp PV", "KfW 40+"], image: "/images/wp-system-diagram.jpg", order: 4 },
    { id: "6", title: "PV-Großanlage Rosenheim", description: "Gewerbliche Photovoltaikanlage mit 50 kWp auf Flachdach eines Bürogebäudes.", category: "photovoltaik", location: "Rosenheim", year: 2023, specs: ["50 kWp Module", "Flachdach-System", "Monitoring"], image: "/images/pv-roof-close.jpg", order: 5 },
  ]);

  // FAQ
  const addIds = (items: { question: string; answer: string }[]) =>
    items.map((item, i) => ({ ...item, id: String(i + 1), order: i }));

  await writeJSON("faq.json", {
    general: addIds([
      { question: "Wie viel kostet eine Wärmepumpe?", answer: "Die Kosten für eine Wärmepumpe liegen je nach Typ und Gebäude zwischen 15.000 und 35.000 Euro. Nach Abzug der staatlichen Förderung (bis zu 70%) reduzieren sich die Kosten erheblich. Nutzen Sie unseren kostenlosen Rechner für eine individuelle Einschätzung." },
      { question: "Welche Förderung gibt es für Wärmepumpen?", answer: "Über die BEG-Förderung (BAFA/KfW) können Sie bis zu 70% der Investitionskosten als Zuschuss erhalten. Dies setzt sich zusammen aus: Grundförderung (30%), Klimageschwindigkeitsbonus (20%), Einkommensbonus (30%) und iSFP-Bonus (5%)." },
      { question: "Wie lange dauert die Installation einer Wärmepumpe?", answer: "Eine Luft-Wasser-Wärmepumpe kann in der Regel innerhalb von 1–3 Tagen installiert werden. Bei Sole-Wasser- oder Wasser-Wasser-Wärmepumpen dauert es aufgrund der Erdarbeiten ca. 1–2 Wochen." },
      { question: "Funktioniert eine Wärmepumpe auch im Winter?", answer: "Ja! Moderne Wärmepumpen arbeiten effizient bis zu Außentemperaturen von -20°C. Luft-Wasser-Wärmepumpen erreichen selbst bei -15°C noch gute Leistungswerte. Erdwärmepumpen sind von Außentemperaturen unabhängig." },
      { question: "Lohnt sich Photovoltaik in Deutschland?", answer: "Definitiv! Deutschland hat genügend Sonnenstunden für eine wirtschaftliche Photovoltaikanlage. Mit Eigenverbrauch, Einspeisevergütung und steigenden Strompreisen amortisiert sich eine Anlage in der Regel nach 8–12 Jahren." },
      { question: "Kann ich Wärmepumpe und Photovoltaik kombinieren?", answer: "Ja, und das ist sogar besonders sinnvoll! Mit einer Photovoltaikanlage erzeugen Sie den Strom für Ihre Wärmepumpe selbst. Das senkt die Betriebskosten weiter und erhöht Ihre Unabhängigkeit." },
    ]),
    waermepumpen: addIds([
      { question: "Welche Wärmepumpe ist die richtige für mein Haus?", answer: "Das hängt von mehreren Faktoren ab: Grundstücksgröße, Bodenbeschaffenheit, Gebäudedämmung und Budget. Luft-Wasser-Wärmepumpen sind am vielseitigsten einsetzbar, Erdwärmepumpen am effizientesten. Wir beraten Sie gerne individuell." },
      { question: "Wie laut ist eine Wärmepumpe?", answer: "Moderne Luft-Wasser-Wärmepumpen erreichen Schallpegel von 35–50 dB(A) — vergleichbar mit einem leisen Gespräch. Sole-Wasser- und Wasser-Wasser-Wärmepumpen sind praktisch lautlos, da sie kein Außengerät benötigen." },
      { question: "Wie hoch sind die Betriebskosten einer Wärmepumpe?", answer: "Die jährlichen Stromkosten für eine Wärmepumpe liegen für ein typisches Einfamilienhaus bei 600–1.200 Euro. In Kombination mit einer Photovoltaikanlage können die Kosten noch weiter gesenkt werden." },
      { question: "Brauche ich eine Fußbodenheizung für eine Wärmepumpe?", answer: "Nein, eine Fußbodenheizung ist nicht zwingend erforderlich. Wärmepumpen arbeiten mit Fußbodenheizung zwar am effizientesten, funktionieren aber auch mit modernen Niedertemperatur-Heizkörpern sehr gut." },
    ]),
    photovoltaik: addIds([
      { question: "Wie groß sollte meine Photovoltaikanlage sein?", answer: "Die ideale Größe hängt von Ihrem Stromverbrauch und der verfügbaren Dachfläche ab. Für ein typisches Einfamilienhaus empfehlen wir 8–15 kWp. Wir dimensionieren die Anlage passend zu Ihrem individuellen Bedarf." },
      { question: "Brauche ich einen Stromspeicher?", answer: "Ein Stromspeicher erhöht den Eigenverbrauch von ca. 30% auf bis zu 70–80%. Ob sich ein Speicher für Sie lohnt, hängt von Ihrem Verbrauchsprofil ab. Wir beraten Sie gerne dazu." },
      { question: "Wie lange hält eine Photovoltaikanlage?", answer: "Moderne Solarmodule haben eine Lebensdauer von mindestens 25–30 Jahren. Die meisten Hersteller geben eine Leistungsgarantie von 25 Jahren mit mindestens 80% der Nennleistung." },
      { question: "Was passiert bei Stromausfall?", answer: "Standardmäßig schaltet sich die Anlage bei Stromausfall aus Sicherheitsgründen ab. Mit einem Hybridwechselrichter und Stromspeicher können Sie jedoch eine Notstromversorgung realisieren." },
    ]),
    foerderung: addIds([
      { question: "Wer kann die Förderung beantragen?", answer: "Grundsätzlich können alle Eigentümer von bestehenden Wohngebäuden die BEG-Förderung beantragen. Dies gilt für selbstgenutzte Immobilien ebenso wie für vermietete Objekte." },
      { question: "Wie beantrage ich die Förderung?", answer: "Die Förderung wird vor Beginn der Maßnahme bei der KfW beantragt. Wir unterstützen Sie dabei vollständig — von der Antragstellung bis zur Auszahlung." },
      { question: "Kann ich mehrere Förderprogramme kombinieren?", answer: "Ja, die einzelnen Boni der BEG-Förderung sind kombinierbar bis maximal 70%. Zusätzlich gibt es in manchen Bundesländern und Kommunen ergänzende Förderprogramme." },
      { question: "Wie hoch ist die maximale Förderung?", answer: "Die maximale Förderung beträgt 70% der förderfähigen Kosten. Die förderfähigen Kosten sind auf 30.000 Euro für die erste Wohneinheit begrenzt (mit iSFP: 60.000 Euro)." },
    ]),
  });

  // Partners
  await writeJSON("partners.json", [
    { id: "1", name: "Bosch", logo: "/partners/bosch.png", featured: true, description: "Offizieller Bosch Partner — Direktvertrieb & Premiumservice", order: 0 },
    { id: "2", name: "Enpal", logo: "/partners/enpal.png", order: 1 },
    { id: "3", name: "Klarsolar", logo: "/partners/klarsolar.png", order: 2 },
    { id: "4", name: "Solarcom24", logo: "/partners/solarcom24.webp", order: 3 },
    { id: "5", name: "1Komma5°", logo: "/partners/1komma5.webp", order: 4 },
    { id: "6", name: "Energiekonzepte Deutschland", logo: "/partners/energiekonzepte.webp", order: 5 },
    { id: "7", name: "Ecoligo", logo: "/partners/ecoligo.png", order: 6 },
    { id: "8", name: "Solar Meisterei", logo: "/partners/solarmeisterei.png", order: 7 },
  ]);

  // Team
  await writeJSON("team.json", [
    { id: "1", name: "Thomas Berger", role: "Geschäftsführer", description: "Gründer und Geschäftsführer mit über 20 Jahren Erfahrung in der Energiebranche.", order: 0 },
    { id: "2", name: "Sandra Huber", role: "Technische Leiterin", description: "Meisterin für Heizungsbau und Spezialistin für Wärmepumpentechnik.", order: 1 },
    { id: "3", name: "Michael Kraft", role: "Vertriebsleiter", description: "Ihr Ansprechpartner für Beratung, Angebote und Fördermittel.", order: 2 },
    { id: "4", name: "Anna Schneider", role: "Projektleiterin PV", description: "Expertin für Photovoltaikplanung und Speicherlösungen.", order: 3 },
  ]);

  // Timeline
  await writeJSON("timeline.json", [
    { id: "1", year: 2014, title: "Gründung", description: "Arvernus GmbH wird gegründet mit dem Fokus auf erneuerbare Energien und Wärmepumpentechnik.", order: 0 },
    { id: "2", year: 2016, title: "100. Installation", description: "Wir erreichen den Meilenstein von 100 installierten Wärmepumpen und erweitern unser Team.", order: 1 },
    { id: "3", year: 2018, title: "Photovoltaik-Sparte", description: "Erweiterung des Leistungsportfolios um Photovoltaikanlagen und Stromspeicher.", order: 2 },
    { id: "4", year: 2020, title: "500. Projekt", description: "500 erfolgreich realisierte Projekte. Zertifizierung als Premiumpartner führender Hersteller.", order: 3 },
    { id: "5", year: 2022, title: "Digitalisierung", description: "Einführung digitaler Planungstools und Smart-Home-Lösungen für unsere Kunden.", order: 4 },
    { id: "6", year: 2024, title: "1.000+ Projekte", description: "Über 1.000 realisierte Projekte. Expansion und Ausbau des Servicegebiets.", order: 5 },
  ]);

  // Services
  await writeJSON("services.json", {
    services: [
      {
        title: "Wärmepumpen",
        description: "Effiziente Wärmepumpen für Ihr Zuhause. Wir installieren Luft-Wasser-, Sole-Wasser- und Wasser-Wasser-Wärmepumpen für maximale Energieeinsparung.",
        href: "/waermepumpen",
        icon: "flame",
        features: ["Bis zu 75% Heizkosten sparen", "Staatliche Förderung bis 70%", "Umweltfreundlich & leise", "Wartungsarm & langlebig"],
      },
      {
        title: "Photovoltaik",
        description: "Erzeugen Sie Ihren eigenen Strom mit einer modernen Solaranlage. Von der Planung bis zur Installation — alles aus einer Hand.",
        href: "/photovoltaik",
        icon: "sun",
        features: ["Eigenen Strom erzeugen", "Stromkosten senken", "Einspeisevergütung erhalten", "Unabhängigkeit vom Stromnetz"],
      },
    ],
    waermepumpenTypes: [
      {
        title: "Luft-Wasser-Wärmepumpe",
        slug: "luft-wasser-waermepumpe",
        description: "Die beliebteste Wärmepumpenart. Nutzt die Außenluft als Wärmequelle und ist besonders einfach zu installieren.",
        advantages: ["Geringe Installationskosten", "Keine Erdarbeiten nötig", "Schnelle Montage (1–2 Tage)", "Ideal für Bestandsgebäude", "Kombinierbar mit Photovoltaik"],
        cop: "3,0–4,5",
        idealFor: "Neubauten und gut gedämmte Bestandsgebäude",
      },
      {
        title: "Sole-Wasser-Wärmepumpe",
        slug: "sole-wasser-waermepumpe",
        description: "Nutzt die konstante Erdwärme über Erdsonden oder Flächenkollektoren. Besonders effizient und leise.",
        advantages: ["Höchste Effizienz (COP bis 5,0)", "Konstante Leistung ganzjährig", "Kein Außengerät nötig", "Sehr leiser Betrieb", "Passive Kühlung im Sommer möglich"],
        cop: "4,0–5,0",
        idealFor: "Neubauten mit verfügbarer Grundstücksfläche",
      },
      {
        title: "Wasser-Wasser-Wärmepumpe",
        slug: "wasser-wasser-waermepumpe",
        description: "Nutzt Grundwasser als Wärmequelle. Höchste Effizienz bei verfügbarem Grundwasser.",
        advantages: ["Höchster Wirkungsgrad aller WP-Typen", "Grundwasser hat konstant 8–12°C", "Kühlung im Sommer inklusive", "Sehr niedrige Betriebskosten", "Lange Lebensdauer"],
        cop: "5,0–6,0",
        idealFor: "Gebiete mit zugänglichem Grundwasser",
      },
    ],
  });

  // Pages (empty initial structure)
  await writeJSON("pages.json", {});

  console.log("\nDone! All content seeded to content/");
}

seed().catch(console.error);
