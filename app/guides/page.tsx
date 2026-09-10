import type { Metadata } from "next";

import { GuideCard } from "@/components/content/guide-card";
import { PageHero } from "@/components/content/page-hero";
import { Container } from "@/components/layout/container";
import { guideItems } from "@/lib/content";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Guides",
  description: `Practical sports, casino, and play guides from ${SITE_NAME}.`,
};

export default function GuidesPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Content"
        title="Guides"
        description="Walkthroughs you can finish in a few minutes — then decide whether to play."
      />
      <Container className="grid gap-4 py-8 sm:grid-cols-2 md:py-10 xl:grid-cols-4">
        {guideItems.map((item) => (
          <GuideCard key={item.slug} item={item} />
        ))}
      </Container>
    </main>
  );
}
