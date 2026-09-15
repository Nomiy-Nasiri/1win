import type { Metadata } from "next";

import { GamesLobby } from "@/components/content/games-lobby";
import { Container } from "@/components/layout/container";
import { listingGameFilters } from "@/lib/catalog";
import { firstSearchParam } from "@/lib/routes";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Games",
  description: `Game catalog on ${SITE_NAME} — popular, new, featured, and quick titles. Each card opens 1win with our referral.`,
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
      <Container className="py-5 md:py-7">
        <GamesLobby key={filter} initialFilter={filter} />
      </Container>
    </main>
  );
}
