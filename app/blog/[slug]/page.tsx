import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleView } from "@/components/content/article-view";
import { getPostBySlug } from "@/lib/catalog";
import { blogItems } from "@/lib/content";
import { paths } from "@/lib/routes";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getPostBySlug(slug);

  if (!item) {
    return {};
  }

  return {
    title: item.title,
    description: item.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const item = getPostBySlug(slug);

  if (!item) {
    notFound();
  }

  return <ArticleView item={item} backHref={paths.blog} backLabel="All blogs" />;
}
