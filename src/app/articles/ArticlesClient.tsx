"use client";

import { useState } from "react";
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
          {article.description}
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
  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-zinc-950 border border-yellow-500 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8"
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

        <article className="prose prose-invert max-w-none">
          {article.content.split("\n\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </article>

        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className="border border-yellow-500 text-yellow-500 px-6 py-2 rounded-lg hover:bg-yellow-500 hover:text-black transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
