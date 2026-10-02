import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleView } from "@/components/content/article-view";
import { getGuideBySlug } from "@/lib/catalog";
import { guideItems } from "@/lib/content";
import { paths } from "@/lib/routes";

type GuidePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return guideItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getGuideBySlug(slug);

  if (!item) {
    return {};
  }

  return {
    title: item.title,
    description: item.excerpt,
  };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const item = getGuideBySlug(slug);

  if (!item) {
    notFound();
  }

  return (
    <ArticleView item={item} backHref={paths.guides} backLabel="All guides" />
  );
}
