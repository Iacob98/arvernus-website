type ConsentState = "granted" | "denied";

interface ConsentParams {
  ad_storage: ConsentState;
  ad_user_data: ConsentState;
  ad_personalization: ConsentState;
  analytics_storage: ConsentState;
  wait_for_update?: number;
}

interface FormEventParams {
  form_name: string;
  form_step?: number;
  form_step_name?: string;
}

interface CTAClickParams {
  cta_text: string;
  cta_location: string;
  cta_destination: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DataLayerEntry = Record<string, any>;

declare global {
  interface Window {
    dataLayer: DataLayerEntry[];
  }
}

function push(entry: DataLayerEntry) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(entry);
}

// gtag() helper — Google expects consent commands via this calling convention
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function gtag(...args: any[]) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(arguments);
}

// --- Consent Mode v2 ---

export function initConsentDefaults() {
  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    wait_for_update: 500,
  } satisfies ConsentParams);
}

export function updateConsent(accepted: boolean) {
  const state: ConsentState = accepted ? "granted" : "denied";
  gtag("consent", "update", {
    ad_storage: state,
    ad_user_data: state,
    ad_personalization: state,
    analytics_storage: state,
  } satisfies Omit<ConsentParams, "wait_for_update">);
  push({ event: "consent_update", consent_accepted: accepted });
}

// --- Form Tracking ---

export function trackFormStart(params: FormEventParams) {
  push({ event: "form_start", ...params });
}

export function trackFormSubmit(params: FormEventParams) {
  push({ event: "form_submit", ...params });
}

export function trackFormComplete(formName: string) {
  push({ event: "form_complete", form_name: formName });
}

// --- Rechner Funnel ---

export function trackRechnerStepView(step: number, stepName: string) {
  push({
    event: "rechner_step_view",
    form_name: "rechner",
    form_step: step,
    form_step_name: stepName,
  });
}

export function trackRechnerStepComplete(step: number, stepName: string) {
  push({
    event: "rechner_step_complete",
    form_name: "rechner",
    form_step: step,
    form_step_name: stepName,
  });
}

// --- CTA & Click Tracking ---

export function trackCTAClick(params: CTAClickParams) {
  push({ event: "cta_click", ...params });
}

export function trackPhoneClick(location: string) {
  push({ event: "phone_click", click_location: location });
}

export function trackWhatsAppClick() {
  push({ event: "whatsapp_click" });
}
