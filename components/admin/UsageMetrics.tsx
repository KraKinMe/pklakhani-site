"use client";

import { useEffect, useState } from "react";
import { Database, Image as ImageIcon, Activity } from "lucide-react";

export default function UsageMetrics() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch("/api/admin/stats", {
          credentials: "include",
        });
        if (!active) return;
        if (res.ok) {
          setStats(await res.json());
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

  if (loading) {
    return <div className="animate-pulse h-32 bg-gray-200 dark:bg-gray-800 rounded-xl mb-8" />;
  }

  const dbPercentage = stats?.mongodb ? Math.min(100, (stats.mongodb.dbSizeMB / stats.mongodb.limitMB) * 100) : 0;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* DB Usage */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg">
            <Database size={24} />
          </div>
          <h3 className="font-semibold text-gray-700 dark:text-gray-200">Database (MongoDB)</h3>
        </div>
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-gray-500">Free Tier Limit: {stats?.mongodb?.limitMB}MB</span>
          <span className="font-medium">{stats?.mongodb?.dbSizeMB || 0}MB Used</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${dbPercentage}%` }}></div>
        </div>
      </div>

      {/* Cloudinary Usage */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
            <ImageIcon size={24} />
          </div>
          <h3 className="font-semibold text-gray-700 dark:text-gray-200">Media (Cloudinary)</h3>
        </div>
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-gray-500">Credits</span>
          <span className="font-medium">{stats?.cloudinary?.credits || 0} / {stats?.cloudinary?.credits_limit || 25}</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div 
            className="bg-blue-500 h-2.5 rounded-full" 
            style={{ width: `${Math.min(100, ((stats?.cloudinary?.credits || 0) / (stats?.cloudinary?.credits_limit || 25)) * 100)}%` }}
          ></div>
        </div>
      </div>

      {/* Blog Stats */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg">
            <Activity size={24} />
          </div>
          <h3 className="font-semibold text-gray-700 dark:text-gray-200">Content Stats</h3>
        </div>
        <div className="flex justify-between items-center mt-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats?.mongodb?.totalBlogs || 0}</p>
            <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider mt-1">Total Posts</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{stats?.mongodb?.publishedBlogs || 0}</p>
            <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider mt-1">Published</p>
          </div>
        </div>
      </div>
    </div>
  );
}
