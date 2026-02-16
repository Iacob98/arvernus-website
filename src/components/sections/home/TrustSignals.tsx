"use client";

import { Container } from "@/components/ui/Container";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface TrustSignalsProps {
  stats?: {
    projectsCompleted: number;
    satisfactionRate: number;
    maxFoerderung: number;
    pvCustomers?: number;
  };
  foundedYear?: number;
}

export function TrustSignals({ stats, foundedYear = 2014 }: TrustSignalsProps) {
  const yearsExperience = new Date().getFullYear() - foundedYear;

  const items = [
    { target: stats?.projectsCompleted ?? 1000, suffix: "+", label: "Installationen" },
    { target: stats?.pvCustomers ?? 15000, suffix: "+", label: "PV Kunden" },
    { target: stats?.satisfactionRate ?? 98, suffix: "%", label: "Zufriedenheit" },
    { target: yearsExperience, suffix: "+", label: "Jahre Erfahrung" },
    { target: stats?.maxFoerderung ?? 70, suffix: "%", label: "Max. Förderung" },
  ];

  return (
    <section className="py-20 bg-gray-900 text-white">
      <Container>
        <ScrollReveal>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-5">
            {items.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-bold text-primary-light sm:text-5xl">
                  <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                </div>
                <p className="mt-2 text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
