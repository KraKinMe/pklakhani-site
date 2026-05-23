import Link from "next/link";
import { Trash2, Edit, ExternalLink, Eye, EyeOff, Clock } from "lucide-react";

export type BlogListRowProps = {
  blog: {
    _id: string;
    title: string;
    slug: string;
    category?: string;
    isPublished: boolean;
    expiresAt?: string;
    createdAt: string;
  };
  handleDelete: (id: string) => void;
};

export default function BlogListRow({ blog, handleDelete }: BlogListRowProps) {
  const isExpired = blog.expiresAt && new Date(blog.expiresAt) < new Date();

  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/20 transition-colors">
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
}
