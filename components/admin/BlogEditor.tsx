"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Save, Eye, ArrowLeft, Image as ImageIcon, Plus } from "lucide-react";
import Link from "next/link";
import { adminFetch } from "@/lib/admin-fetch";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => (
    <div className="h-64 flex items-center justify-center border rounded-lg bg-gray-50">
      Loading Editor...
    </div>
  ),
}) as React.ComponentType<{
  theme?: string;
  value?: string;
  onChange?: (content: string) => void;
  modules?: Record<string, unknown>;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref?: any;
}>;

type CategoryOption = { _id: string; name: string; slug: string };

export default function BlogEditor() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");
  const quillRef = useRef<{ getEditor?: () => QuillEditor } | null>(null);

  const [loading, setLoading] = useState(!!editId);
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [creatingCategory, setCreatingCategory] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    coverImage: "",
    content: "",
    category: "",
    isPublished: true,
    expiresAt: "",
  });

  const loadCategories = useCallback(async () => {
    try {
      const res = await adminFetch("/api/categories");
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch {
      toast.error("Failed to load categories.");
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  useEffect(() => {
    if (editId) {
      fetchBlog();
    }
  }, [editId]);

  const fetchBlog = async () => {
    try {
      const res = await adminFetch(`/api/blog/${editId}`);
      if (res.ok) {
        const data = await res.json();
        setFormData({
          title: data.title,
          slug: data.slug,
          excerpt: data.excerpt,
          coverImage: data.coverImage,
          content: data.content,
          category: data.category || "",
          isPublished: data.isPublished,
          expiresAt: data.expiresAt
            ? new Date(data.expiresAt).toISOString().split("T")[0]
            : "",
        });
      }
    } catch {
      toast.error("Failed to load blog data.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleEditorChange = (content: string) => {
    setFormData((prev) => ({ ...prev, content }));
  };

  const insertImageInEditor = (url: string) => {
    const editor = quillRef.current?.getEditor?.();
    const range = editor?.getSelection?.();
    if (range && editor?.insertEmbed) {
      editor.insertEmbed(range.index, "image", url);
    }
  };

  const imageHandler = useCallback(async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files ? input.files[0] : null;
      if (!file) return;

      const toastId = toast.loading("Uploading image...");
      const uploadData = new FormData();
      uploadData.append("file", file);

      try {
        const res = await adminFetch("/api/upload", {
          method: "POST",
          body: uploadData,
        });

        if (res.ok) {
          const { url } = await res.json();
          insertImageInEditor(url);
          toast.success("Image uploaded", { id: toastId });
        } else {
          toast.error("Upload failed", { id: toastId });
        }
      } catch {
        toast.error("Upload failed", { id: toastId });
      }
    };
  }, []);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [2, 3, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ align: [] }],
          ["link", "image"],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    [imageHandler],
  );

  const handleCoverImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const toastId = toast.loading("Uploading cover image...");
    const uploadData = new FormData();
    uploadData.append("file", file);

    try {
      const res = await adminFetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });

      if (res.ok) {
        const { url } = await res.json();
        setFormData((prev) => ({ ...prev, coverImage: url }));
        toast.success("Cover image uploaded", { id: toastId });
      } else {
        toast.error("Upload failed", { id: toastId });
      }
    } catch {
      toast.error("Upload failed", { id: toastId });
    }
  };

  const handleCreateCategory = async () => {
    const name = newCategoryName.trim();
    if (!name) {
      toast.error("Enter a category name.");
      return;
    }

    setCreatingCategory(true);
    try {
      const res = await adminFetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (res.ok) {
        const cat = await res.json();
        await loadCategories();
        setFormData((prev) => ({ ...prev, category: cat.slug }));
        setNewCategoryName("");
        toast.success(`Category "${cat.name}" created.`);
      } else {
        toast.error("Failed to create category.");
      }
    } catch {
      toast.error("Failed to create category.");
    } finally {
      setCreatingCategory(false);
    }
  };

  const handleSave = async () => {
    if (!formData.title || !formData.content) {
      toast.error("Title and Content are required.");
      return;
    }

    setSaving(true);

    const payload = {
      ...formData,
      expiresAt: formData.expiresAt
        ? new Date(formData.expiresAt).toISOString()
        : null,
    };

    try {
      const url = editId ? `/api/blog/${editId}` : "/api/blog";
      const method = editId ? "PUT" : "POST";

      const res = await adminFetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success(editId ? "Post updated!" : "Post created!");
        router.push("/admin");
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || "Failed to save post.");
      }
    } catch {
      toast.error("An error occurred while saving.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading editor...</div>;

  return (
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
      <div
        className={`flex-1 flex flex-col gap-6 ${showPreview ? "hidden lg:flex" : "flex"}`}
      >
        <div className="flex items-center justify-between">
          <Link
            href="/admin"
            className="flex items-center text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" /> Back to Dashboard
          </Link>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="lg:hidden px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium flex items-center gap-2"
            >
              <Eye size={16} /> Preview
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors disabled:opacity-50"
            >
              <Save size={16} /> {saving ? "Saving..." : "Save Post"}
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Post Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter an engaging title..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-lg font-medium"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Custom Slug (Optional)
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="auto-generated-if-empty"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Auto-Delete Date (Optional)
              </label>
              <input
                type="date"
                name="expiresAt"
                value={formData.expiresAt}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
            <div className="mt-3 flex gap-2">
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="New category name..."
                className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <button
                type="button"
                onClick={handleCreateCategory}
                disabled={creatingCategory}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg text-sm font-medium flex items-center gap-1 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50"
              >
                <Plus size={16} /> Add
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Cover Image
            </label>
            <div className="flex items-center gap-4">
              {formData.coverImage && (
                <img
                  src={formData.coverImage}
                  alt="Cover"
                  className="h-16 w-16 object-cover rounded-lg border"
                />
              )}
              <label className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                <ImageIcon size={16} /> Upload Cover
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleCoverImageUpload}
                />
              </label>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Short Excerpt (Meta Description)
              </label>
              <span
                className={`text-xs ${formData.excerpt.length > 160 ? "text-red-500 font-bold" : "text-gray-500"}`}
              >
                {formData.excerpt.length}/160
              </span>
            </div>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              maxLength={160}
              rows={2}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              placeholder="Brief summary of the post (max 160 chars)..."
            />
          </div>

          <div className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              id="isPublished"
              name="isPublished"
              checked={formData.isPublished}
              onChange={handleChange}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
            />
            <label
              htmlFor="isPublished"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Publish immediately
            </label>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Content
            </label>
            <div className="bg-white text-black dark:bg-white rounded-lg overflow-hidden border border-gray-300">
              <ReactQuill
                ref={quillRef}
                theme="snow"
                value={formData.content}
                onChange={handleEditorChange}
                modules={modules}
                className="h-[500px] pb-10"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className={`w-full lg:w-1/3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 flex-col overflow-y-auto sticky top-6 h-[calc(100vh-3rem)] ${showPreview ? "flex" : "hidden lg:flex"}`}
      >
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Eye size={18} /> Live Preview
          </h3>
          <button
            type="button"
            onClick={() => setShowPreview(false)}
            className="lg:hidden text-sm text-gray-500"
          >
            Close
          </button>
        </div>

        <article className="prose prose-blue dark:prose-invert max-w-none">
          {formData.coverImage && (
            <img
              src={formData.coverImage}
              alt="Cover"
              className="w-full h-48 object-cover rounded-xl mb-6 shadow-sm"
            />
          )}
          <h1 className="text-3xl font-bold leading-tight mb-4">
            {formData.title || "Untitled Post"}
          </h1>
          <div
            className="mt-6 quill-content"
            dangerouslySetInnerHTML={{
              __html:
                formData.content ||
                "<p class='text-gray-400'>Start typing to see preview...</p>",
            }}
          />
        </article>
      </div>
    </div>
  );
}

type QuillEditor = {
  getSelection?: () => { index: number };
  insertEmbed?: (index: number, type: string, url: string) => void;
};
