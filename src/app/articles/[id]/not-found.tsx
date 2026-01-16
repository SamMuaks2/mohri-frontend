import Link from "next/link";

export default function ArticleNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-yellow-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-white mb-4">
          Article Not Found
        </h2>
        <p className="text-gray-400 mb-8">
          The article you're looking for doesn't exist or has been removed.
        </p>
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 bg-yellow-600 text-black px-6 py-3 rounded-md font-semibold hover:bg-yellow-500 transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Articles
        </Link>
      </div>
    </div>
  );
}