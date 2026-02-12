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
import { waermepumpenTypes } from "@/data/services";

const type = waermepumpenTypes[0];

export const metadata: Metadata = {
  title: "Luft-Wasser-Wärmepumpe — Die beliebte Lösung",
  description:
    "Luft-Wasser-Wärmepumpe von Arvernus: Einfache Installation, geringe Kosten, bis zu 70% Förderung. Die beliebteste Wärmepumpenart für Ihr Zuhause.",
};

const faq = [
  { question: "Wie laut ist eine Luft-Wasser-Wärmepumpe?", answer: "Moderne Luft-Wasser-Wärmepumpen erreichen Schallpegel von 35–50 dB(A) im Normalbetrieb. Das ist vergleichbar mit einem leisen Gespräch. Durch richtige Aufstellung und Schallschutzmaßnahmen lässt sich die Geräuschentwicklung weiter reduzieren." },
  { question: "Funktioniert eine Luft-Wasser-Wärmepumpe auch im Winter?", answer: "Ja! Moderne Geräte arbeiten effizient bis -20°C Außentemperatur. Bei sehr niedrigen Temperaturen sinkt die Effizienz etwas, aber die Heizleistung bleibt gewährleistet." },
  { question: "Wo wird das Außengerät aufgestellt?", answer: "Das Außengerät benötigt einen gut belüfteten Standort im Freien. Idealerweise wird es an einer wind- und lärmgeschützten Stelle aufgestellt, mit ausreichend Abstand zu Nachbargebäuden." },
  { question: "Wie hoch sind die Betriebskosten?", answer: "Für ein durchschnittliches Einfamilienhaus liegen die jährlichen Stromkosten bei ca. 800–1.200 Euro. In Kombination mit Photovoltaik können die Kosten deutlich gesenkt werden." },
];

export default function LuftWasserPage() {
  return (
    <>
      <BreadcrumbNav
        items={[
          { label: "Wärmepumpen", href: "/waermepumpen" },
          { label: "Luft-Wasser-Wärmepumpe" },
        ]}
      />

      <section className="bg-gradient-to-b from-primary-50 to-white py-16">
        <Container>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div>
              <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
                Luft-Wasser-Wärmepumpe
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
            <div>
              <Image
                src="/images/wp-outdoor.jpg"
                alt="Luft-Wasser-Wärmepumpe Außengerät"
                width={600}
                height={450}
                className="rounded-2xl shadow-lg object-cover w-full"
                priority
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-8 border-b border-border">
        <Container><TrustBadges /></Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading title="Vorteile der Luft-Wasser-Wärmepumpe" />
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
          <SectionHeading title="Funktionsweise" subtitle="So funktioniert eine Luft-Wasser-Wärmepumpe." />
          <div className="mb-12 flex justify-center">
            <Image
              src="/images/wp-system-diagram.jpg"
              alt="Systemdarstellung einer Wärmepumpenanlage im Einfamilienhaus"
              width={800}
              height={600}
              className="rounded-2xl shadow-md max-h-96 w-auto object-contain"
            />
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {[
                { step: "1", title: "Wärmeaufnahme", desc: "Ein Ventilator saugt Außenluft an. Das Kältemittel im Verdampfer nimmt die Wärme der Luft auf." },
                { step: "2", title: "Verdichtung", desc: "Der Kompressor verdichtet das gasförmige Kältemittel und erhöht dadurch die Temperatur." },
                { step: "3", title: "Wärmeabgabe", desc: "Im Kondensator gibt das heiße Kältemittel seine Wärme an das Heizsystem ab." },
                { step: "4", title: "Entspannung", desc: "Das Expansionsventil senkt den Druck, das Kältemittel kühlt ab — der Kreislauf beginnt erneut." },
              ].map((item) => (
                <Card key={item.step}>
                  <div className="flex items-start gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white font-bold flex-shrink-0">
                      {item.step}
                    </span>
                    <div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <CardContent><p className="mt-1 text-sm">{item.desc}</p></CardContent>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
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
