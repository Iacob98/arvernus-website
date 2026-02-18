import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["arvernus-energie.com"],
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
      allowedOrigins: ["arvernus-energie.com"],
    },
  },
};

export default nextConfig;
