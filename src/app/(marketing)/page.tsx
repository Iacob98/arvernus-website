import { HeroSection } from "@/components/sections/home/HeroSection";
import { BenefitsStrip } from "@/components/sections/home/BenefitsStrip";
import { ServicesOverview } from "@/components/sections/home/ServicesOverview";
import { HowItWorks } from "@/components/sections/home/HowItWorks";
import { FoerderungTeaser } from "@/components/sections/home/FoerderungTeaser";
import { TestimonialsSection } from "@/components/sections/home/TestimonialsSection";
import { TrustSignals } from "@/components/sections/home/TrustSignals";
import { CTABanner } from "@/components/shared/CTABanner";
import { PartnersSection } from "@/components/shared/PartnersSection";
import { getTestimonials, getPartners, getServices } from "@/lib/dal";

export default async function HomePage() {
  const [testimonials, partners, servicesData] = await Promise.all([
    getTestimonials(),
    getPartners(),
    getServices(),
  ]);

  return (
    <>
      <HeroSection />
      <BenefitsStrip />
      <ServicesOverview services={servicesData.services} />
      <HowItWorks />
      <FoerderungTeaser />
      <TestimonialsSection testimonials={testimonials} />
      <PartnersSection partners={partners} />
      <TrustSignals />
      <CTABanner />
    </>
  );
}
