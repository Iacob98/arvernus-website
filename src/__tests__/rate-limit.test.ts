import { describe, it, expect } from "vitest";
import { rateLimit } from "@/lib/rate-limit";

describe("rateLimit", () => {
  it("allows requests within the limit", () => {
    const result = rateLimit("test-allow", { maxRequests: 3, windowMs: 10_000 });
    expect(result.success).toBe(true);
    expect(result.remaining).toBe(2);
  });

  it("blocks requests exceeding the limit", () => {
    const key = "test-block-" + Date.now();
    rateLimit(key, { maxRequests: 2, windowMs: 10_000 });
    rateLimit(key, { maxRequests: 2, windowMs: 10_000 });
    const result = rateLimit(key, { maxRequests: 2, windowMs: 10_000 });
    expect(result.success).toBe(false);
    expect(result.remaining).toBe(0);
  });

  it("resets after window expires", async () => {
    const key = "test-reset-" + Date.now();
    rateLimit(key, { maxRequests: 1, windowMs: 50 });
    const blocked = rateLimit(key, { maxRequests: 1, windowMs: 50 });
    expect(blocked.success).toBe(false);

    await new Promise((r) => setTimeout(r, 60));
    const after = rateLimit(key, { maxRequests: 1, windowMs: 50 });
    expect(after.success).toBe(true);
  });

  it("tracks different keys independently", () => {
    const ts = Date.now();
    rateLimit(`key-a-${ts}`, { maxRequests: 1, windowMs: 10_000 });
    const blockedA = rateLimit(`key-a-${ts}`, { maxRequests: 1, windowMs: 10_000 });
    const allowedB = rateLimit(`key-b-${ts}`, { maxRequests: 1, windowMs: 10_000 });

    expect(blockedA.success).toBe(false);
    expect(allowedB.success).toBe(true);
  });
});
