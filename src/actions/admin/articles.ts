"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getArticles, saveArticles } from "@/lib/dal";
import { uploadImage } from "./images";

export async function createArticleAction(
  _prevState: { success?: boolean; error?: string } | null,
  formData: FormData
): Promise<{ success?: boolean; error?: string }> {
  try {
    const articles = await getArticles();
    const maxId = articles.reduce((max, a) => Math.max(max, Number(a.id) || 0), 0);

    let image = "";
    const file = formData.get("image") as File;
    if (file && file.size > 0) {
      const result = await uploadImage(file);
      if (result.error) return { error: result.error };
      image = result.path!;
    }

    articles.push({
      id: String(maxId + 1),
      slug: formData.get("slug") as string,
      title: formData.get("title") as string,
      excerpt: formData.get("excerpt") as string,
      content: formData.get("content") as string,
      category: formData.get("category") as string,
      author: (formData.get("author") as string) || undefined,
      publishedDate: formData.get("publishedDate") as string,
      image: image || undefined,
      metaTitle: (formData.get("metaTitle") as string) || undefined,
      metaDescription: (formData.get("metaDescription") as string) || undefined,
      featured: formData.get("featured") === "on",
      order: articles.length,
    });
    await saveArticles(articles);
    revalidatePath("/", "layout");
  } catch {
    return { error: "Fehler beim Erstellen" };
  }
  redirect("/admin/articles");
}

export async function updateArticleAction(
  _prevState: { success?: boolean; error?: string } | null,
  formData: FormData
): Promise<{ success?: boolean; error?: string }> {
  try {
    const id = formData.get("id") as string;
    const articles = await getArticles();
    const index = articles.findIndex((a) => a.id === id);
    if (index === -1) return { error: "Nicht gefunden" };

    let image = (formData.get("image_current") as string) || articles[index].image;
    const file = formData.get("image") as File;
    if (file && file.size > 0) {
      const result = await uploadImage(file);
      if (result.error) return { error: result.error };
      image = result.path!;
    }

    articles[index] = {
      ...articles[index],
      slug: formData.get("slug") as string,
      title: formData.get("title") as string,
      excerpt: formData.get("excerpt") as string,
      content: formData.get("content") as string,
      category: formData.get("category") as string,
      author: (formData.get("author") as string) || undefined,
      publishedDate: formData.get("publishedDate") as string,
      image: image || undefined,
      metaTitle: (formData.get("metaTitle") as string) || undefined,
      metaDescription: (formData.get("metaDescription") as string) || undefined,
      featured: formData.get("featured") === "on",
    };
    await saveArticles(articles);
    revalidatePath("/", "layout");
    return { success: true };
  } catch {
    return { error: "Fehler beim Speichern" };
  }
}

export async function deleteArticleAction(id: string): Promise<void> {
  const articles = await getArticles();
  await saveArticles(articles.filter((a) => a.id !== id));
  revalidatePath("/", "layout");
  redirect("/admin/articles");
}
