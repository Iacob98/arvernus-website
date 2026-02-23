import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["arvernus-energie.com"],
  images: {
    remotePatterns: [],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    formats: ["image/webp"],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
      allowedOrigins: ["arvernus-energie.com"],
    },
  },
};

export default nextConfig;
