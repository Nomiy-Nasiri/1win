"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { CategoryNav, type CategoryOption } from "@/components/content/category-nav";
import { GameCard } from "@/components/content/game-card";
import { SectionHeader } from "@/components/content/section-header";
import type { GameItem } from "@/lib/content";
import { gameFilters } from "@/lib/content";
import { gamesPath } from "@/lib/routes";

type GameCollectionProps = {
  items: GameItem[];
  title?: string;
  description?: string;
  href?: string;
  initialFilter?: string;
  syncUrl?: boolean;
  filters?: readonly CategoryOption[];
  showHeader?: boolean;
};

export function GameCollection({
  items,
  title = "Popular games",
  description = "Popular, new, featured, and fast games. Cards open 1win with our referral.",
  href,
  initialFilter = "popular",
  syncUrl = false,
  filters = gameFilters,
  showHeader = true,
}: GameCollectionProps) {
  const router = useRouter();
  const [filter, setFilter] = useState(initialFilter);

  useEffect(() => {
    setFilter(initialFilter);
  }, [initialFilter]);

  const visible =
    filter === "all" ? items : items.filter((item) => item.filter === filter);

  return (
    <div>
      {showHeader ? (
        <SectionHeader title={title} description={description} href={href} />
      ) : null}
      <CategoryNav
        items={filters}
        value={filter}
        onChange={(value) => {
          setFilter(value);
          if (syncUrl) {
            router.replace(gamesPath(value), { scroll: false });
          }
        }}
        ariaLabel="Game filters"
        className="mb-4"
      />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {visible.map((item) => (
          <GameCard key={item.slug} item={item} />
        ))}
      </div>
    </div>
  );
}
