import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

// Required for GitHub Pages static export
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = siteConfig.url.replace(/\/$/, "");
    const basePath = new URL(baseUrl).pathname.replace(/\/$/, "");
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: `${basePath}/admin/`,
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
