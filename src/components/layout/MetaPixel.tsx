"use client";

import { useEffect } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import {
  PIXEL_ID,
  grantMetaConsent,
  revokeMetaConsent,
  trackMetaPageView,
} from "@/lib/meta-pixel";

export function MetaPixel() {
  const pathname = usePathname();

  // Restore consent + listen for changes
  useEffect(() => {
    if (!PIXEL_ID) return;

    const syncConsent = () => {
      const stored = localStorage.getItem("cookie-consent");
      if (stored === "accepted") {
        grantMetaConsent();
      } else if (stored === "declined") {
        revokeMetaConsent();
      }
    };

    syncConsent();

    window.addEventListener("cookie-consent-update", syncConsent);
    window.addEventListener("storage", syncConsent);

    return () => {
      window.removeEventListener("cookie-consent-update", syncConsent);
      window.removeEventListener("storage", syncConsent);
    };
  }, []);

  // Track PageView on SPA route changes
  useEffect(() => {
    if (!PIXEL_ID) return;
    trackMetaPageView();
  }, [pathname]);

  if (!PIXEL_ID) return null;

  return (
    <>
      {/* 1. Initialize fbq stub + revoke consent by default + init pixel */}
      <Script
        id="meta-pixel-init"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('consent','revoke');fbq('init','${PIXEL_ID}');fbq('track','PageView');`,
        }}
      />
      {/* noscript fallback */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
