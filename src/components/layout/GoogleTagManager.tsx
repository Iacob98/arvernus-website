"use client";

import { useEffect } from "react";
import Script from "next/script";
import { updateConsent } from "@/lib/analytics";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export function GoogleTagManager() {
  useEffect(() => {
    if (!GTM_ID) return;

    const stored = localStorage.getItem("cookie-consent");
    if (stored === "accepted") {
      updateConsent(true);
    } else if (stored === "declined") {
      updateConsent(false);
    }

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

  if (!GTM_ID) return null;

  const consentScript = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});`;

  const gtmScript = [
    "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':",
    "new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],",
    "j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=",
    "'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);",
    "})(window,document,'script','dataLayer','",
    GTM_ID,
    "');",
  ].join("");

  return (
    <>
      <Script id="gtm-consent-defaults" strategy="beforeInteractive">
        {consentScript}
      </Script>
      <Script id="gtm-script" strategy="afterInteractive">
        {gtmScript}
      </Script>
    </>
  );
}

export function GoogleTagManagerNoScript() {
  if (!GTM_ID) return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}
