import type { Metadata } from "next";

import { CasinoLobby } from "@/components/content/casino-lobby";
import { Container } from "@/components/layout/container";
import { casinoCategories } from "@/lib/content";
import { firstSearchParam } from "@/lib/routes";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Casino",
  description: `Casino lobby on ${SITE_NAME} — slots, live games, and tables. Cards open 1win with our referral.`,
};

const casinoIds = new Set<string>(casinoCategories.map((item) => item.id));

const CATEGORY_TO_CHIP: Record<string, string> = {
  live: "live",
  slots: "slots",
  tables: "tables",
};

export default async function CasinoPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string | string[] }>;
}) {
  const params = await searchParams;
  const requested = firstSearchParam(params.category) ?? "all";
  const category = casinoIds.has(requested) ? requested : "all";
  const initialChip = CATEGORY_TO_CHIP[category] ?? "lobby";

  return (
    <main id="main">
      <Container className="py-5 md:py-7">
        <CasinoLobby key={initialChip} initialChip={initialChip} />
      </Container>
    </main>
  );
}
