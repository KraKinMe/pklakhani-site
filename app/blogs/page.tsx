import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { generateMeta } from "@/config/meta";
import { getPublishedBlogs } from "@/lib/blogs";
import { getPublicCategories } from "@/lib/categories-public";
import Breadcrumbs from "@/components/blogs/Breadcrumbs";
import BlogCoverImage from "@/components/blogs/BlogCoverImage";
import JsonLd from "@/components/seo/JsonLd";
import { getBreadcrumbListJsonLd } from "@/config/schema";

export const metadata = generateMeta("blogs");

export const revalidate = 3600;

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}

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
              {blogs.map((blog) => {
                const wasUpdated =
                  new Date(blog.updatedAt).getTime() >
                  new Date(blog.createdAt).getTime() + 60_000;

                return (
                  <article
                    key={blog._id}
                    className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700 flex flex-col h-full group"
                  >
                    <Link
                      href={`/blogs/${blog.slug}`}
                      className="block overflow-hidden h-56 relative bg-gray-100 dark:bg-gray-800"
                    >
                      {blog.coverImage ? (
                        <BlogCoverImage
                          src={blog.coverImage}
                          alt={blog.title}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 flex items-center justify-center">
                          <span className="text-blue-500/50 dark:text-blue-400/50 font-bold text-2xl">
                            PKL
                          </span>
                        </div>
                      )}
                    </Link>

                    <div className="p-6 flex flex-col flex-grow">
                      {blog.category && categoryMap[blog.category] && (
                        <Link
                          href={`/blogs?category=${blog.category}`}
                          className="text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400 mb-3 hover:underline w-fit"
                        >
                          {categoryMap[blog.category]}
                        </Link>
                      )}
                      <div className="flex flex-col gap-1 text-sm text-gray-500 dark:text-gray-400 mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          <time dateTime={blog.createdAt}>
                            Published {formatDate(blog.createdAt)}
                          </time>
                        </div>
                        {wasUpdated && (
                          <span className="text-xs text-gray-400 dark:text-gray-500 pl-6">
                            Updated {formatDate(blog.updatedAt)}
                          </span>
                        )}
                      </div>

                      <Link href={`/blogs/${blog.slug}`}>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                          {blog.title}
                        </h2>
                      </Link>

                      <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3 flex-grow">
                        {blog.excerpt}
                      </p>

                      <Link
                        href={`/blogs/${blog.slug}`}
                        className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 mt-auto transition-colors"
                      >
                        Read Full Article{" "}
                        <ArrowRight
                          size={16}
                          className="ml-2 transform group-hover:translate-x-1 transition-transform"
                        />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
