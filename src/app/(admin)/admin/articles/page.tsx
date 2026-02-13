import Link from "next/link";
import { getArticles } from "@/lib/dal";
import { deleteArticleAction } from "@/actions/admin/articles";
import { ArticlesList } from "./ArticlesList";

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Ratgeber</h1>
        <Link
          href="/admin/articles/new"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark transition-colors"
        >
          + Neuer Artikel
        </Link>
      </div>
      <ArticlesList articles={articles} deleteAction={deleteArticleAction} />
    </div>
  );
}
