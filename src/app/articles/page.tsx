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
    {
      cache: "no-store",
    }
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
          <a
            key={article.id}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block border border-yellow-600/50 bg-zinc-950 p-6 rounded-lg hover:border-yellow-500 transition group"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-semibold text-white group-hover:text-yellow-500 transition">
                {article.title}
              </h3>
              <span className="text-sm text-gray-400">
                {article.date}
              </span>
            </div>

            <p className="text-gray-300 mt-2">
              {article.description}
            </p>

            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm text-yellow-500">
                {article.platform}
              </span>
              <span className="text-gray-500">•</span>
              <span className="text-sm text-gray-400">
                {article.readTime}
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
