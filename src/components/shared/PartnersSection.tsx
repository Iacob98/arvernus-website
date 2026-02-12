"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { Partner } from "@/types";

interface PartnersSectionProps {
  compact?: boolean;
  partners?: Partner[];
}

export function PartnersSection({ compact = false, partners: partnersProp }: PartnersSectionProps) {
  const partners = partnersProp ?? [];
  const bosch = partners.find((p) => p.featured);
  const otherPartners = partners.filter((p) => !p.featured);

  if (partners.length === 0) return null;

  if (compact) {
    return (
      <section className="py-12 border-y border-border bg-white">
        <Container>
          <p className="text-center text-sm font-medium text-muted-foreground mb-6">
            Offizieller Bosch Partner &middot; In Zusammenarbeit mit führenden Unternehmen der Branche
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {partners.map((partner) => (
              <div
                key={partner.id ?? partner.name}
                className={`group flex flex-col items-center gap-1 transition-all duration-300 ${
                  partner.featured ? "opacity-100" : "grayscale opacity-70 hover:grayscale-0 hover:opacity-100"
                }`}
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={partner.featured ? 120 : 100}
                  height={partner.featured ? 40 : 32}
                  className="h-8 w-auto object-contain"
                  style={{ maxWidth: partner.featured ? 120 : 100 }}
                />
                <span className="text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <Container>
        <SectionHeading
          title="Unsere Partner"
          subtitle="Wir arbeiten mit den führenden Unternehmen der Branche zusammen — für beste Qualität und Service."
        />

        {/* Bosch — featured partner */}
        {bosch && (
          <ScrollReveal>
            <div className="mx-auto mb-16 max-w-2xl rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary-50 to-white p-8 text-center shadow-sm">
              <span className="inline-block rounded-full bg-primary px-4 py-1 text-xs font-bold uppercase tracking-wider text-white mb-4">
                Direkter Partner
              </span>
              <div className="flex justify-center mb-4">
                <Image
                  src={bosch.logo}
                  alt={bosch.name}
                  width={200}
                  height={64}
                  className="h-16 w-auto object-contain"
                />
              </div>
              <p className="text-lg font-semibold text-foreground">
                Offizieller Bosch Partner
              </p>
              <p className="mt-2 text-muted-foreground">
                Als direkter Bosch-Partner erhalten Sie bei uns Wärmepumpen und Heizsysteme von Bosch zu besten
                Konditionen — inklusive erweiterter Garantie, Premiumservice und direktem Zugang zu den neuesten
                Technologien.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
                {[
                  "Direktvertrieb ohne Zwischenhändler",
                  "Erweiterte Herstellergarantie",
                  "Zertifizierte Bosch-Techniker",
                  "Premiumservice & Wartung",
                ].map((item) => (
                  <span key={item} className="inline-flex items-center gap-1.5 text-muted-foreground">
                    <svg className="h-4 w-4 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Other partners */}
        <ScrollReveal>
          <p className="text-center text-sm font-medium text-muted-foreground mb-8">
            Weitere Partner & Kooperationen
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-6 sm:gap-8">
            {otherPartners.map((partner) => (
              <div
                key={partner.id ?? partner.name}
                className="group flex flex-col items-center justify-end gap-3 py-4 rounded-xl hover:bg-muted/40 transition-all duration-300"
              >
                <div className="h-12 flex items-center grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={140}
                    height={48}
                    className="h-10 w-auto object-contain"
                    style={{ maxWidth: 140 }}
                  />
                </div>
                <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
