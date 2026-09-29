import type { Metadata } from "next";

import { ArticleCard } from "@/components/content/article-card";
import { PageHero } from "@/components/content/page-hero";
import { Container } from "@/components/layout/container";
import { blogItems } from "@/lib/content";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blogs on sports, casino, and games",
  description: `SEO guides from ${SITE_NAME} on reading a sports slate, casino categories, game lobbies, odds movement, and responsible play.`,
};

export default function BlogPage() {
  const [featured, ...rest] = blogItems;

  return (
    <main id="main">
      <PageHero
        eyebrow="Content"
        title="Blogs"
        description="Longer notes on sports markets, casino categories, game lobbies, and how to keep play inside a limit you chose first."
      />
      <Container className="space-y-10 py-8 md:py-10">
        <div className="max-w-3xl space-y-4">
          <h2 className="text-h2">Notes from the desk</h2>
          <p className="text-body text-muted-foreground">
            {SITE_NAME} publishes independent explainers for adults. These posts
            describe how sports listings, casino categories, and game filters
            work. They are not predictions, not betting tips, and not an
            official 1win site. Read them before you follow a marked affiliate
            link.
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          {featured ? <ArticleCard item={featured} featured anchor={false} /> : null}
          <div className="grid gap-4">
            {rest.map((item) => (
              <ArticleCard key={item.slug} item={item} anchor={false} />
            ))}
          </div>
        </div>
        <div className="mx-auto max-w-3xl space-y-12">
          {blogItems.map((item) => (
            <article key={item.slug} id={item.slug} className="scroll-mt-24 space-y-4">
              <p className="text-caption uppercase text-tertiary">
                {item.category}
                <span aria-hidden="true"> · </span>
                {item.readTime}
              </p>
              <h2 className="text-h2">{item.title}</h2>
              <p className="text-body text-foreground">{item.excerpt}</p>
              {item.paragraphs?.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="text-body text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </article>
          ))}
        </div>
      </Container>
    </main>
  );
}
