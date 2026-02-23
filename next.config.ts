import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["arvernus-energie.com"],
  serverExternalPackages: ["sharp"],
  images: {
    unoptimized: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
      allowedOrigins: ["arvernus-energie.com"],
    },
  },
};

export default nextConfig;
