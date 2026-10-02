import Link from "next/link";

import { AffiliateButton } from "@/components/affiliate/affiliate-button";
import { MediaImage } from "@/components/media/media-image";
import { Container } from "@/components/layout/container";
import type { ArticleItem } from "@/lib/content";

type ArticleViewProps = {
  item: ArticleItem;
  backHref: string;
  backLabel: string;
};

export function ArticleView({ item, backHref, backLabel }: ArticleViewProps) {
  return (
    <main id="main">
      <Container className="max-w-3xl space-y-6 py-8 md:py-10">
        <Link
          href={backHref}
          className="text-caption font-medium text-primary underline-offset-4 hover:underline"
        >
          {backLabel}
        </Link>
        <p className="text-caption uppercase text-tertiary">
          {item.category}
          <span aria-hidden="true"> · </span>
          {item.readTime}
        </p>
        <h1 className="text-h1">{item.title}</h1>
        <p className="text-body text-foreground">{item.excerpt}</p>
        <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-surface">
          <MediaImage
            cover={item.cover}
            sizes="(max-width: 768px) 100vw, 768px"
            priority
            className="absolute inset-0 size-full object-cover"
          />
        </div>
        <div className="space-y-4">
          {item.paragraphs?.map((paragraph) => (
            <p key={paragraph.slice(0, 48)} className="text-body text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="space-y-3 border-t border-border pt-6">
          <AffiliateButton />
          <p className="text-small text-muted-foreground">
            Affiliate link. It opens in a new tab. We may earn a commission if
            you continue to 1win. 18+ only.
          </p>
        </div>
      </Container>
    </main>
  );
}
