import type { Metadata } from "next";

import { CasinoCollection } from "@/components/content/casino-collection";
import { PageHero } from "@/components/content/page-hero";
import { Container } from "@/components/layout/container";
import { casinoCategories } from "@/lib/content";
import { firstSearchParam } from "@/lib/routes";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Casino",
  description: `Independent casino coverage on ${SITE_NAME} — slots, live rooms, and table games.`,
};

const casinoIds = new Set<string>(casinoCategories.map((item) => item.id));

export default async function CasinoPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string | string[] }>;
}) {
  const params = await searchParams;
  const requested = firstSearchParam(params.category) ?? "all";
  const category = casinoIds.has(requested) ? requested : "all";

  return (
    <main id="main">
      <PageHero
        eyebrow="Game discovery"
        title="Casino"
        description="Slots, live rooms, and tables — a strong lobby, not a 12,000-title scrape. Cards open the matching 1win casino section."
        destination="casino"
      />
      <Container className="py-8 md:py-10">
        <CasinoCollection initialCategory={category} />
      </Container>
    </main>
  );
}
