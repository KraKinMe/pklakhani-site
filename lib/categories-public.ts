import connectToDatabase, { isDatabaseConfigured } from "@/lib/db";
import Category from "@/models/Category";
import { seedDefaultCategories } from "@/lib/seed-categories";

export async function getPublicCategories() {
  if (!isDatabaseConfigured()) {
    return [];
  }

  try {
    await connectToDatabase();
    await seedDefaultCategories();
    return Category.find().sort({ name: 1 }).lean();
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}

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
