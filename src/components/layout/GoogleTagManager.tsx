"use client";

import { useEffect } from "react";
import Script from "next/script";
import { initConsentDefaults, updateConsent } from "@/lib/analytics";

const GA_ID = process.env.NEXT_PUBLIC_GTM_ID;

export function GoogleTagManager() {
  useEffect(() => {
    if (!GA_ID) return;

    // Consent Mode v2: set defaults BEFORE gtag.js loads
    initConsentDefaults();

    // Restore previous consent choice from localStorage
    const stored = localStorage.getItem("cookie-consent");
    if (stored === "accepted") {
      updateConsent(true);
    } else if (stored === "declined") {
      updateConsent(false);
    }

    // Listen for consent changes during this session
    const onConsentUpdate = () => {
      const current = localStorage.getItem("cookie-consent");
      if (current === "accepted") {
        updateConsent(true);
      } else if (current === "declined") {
        updateConsent(false);
      }
    };

    window.addEventListener("cookie-consent-update", onConsentUpdate);
    window.addEventListener("storage", onConsentUpdate);

    return () => {
      window.removeEventListener("cookie-consent-update", onConsentUpdate);
      window.removeEventListener("storage", onConsentUpdate);
    };
  }, []);

  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="ga4-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`,
        }}
      />
    </>
  );
}
