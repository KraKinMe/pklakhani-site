import { getSiteUrl } from "@/config/site";
import { getPublishedBlogs } from "@/lib/blogs";
import { getCategoryMap } from "@/lib/categories-public";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const siteUrl = getSiteUrl().replace(/\/+$/, "");
  const blogs = await getPublishedBlogs({ limit: 50 });
  const categoryMap = await getCategoryMap();

  const items = blogs
    .map((blog) => {
      const link = `${siteUrl}/blogs/${blog.slug}`;
      const pubDate = new Date(blog.createdAt).toUTCString();
      const category = blog.category
        ? categoryMap[blog.category as string]
        : null;

      return `
    <item>
      <title>${escapeXml(blog.title as string)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml((blog.excerpt as string) || "")}</description>
      ${category ? `<category>${escapeXml(category)}</category>` : ""}
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>P.K. Lakhani &amp; Co. — Blogs &amp; Insights</title>
    <link>${siteUrl}/blogs</link>
    <description>Chartered accountant articles on GST, tax, audit, and compliance in Gurugram and Delhi NCR.</description>
    <language>en-in</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/blogs/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(xml.trim(), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
