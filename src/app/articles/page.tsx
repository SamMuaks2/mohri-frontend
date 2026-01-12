import ArticlesClient from "./ArticlesClient";

export type Article = {
  id: string;
  title: string;
  description: string;
  content: string;
  date: string;
  tags: string[];
};

async function getArticles(): Promise<Article[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch articles");

  const data = await res.json();

  // Transforming NestJS model → UI model
  return data
    .filter((a: any) => a.published === true)
    .map((a: any) => ({
      id: a._id,
      title: a.title,
      description: a.excerpt,
      content: a.content,
      date: new Date(a.createdAt).toDateString(),
      tags: a.tags || [],
    }));
}

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <ArticlesClient articles={articles} />
    </main>
  );
}
