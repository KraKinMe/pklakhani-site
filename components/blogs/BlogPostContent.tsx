import WhatsAppCTA from "@/components/common/WhatsAppCTA";

type BlogPostContentProps = {
  title: string;
  safeContent: string;
};

export default function BlogPostContent({ title, safeContent }: BlogPostContentProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100 dark:border-gray-700">
        <article
          className="prose prose-lg prose-blue dark:prose-invert max-w-none break-words
            prose-headings:font-bold prose-a:text-blue-600 dark:prose-a:text-blue-400 
            prose-img:rounded-xl prose-img:shadow-md"
          dangerouslySetInnerHTML={{ __html: safeContent }}
        />
      </div>

      <div className="mt-16 bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-8 text-center border border-blue-100 dark:border-blue-900/50">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Need Professional Assistance?
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Our team of expert Chartered Accountants is ready to help you navigate complex financial and regulatory landscapes.
        </p>
        <div className="flex justify-center">
          <WhatsAppCTA
            message={`Hi, I just read your blog post "${title}" and would like to consult an expert.`}
            label="Consult an Expert via WhatsApp"
            className="inline-flex px-8 py-4 text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          />
        </div>
      </div>
    </div>
  );
}
