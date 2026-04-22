import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn11.bigcommerce.com",
      },
    ],
  },
};

export default nextConfig;
