import type { Metadata } from "next";

import { PageHero } from "@/components/content/page-hero";
import { ReviewCard } from "@/components/content/review-card";
import { Container } from "@/components/layout/container";
import { reviewItems } from "@/lib/content";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Reviews",
  description: `Independent reviews of sports, casino, and games on ${SITE_NAME}.`,
};

export default function ReviewsPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Content"
        title="Reviews"
        description="Scores, pros, and cons on dark editorial surfaces — written for readers, not banners."
      />
      <Container className="grid gap-4 py-8 md:grid-cols-2 md:py-10 xl:grid-cols-3">
        {reviewItems.map((item) => (
          <ReviewCard key={item.slug} item={item} />
        ))}
      </Container>
    </main>
  );
}
