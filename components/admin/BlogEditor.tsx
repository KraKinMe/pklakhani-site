"use client";

import Link from "next/link";
import { Save, Eye, ArrowLeft } from "lucide-react";
import { useBlogEditor } from "./hooks/useBlogEditor";
import BlogEditorForm from "./editor/BlogEditorForm";
import BlogEditorPreview from "./editor/BlogEditorPreview";
import "react-quill-new/dist/quill.snow.css";

export default function BlogEditor() {
  const {
    quillRef,
    loading,
    saving,
    showPreview,
    setShowPreview,
    categories,
    newCategoryName,
    setNewCategoryName,
    creatingCategory,
    formData,
    handleChange,
    handleEditorChange,
    handleCoverImageUpload,
    handleCreateCategory,
    handleSave,
    modules,
  } = useBlogEditor();

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

        <BlogEditorForm
          formData={formData}
          handleChange={handleChange}
          handleEditorChange={handleEditorChange}
          handleCoverImageUpload={handleCoverImageUpload}
          categories={categories}
          newCategoryName={newCategoryName}
          setNewCategoryName={setNewCategoryName}
          creatingCategory={creatingCategory}
          handleCreateCategory={handleCreateCategory}
          quillRef={quillRef}
          modules={modules}
        />
      </div>

      <BlogEditorPreview
        showPreview={showPreview}
        setShowPreview={setShowPreview}
        formData={formData}
      />
    </div>
  );
}
