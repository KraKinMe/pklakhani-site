import connectToDatabase, { isDatabaseConfigured } from "@/lib/db";
import Blog from "@/models/Blog";

export function getPublishedBlogFilter() {
  return {
    isPublished: true,
    $or: [{ expiresAt: null }, { expiresAt: { $gt: new Date() } }],
  };
}

import { unstable_cache } from "next/cache";

async function fetchPublishedBlogs(options?: {
  limit?: number;
  categorySlug?: string;
}) {
  if (!isDatabaseConfigured()) {
    return [];
  }

  try {
    await connectToDatabase();

    const filter: Record<string, unknown> = { ...getPublishedBlogFilter() };
    if (options?.categorySlug) {
      filter.category = options.categorySlug;
    }

    let query = Blog.find(filter).sort({ createdAt: -1 }).lean();
    if (options?.limit) {
      query = query.limit(options.limit);
    }

    const blogs = await query;
    return blogs.map((blog) => ({
      ...blog,
      _id: blog._id.toString(),
      createdAt: blog.createdAt.toISOString(),
      updatedAt: blog.updatedAt.toISOString(),
    }));
  } catch (error) {
    console.error("Failed to fetch published blogs:", error);
    return [];
  }
}

export const getPublishedBlogs = unstable_cache(
  async (options?: { limit?: number; categorySlug?: string }) => {
    return fetchPublishedBlogs(options);
  },
  ["published-blogs"],
  {
    revalidate: 3600,
    tags: ["blogs"],
  }
);

export async function getLatestPublishedBlogs(count = 3) {
  return getPublishedBlogs({ limit: count });
}
