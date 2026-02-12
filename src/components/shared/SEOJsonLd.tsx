interface SEOJsonLdProps {
  data: Record<string, unknown>;
}

// JSON-LD structured data component for SEO
// Data is developer-controlled from structured-data.ts, not user input
export function SEOJsonLd({ data }: SEOJsonLdProps) {
  const jsonString = JSON.stringify(data);
  return (
    <script
      type="application/ld+json"
      // Safe: JSON.stringify escapes all special characters, preventing injection.
      // Data source is developer-controlled structured data constants.
      dangerouslySetInnerHTML={{ __html: jsonString }}
    />
  );
}
