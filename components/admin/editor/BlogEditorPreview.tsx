import { Eye } from "lucide-react";

type BlogEditorPreviewProps = {
  showPreview: boolean;
  setShowPreview: (val: boolean) => void;
  formData: {
    title: string;
    coverImage: string;
    content: string;
  };
};

export default function BlogEditorPreview({
  showPreview,
  setShowPreview,
  formData,
}: BlogEditorPreviewProps) {
  return (
    <div
      className={`w-full lg:w-1/3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 flex-col overflow-y-auto sticky top-6 h-[calc(100vh-3rem)] ${
        showPreview ? "flex" : "hidden lg:flex"
      }`}
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
  );
}
