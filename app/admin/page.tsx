import UsageMetrics from "@/components/admin/UsageMetrics";
import BlogList from "@/components/admin/BlogList";

export const metadata = {
  title: "Admin Dashboard - P.K. Lakhani",
  robots: "noindex, nofollow",
};

export default function AdminPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">Welcome back, Bhavay. Here is a snapshot of your content and infrastructure.</p>
      </div>

      <UsageMetrics />
      
      <div className="mt-12">
        <BlogList />
      </div>
    </div>
  );
}
