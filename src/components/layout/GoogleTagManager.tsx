"use client";

import { useEffect } from "react";
import Script from "next/script";
import { updateConsent } from "@/lib/analytics";

const GA_ID = process.env.NEXT_PUBLIC_GTM_ID;

export function GoogleTagManager() {
  useEffect(() => {
    if (!GA_ID) return;

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
      {/* 1. Set up dataLayer + gtag + consent defaults BEFORE gtag.js loads */}
      <Script
        id="ga4-consent-defaults"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});`,
        }}
      />
      {/* 2. Load gtag.js */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      {/* 3. Initialize GA4 */}
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
