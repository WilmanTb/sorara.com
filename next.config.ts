
import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";
import { siteConfig } from "./src/lib/site-config";

export default function nextConfig(phase: string): NextConfig {
  const deploymentPath = new URL(siteConfig.url).pathname.replace(/\/$/, "");
  return {
  // Enable static export for GitHub Pages
  output: "export",

  // GitHub repository name
  basePath: phase === PHASE_DEVELOPMENT_SERVER ? "" : deploymentPath,

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
}
