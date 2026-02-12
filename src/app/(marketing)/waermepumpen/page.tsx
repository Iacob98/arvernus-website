import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle, CardContent } from "@/components/ui/Card";
import { BreadcrumbNav } from "@/components/shared/BreadcrumbNav";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { CTABanner } from "@/components/shared/CTABanner";
import { TrustBadges } from "@/components/shared/TrustBadges";
import { PartnersSection } from "@/components/shared/PartnersSection";
import { getServices, getFAQ, getPartners, getCompany, getPageContent } from "@/lib/dal";

export const metadata: Metadata = {
  title: "Wärmepumpen — Effizient heizen mit erneuerbarer Energie",
  description:
    "Wärmepumpen von Arvernus: Luft-Wasser, Sole-Wasser & Wasser-Wasser. Professionelle Beratung, Installation und bis zu 70% Förderung. Seit 2014.",
};

export default async function WaermepumpenPage() {
  const [servicesData, faq, partners, company, pageContent] = await Promise.all([
    getServices(),
    getFAQ(),
    getPartners(),
    getCompany(),
    getPageContent("waermepumpen"),
  ]);
  const t = (section: string, field: string, fallback: string) =>
    (pageContent?.[section] as Record<string, string>)?.[field] || fallback;

  const waermepumpenTypes = servicesData.waermepumpenTypes;

  return (
    <>
      <BreadcrumbNav items={[{ label: "Wärmepumpen" }]} />

      {/* Hero */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-16">
        <Container>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div>
              <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
                {t("hero", "title", "Wärmepumpen — Effizient heizen mit erneuerbarer Energie")}
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                {t("hero", "description", "Eine Wärmepumpe nutzt kostenlose Umweltwärme aus Luft, Erde oder Grundwasser und wandelt sie in Heizenergie um. So sparen Sie bis zu 75% Heizkosten und profitieren von bis zu 70% staatlicher Förderung.")}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/waermepumpen-rechner" size="lg">Kosten berechnen</Button>
                <Button href="/kontakt" variant="outline" size="lg">Beratung anfragen</Button>
              </div>
            </div>
            <div>
              <Image
                src="/images/wp-outdoor.jpg"
                alt="Wärmepumpe Außengerät an einem modernen Einfamilienhaus"
                width={600}
                height={450}
                className="rounded-2xl shadow-lg object-cover w-full"
                priority
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Trust */}
      <section className="py-8 border-b border-border">
        <Container>
          <TrustBadges stats={company.stats} foundedYear={company.foundedYear} />
        </Container>
      </section>

      {/* Types */}
      <section className="py-20">
        <Container>
          <SectionHeading
            title={t("types", "title", "Wärmepumpen-Typen im Überblick")}
            subtitle={t("types", "subtitle", "Jeder Typ hat seine Stärken. Wir finden die optimale Lösung für Ihr Zuhause.")}
          />
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {waermepumpenTypes.map((type) => (
              <Link key={type.slug} href={`/waermepumpen/${type.slug}`} className="group block">
                <Card hover className="h-full">
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {type.title}
                  </CardTitle>
                  <CardContent>
                    <p className="mt-2">{type.description}</p>
                    <div className="mt-4 flex items-center gap-2 text-sm">
                      <span className="font-semibold text-foreground">COP:</span>
                      <span className="text-primary font-bold">{type.cop}</span>
                    </div>
                    <ul className="mt-4 space-y-2">
                      {type.advantages.slice(0, 3).map((adv) => (
                        <li key={adv} className="flex items-center gap-2 text-sm">
                          <svg className="h-4 w-4 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          {adv}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                      Mehr erfahren
                      <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-muted/30">
        <Container>
          <SectionHeading
            title={t("benefits", "title", "Vorteile einer Wärmepumpe")}
            subtitle={t("benefits", "subtitle", "Warum sich der Umstieg auf eine Wärmepumpe lohnt.")}
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: t("benefits", "benefit1Title", "Bis zu 75% Heizkosten sparen"), desc: t("benefits", "benefit1Desc", "Wärmepumpen nutzen bis zu 75% kostenlose Umweltwärme. Sie zahlen nur den Strom für den Betrieb.") },
              { title: t("benefits", "benefit2Title", "Staatliche Förderung bis 70%"), desc: t("benefits", "benefit2Desc", "Profitieren Sie von großzügigen Zuschüssen durch BAFA und KfW für den Heizungstausch.") },
              { title: t("benefits", "benefit3Title", "CO₂-neutral heizen"), desc: t("benefits", "benefit3Desc", "Mit einer Wärmepumpe und Ökostrom heizen Sie komplett CO₂-neutral und schützen das Klima.") },
              { title: t("benefits", "benefit4Title", "Heizen & Kühlen"), desc: t("benefits", "benefit4Desc", "Viele Wärmepumpen können im Sommer auch kühlen — ganz ohne zusätzliche Klimaanlage.") },
              { title: t("benefits", "benefit5Title", "Wartungsarm & langlebig"), desc: t("benefits", "benefit5Desc", "Wärmepumpen haben eine Lebensdauer von 20+ Jahren und benötigen nur minimale Wartung.") },
              { title: t("benefits", "benefit6Title", "Wertsteigerung Immobilie"), desc: t("benefits", "benefit6Desc", "Ein modernes Heizsystem steigert den Wert Ihrer Immobilie und verbessert die Energieklasse.") },
            ].map((benefit) => (
              <Card key={benefit.title}>
                <CardTitle className="text-lg">{benefit.title}</CardTitle>
                <CardContent>
                  <p className="mt-2 text-sm">{benefit.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Partners */}
      <PartnersSection compact partners={partners} />

      {/* FAQ */}
      <section className="py-20">
        <Container className="max-w-3xl">
          <SectionHeading title="Häufige Fragen zu Wärmepumpen" />
          <FAQAccordion items={faq.waermepumpen} />
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
