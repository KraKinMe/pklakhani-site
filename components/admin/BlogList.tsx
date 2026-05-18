"use client";

import { useEffect, useState } from "react";
import { Trash2, Edit, ExternalLink, Eye, EyeOff, Clock } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { adminFetch } from "@/lib/admin-fetch";

export default function BlogList() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    const res = await adminFetch("/api/blog");
    if (res.ok) {
      setBlogs(await res.json());
    } else if (res.status === 401) {
      toast.error("Session expired. Please log in again.");
    }
  };

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await adminFetch("/api/blog");
        if (!active) return;
        if (res.ok) {
          setBlogs(await res.json());
        } else if (res.status === 401) {
          toast.error("Session expired. Please log in again.");
        }
      } catch (err) {
        if (active) console.error(err);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const res = await adminFetch(`/api/blog/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Blog deleted successfully");
        fetchBlogs();
      } else {
        toast.error("Failed to delete blog");
      }
    } catch {
      toast.error("An error occurred");
    }
  };

  if (loading) {
    return <div className="h-64 flex items-center justify-center">Loading posts...</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">All Posts</h2>
        <Link
          href="/admin/editor"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Write New Post
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">
              <th className="px-6 py-4 font-medium">Title</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {blogs.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  No blog posts found. Create your first one!
                </td>
              </tr>
            ) : (
              blogs.map((blog) => {
                const isExpired =
                  blog.expiresAt && new Date(blog.expiresAt) < new Date();
                return (
                  <tr
                    key={blog._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/20 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900 dark:text-white line-clamp-1">
                        {blog.title}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        /blogs/{blog.slug}
                        {blog.category ? ` · ${blog.category}` : ""}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {isExpired ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                          <Clock size={12} /> Expired
                        </span>
                      ) : blog.isPublished ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                          <Eye size={12} /> Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                          <EyeOff size={12} /> Draft
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      {new Intl.DateTimeFormat("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }).format(new Date(blog.createdAt))}
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <div className="flex justify-end gap-3">
                        <Link
                          href={`/blogs/${blog.slug}`}
                          target="_blank"
                          className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                          title="View Live"
                        >
                          <ExternalLink size={18} />
                        </Link>
                        <Link
                          href={`/admin/editor?id=${blog._id}`}
                          className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(blog._id)}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
