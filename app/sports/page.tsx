import type { Metadata } from "next";

import { SportsLobbyHero } from "@/components/content/lobby-hero";
import { SportCollection } from "@/components/content/sport-collection";
import { Container } from "@/components/layout/container";
import { sportCategories, sportStories } from "@/lib/content";
import { firstSearchParam } from "@/lib/routes";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sports",
  description: `Sports lobby on ${SITE_NAME} — football, basketball, tennis, cricket, and live markets. Each card opens 1win sports.`,
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
      <Container className="space-y-6 py-5 md:py-7">
        <SportsLobbyHero />
        <SportCollection
          key={category}
          items={sportStories}
          initialCategory={category}
          syncUrl
          showHeader={false}
        />
      </Container>
    </main>
  );
}
