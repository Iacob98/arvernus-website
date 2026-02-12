import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle, CardContent } from "@/components/ui/Card";
import { BreadcrumbNav } from "@/components/shared/BreadcrumbNav";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { CTABanner } from "@/components/shared/CTABanner";
import { getFAQ, getPageContent } from "@/lib/dal";

export const metadata: Metadata = {
  title: "Förderung für Wärmepumpen — Bis zu 70% Zuschuss",
  description:
    "Bis zu 70% Förderung für Ihre neue Wärmepumpe. Überblick über BEG, BAFA & KfW Förderprogramme. Wir unterstützen Sie bei der Antragstellung.",
};

const foerderungBoni = [
  {
    title: "Grundförderung",
    percentage: "30%",
    description: "Für den Einbau einer Wärmepumpe als Ersatz für eine fossile Heizung.",
    eligible: "Alle Eigentümer bestehender Wohngebäude",
  },
  {
    title: "Klimageschwindigkeitsbonus",
    percentage: "20%",
    description: "Für den frühzeitigen Austausch einer funktionsfähigen Gas- oder Ölheizung.",
    eligible: "Selbstnutzende Eigentümer",
  },
  {
    title: "Einkommensbonus",
    percentage: "30%",
    description: "Für Haushalte mit einem Bruttojahreseinkommen bis 40.000 Euro.",
    eligible: "Selbstnutzende Eigentümer mit niedrigem Einkommen",
  },
  {
    title: "Effizienzbonus",
    percentage: "5%",
    description: "Für Wärmepumpen mit natürlichem Kältemittel oder Nutzung von Erdwärme/Grundwasser.",
    eligible: "Bei Verwendung natürlicher Kältemittel",
  },
];

export default async function FoerderungPage() {
  const [faq, pageContent] = await Promise.all([getFAQ(), getPageContent("foerderung")]);
  const t = (section: string, field: string, fallback: string) =>
    (pageContent?.[section] as Record<string, string>)?.[field] || fallback;

  return (
    <>
      <BreadcrumbNav items={[{ label: "Förderung" }]} />

      <section className="bg-gradient-to-b from-primary-50 to-white py-16">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
              {t("hero", "title", "Bis zu 70% Förderung für Ihre Wärmepumpe")}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              {t("hero", "description", "Die Bundesregierung unterstützt den Umstieg auf erneuerbare Energien mit großzügigen Förderprogrammen. Wir helfen Ihnen, die maximale Förderung zu erhalten.")}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/waermepumpen-rechner" size="lg">Förderung berechnen</Button>
              <Button href="/kontakt" variant="outline" size="lg">Beratung zur Förderung</Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Förderungs-Übersicht */}
      <section className="py-20">
        <Container>
          <SectionHeading
            title={t("overview", "title", "BEG-Förderung im Überblick")}
            subtitle={t("overview", "subtitle", "Die Bundesförderung für effiziente Gebäude (BEG) bietet verschiedene Boni.")}
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {foerderungBoni.map((bonus) => (
              <Card key={bonus.title} hover>
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-white text-lg font-bold flex-shrink-0">
                    {bonus.percentage}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{bonus.title}</CardTitle>
                    <CardContent>
                      <p className="mt-1 text-sm">{bonus.description}</p>
                      <p className="mt-2 text-xs text-muted-foreground">
                        <strong>Berechtigt:</strong> {bonus.eligible}
                      </p>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-8 rounded-xl bg-accent/10 border border-accent/20 p-6 text-center">
            <p className="text-lg font-semibold text-foreground">
              Maximale Förderung: <span className="text-primary text-2xl">70%</span> der förderfähigen Kosten
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {t("overview", "maxNote", "Die einzelnen Boni sind kombinierbar bis maximal 70%.")}
            </p>
          </div>
        </Container>
      </section>

      {/* Rechenbeispiel */}
      <section className="py-20 bg-muted/30">
        <Container className="max-w-3xl">
          <SectionHeading title="Rechenbeispiel" subtitle="So könnte Ihre Förderung aussehen." />
          <Card>
            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">Investitionskosten Wärmepumpe</span>
                <span className="font-semibold">30.000 €</span>
              </div>
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">Grundförderung (30%)</span>
                <span className="font-semibold text-primary">- 9.000 €</span>
              </div>
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">Klimageschwindigkeitsbonus (20%)</span>
                <span className="font-semibold text-primary">- 6.000 €</span>
              </div>
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">Einkommensbonus (30%)</span>
                <span className="font-semibold text-primary">- 9.000 €</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-muted-foreground">Förderobergrenze</span>
                <span className="text-sm text-muted-foreground">max. 70% = 21.000 €</span>
              </div>
              <div className="flex justify-between py-4 bg-primary-50 rounded-lg px-4 -mx-4">
                <span className="font-bold text-foreground text-lg">Ihre Kosten</span>
                <span className="font-bold text-3xl text-primary">9.000 €</span>
              </div>
            </div>
          </Card>
        </Container>
      </section>

      {/* Prozess */}
      <section className="py-20">
        <Container>
          <SectionHeading title={t("process", "title", "So unterstützen wir Sie")} subtitle={t("process", "subtitle", "Von der Antragstellung bis zur Auszahlung.")} />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 max-w-4xl mx-auto">
            {[
              { step: "1", title: t("process", "step1Title", "Fördermittelcheck"), desc: t("process", "step1Desc", "Wir prüfen, welche Förderungen Sie erhalten können und berechnen die maximale Fördersumme.") },
              { step: "2", title: t("process", "step2Title", "Antragstellung"), desc: t("process", "step2Desc", "Wir übernehmen die komplette Antragstellung bei KfW und BAFA für Sie.") },
              { step: "3", title: t("process", "step3Title", "Auszahlung"), desc: t("process", "step3Desc", "Nach der Installation und Dokumentation wird die Förderung ausgezahlt.") },
            ].map((item) => (
              <Card key={item.step} className="text-center">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white text-lg font-bold">
                  {item.step}
                </span>
                <CardTitle className="mt-4 text-lg">{item.title}</CardTitle>
                <CardContent><p className="mt-2 text-sm">{item.desc}</p></CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 bg-muted/30">
        <Container className="max-w-3xl">
          <SectionHeading title="Häufige Fragen zur Förderung" />
          <FAQAccordion items={faq.foerderung} />
        </Container>
      </section>

      <CTABanner
        title={t("cta", "title", "Förderung berechnen lassen")}
        description={t("cta", "description", "Wir ermitteln kostenlos Ihre individuelle Fördersumme und unterstützen Sie bei der Antragstellung.")}
      />
    </>
  );
}
