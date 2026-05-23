import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { adminFetch } from "@/lib/admin-fetch";

import type { CategoryOption, QuillEditor } from "@/types/blog";

export function useBlogEditor() {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    >
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
    [imageHandler]
  );

  const handleCoverImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
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

  return {
    editId,
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
  };
}
