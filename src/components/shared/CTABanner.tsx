import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

interface CTABannerProps {
  title?: string;
  description?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}

export function CTABanner({
  title = "Bereit für Ihre neue Wärmepumpe?",
  description = "Lassen Sie sich kostenlos und unverbindlich beraten. Wir finden die optimale Lösung für Ihr Zuhause.",
  primaryHref = "/waermepumpen-rechner",
  primaryLabel = "Jetzt kostenlos berechnen",
  secondaryHref = "/kontakt",
  secondaryLabel = "Kontakt aufnehmen",
}: CTABannerProps) {
  return (
    <section className="bg-primary py-16">
      <Container>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
            {description}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href={primaryHref} variant="white" size="lg">
              {primaryLabel}
            </Button>
            <Button href={secondaryHref} variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
              {secondaryLabel}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
