"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface AboutTeaserProps {
  content?: Record<string, string>;
}

export function AboutTeaser({ content }: AboutTeaserProps) {
  return (
    <section className="py-20 overflow-x-clip">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <ScrollReveal direction="left">
            <div>
              <span className="text-sm font-bold uppercase tracking-wider text-primary">
                {content?.label || "Über uns"}
              </span>
              <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">
                {content?.title || "Meisterbetrieb mit Leidenschaft — seit 2014"}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                {content?.description || "Als inhabergeführter Meisterbetrieb stehen wir seit über einem Jahrzehnt für höchste Qualität bei der Installation von Wärmepumpen und Photovoltaikanlagen. Unser erfahrenes Team aus zertifizierten Fachkräften begleitet Sie von der ersten Beratung bis zur fertigen Anlage — persönlich, zuverlässig und mit echtem Engagement."}
              </p>
              <p className="mt-4 text-lg text-muted-foreground">
                {content?.description2 || "Was uns antreibt? Die Überzeugung, dass nachhaltige Energie für jeden zugänglich sein sollte. Deshalb setzen wir auf faire Preise, modernste Technik und einen Service, der keine Wünsche offen lässt."}
              </p>
              <div className="mt-8">
                <Button href={content?.buttonHref || "/ueber-uns"}>
                  {content?.buttonLabel || "Mehr über uns"}
                </Button>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <div className="relative overflow-hidden rounded-2xl shadow-lg">
              <Image
                src={content?.image || "/images/wp-outdoor.jpg"}
                alt={content?.imageAlt || "Arvernus Team bei der Arbeit"}
                width={600}
                height={450}
                className="h-auto w-full object-cover"
              />
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
