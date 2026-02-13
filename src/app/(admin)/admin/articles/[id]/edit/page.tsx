import { notFound } from "next/navigation";
import { getArticles } from "@/lib/dal";
import { updateArticleAction } from "@/actions/admin/articles";
import { ArticleForm } from "../../ArticleForm";

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const articles = await getArticles();
  const article = articles.find((a) => a.id === id);
  if (!article) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Artikel bearbeiten</h1>
      <ArticleForm action={updateArticleAction} article={article} />
    </div>
  );
}
