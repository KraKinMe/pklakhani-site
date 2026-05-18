import connectToDatabase from "@/lib/db";
import Blog from "@/models/Blog";

export function getPublishedBlogFilter() {
  return {
    isPublished: true,
    $or: [{ expiresAt: null }, { expiresAt: { $gt: new Date() } }],
  };
}

export async function getPublishedBlogs(limit?: number) {
  await connectToDatabase();
  let query = Blog.find(getPublishedBlogFilter())
    .sort({ createdAt: -1 })
    .lean();
  if (limit) {
    query = query.limit(limit);
  }
  const blogs = await query;
  return blogs.map((blog) => ({
    ...blog,
    _id: blog._id.toString(),
    createdAt: blog.createdAt.toISOString(),
    updatedAt: blog.updatedAt.toISOString(),
  }));
}

export async function getLatestPublishedBlogs(count = 3) {
  return getPublishedBlogs(count);
}
