import { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import Link from "next/link";
import connectToDatabase, { isDatabaseConfigured } from "@/lib/db";
import Blog from "@/models/Blog";
import { Calendar } from "lucide-react";
import WhatsAppCTA from "@/components/common/WhatsAppCTA";
import Breadcrumbs from "@/components/blogs/Breadcrumbs";
import BlogCoverImage from "@/components/blogs/BlogCoverImage";
import JsonLd from "@/components/seo/JsonLd";
import { getBreadcrumbListJsonLd } from "@/config/schema";
import { getSiteUrl } from "@/config/site";
import { absoluteUrl, OG_IMAGE_PATH } from "@/config/seo";
import { getPublishedBlogFilter } from "@/lib/blogs";
import { getCategoryNameBySlug } from "@/lib/categories-public";
import { sanitizeBlogHtml } from "@/lib/sanitize";
import "react-quill-new/dist/quill.snow.css";

export const revalidate = 3600;

async function getBlog(slug: string) {
  if (!isDatabaseConfigured()) {
    return null;
  }

  try {
    await connectToDatabase();
  } catch (error) {
    console.error("Failed to connect to database:", error);
    return null;
  }

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
      title: blog.title,
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
                url: blog.coverImage,
                width: 1200,
                height: 630,
                alt: blog.title,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt,
      ...(blog.coverImage ? { images: [blog.coverImage] } : {}),
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
  const postUrl = `${siteUrl}/blogs/${blog.slug}`;
  const safeContent = sanitizeBlogHtml(blog.content);
  const plainText = safeContent.replace(/<[^>]*>?/gm, "");
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.excerpt,
    image: blog.coverImage || absoluteUrl(OG_IMAGE_PATH),
    datePublished: blog.createdAt,
    dateModified: blog.updatedAt,
    inLanguage: "en-IN",
    wordCount,
    articleSection: blog.categoryName || "Chartered Accountancy",
    keywords: blog.categoryName
      ? `${blog.categoryName}, chartered accountant, Gurugram, tax compliance`
      : "chartered accountant, Gurugram, tax compliance",
    author: {
      "@type": "Organization",
      name: "P.K. Lakhani & Co.",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "P.K. Lakhani & Co.",
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(OG_IMAGE_PATH),
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
  };

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
        <div className="w-full h-[400px] md:h-[500px] relative bg-brand-primary">
          {blog.coverImage ? (
            <BlogCoverImage
              src={blog.coverImage}
              alt={blog.title as string}
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

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100 dark:border-gray-700">
            <article
              className="prose prose-lg prose-blue dark:prose-invert max-w-none 
                prose-headings:font-bold prose-a:text-blue-600 dark:prose-a:text-blue-400 
                prose-img:rounded-xl prose-img:shadow-md"
              dangerouslySetInnerHTML={{ __html: safeContent }}
            />
          </div>

          <div className="mt-16 bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-8 text-center border border-blue-100 dark:border-blue-900/50">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Need Professional Assistance?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Our team of expert Chartered Accountants is ready to help you navigate complex financial and regulatory landscapes.
            </p>
            <div className="flex justify-center">
              <WhatsAppCTA
                message={`Hi, I just read your blog post "${blog.title}" and would like to consult an expert.`}
                label="Consult an Expert via WhatsApp"
                className="inline-flex px-8 py-4 text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
