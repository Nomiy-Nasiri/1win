"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { CategoryNav } from "@/components/content/category-nav";
import { PromoCard } from "@/components/content/promo-card";
import { SectionHeader } from "@/components/content/section-header";
import type { PromoItem } from "@/lib/content";
import { sportCategories } from "@/lib/content";
import { sportsPath } from "@/lib/routes";

type SportCollectionProps = {
  items: PromoItem[];
  title?: string;
  description?: string;
  href?: string;
  initialCategory?: string;
  syncUrl?: boolean;
  showHeader?: boolean;
};

export function SportCollection({
  items,
  title = "Featured sports",
  description = "Desks that match a sportsbook menu — each card opens 1win sports.",
  href,
  initialCategory = "all",
  syncUrl = false,
  showHeader = true,
}: SportCollectionProps) {
  const router = useRouter();
  const [category, setCategory] = useState(initialCategory);

  useEffect(() => {
    setCategory(initialCategory);
  }, [initialCategory]);

  const visible = useMemo(() => {
    if (category === "all") {
      return items;
    }

    return items.filter((item) => item.slug === category);
  }, [category, items]);

  return (
    <div>
      {showHeader ? (
        <SectionHeader title={title} description={description} href={href} />
      ) : null}
      <CategoryNav
        items={sportCategories}
        value={category}
        onChange={(value) => {
          setCategory(value);
          if (syncUrl) {
            router.replace(sportsPath(value), { scroll: false });
          }
        }}
        ariaLabel="Sports categories"
        className="mb-4"
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {visible.map((item) => (
          <PromoCard key={item.slug} item={item} />
        ))}
      </div>
    </div>
  );
}
