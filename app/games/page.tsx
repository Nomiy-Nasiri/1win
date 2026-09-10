import type { Metadata } from "next";

import { GameCollection } from "@/components/content/game-collection";
import { PageHero } from "@/components/content/page-hero";
import { Container } from "@/components/layout/container";
import { listingGameFilters } from "@/lib/catalog";
import { gameItems } from "@/lib/content";
import { firstSearchParam } from "@/lib/routes";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Games",
  description: `Independent game catalog on ${SITE_NAME} — popular, new, featured, and fast titles.`,
};

const filterIds = new Set<string>(listingGameFilters.map((item) => item.id));

export default async function GamesPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string | string[] }>;
}) {
  const params = await searchParams;
  const requested = firstSearchParam(params.filter) ?? "all";
  const filter = filterIds.has(requested) ? requested : "all";

  return (
    <main id="main">
      <PageHero
        eyebrow="Game discovery"
        title="Games"
        description="Popular, new, featured, and fast games. Each card opens 1win with our referral — crash and instant titles stay in their own filter."
        destination="games"
      />
      <Container className="py-8 md:py-10">
        <GameCollection
          items={gameItems}
          initialFilter={filter}
          syncUrl
          showHeader={false}
          filters={listingGameFilters}
        />
      </Container>
    </main>
  );
}
