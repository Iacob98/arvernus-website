import { describe, it, expect } from "vitest";

describe("DAL - fallback data", () => {
  it("getCompany returns valid fallback when no content file exists", async () => {
    // DAL uses hardcoded fallbacks from src/data/ and src/lib/constants.ts
    // This test verifies the fallback path works when content/ is empty
    const { getCompany } = await import("@/lib/dal");
    const company = await getCompany();
    expect(company).toBeDefined();
    expect(company.name).toBeTruthy();
    expect(company.phone).toBeTruthy();
  });

  it("getServices returns valid fallback data", async () => {
    const { getServices } = await import("@/lib/dal");
    const services = await getServices();
    expect(services).toBeDefined();
    expect(services.waermepumpenTypes).toBeDefined();
  });

  it("getFAQ returns valid fallback data", async () => {
    const { getFAQ } = await import("@/lib/dal");
    const faq = await getFAQ();
    expect(faq).toBeDefined();
    expect(faq.waermepumpen).toBeDefined();
    expect(Array.isArray(faq.waermepumpen)).toBe(true);
  });
});
