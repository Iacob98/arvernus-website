import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle, CardContent } from "@/components/ui/Card";
import { BreadcrumbNav } from "@/components/shared/BreadcrumbNav";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { CTABanner } from "@/components/shared/CTABanner";
import { TrustBadges } from "@/components/shared/TrustBadges";
import { getServices, getCompany, getPageContent } from "@/lib/dal";

export const metadata: Metadata = {
  title: "Wasser-Wasser-Wärmepumpe — Maximale Effizienz",
  description:
    "Wasser-Wasser-Wärmepumpe von Arvernus: Höchster Wirkungsgrad aller Wärmepumpen, nutzt Grundwasser als Wärmequelle. Bis zu 70% Förderung.",
};

const defaultFaq = [
  { question: "Welche Voraussetzungen brauche ich für eine Wasser-Wasser-Wärmepumpe?", answer: "Sie benötigen zugängliches Grundwasser in ausreichender Menge und Qualität. Ein Grundwassertest prüft dies vorab. Zudem ist eine wasserrechtliche Genehmigung erforderlich." },
  { question: "Wie wird das Grundwasser genutzt?", answer: "Über einen Förderbrunnen wird Grundwasser entnommen, die Wärme im Verdampfer der Wärmepumpe entzogen, und das abgekühlte Wasser über einen Schluckbrunnen zurückgeführt." },
  { question: "Was kostet eine Wasser-Wasser-Wärmepumpe?", answer: "Die Gesamtkosten inkl. Brunnenbohrung liegen bei 20.000–40.000 Euro. Nach Abzug der Förderung (bis 70%) reduzieren sich die Kosten erheblich. Die niedrigen Betriebskosten machen sie langfristig sehr wirtschaftlich." },
  { question: "Wie effizient ist eine Wasser-Wasser-Wärmepumpe?", answer: "Mit einem COP von 5,0–6,0 ist sie die effizienteste aller Wärmepumpenarten. Das Grundwasser hat ganzjährig eine konstante Temperatur von 8–12°C, was die hohe Effizienz ermöglicht." },
];

export default async function WasserWasserPage() {
  const [servicesData, company, pageContent] = await Promise.all([
    getServices(),
    getCompany(),
    getPageContent("wasser-wasser-waermepumpe"),
  ]);

  const type = servicesData.waermepumpenTypes.find((t) => t.slug === "wasser-wasser-waermepumpe") ?? servicesData.waermepumpenTypes[2];
  const t = (section: string, field: string, fallback: string) =>
    (pageContent?.[section] as Record<string, string>)?.[field] || fallback;

  return (
    <>
      <BreadcrumbNav
        items={[
          { label: "Wärmepumpen", href: "/waermepumpen" },
          { label: "Wasser-Wasser-Wärmepumpe" },
        ]}
      />

      <section className="bg-gradient-to-b from-primary-50 to-white py-16">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
              Wasser-Wasser-Wärmepumpe
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
        <Container><TrustBadges stats={company.stats} foundedYear={company.foundedYear} /></Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading title={t("advantages", "title", "Vorteile der Wasser-Wasser-Wärmepumpe")} />
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
          <SectionHeading title={t("requirements", "title", "Voraussetzungen")} subtitle={t("requirements", "subtitle", "Was Sie für eine Wasser-Wasser-Wärmepumpe benötigen.")} />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 max-w-3xl mx-auto">
            {[
              { title: t("requirements", "req1Title", "Grundwasservorkommen"), desc: t("requirements", "req1Desc", "Ausreichend Grundwasser in erreichbarer Tiefe (typisch 5–15 Meter).") },
              { title: t("requirements", "req2Title", "Wasserqualität"), desc: t("requirements", "req2Desc", "Das Grundwasser muss bestimmte Qualitätskriterien erfüllen (Eisen-, Mangangehalt).") },
              { title: t("requirements", "req3Title", "Genehmigung"), desc: t("requirements", "req3Desc", "Eine wasserrechtliche Genehmigung der zuständigen Behörde ist erforderlich.") },
              { title: t("requirements", "req4Title", "Platzbedarf"), desc: t("requirements", "req4Desc", "Platz für Förder- und Schluckbrunnen mit ausreichendem Abstand zueinander.") },
            ].map((item) => (
              <Card key={item.title}>
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <CardContent><p className="mt-2 text-sm">{item.desc}</p></CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container className="max-w-3xl">
          <SectionHeading title="Häufige Fragen" />
          <FAQAccordion items={defaultFaq} />
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
