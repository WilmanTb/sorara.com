
import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { projects } from "@/lib/projects";

// Required for GitHub Pages static export
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = siteConfig.url.replace(/\/$/, "");
    const pages = ["", "/work", "/services", "/about", "/contact"];

    const staticPages = pages.map((path) => ({
        url: `${baseUrl}${path}/`,
        lastModified: new Date("2026-01-01"),
        changeFrequency: "monthly" as const,
        priority: path === "" ? 1 : 0.7,
    }));

    const indonesianPages = pages.map((path) => ({
        url: `${baseUrl}/id${path}/`,
        lastModified: new Date("2026-01-01"),
        changeFrequency: "monthly" as const,
        priority: path === "" ? 0.9 : 0.6,
    }));

    return [
        ...staticPages,
        ...indonesianPages,

        ...projects.map((project) => ({
            url: `${baseUrl}/work/${project.slug}/`,
            lastModified: new Date("2026-01-01"),
            changeFrequency: "monthly" as const,
            priority: 0.6,
        })),

        ...projects.map((project) => ({
            url: `${baseUrl}/id/work/${project.slug}/`,
            lastModified: new Date("2026-01-01"),
            changeFrequency: "monthly" as const,
            priority: 0.5,
        })),
    ];
}
