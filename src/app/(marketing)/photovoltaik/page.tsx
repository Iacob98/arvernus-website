import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle, CardContent } from "@/components/ui/Card";
import { BreadcrumbNav } from "@/components/shared/BreadcrumbNav";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { CTABanner } from "@/components/shared/CTABanner";
import { TrustBadges } from "@/components/shared/TrustBadges";
import { getFAQ, getCompany } from "@/lib/dal";

export const metadata: Metadata = {
  title: "Photovoltaik — Eigenen Strom erzeugen",
  description:
    "Photovoltaikanlagen von Arvernus: Professionelle Planung und Installation Ihrer Solaranlage. Stromkosten senken und unabhängig werden.",
};

export default async function PhotovoltaikPage() {
  const [faq, company] = await Promise.all([getFAQ(), getCompany()]);

  return (
    <>
      <BreadcrumbNav items={[{ label: "Photovoltaik" }]} />

      <section className="bg-gradient-to-b from-primary-50 to-white py-16">
        <Container>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div>
              <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
                Photovoltaik — Erzeugen Sie Ihren eigenen Strom
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Mit einer modernen Photovoltaikanlage erzeugen Sie Ihren eigenen Strom, senken Ihre Energiekosten und leisten einen Beitrag zum Klimaschutz. Von der Planung bis zur Installation — alles aus einer Hand.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/kontakt" size="lg">Angebot anfragen</Button>
                <Button href="/waermepumpen-rechner" variant="outline" size="lg">Kombiniert mit Wärmepumpe</Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/pv-house-full.jpg"
                alt="Photovoltaikanlage auf einem Einfamilienhaus"
                width={600}
                height={500}
                className="rounded-2xl shadow-lg object-cover w-full"
                priority
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-8 border-b border-border">
        <Container>
          <TrustBadges stats={company.stats} foundedYear={company.foundedYear} />
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading
            title="Vorteile einer Photovoltaikanlage"
            subtitle="Warum sich Photovoltaik für Sie lohnt."
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Stromkosten senken", desc: "Erzeugen Sie bis zu 80% Ihres Stroms selbst und reduzieren Sie Ihre Stromrechnung deutlich." },
              { title: "Einspeisevergütung", desc: "Überschüssigen Strom speisen Sie ins Netz ein und erhalten dafür eine garantierte Vergütung." },
              { title: "Unabhängigkeit", desc: "Machen Sie sich unabhängig von steigenden Strompreisen und Energieversorgern." },
              { title: "Wertsteigerung", desc: "Eine Solaranlage steigert den Wert Ihrer Immobilie nachhaltig." },
              { title: "Umweltschutz", desc: "Jede kWh Solarstrom spart ca. 400g CO₂ — ein aktiver Beitrag zum Klimaschutz." },
              { title: "Kombinierbar", desc: "Perfekt kombinierbar mit einer Wärmepumpe oder einem E-Auto für maximale Eigenversorgung." },
            ].map((benefit) => (
              <Card key={benefit.title}>
                <CardTitle className="text-lg">{benefit.title}</CardTitle>
                <CardContent><p className="mt-2 text-sm">{benefit.desc}</p></CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 bg-muted/30">
        <Container>
          <SectionHeading
            title="Komponenten Ihrer Solaranlage"
            subtitle="Hochwertige Technik für maximale Erträge."
          />
          <div className="mb-12 overflow-hidden rounded-2xl">
            <Image
              src="/images/pv-roof-close.jpg"
              alt="Photovoltaik-Module auf einem Ziegeldach — Nahaufnahme"
              width={1200}
              height={500}
              className="w-full h-64 sm:h-80 object-cover"
            />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 max-w-4xl mx-auto">
            {[
              { title: "Solarmodule", desc: "Hocheffiziente Module namhafter Hersteller mit mindestens 25 Jahren Leistungsgarantie." },
              { title: "Wechselrichter", desc: "Wandelt den erzeugten Gleichstrom in nutzbaren Wechselstrom um — das Herzstück der Anlage." },
              { title: "Stromspeicher", desc: "Optional: Speichert überschüssigen Strom für die Nutzung am Abend und in der Nacht." },
              { title: "Smart-Home-Integration", desc: "Intelligente Steuerung für optimalen Eigenverbrauch und Monitoring per App." },
            ].map((component) => (
              <Card key={component.title}>
                <CardTitle className="text-lg">{component.title}</CardTitle>
                <CardContent><p className="mt-2 text-sm">{component.desc}</p></CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container className="max-w-3xl">
          <SectionHeading title="Häufige Fragen zur Photovoltaik" />
          <FAQAccordion items={faq.photovoltaik} />
        </Container>
      </section>

      <CTABanner
        title="Interesse an einer Solaranlage?"
        description="Lassen Sie sich kostenlos beraten — wir planen die optimale Anlage für Ihr Dach."
        primaryLabel="Beratung anfragen"
        primaryHref="/kontakt"
      />
    </>
  );
}
