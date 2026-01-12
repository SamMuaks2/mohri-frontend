// import { articles } from "@/data/articles";

// export default function ArticlesPage() {
//   return (
//     <section>
//       <h2 className="text-3xl font-bold mb-8 text-yellow-500">Articles</h2>
//       <div className="space-y-6">
//         {articles.map((article) => (
//           <a
//             key={article.title}
//             href={article.url}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="block border border-yellow-600/50 bg-zinc-950 p-6 rounded-lg hover:border-yellow-500 transition group"
//           >
//             <div className="flex justify-between items-start mb-2">
//               <h3 className="text-xl font-semibold text-white group-hover:text-yellow-500 transition">
//                 {article.title}
//               </h3>
//               <span className="text-sm text-gray-400">{article.date}</span>
//             </div>
//             <p className="text-gray-300 mt-2">{article.description}</p>
//             <div className="mt-4 flex items-center gap-2">
//               <span className="text-sm text-yellow-500">{article.platform}</span>
//               <span className="text-gray-500">•</span>
//               <span className="text-sm text-gray-400">{article.readTime}</span>
//             </div>
//           </a>
//         ))}
//       </div>
//     </section>
//   );
// }




// type Article = {
//   id: string;
//   title: string;
//   description: string;
//   url: string;
//   platform: string;
//   date: string;
//   readTime: string;
// };

// async function getArticles(): Promise<Article[]> {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/articles`,
//     {
//       cache: "no-store",
//     }
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch articles");
//   }

//   return res.json();
// }

// export default async function ArticlesPage() {
//   const articles = await getArticles();

//   return (
//     <section>
//       <h2 className="text-3xl font-bold mb-8 text-yellow-500">Articles</h2>

//       <div className="space-y-6">
//         {articles.map((article) => (
//           <a
//             key={article.id}
//             href={article.url}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="block border border-yellow-600/50 bg-zinc-950 p-6 rounded-lg hover:border-yellow-500 transition group"
//           >
//             <div className="flex justify-between items-start mb-2">
//               <h3 className="text-xl font-semibold text-white group-hover:text-yellow-500 transition">
//                 {article.title}
//               </h3>
//               <span className="text-sm text-gray-400">
//                 {article.date}
//               </span>
//             </div>

//             <p className="text-gray-300 mt-2">
//               {article.description}
//             </p>

//             <div className="mt-4 flex items-center gap-2">
//               <span className="text-sm text-yellow-500">
//                 {article.platform}
//               </span>
//               <span className="text-gray-500">•</span>
//               <span className="text-sm text-gray-400">
//                 {article.readTime}
//               </span>
//             </div>
//           </a>
//         ))}
//       </div>
//     </section>
//   );
// }



"use client";

import { useState } from "react";

type Article = {
  id: string;
  title: string;
  description: string;
  url: string;
  platform: string;
  date: string;
  readTime: string;
};

async function getArticles(): Promise<Article[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/articles`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch articles");
  }

  return res.json();
}

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <section>
      <h2 className="text-3xl font-bold mb-8 text-yellow-500">Articles</h2>

      <div className="space-y-6">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}

function ArticleCard({ article }: { article: Article }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="block border border-yellow-600/50 bg-zinc-950 p-6 rounded-lg hover:border-yellow-500 transition group cursor-pointer"
      >
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-white group-hover:text-yellow-500 transition">
            {article.title}
          </h3>
          <span className="text-sm text-gray-400">{article.date}</span>
        </div>

        <p className="text-gray-300 mt-2 line-clamp-2">{article.description}</p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-yellow-500">{article.platform}</span>
            <span className="text-gray-500">•</span>
            <span className="text-sm text-gray-400">{article.readTime}</span>
          </div>
          <span className="text-sm text-gray-400 group-hover:text-yellow-500">
            Click to read more →
          </span>
        </div>
      </div>

      {isModalOpen && (
        <ArticleModal
          article={article}
          onClose={() => setIsModalOpen(false)}
        />
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
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-zinc-950 border-2 border-yellow-500 p-8 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-3xl font-bold text-yellow-500 mb-2">
              {article.title}
            </h3>
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <span>{article.platform}</span>
              <span>•</span>
              <span>{article.date}</span>
              <span>•</span>
              <span>{article.readTime}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="text-xl font-semibold text-white mb-3">
              Description
            </h4>
            <p className="text-gray-300 leading-relaxed">
              {article.description}
            </p>
          </div>

          <div className="flex gap-4">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-yellow-600 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition text-center"
            >
              Read Full Article
            </a>
            <button
              onClick={onClose}
              className="flex-1 border-2 border-yellow-600 text-yellow-500 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 hover:text-black transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}