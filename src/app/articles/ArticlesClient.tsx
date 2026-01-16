"use client";

import { useState } from "react";
import Link from "next/link";
import DOMPurify from "dompurify";
import ShareButtons from "@/components/ShareButtons";
import type { Article } from "./page";

export default function ArticlesClient({ articles }: { articles: Article[] }) {
  return (
    <section>
      <h2 className="text-3xl font-bold mb-8 text-yellow-500">Articles</h2>

      <div className="grid gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {articles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No articles published yet.</p>
        </div>
      )}
    </section>
  );
}

function ArticleCard({ article }: { article: Article }) {
  const [isOpen, setIsOpen] = useState(false);

  // Strip HTML for preview
  const getTextPreview = (html: string) => {
    if (typeof window === 'undefined') return '';
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || '';
  };

  return (
    <>
      <Link href={`/articles/${article.id}`}>
        <div className="group border border-yellow-600/40 bg-zinc-950 p-6 rounded-xl cursor-pointer hover:border-yellow-500 transition">
          <h3 className="text-xl font-semibold text-white group-hover:text-yellow-500">
            {article.title}
          </h3>

          <p className="text-gray-400 mt-2 line-clamp-3">
            {article.description || getTextPreview(article.content).slice(0, 150) + '...'}
          </p>

          <div className="flex flex-wrap gap-2 mt-4">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between mt-4">
            <span className="text-sm text-gray-500">{article.date}</span>
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(true);
              }}
              className="text-sm text-yellow-500 hover:text-yellow-400 flex items-center gap-1"
            >
              Quick View
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </div>
        </div>
      </Link>

      {isOpen && (
        <ArticleModal article={article} onClose={() => setIsOpen(false)} />
      )}
    </>
  );
}

function ArticleModal({
  article,
  onClose,
}: {
  article: Article;
  onClose: () => void;
}) {
  // Sanitize HTML content before rendering
  const sanitizedContent = DOMPurify.sanitize(article.content);

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-zinc-950 border border-yellow-500 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8"
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-3xl font-bold text-yellow-500">
              {article.title}
            </h2>
            <p className="text-gray-400 mt-2">{article.date}</p>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-3xl leading-none"
          >
            ×
          </button>
        </div>

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

        {/* Share Buttons */}
        <div className="mb-6 pb-6 border-b border-yellow-600/20">
          <ShareButtons
            title={article.title}
            url={`/articles/${article.id}`}
            description={article.description}
          />
        </div>

        {/* Render HTML content with Quill-compatible styling */}
        <article 
          className="article-content"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />

        <div className="mt-8 flex justify-end gap-3">
          <Link
            href={`/articles/${article.id}`}
            className="border border-yellow-500 text-yellow-500 px-6 py-2 rounded-lg hover:bg-yellow-500 hover:text-black transition"
          >
            Read Full Article
          </Link>
          <button
            onClick={onClose}
            className="bg-yellow-600 text-black px-6 py-2 rounded-lg hover:bg-yellow-500 transition"
          >
            Close
          </button>
        </div>

        <style jsx global>{`
          /* Base article content styles matching Quill editor */
          .article-content {
            color: #fff;
            line-height: 1.6;
          }

          .article-content h1 {
            font-size: 2em;
            font-weight: bold;
            color: #eab308;
            margin: 0.67em 0;
          }

          .article-content h2 {
            font-size: 1.5em;
            font-weight: bold;
            color: #eab308;
            margin: 0.75em 0;
          }

          .article-content h3 {
            font-size: 1.17em;
            font-weight: bold;
            color: #eab308;
            margin: 0.83em 0;
          }

          .article-content h4 {
            font-size: 1em;
            font-weight: bold;
            color: #eab308;
            margin: 1em 0;
          }

          .article-content p {
            color: #fff;
            margin: 1em 0;
            line-height: 1.6;
          }

          .article-content ul,
          .article-content ol {
            color: #fff;
            margin: 1em 0;
            padding-left: 2em;
          }

          .article-content li {
            margin: 0.5em 0;
          }

          .article-content a {
            color: #eab308;
            text-decoration: underline;
          }

          .article-content a:hover {
            color: #facc15;
          }

          .article-content img {
            max-width: 100%;
            height: auto;
            border-radius: 4px;
            margin: 1em 0;
          }

          .article-content strong {
            font-weight: bold;
          }

          .article-content em {
            font-style: italic;
          }

          .article-content u {
            text-decoration: underline;
          }

          .article-content s {
            text-decoration: line-through;
          }

          .article-content blockquote {
            border-left: 4px solid #eab308;
            padding-left: 1em;
            margin: 1em 0;
            color: #d4d4d8;
          }

          .article-content code {
            background-color: #1a1a1a;
            color: #eab308;
            padding: 0.2em 0.4em;
            border-radius: 3px;
            font-family: monospace;
          }

          .article-content pre {
            background-color: #1a1a1a;
            color: #fff;
            padding: 1em;
            border-radius: 4px;
            overflow-x: auto;
            margin: 1em 0;
          }

          .article-content pre code {
            background: transparent;
            padding: 0;
          }

          .article-content .ql-align-center {
            text-align: center;
          }

          .article-content .ql-align-right {
            text-align: right;
          }

          .article-content .ql-align-justify {
            text-align: justify;
          }

          .article-content .ql-indent-1 {
            padding-left: 3em;
          }

          .article-content .ql-indent-2 {
            padding-left: 6em;
          }

          .article-content .ql-indent-3 {
            padding-left: 9em;
          }

          .article-content .ql-size-small {
            font-size: 0.75em;
          }

          .article-content .ql-size-large {
            font-size: 1.5em;
          }

          .article-content .ql-size-huge {
            font-size: 2.5em;
          }
        `}</style>
      </div>
    </div>
  );
}