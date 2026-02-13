import { HeroSection } from "@/components/sections/home/HeroSection";
import { BenefitsStrip } from "@/components/sections/home/BenefitsStrip";
import { ServicesOverview } from "@/components/sections/home/ServicesOverview";
import { HowItWorks } from "@/components/sections/home/HowItWorks";
import { FoerderungTeaser } from "@/components/sections/home/FoerderungTeaser";
import { TestimonialsSection } from "@/components/sections/home/TestimonialsSection";
import { TrustSignals } from "@/components/sections/home/TrustSignals";
import { CTABanner } from "@/components/shared/CTABanner";
import { PartnersSection } from "@/components/shared/PartnersSection";
import { getTestimonials, getPartners, getServices, getPageContent, getHeroSlides, getCompany } from "@/lib/dal";

export default async function HomePage() {
  const [testimonials, partners, servicesData, pageContent, heroSlides, company] = await Promise.all([
    getTestimonials(),
    getPartners(),
    getServices(),
    getPageContent("home"),
    getHeroSlides(),
    getCompany(),
  ]);

  const hero = pageContent?.hero as Record<string, string> | undefined;
  const howItWorks = pageContent?.howItWorks as Record<string, string> | undefined;
  const foerderung = pageContent?.foerderungTeaser as Record<string, string> | undefined;
  const cta = pageContent?.cta as Record<string, string> | undefined;

  return (
    <>
      <HeroSection content={hero} slides={heroSlides} />
      <BenefitsStrip stats={company.stats} foundedYear={company.foundedYear} />
      <ServicesOverview services={servicesData.services} />
      <HowItWorks content={howItWorks} />
      <FoerderungTeaser content={foerderung} />
      <TestimonialsSection testimonials={testimonials} />
      <PartnersSection partners={partners} />
      <TrustSignals stats={company.stats} foundedYear={company.foundedYear} />
      <CTABanner
        title={cta?.title}
        description={cta?.description}
      />
    </>
  );
}
