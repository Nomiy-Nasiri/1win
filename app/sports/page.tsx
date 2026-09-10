import type { Metadata } from "next";

import { PageHero } from "@/components/content/page-hero";
import { SportCollection } from "@/components/content/sport-collection";
import { Container } from "@/components/layout/container";
import { sportCategories, sportStories } from "@/lib/content";
import { firstSearchParam } from "@/lib/routes";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sports",
  description: `Independent sports briefings on ${SITE_NAME} — football, basketball, tennis, cricket, and live markets.`,
};

const sportIds = new Set<string>(sportCategories.map((item) => item.id));

export default async function SportsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string | string[] }>;
}) {
  const params = await searchParams;
  const requested = firstSearchParam(params.category) ?? "all";
  const category = sportIds.has(requested) ? requested : "all";

  return (
    <main id="main">
      <PageHero
        eyebrow="Game discovery"
        title="Sports"
        description="Match desks for football, basketball, tennis, cricket, hockey, MMA, and esports. Each card opens 1win sports with our referral."
        destination="sports"
      />
      <Container className="py-8 md:py-10">
        <SportCollection
          items={sportStories}
          initialCategory={category}
          syncUrl
          showHeader={false}
        />
      </Container>
    </main>
  );
}
