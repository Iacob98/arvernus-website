import { getArticles, getCompany } from "@/lib/dal";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const [company, articles] = await Promise.all([getCompany(), getArticles()]);
  const baseUrl = company.website.replace(/\/+$/, "");

  const items = articles
    .map(
      (article) => `    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${baseUrl}/ratgeber/${article.slug}</link>
      <description>${escapeXml(article.excerpt)}</description>
      <pubDate>${new Date(article.publishedDate).toUTCString()}</pubDate>
      <guid>${baseUrl}/ratgeber/${article.slug}</guid>${
        article.category
          ? `\n      <category>${escapeXml(article.category)}</category>`
          : ""
      }${
        article.author
          ? `\n      <author>${escapeXml(article.author)}</author>`
          : ""
      }
    </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(company.fullName)} – Ratgeber</title>
    <link>${baseUrl}/ratgeber</link>
    <description>${escapeXml(company.tagline)}</description>
    <language>de</language>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
