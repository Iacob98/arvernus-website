import { createArticleAction } from "@/actions/admin/articles";
import { ArticleForm } from "../ArticleForm";

export default function NewArticlePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Neuer Artikel</h1>
      <ArticleForm action={createArticleAction} />
    </div>
  );
}
