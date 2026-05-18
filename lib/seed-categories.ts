import slugify from "slugify";
import Category from "@/models/Category";
import Blog from "@/models/Blog";

/** Test or retired categories removed from the database on seed. */
const REMOVED_CATEGORY_SLUGS = ["new1"] as const;

export const DEFAULT_CATEGORIES = [
  "GST & Indirect Tax",
  "Income Tax",
  "Audit & Assurance",
  "Bookkeeping & Payroll",
  "Business Advisory",
  "Regulatory Compliance",
  "Budget & Policy Updates",
] as const;

export async function removeDeprecatedCategories(): Promise<void> {
  for (const slug of REMOVED_CATEGORY_SLUGS) {
    await Category.deleteOne({ slug });
    await Blog.updateMany({ category: slug }, { $set: { category: "" } });
  }
}

export async function seedDefaultCategories(): Promise<void> {
  await removeDeprecatedCategories();

  for (const name of DEFAULT_CATEGORIES) {
    const slug = slugify(name, { lower: true, strict: true });
    await Category.updateOne(
      { slug },
      { $setOnInsert: { name, slug } },
      { upsert: true },
    );
  }
}
