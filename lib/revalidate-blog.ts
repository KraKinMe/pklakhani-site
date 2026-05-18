import { revalidatePath } from "next/cache";

/** Invalidate blog index and individual post pages after CMS changes. */
export function revalidateBlogPaths(...slugs: (string | undefined | null)[]) {
  revalidatePath("/blogs", "layout");
  const unique = new Set(
    slugs.filter((s): s is string => typeof s === "string" && s.length > 0),
  );
  for (const slug of unique) {
    revalidatePath(`/blogs/${slug}`);
  }
}
