"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface HeroSectionProps {
  content?: Record<string, string>;
}

export function HeroSection({ content }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 sm:py-28 lg:py-36">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }} />
      </div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent" />

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="primary" className="mb-6 bg-primary/20 text-primary-light">
              {content?.badge || "Zertifizierter Fachbetrieb · Seit 2014"}
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {content?.title || (<>Ihre Experten für{" "}<span className="text-primary-light">Wärmepumpen</span> &{" "}<span className="text-primary-light">Photovoltaik</span></>)}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300 sm:text-xl">
              {content?.subtitle || "Von der Beratung bis zur Installation — alles aus einer Hand. Profitieren Sie von bis zu 70% staatlicher Förderung und senken Sie Ihre Energiekosten nachhaltig."}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/waermepumpen-rechner" size="lg">
                {content?.primaryButton || "Kostenlos berechnen"}
              </Button>
              <Button href="/kontakt" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-900">
                {content?.secondaryButton || "Beratung anfragen"}
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
