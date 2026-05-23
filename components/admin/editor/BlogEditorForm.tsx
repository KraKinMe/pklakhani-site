"use client";

import dynamic from "next/dynamic";
import { Image as ImageIcon, Plus } from "lucide-react";
import type { CategoryOption, QuillEditor } from "@/types/blog";

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

type BlogEditorFormProps = {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleEditorChange: (content: string) => void;
  handleCoverImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  categories: CategoryOption[];
  newCategoryName: string;
  setNewCategoryName: (name: string) => void;
  creatingCategory: boolean;
  handleCreateCategory: () => void;
  quillRef: React.MutableRefObject<{ getEditor?: () => QuillEditor } | null>;
  modules: any;
};

export default function BlogEditorForm({
  formData,
  handleChange,
  handleEditorChange,
  handleCoverImageUpload,
  categories,
  newCategoryName,
  setNewCategoryName,
  creatingCategory,
  handleCreateCategory,
  quillRef,
  modules,
}: BlogEditorFormProps) {
  return (
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
  );
}
