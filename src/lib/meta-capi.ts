import { createHash } from "crypto";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN;
const API_VERSION = "v21.0";

function sha256(value: string): string {
  return createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

interface UserData {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  zip?: string;
  clientIp?: string;
  userAgent?: string;
}

interface CAPIEventParams {
  eventName: string;
  sourceUrl: string;
  userData: UserData;
  eventId?: string;
  customData?: Record<string, unknown>;
}

export async function sendCAPIEvent({
  eventName,
  sourceUrl,
  userData,
  eventId,
  customData,
}: CAPIEventParams): Promise<void> {
  if (!PIXEL_ID || !ACCESS_TOKEN) return;

  const hashedUserData: Record<string, unknown> = {};

  if (userData.email) hashedUserData.em = [sha256(userData.email)];
  if (userData.phone) hashedUserData.ph = [sha256(userData.phone)];
  if (userData.firstName) hashedUserData.fn = [sha256(userData.firstName)];
  if (userData.lastName) hashedUserData.ln = [sha256(userData.lastName)];
  if (userData.city) hashedUserData.ct = [sha256(userData.city)];
  if (userData.zip) hashedUserData.zp = [sha256(userData.zip)];
  if (userData.clientIp) hashedUserData.client_ip_address = userData.clientIp;
  if (userData.userAgent) hashedUserData.client_user_agent = userData.userAgent;
  hashedUserData.country = [sha256("de")];

  const event: Record<string, unknown> = {
    event_name: eventName,
    event_time: Math.floor(Date.now() / 1000),
    event_source_url: sourceUrl,
    action_source: "website",
    user_data: hashedUserData,
  };

  if (eventId) event.event_id = eventId;
  if (customData) event.custom_data = customData;

  try {
    await fetch(
      `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: [event],
          access_token: ACCESS_TOKEN,
        }),
      }
    );
  } catch {
    // Silently skip — same pattern as email notifications
  }
}
