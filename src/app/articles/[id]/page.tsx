import { notFound } from "next/navigation";
import DOMPurify from "isomorphic-dompurify";
import ShareButtons from "@/components/ShareButtons";

type Article = {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  tags: string[];
  published: boolean;
  createdAt: string;
};

async function getArticle(id: string): Promise<Article | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    const article = await res.json();
    return article;
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
}

export default async function ArticlePage({ params }: { params: { id: string } }) {
  const article = await getArticle(params.id);

  if (!article || !article.published) {
    notFound();
  }

  const sanitizedContent = DOMPurify.sanitize(article.content);
  const formattedDate = new Date(article.createdAt).toDateString();

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <article>
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-4">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-gray-400 mb-6">
            <time dateTime={article.createdAt}>{formattedDate}</time>
            <span>•</span>
            <span>{Math.ceil(article.content.length / 1000)} min read</span>
          </div>
          
          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-yellow-500/10 text-yellow-500 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Share Buttons */}
          <div className="py-4 border-y border-yellow-600/20">
            <ShareButtons
              title={article.title}
              url={`/articles/${article._id}`}
              description={article.excerpt}
            />
          </div>
        </header>

        {/* Content */}
        <div 
          className="article-content prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />

        {/* Footer Share */}
        <footer className="mt-12 pt-8 border-t border-yellow-600/20">
          <p className="text-gray-400 mb-4">Enjoyed this article? Share it with others:</p>
          <ShareButtons
            title={article.title}
            url={`/articles/${article._id}`}
            description={article.excerpt}
          />
        </footer>

        {/* Back Button */}
        <div className="mt-8">
          <a
            href="/articles"
            className="inline-flex items-center gap-2 text-yellow-500 hover:text-yellow-400 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Articles
          </a>
        </div>
      </article>

      <style jsx global>{`
        /* Base article content styles */
        .article-content {
          color: #fff;
          line-height: 1.8;
          font-size: 1.125rem;
        }

        /* Headings */
        .article-content h1 {
          font-size: 2.5em;
          font-weight: bold;
          color: #eab308;
          margin: 1.5em 0 0.5em;
          line-height: 1.2;
        }

        .article-content h2 {
          font-size: 2em;
          font-weight: bold;
          color: #eab308;
          margin: 1.5em 0 0.5em;
          line-height: 1.3;
        }

        .article-content h3 {
          font-size: 1.5em;
          font-weight: bold;
          color: #eab308;
          margin: 1.5em 0 0.5em;
          line-height: 1.4;
        }

        .article-content h4 {
          font-size: 1.25em;
          font-weight: bold;
          color: #eab308;
          margin: 1.5em 0 0.5em;
        }

        /* Paragraphs */
        .article-content p {
          color: #fff;
          margin: 1.25em 0;
          line-height: 1.8;
        }

        /* Lists */
        .article-content ul,
        .article-content ol {
          color: #fff;
          margin: 1.5em 0;
          padding-left: 2em;
        }

        .article-content li {
          margin: 0.75em 0;
          line-height: 1.8;
        }

        .article-content ul > li {
          list-style-type: disc;
        }

        .article-content ol > li {
          list-style-type: decimal;
        }

        /* Links */
        .article-content a {
          color: #eab308;
          text-decoration: underline;
          transition: color 0.2s;
        }

        .article-content a:hover {
          color: #facc15;
        }

        /* Images */
        .article-content img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 2em 0;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
        }

        /* Text formatting */
        .article-content strong {
          font-weight: 700;
          color: #fff;
        }

        .article-content em {
          font-style: italic;
        }

        .article-content u {
          text-decoration: underline;
        }

        .article-content s {
          text-decoration: line-through;
          opacity: 0.7;
        }

        /* Blockquotes */
        .article-content blockquote {
          border-left: 4px solid #eab308;
          padding-left: 1.5em;
          margin: 2em 0;
          color: #d4d4d8;
          font-style: italic;
          background: rgba(234, 179, 8, 0.05);
          padding: 1em 1.5em;
          border-radius: 4px;
        }

        /* Code */
        .article-content code {
          background-color: #1a1a1a;
          color: #eab308;
          padding: 0.2em 0.5em;
          border-radius: 4px;
          font-family: 'Courier New', monospace;
          font-size: 0.9em;
        }

        .article-content pre {
          background-color: #1a1a1a;
          color: #fff;
          padding: 1.5em;
          border-radius: 8px;
          overflow-x: auto;
          margin: 2em 0;
          border: 1px solid #333;
        }

        .article-content pre code {
          background: transparent;
          padding: 0;
          color: #fff;
        }

        /* Horizontal rule */
        .article-content hr {
          border: none;
          border-top: 2px solid #eab308;
          margin: 3em 0;
          opacity: 0.3;
        }

        /* Tables */
        .article-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 2em 0;
        }

        .article-content th,
        .article-content td {
          border: 1px solid #333;
          padding: 0.75em;
          text-align: left;
        }

        .article-content th {
          background-color: #1a1a1a;
          color: #eab308;
          font-weight: bold;
        }

        /* Quill-specific classes */
        .article-content .ql-align-center {
          text-align: center;
        }

        .article-content .ql-align-right {
          text-align: right;
        }

        .article-content .ql-align-justify {
          text-align: justify;
        }

        /* Indentation */
        .article-content .ql-indent-1 {
          padding-left: 3em;
        }

        .article-content .ql-indent-2 {
          padding-left: 6em;
        }

        .article-content .ql-indent-3 {
          padding-left: 9em;
        }

        /* Font sizes */
        .article-content .ql-size-small {
          font-size: 0.85em;
        }

        .article-content .ql-size-large {
          font-size: 1.5em;
        }

        .article-content .ql-size-huge {
          font-size: 2em;
        }

        /* First paragraph emphasis */
        .article-content > p:first-of-type {
          font-size: 1.25em;
          line-height: 1.7;
          color: #f0f0f0;
        }
      `}</style>
    </main>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { id: string } }) {
  const article = await getArticle(params.id);

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: `${article.title} | Mohri Muakpo`,
    description: article.excerpt || article.title,
    openGraph: {
      title: article.title,
      description: article.excerpt || article.title,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt || article.title,
    },
  };
}