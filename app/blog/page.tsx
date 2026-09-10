import type { Metadata } from "next";

import { ArticleCard } from "@/components/content/article-card";
import { PageHero } from "@/components/content/page-hero";
import { Container } from "@/components/layout/container";
import { blogItems } from "@/lib/content";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description: `Editorial notes on sports, casino, and games from ${SITE_NAME}.`,
};

export default function BlogPage() {
  const [featured, ...rest] = blogItems;

  return (
    <main id="main">
      <PageHero
        eyebrow="Content"
        title="Blog"
        description="A premium editorial grid for longer reads from the desk."
      />
      <Container className="grid gap-4 py-8 md:py-10 lg:grid-cols-[1.4fr_1fr]">
        {featured ? <ArticleCard item={featured} featured /> : null}
        <div className="grid gap-4">
          {rest.map((item) => (
            <ArticleCard key={item.slug} item={item} />
          ))}
        </div>
      </Container>
    </main>
  );
}
