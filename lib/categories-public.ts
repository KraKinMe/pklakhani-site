import connectToDatabase from "@/lib/db";
import Category from "@/models/Category";
import { seedDefaultCategories } from "@/lib/seed-categories";

export async function getPublicCategories() {
  await connectToDatabase();
  await seedDefaultCategories();
  return Category.find().sort({ name: 1 }).lean();
}

export async function getCategoryNameBySlug(slug: string): Promise<string | null> {
  if (!slug) return null;
  await connectToDatabase();
  const cat = await Category.findOne({ slug }).lean();
  return cat?.name ?? null;
}

export async function getCategoryMap(): Promise<Record<string, string>> {
  const categories = await getPublicCategories();
  return Object.fromEntries(categories.map((c) => [c.slug, c.name]));
}
