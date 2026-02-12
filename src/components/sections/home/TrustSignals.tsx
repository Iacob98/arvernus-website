"use client";

import { Container } from "@/components/ui/Container";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const stats = [
  { target: 1000, suffix: "+", label: "Installationen" },
  { target: 98, suffix: "%", label: "Zufriedenheit" },
  { target: 10, suffix: "+", label: "Jahre Erfahrung" },
  { target: 70, suffix: "%", label: "Max. Förderung" },
];

export function TrustSignals() {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <Container>
        <ScrollReveal>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat) => (
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
