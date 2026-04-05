import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/config/site";
import { NAVIGATION } from "@/config/navigation";

/** Tune crawl hints per path (relative to site root). */
const PRIORITY: Record<string, number> = {
  "/": 1,
  "/services": 0.9,
  "/about": 0.85,
  "/contact": 0.8,
  "/careers": 0.7,
};

const CHANGE_FREQ: Record<string, MetadataRoute.Sitemap[0]["changeFrequency"]> =
  {
    "/": "weekly",
    "/about": "monthly",
    "/services": "weekly",
    "/contact": "monthly",
    "/careers": "monthly",
  };

function pageUrl(href: string): string {
  const base = getSiteUrl().replace(/\/+$/, "");
  if (href === "/") return base;
  return `${base}${href}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return NAVIGATION.map((item) => ({
    url: pageUrl(item.href),
    lastModified,
    changeFrequency: CHANGE_FREQ[item.href] ?? "monthly",
    priority: PRIORITY[item.href] ?? 0.7,
  }));
}
