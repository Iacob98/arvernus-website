import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["arvernus-energie.com"],
  serverExternalPackages: ["sharp"],
  images: {
    formats: ["image/webp"],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
      allowedOrigins: ["arvernus-energie.com"],
    },
  },
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      ],
    },
  ],
};

export default nextConfig;
