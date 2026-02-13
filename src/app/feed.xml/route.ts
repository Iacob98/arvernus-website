import { getArticles } from "@/lib/dal";
import { COMPANY } from "@/lib/constants";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const articles = await getArticles();

  const items = articles
    .map(
      (article) => `    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${COMPANY.website}/ratgeber/${article.slug}</link>
      <description>${escapeXml(article.excerpt)}</description>
      <pubDate>${new Date(article.publishedDate).toUTCString()}</pubDate>
      <guid>${COMPANY.website}/ratgeber/${article.slug}</guid>${
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
    <title>${escapeXml(COMPANY.fullName)} – Ratgeber</title>
    <link>${COMPANY.website}/ratgeber</link>
    <description>${escapeXml(COMPANY.tagline)}</description>
    <language>de</language>
    <atom:link href="${COMPANY.website}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
