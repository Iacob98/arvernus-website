"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { Service } from "@/types";

interface ServicesOverviewProps {
  services: Service[];
}

export function ServicesOverview({ services }: ServicesOverviewProps) {
  return (
    <section className="py-20 bg-muted/30">
      <Container>
        <SectionHeading
          title="Unsere Leistungen"
          subtitle="Wir bieten Ihnen ganzheitliche Lösungen für eine nachhaltige und effiziente Energieversorgung Ihres Zuhauses."
        />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {services.map((service, i) => (
            <ScrollReveal key={service.href} delay={i * 0.1}>
              <ServiceCard service={service} />
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
