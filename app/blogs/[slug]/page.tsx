import { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import connectToDatabase, { isDatabaseConfigured } from "@/lib/db";
import Blog from "@/models/Blog";
import JsonLd from "@/components/seo/JsonLd";
import { getBreadcrumbListJsonLd, getBlogPostJsonLd } from "@/config/schema";
import { getSiteUrl } from "@/config/site";
import { absoluteUrl, OG_IMAGE_PATH } from "@/config/seo";
import { getPublishedBlogFilter } from "@/lib/blogs";
import { getCategoryNameBySlug } from "@/lib/categories-public";
import { sanitizeBlogHtml } from "@/lib/sanitize";
import "react-quill-new/dist/quill.snow.css";

import BlogPostHero from "@/components/blogs/BlogPostHero";
import BlogPostContent from "@/components/blogs/BlogPostContent";

export const revalidate = 3600;

async function getBlog(slug: string) {
  if (!isDatabaseConfigured()) {
    return null;
  }

  try {
    await connectToDatabase();

    const publishedFilter = getPublishedBlogFilter();
    let blog = await Blog.findOne({ ...publishedFilter, slug }).lean();

    let isRedirect = false;
    if (!blog) {
      blog = await Blog.findOne({
        ...publishedFilter,
        previousSlugs: slug,
      }).lean();
      if (blog) isRedirect = true;
    }

    if (!blog) return null;

    const categoryName = await getCategoryNameBySlug(blog.category || "");

    return {
      ...blog,
      _id: blog._id.toString(),
      createdAt: blog.createdAt.toISOString(),
      updatedAt: blog.updatedAt.toISOString(),
      isRedirect,
      categoryName,
    };
  } catch (error) {
    console.error("Failed to fetch blog:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    return { title: "Post Not Found" };
  }

  if (blog.isRedirect) {
    return {};
  }

  const siteUrl = getSiteUrl().replace(/\/+$/, "");
  const url = `${siteUrl}/blogs/${blog.slug}`;
  const keywords = [
    blog.categoryName,
    "chartered accountant Gurugram",
    "CA blog",
    "tax compliance India",
  ].filter(Boolean) as string[];

  return {
    title: `${blog.title} | P.K. Lakhani & Co.`,
    description: blog.excerpt,
    keywords,
    openGraph: {
      title: blog.title as string,
      description: blog.excerpt,
      url,
      type: "article",
      publishedTime: blog.createdAt,
      modifiedTime: blog.updatedAt,
      locale: "en_IN",
      ...(blog.coverImage
        ? {
            images: [
              {
                url: blog.coverImage as string,
                width: 1200,
                height: 630,
                alt: blog.title as string,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title as string,
      description: blog.excerpt,
      ...(blog.coverImage ? { images: [blog.coverImage as string] } : {}),
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    notFound();
  }

  if (blog.isRedirect) {
    permanentRedirect(`/blogs/${blog.slug}`);
  }

  const siteUrl = getSiteUrl().replace(/\/+$/, "");
  const safeContent = sanitizeBlogHtml(blog.content as string);
  const plainText = safeContent.replace(/<[^>]*>?/gm, " ");
  const wordCount = plainText.split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));
  const wasUpdated =
    new Date(blog.updatedAt).getTime() >
    new Date(blog.createdAt).getTime() + 60_000;

  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Blogs", path: "/blogs" },
    { name: blog.title as string, path: `/blogs/${blog.slug}` },
  ];

  const jsonLd = getBlogPostJsonLd({
    title: blog.title as string,
    excerpt: blog.excerpt,
    coverImage: blog.coverImage as string | undefined,
    createdAt: blog.createdAt,
    updatedAt: blog.updatedAt,
    categoryName: blog.categoryName || undefined,
    slug: blog.slug,
  }, wordCount);

  const uiBreadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Blogs", href: "/blogs" },
    ...(blog.categoryName && blog.category
      ? [
          {
            label: blog.categoryName,
            href: `/blogs?category=${blog.category}`,
          },
        ]
      : []),
    { label: blog.title as string },
  ];

  return (
    <>
      <JsonLd data={getBreadcrumbListJsonLd(breadcrumbItems)} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen pt-24 pb-16 bg-white dark:bg-gray-900">
        <BlogPostHero
          blog={{
            title: blog.title as string,
            coverImage: blog.coverImage as string | undefined,
            createdAt: blog.createdAt,
            updatedAt: blog.updatedAt,
            category: blog.category as string | undefined,
            categoryName: blog.categoryName || undefined,
          }}
          uiBreadcrumbs={uiBreadcrumbs}
          readingTime={readingTime}
          wasUpdated={wasUpdated}
        />

        <BlogPostContent
          title={blog.title as string}
          safeContent={safeContent}
        />
      </div>
    </>
  );
}
