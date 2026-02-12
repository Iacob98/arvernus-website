import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomBar } from "@/components/layout/MobileBottomBar";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { getCompany } from "@/lib/dal";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const company = await getCompany();

  return (
    <>
      <Header company={company} />
      <main className="min-h-screen pb-16 lg:pb-0">{children}</main>
      <Footer company={company} />
      <MobileBottomBar company={company} />
      <WhatsAppButton company={company} />
      <CookieConsent />
    </>
  );
}
