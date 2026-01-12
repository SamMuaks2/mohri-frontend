"use client";

import { useState } from "react";
import DOMPurify from "dompurify";
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
      <div
        onClick={() => setIsOpen(true)}
        className="group border border-yellow-600/40 bg-zinc-950 p-6 rounded-xl cursor-pointer hover:border-yellow-500 transition"
      >
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

        <div className="mt-4 text-sm text-gray-500">{article.date}</div>
      </div>

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

        {/* Render HTML content with Quill-compatible styling */}
        <article 
          className="article-content"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />

        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className="border border-yellow-500 text-yellow-500 px-6 py-2 rounded-lg hover:bg-yellow-500 hover:text-black transition"
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

          /* Headings */
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

          /* Paragraphs */
          .article-content p {
            color: #fff;
            margin: 1em 0;
            line-height: 1.6;
          }

          /* Lists */
          .article-content ul,
          .article-content ol {
            color: #fff;
            margin: 1em 0;
            padding-left: 2em;
          }

          .article-content li {
            margin: 0.5em 0;
          }

          /* Links */
          .article-content a {
            color: #eab308;
            text-decoration: underline;
          }

          .article-content a:hover {
            color: #facc15;
          }

          /* Images */
          .article-content img {
            max-width: 100%;
            height: auto;
            border-radius: 4px;
            margin: 1em 0;
          }

          /* Text formatting */
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

          /* Blockquotes */
          .article-content blockquote {
            border-left: 4px solid #eab308;
            padding-left: 1em;
            margin: 1em 0;
            color: #d4d4d8;
          }

          /* Code */
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

          /* Color classes (Quill uses inline styles, but just in case) */
          .article-content .ql-color-white {
            color: #fff;
          }

          /* Font sizes */
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