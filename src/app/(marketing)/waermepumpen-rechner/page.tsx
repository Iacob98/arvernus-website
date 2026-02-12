import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { BreadcrumbNav } from "@/components/shared/BreadcrumbNav";
import { TrustBadges } from "@/components/shared/TrustBadges";
import { RechnerForm } from "@/components/sections/rechner/RechnerForm";

export const metadata: Metadata = {
  title: "Wärmepumpen-Rechner — Kosten & Förderung berechnen",
  description:
    "Berechnen Sie kostenlos die Kosten und Förderung für Ihre neue Wärmepumpe. In nur 5 Schritten zu Ihrem individuellen Angebot.",
};

export default function RechnerPage() {
  return (
    <>
      <BreadcrumbNav items={[{ label: "Wärmepumpen-Rechner" }]} />
      <section className="py-12 bg-gradient-to-b from-primary-50 to-white">
        <Container className="max-w-3xl text-center">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
            Wärmepumpen-Rechner
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Berechnen Sie in nur 5 Schritten die Kosten und Fördermöglichkeiten für Ihre neue Wärmepumpe —{" "}
            <strong>kostenlos und unverbindlich</strong>.
          </p>
        </Container>
      </section>
      <RechnerForm />
      <section className="py-12 border-t border-border">
        <Container>
          <TrustBadges />
        </Container>
      </section>
    </>
  );
}
