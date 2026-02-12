import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle, CardContent } from "@/components/ui/Card";
import { BreadcrumbNav } from "@/components/shared/BreadcrumbNav";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { CTABanner } from "@/components/shared/CTABanner";
import { TrustBadges } from "@/components/shared/TrustBadges";
import { waermepumpenTypes } from "@/data/services";

const type = waermepumpenTypes[1];

export const metadata: Metadata = {
  title: "Sole-Wasser-Wärmepumpe — Höchste Effizienz mit Erdwärme",
  description:
    "Sole-Wasser-Wärmepumpe (Erdwärmepumpe) von Arvernus: Höchste Effizienz, konstante Leistung, bis zu 70% Förderung. Nutzung der Erdwärme.",
};

const faq = [
  { question: "Wie tief müssen die Erdsonden gebohrt werden?", answer: "Die Tiefe der Erdsonden hängt vom Wärmebedarf und der Bodenbeschaffenheit ab. Typisch sind 80–100 Meter pro Sonde. Für ein Einfamilienhaus werden meist 1–2 Sonden benötigt." },
  { question: "Was ist der Unterschied zwischen Sonden und Kollektoren?", answer: "Erdsonden werden vertikal in die Tiefe gebohrt (80–100m) und benötigen wenig Platz. Flächenkollektoren werden horizontal in 1,2–1,5m Tiefe verlegt und benötigen eine Fläche von ca. dem 1,5-fachen der beheizten Wohnfläche." },
  { question: "Brauche ich eine Genehmigung?", answer: "Für Erdsonden ist in der Regel eine wasserrechtliche Genehmigung erforderlich. Flächenkollektoren sind meist genehmigungsfrei. Wir kümmern uns um alle notwendigen Genehmigungen." },
  { question: "Kann ich im Sommer damit kühlen?", answer: "Ja! Über die Erdwärme-Sonden kann im Sommer passive Kühlung (Natural Cooling) realisiert werden — nahezu kostenlos und ohne zusätzliche Klimaanlage." },
];

export default function SoleWasserPage() {
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
        <Container><TrustBadges /></Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading title="Vorteile der Sole-Wasser-Wärmepumpe" />
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
          <SectionHeading title="Erdsonden vs. Flächenkollektoren" />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Card>
              <CardTitle>Erdsonden (Tiefenbohrung)</CardTitle>
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
              <CardTitle>Flächenkollektoren</CardTitle>
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
          <FAQAccordion items={faq} />
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
