"use client";

import AdminGuard from "@/components/admin/AdminGuard";
import Link from "next/link";
import { LayoutDashboard, PenSquare, LogOut } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 md:min-h-screen p-4 flex flex-col gap-2">
          <div className="mb-8 px-4 py-2">
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              CMS Dashboard
            </h1>
          </div>
          
          <nav className="flex-1 space-y-1">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
            >
              <LayoutDashboard size={20} className="text-gray-500" />
              <span className="font-medium">Overview</span>
            </Link>
            <Link
              href="/admin/editor"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
            >
              <PenSquare size={20} className="text-gray-500" />
              <span className="font-medium">Write Post</span>
            </Link>
          </nav>

          <button 
            onClick={async () => {
              await fetch("/api/admin/logout", { method: "POST", credentials: "include" });
              window.location.href = "/admin";
            }}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors mt-auto"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </AdminGuard>
  );
}
