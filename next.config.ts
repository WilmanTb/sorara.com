
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for GitHub Pages
  output: "export",

  // GitHub repository name
  basePath: "/sorara.com",

  // Generate URLs with trailing slashes
  trailingSlash: true,

  // Image configuration
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
