const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

declare global {
  interface Window {
    fbq: ((...args: unknown[]) => void) & {
      callMethod?: (...args: unknown[]) => void;
      queue: unknown[];
      loaded: boolean;
      version: string;
      push: (...args: unknown[]) => void;
    };
    _fbq: typeof window.fbq;
  }
}

function fbq(...args: unknown[]) {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq(...args);
}

// --- Consent ---

export function grantMetaConsent() {
  fbq("consent", "grant");
}

export function revokeMetaConsent() {
  fbq("consent", "revoke");
}

// --- Standard Events ---

export function trackMetaPageView() {
  fbq("track", "PageView");
}

export function trackMetaLead(contentName: string) {
  fbq("track", "Lead", { content_name: contentName });
}

export function trackMetaContact() {
  fbq("track", "Contact");
}

export function trackMetaViewContent(contentName: string) {
  fbq("track", "ViewContent", { content_name: contentName });
}

// --- Custom Events ---

export function trackMetaRechnerStep(step: number, stepName: string) {
  fbq("trackCustom", "RechnerStep", { step, step_name: stepName });
}

export { PIXEL_ID };
