import nodemailer from "nodemailer";

function createTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

export async function sendNotificationEmail(
  subject: string,
  htmlBody: string
): Promise<void> {
  const transporter = createTransporter();
  if (!transporter) {
    console.warn("[Email] SMTP not configured — skipping email send");
    return;
  }

  try {
    const from = process.env.SMTP_FROM || process.env.SMTP_USER!;
    const to = process.env.NOTIFY_EMAIL || process.env.SMTP_USER!;
    await transporter.sendMail({ from, to, subject, html: htmlBody });
  } catch (error) {
    console.error("[Email] Failed to send notification:", error);
  }
}

export async function sendAutoReply(
  toEmail: string,
  customerName: string
): Promise<void> {
  const transporter = createTransporter();
  if (!transporter) return;

  const from = process.env.SMTP_FROM || process.env.SMTP_USER!;

  const html = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,Helvetica,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f8;padding:40px 20px">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08)">
          <!-- Header -->
          <tr>
            <td style="background:#1a7ab5;padding:32px 40px;text-align:center">
              <h1 style="color:#ffffff;margin:0;font-size:24px;font-weight:700">Arvernus GmbH</h1>
              <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;font-size:14px">Ihre Experten für Wärmepumpen & Photovoltaik</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:40px">
              <h2 style="color:#1a7ab5;margin:0 0 16px;font-size:20px">Vielen Dank für Ihre Anfrage!</h2>
              <p style="color:#333;font-size:15px;line-height:1.6;margin:0 0 16px">
                Guten Tag ${customerName},
              </p>
              <p style="color:#333;font-size:15px;line-height:1.6;margin:0 0 16px">
                wir haben Ihre Anfrage erhalten und bedanken uns für Ihr Interesse. Unser Team wird sich
                <strong>innerhalb von 24 Stunden</strong> bei Ihnen melden, um alles Weitere zu besprechen.
              </p>
              <p style="color:#333;font-size:15px;line-height:1.6;margin:0 0 24px">
                In der Zwischenzeit können Sie uns jederzeit erreichen:
              </p>
              <table cellpadding="0" cellspacing="0" style="margin:0 0 24px">
                <tr>
                  <td style="padding:6px 16px 6px 0;color:#666;font-size:14px">Telefon:</td>
                  <td style="padding:6px 0;font-size:14px;font-weight:600;color:#333">+49 7621 9156-0</td>
                </tr>
                <tr>
                  <td style="padding:6px 16px 6px 0;color:#666;font-size:14px">E-Mail:</td>
                  <td style="padding:6px 0;font-size:14px;font-weight:600;color:#333">info@cep-energie.com</td>
                </tr>
              </table>
              <p style="color:#333;font-size:15px;line-height:1.6;margin:0">
                Mit freundlichen Grüßen,<br>
                <strong>Ihr Arvernus-Team</strong>
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:#f8f9fa;padding:24px 40px;border-top:1px solid #e9ecef">
              <p style="color:#999;font-size:12px;margin:0;text-align:center">
                Diese E-Mail wurde automatisch generiert. Bitte antworten Sie nicht direkt auf diese Nachricht.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  try {
    await transporter.sendMail({
      from,
      to: toEmail,
      subject: "Wir haben Ihre Anfrage erhalten — Arvernus GmbH",
      html,
    });
  } catch (error) {
    console.error("[Email] Failed to send auto-reply:", error);
  }
}
