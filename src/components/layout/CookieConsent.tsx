"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    window.dispatchEvent(new Event("cookie-consent-update"));
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    window.dispatchEvent(new Event("cookie-consent-update"));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-[60px] left-0 right-0 z-[60] bg-white border-t border-border shadow-2xl p-4 sm:p-6 lg:bottom-6 lg:left-6 lg:right-auto lg:max-w-md lg:rounded-xl lg:border">
      <div className="space-y-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">Cookie-Einstellungen</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung auf unserer Website zu bieten.
            Weitere Informationen finden Sie in unserer{" "}
            <Link href="/datenschutz" className="text-primary hover:underline">
              Datenschutzerklärung
            </Link>.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleDecline}
            className="flex-1 rounded-lg border border-border px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-muted transition-colors cursor-pointer"
          >
            Ablehnen
          </button>
          <button
            onClick={handleAccept}
            className="flex-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark transition-colors cursor-pointer"
          >
            Akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}
