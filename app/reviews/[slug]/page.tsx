import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AffiliateButton } from "@/components/affiliate/affiliate-button";
import { MediaImage } from "@/components/media/media-image";
import { Container } from "@/components/layout/container";
import { getReviewBySlug } from "@/lib/catalog";
import { reviewItems } from "@/lib/content";
import { paths } from "@/lib/routes";

type ReviewPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return reviewItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: ReviewPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getReviewBySlug(slug);

  if (!item) {
    return {};
  }

  return {
    title: item.title,
    description: item.excerpt,
  };
}

export default async function ReviewPage({ params }: ReviewPageProps) {
  const { slug } = await params;
  const item = getReviewBySlug(slug);

  if (!item) {
    notFound();
  }

  return (
    <main id="main">
      <Container className="max-w-3xl space-y-6 py-8 md:py-10">
        <Link
          href={paths.reviews}
          className="text-caption font-medium text-primary underline-offset-4 hover:underline"
        >
          All reviews
        </Link>
        <p className="text-caption uppercase text-tertiary">
          {item.category}
          <span aria-hidden="true"> · </span>
          {item.score.toFixed(1)}
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
        <div className="grid gap-6 sm:grid-cols-2">
          <section className="space-y-2">
            <h2 className="text-h3">What works</h2>
            <ul className="space-y-1 text-body text-muted-foreground">
              {item.pros.map((pro) => (
                <li key={pro}>+ {pro}</li>
              ))}
            </ul>
          </section>
          <section className="space-y-2">
            <h2 className="text-h3">What does not</h2>
            <ul className="space-y-1 text-body text-muted-foreground">
              {item.cons.map((con) => (
                <li key={con}>− {con}</li>
              ))}
            </ul>
          </section>
        </div>
        <p className="text-body text-muted-foreground">
          This score is an editorial note about how the desk is organised. It
          is not a prediction, not a promise of winnings, and not an official
          1win review. Read the limits on the operator before you play. 18+
          only.
        </p>
        <div className="space-y-3 border-t border-border pt-6">
          <AffiliateButton />
          <p className="text-small text-muted-foreground">
            Affiliate link. It opens in a new tab. We may earn a commission if
            you continue to 1win.
          </p>
        </div>
      </Container>
    </main>
  );
}
