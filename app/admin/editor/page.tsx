import { Suspense } from "react";
import BlogEditor from "@/components/admin/BlogEditor";

export const metadata = {
  title: "Editor - Admin Dashboard",
  robots: "noindex, nofollow",
};

export default function EditorPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading editor...</div>}>
      <BlogEditor />
    </Suspense>
  );
}
