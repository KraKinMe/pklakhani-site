import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import BlogCoverImage from "./BlogCoverImage";

export type BlogCardProps = {
  blog: {
    _id: string;
    slug: string;
    title: string;
    excerpt: string;
    coverImage?: string;
    createdAt: string;
    updatedAt: string;
    category?: string;
  };
  categoryName?: string;
};

export default function BlogCard({ blog, categoryName }: BlogCardProps) {
  const wasUpdated =
    new Date(blog.updatedAt).getTime() >
    new Date(blog.createdAt).getTime() + 60_000;

  const formatDate = (iso: string) =>
    new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(new Date(iso));

  return (
    <article className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700 flex flex-col h-full group">
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
        {blog.category && categoryName && (
          <Link
            href={`/blogs?category=${blog.category}`}
            className="text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400 mb-3 hover:underline w-fit"
          >
            {categoryName}
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
}
