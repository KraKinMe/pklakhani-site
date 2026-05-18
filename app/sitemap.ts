import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/config/site";
import { NAVIGATION } from "@/config/navigation";
import connectToDatabase from "@/lib/db";
import Blog from "@/models/Blog";

/** Tune crawl hints per path (relative to site root). */
const PRIORITY: Record<string, number> = {
  "/": 1,
  "/services": 0.9,
  "/about": 0.85,
  "/contact": 0.8,
  "/careers": 0.7,
  "/blogs": 0.9,
};

const CHANGE_FREQ: Record<string, MetadataRoute.Sitemap[0]["changeFrequency"]> =
{
  "/": "weekly",
  "/about": "monthly",
  "/services": "weekly",
  "/contact": "monthly",
  "/careers": "monthly",
  "/blogs": "daily",
};

function pageUrl(href: string): string {
  const base = getSiteUrl().replace(/\/+$/, "");
  if (href === "/") return base;
  return `${base}${href}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const staticPages: MetadataRoute.Sitemap = NAVIGATION.map((item) => ({
    url: pageUrl(item.href),
    lastModified,
    changeFrequency: CHANGE_FREQ[item.href] ?? "monthly",
    priority: PRIORITY[item.href] ?? 0.7,
  }));

  // Add blogs index page if not in navigation
  if (!NAVIGATION.find(n => n.href === '/blogs')) {
    staticPages.push({
      url: pageUrl("/blogs"),
      lastModified,
      changeFrequency: "daily",
      priority: 0.9,
    });
  }

  // Fetch active blogs from database
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    await connectToDatabase();
    const blogs = await Blog.find({
      isPublished: true,
      $or: [
        { expiresAt: null },
        { expiresAt: { $gt: new Date() } }
      ]
    }).select('slug updatedAt category').lean();

    blogPages = blogs.map((blog) => ({
      url: pageUrl(`/blogs/${blog.slug}`),
      lastModified: new Date(blog.updatedAt as Date),
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Failed to generate sitemap for blogs:", error);
  }

  return [...staticPages, ...blogPages];
}
