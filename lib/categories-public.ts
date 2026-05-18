import connectToDatabase, { isDatabaseConfigured } from "@/lib/db";
import Category from "@/models/Category";

import { unstable_cache } from "next/cache";

async function fetchPublicCategories() {
  if (!isDatabaseConfigured()) {
    return [];
  }

  try {
    await connectToDatabase();
    const categories = await Category.find().sort({ name: 1 }).lean();
    
    return categories.map((cat: any) => ({
      ...cat,
      _id: cat._id.toString(),
      createdAt: cat.createdAt ? new Date(cat.createdAt).toISOString() : undefined,
      updatedAt: cat.updatedAt ? new Date(cat.updatedAt).toISOString() : undefined,
    }));
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}

export const getPublicCategories = unstable_cache(
  async () => {
    return fetchPublicCategories();
  },
  ["public-categories"],
  {
    revalidate: 3600,
    tags: ["categories"],
  }
);

export async function getCategoryNameBySlug(slug: string): Promise<string | null> {
  if (!slug || !isDatabaseConfigured()) return null;

  try {
    await connectToDatabase();
    const cat = await Category.findOne({ slug }).lean();
    return cat?.name ?? null;
  } catch (error) {
    console.error("Failed to fetch category:", error);
    return null;
  }
}

export async function getCategoryMap(): Promise<Record<string, string>> {
  const categories = await getPublicCategories();
  return Object.fromEntries(categories.map((c) => [c.slug, c.name]));
}
