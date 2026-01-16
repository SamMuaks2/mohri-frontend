import { notFound } from "next/navigation";
import ShareButtons from "@/components/ShareButtons";
import "../article-content.css";

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
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    
    if (!apiUrl) {
      console.error("NEXT_PUBLIC_API_URL is not defined");
      return null;
    }

    console.log(`Fetching article ${id} from ${apiUrl}/articles/${id}`);
    
    const res = await fetch(`${apiUrl}/articles/${id}`, {
      cache: "no-store",
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(`Article fetch response status: ${res.status}`);

    if (!res.ok) {
      console.error(`Failed to fetch article: ${res.status} ${res.statusText}`);
      return null;
    }

    const article = await res.json();
    console.log(`Article fetched successfully: ${article.title}`);
    return article;
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
}

// Simple HTML sanitizer - removes scripts and dangerous attributes
function sanitizeHtml(html: string): string {
  if (!html) return '';
  
  // Remove script tags and their content
  let cleaned = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  // Remove on* event handlers
  cleaned = cleaned.replace(/\son\w+\s*=\s*["'][^"']*["']/gi, '');
  cleaned = cleaned.replace(/\son\w+\s*=\s*[^\s>]*/gi, '');
  
  // Remove javascript: protocol
  cleaned = cleaned.replace(/javascript:/gi, '');
  
  return cleaned;
}

export default async function ArticlePage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  
  const article = await getArticle(id);

  if (!article || !article.published) {
    notFound();
  }

  // Use simple sanitization instead of DOMPurify
  const sanitizedContent = sanitizeHtml(article.content);
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
    </main>
  );
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  
  const article = await getArticle(id);

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