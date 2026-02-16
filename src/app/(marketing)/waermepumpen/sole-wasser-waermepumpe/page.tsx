import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle, CardContent } from "@/components/ui/Card";
import { BreadcrumbNav } from "@/components/shared/BreadcrumbNav";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { CTABanner } from "@/components/shared/CTABanner";
import { TrustBadges, type TrustBadgeItem } from "@/components/shared/TrustBadges";
import { WPTypeCrossLinks } from "@/components/shared/WPTypeCrossLinks";
import { FoerderungServiceCallout } from "@/components/shared/FoerderungServiceCallout";
import { getServices, getPageContent } from "@/lib/dal";

export const metadata: Metadata = {
  title: "Sole-Wasser-Wärmepumpe — Höchste Effizienz mit Erdwärme",
  description:
    "Sole-Wasser-Wärmepumpe (Erdwärmepumpe) von Arvernus: Höchste Effizienz, konstante Leistung, bis zu 70% Förderung. Nutzung der Erdwärme.",
};

const defaultFaq = [
  { question: "Wie tief müssen die Erdsonden gebohrt werden?", answer: "Die Tiefe der Erdsonden hängt vom Wärmebedarf und der Bodenbeschaffenheit ab. Typisch sind 80–100 Meter pro Sonde. Für ein Einfamilienhaus werden meist 1–2 Sonden benötigt." },
  { question: "Was ist der Unterschied zwischen Sonden und Kollektoren?", answer: "Erdsonden werden vertikal in die Tiefe gebohrt (80–100m) und benötigen wenig Platz. Flächenkollektoren werden horizontal in 1,2–1,5m Tiefe verlegt und benötigen eine Fläche von ca. dem 1,5-fachen der beheizten Wohnfläche." },
  { question: "Brauche ich eine Genehmigung?", answer: "Für Erdsonden ist in der Regel eine wasserrechtliche Genehmigung erforderlich. Flächenkollektoren sind meist genehmigungsfrei. Wir kümmern uns um alle notwendigen Genehmigungen." },
  { question: "Kann ich im Sommer damit kühlen?", answer: "Ja! Über die Erdwärme-Sonden kann im Sommer passive Kühlung (Natural Cooling) realisiert werden — nahezu kostenlos und ohne zusätzliche Klimaanlage." },
];

export default async function SoleWasserPage() {
  const [servicesData, pageContent] = await Promise.all([
    getServices(),
    getPageContent("sole-wasser-waermepumpe"),
  ]);

  const type = servicesData.waermepumpenTypes.find((t) => t.slug === "sole-wasser-waermepumpe") ?? servicesData.waermepumpenTypes[1];
  const t = (section: string, field: string, fallback: string) =>
    (pageContent?.[section] as Record<string, string>)?.[field] || fallback;

  const wpBadges: TrustBadgeItem[] = [
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: "Bis 75%",
      sublabel: "Heizkosten sparen",
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      label: "Bis 70%",
      sublabel: "Staatliche Förderung",
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      label: "20+ Jahre",
      sublabel: "Lebensdauer",
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: "Zertifiziert",
      sublabel: "Qualifizierter Fachbetrieb",
    },
  ];

  return (
    <>
      <BreadcrumbNav
        items={[
          { label: "Wärmepumpen", href: "/waermepumpen" },
          { label: "Sole-Wasser-Wärmepumpe" },
        ]}
      />

      <section className="bg-gradient-to-b from-primary-50 to-white py-16">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
              Sole-Wasser-Wärmepumpe
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">{type.description}</p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary-50 px-4 py-2 text-sm font-semibold text-primary">
              COP: {type.cop} &middot; Ideal für: {type.idealFor}
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/waermepumpen-rechner" size="lg">Kosten berechnen</Button>
              <Button href="/kontakt" variant="outline" size="lg">Beratung anfragen</Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-8 border-b border-border">
        <Container><TrustBadges items={wpBadges} /></Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading title={t("advantages", "title", "Vorteile der Sole-Wasser-Wärmepumpe")} />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {type.advantages.map((adv) => (
              <Card key={adv}>
                <div className="flex items-start gap-3">
                  <svg className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-medium text-foreground">{adv}</span>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 bg-muted/30">
        <Container>
          <SectionHeading title={t("comparison", "title", "Erdsonden vs. Flächenkollektoren")} />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Card>
              <CardTitle>{t("comparison", "sondenTitle", "Erdsonden (Tiefenbohrung)")}</CardTitle>
              <CardContent>
                <ul className="mt-3 space-y-2 text-sm">
                  <li className="flex items-start gap-2"><span className="text-primary">+</span> Geringer Platzbedarf</li>
                  <li className="flex items-start gap-2"><span className="text-primary">+</span> Konstant hohe Effizienz</li>
                  <li className="flex items-start gap-2"><span className="text-primary">+</span> Ideal für kleine Grundstücke</li>
                  <li className="flex items-start gap-2"><span className="text-muted-foreground">−</span> Höhere Anfangsinvestition</li>
                  <li className="flex items-start gap-2"><span className="text-muted-foreground">−</span> Genehmigung erforderlich</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardTitle>{t("comparison", "kollektorenTitle", "Flächenkollektoren")}</CardTitle>
              <CardContent>
                <ul className="mt-3 space-y-2 text-sm">
                  <li className="flex items-start gap-2"><span className="text-primary">+</span> Günstigere Installation</li>
                  <li className="flex items-start gap-2"><span className="text-primary">+</span> Keine Genehmigung nötig</li>
                  <li className="flex items-start gap-2"><span className="text-primary">+</span> Einfache Verlegung</li>
                  <li className="flex items-start gap-2"><span className="text-muted-foreground">−</span> Große Grundstücksfläche nötig</li>
                  <li className="flex items-start gap-2"><span className="text-muted-foreground">−</span> Fläche darf nicht überbaut werden</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container className="max-w-3xl">
          <SectionHeading title="Häufige Fragen" />
          <FAQAccordion items={defaultFaq} />
        </Container>
      </section>

      <FoerderungServiceCallout />

      <WPTypeCrossLinks currentSlug="sole-wasser-waermepumpe" />

      <CTABanner />
    </>
  );
}
