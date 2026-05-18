import Link from "next/link";
import { Calendar } from "lucide-react";
import Breadcrumbs from "@/components/blogs/Breadcrumbs";
import BlogCoverImage from "@/components/blogs/BlogCoverImage";

type BlogPostHeroProps = {
  blog: {
    title: string;
    coverImage?: string;
    createdAt: string;
    updatedAt: string;
    category?: string;
    categoryName?: string;
  };
  uiBreadcrumbs: { label: string; href?: string }[];
  readingTime: number;
  wasUpdated: boolean;
};

export default function BlogPostHero({
  blog,
  uiBreadcrumbs,
  readingTime,
  wasUpdated,
}: BlogPostHeroProps) {
  return (
    <div className="w-full h-[400px] md:h-[500px] relative bg-brand-primary">
      {blog.coverImage ? (
        <BlogCoverImage
          src={blog.coverImage}
          alt={blog.title}
          priority
          sizes="100vw"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-blue-900 to-indigo-900" />
      )}
      <div className="absolute inset-0 bg-black/50 mix-blend-multiply" />

      <div className="absolute inset-0 flex items-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <Breadcrumbs items={uiBreadcrumbs} variant="dark" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {blog.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm md:text-base">
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <time dateTime={blog.createdAt}>
                Published{" "}
                {new Intl.DateTimeFormat("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                }).format(new Date(blog.createdAt))}
              </time>
            </div>
            {wasUpdated && (
              <span>
                Updated{" "}
                {new Intl.DateTimeFormat("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                }).format(new Date(blog.updatedAt))}
              </span>
            )}
            <span>{readingTime} min read</span>
            {blog.categoryName && (
              <Link
                href={`/blogs?category=${blog.category}`}
                className="px-3 py-1 rounded-full bg-white/15 hover:bg-white/25 transition-colors text-sm"
              >
                {blog.categoryName}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
