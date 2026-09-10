"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { CategoryNav } from "@/components/content/category-nav";
import { GameCard } from "@/components/content/game-card";
import { casinoCategories } from "@/lib/content";
import { filterCasinoGames } from "@/lib/catalog";
import { casinoPath } from "@/lib/routes";

type CasinoCollectionProps = {
  initialCategory?: string;
};

export function CasinoCollection({
  initialCategory = "all",
}: CasinoCollectionProps) {
  const router = useRouter();
  const [category, setCategory] = useState(initialCategory);

  useEffect(() => {
    setCategory(initialCategory);
  }, [initialCategory]);

  const visible = filterCasinoGames(category);

  return (
    <div>
      <CategoryNav
        items={casinoCategories}
        value={category}
        onChange={(value) => {
          setCategory(value);
          router.replace(casinoPath(value), { scroll: false });
        }}
        ariaLabel="Casino categories"
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
