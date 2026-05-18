import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { getLatestPublishedBlogs } from "@/lib/blogs";
import connectToDatabase from "@/lib/db";
import Category from "@/models/Category";
import BlogCoverImage from "@/components/blogs/BlogCoverImage";

async function getCategoryName(slug: string): Promise<string | null> {
  if (!slug) return null;
  await connectToDatabase();
  const cat = await Category.findOne({ slug }).lean();
  return cat?.name ?? null;
}

export default async function LatestBlogPosts({
  title = "Latest Insights",
  description = "Expert articles on taxation, audit, and compliance from our CA team.",
  limit = 3,
}: {
  title?: string;
  description?: string;
  limit?: number;
}) {
  const blogs = await getLatestPublishedBlogs(limit);

  if (blogs.length === 0) return null;

  const categoryNames = await Promise.all(
    blogs.map((b) => getCategoryName(b.category as string)),
  );

  return (
    <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              {title}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-2xl">
              {description}
            </p>
          </div>
          <Link
            href="/blogs"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 shrink-0"
          >
            View all articles <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map((blog, i) => (
            <article
              key={blog._id}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-700 flex flex-col"
            >
              <Link
                href={`/blogs/${blog.slug}`}
                className="block h-40 relative bg-gray-100 dark:bg-gray-700"
              >
                {blog.coverImage ? (
                  <BlogCoverImage
                    src={blog.coverImage as string}
                    alt={blog.title as string}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 flex items-center justify-center">
                    <span className="text-blue-500/50 font-bold text-xl">PKL</span>
                  </div>
                )}
              </Link>
              <div className="p-5 flex flex-col flex-grow">
                {categoryNames[i] && (
                  <span className="text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400 mb-2">
                    {categoryNames[i]}
                  </span>
                )}
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 gap-1.5 mb-2">
                  <Calendar size={14} />
                  <time dateTime={blog.createdAt as string}>
                    {new Intl.DateTimeFormat("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    }).format(new Date(blog.createdAt as string))}
                  </time>
                </div>
                <Link href={`/blogs/${blog.slug}`}>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {blog.title as string}
                  </h3>
                </Link>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2 flex-grow">
                  {blog.excerpt as string}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
