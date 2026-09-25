import type { MetadataRoute } from "next";
import { getCompany } from "@/lib/dal";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const company = await getCompany();
  const baseUrl = company.website.replace(/\/+$/, "");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
