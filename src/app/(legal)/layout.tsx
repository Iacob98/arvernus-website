import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getCompany } from "@/lib/dal";

export default async function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const company = await getCompany();

  return (
    <>
      <Header company={company} />
      <main className="min-h-screen py-16">{children}</main>
      <Footer company={company} />
    </>
  );
}
