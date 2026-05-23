import Link from "next/link";
import { generateMeta } from "@/config/meta";
import { getPublishedBlogs } from "@/lib/blogs";
import { getPublicCategories } from "@/lib/categories-public";
import Breadcrumbs from "@/components/blogs/Breadcrumbs";
import BlogCard from "@/components/blogs/BlogCard";
import JsonLd from "@/components/seo/JsonLd";
import { getBreadcrumbListJsonLd } from "@/config/schema";

export const metadata = generateMeta("blogs");

export const revalidate = 3600;



export default async function BlogListPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category: categorySlug } = await searchParams;
  const [blogs, categories] = await Promise.all([
    getPublishedBlogs({ categorySlug }),
    getPublicCategories(),
  ]);

  const categoryMap = Object.fromEntries(
    categories.map((cat) => [cat.slug, cat.name])
  );

  const activeCategoryName = categorySlug
    ? categoryMap[categorySlug]
    : null;

  return (
    <>
      <JsonLd
        data={getBreadcrumbListJsonLd([
          { name: "Home", path: "/" },
          { name: "Blogs", path: "/blogs" },
        ])}
      />
      <div className="min-h-screen pt-24 pb-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            variant="light"
            items={[
              { label: "Home", href: "/" },
              { label: "Blogs" },
            ]}
          />

          <div className="text-center max-w-3xl mx-auto mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {activeCategoryName ? `${activeCategoryName} Articles` : "Latest Insights"}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Expert perspectives on taxation, audit, financial advisory, and regulatory compliance.
            </p>
          </div>

          {categories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              <Link
                href="/blogs"
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  !categorySlug
                    ? "bg-blue-600 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-blue-400"
                }`}
              >
                All
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/blogs?category=${cat.slug}`}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    categorySlug === cat.slug
                      ? "bg-blue-600 text-white"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-blue-400"
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          )}

          {blogs.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                No articles in this category yet
              </h3>
              <p className="mt-2 text-gray-500">
                <Link href="/blogs" className="text-blue-600 hover:underline">
                  View all articles
                </Link>
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <BlogCard
                  key={blog._id}
                  blog={blog}
                  categoryName={blog.category ? categoryMap[blog.category] : undefined}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
