"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function FoerderungTeaser() {
  return (
    <section className="py-20 bg-primary-50 overflow-x-clip">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <ScrollReveal direction="left">
            <div>
              <span className="text-sm font-bold uppercase tracking-wider text-primary">
                Staatliche Förderung
              </span>
              <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
                Bis zu 70% Zuschuss für Ihre Wärmepumpe
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Die Bundesregierung fördert den Umstieg auf erneuerbare Energien großzügig.
                Über die BEG-Förderung (BAFA/KfW) können Sie erhebliche Zuschüsse erhalten.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "30% Grundförderung für alle Wärmepumpen",
                  "20% Klimageschwindigkeitsbonus",
                  "30% Einkommensbonus (bis 40.000€ Haushaltseinkommen)",
                  "5% Effizienzbonus (natürliche Kältemittel)",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/foerderung">Förderung erfahren</Button>
                <Button href="/waermepumpen-rechner" variant="outline">
                  Förderung berechnen
                </Button>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <div className="rounded-2xl bg-white p-8 shadow-lg border border-border">
              <h3 className="text-xl font-semibold text-foreground mb-6">
                Rechenbeispiel Einfamilienhaus
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Investitionskosten</span>
                  <span className="font-semibold">30.000 €</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Grundförderung (30%)</span>
                  <span className="font-semibold text-primary">- 9.000 €</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Klimabonus (20%)</span>
                  <span className="font-semibold text-primary">- 6.000 €</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Einkommensbonus (30%)</span>
                  <span className="font-semibold text-primary">- 9.000 €</span>
                </div>
                <div className="flex justify-between py-3 bg-primary-50 rounded-lg px-3 -mx-3">
                  <span className="font-bold text-foreground">Ihre Kosten (ab)</span>
                  <span className="font-bold text-2xl text-primary">6.000 €</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
