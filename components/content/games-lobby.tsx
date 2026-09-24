"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { GameCard } from "@/components/content/game-card";
import { GameRow } from "@/components/content/game-row";
import { Input } from "@/components/ui/input";
import { listingGameFilters } from "@/lib/catalog";
import { gameItems, type GameFilter } from "@/lib/content";
import { getPopularGameRow, getQuickGameRow, getTwinGameRow } from "@/lib/lobby";
import { cn } from "@/lib/utils";

type GamesLobbyProps = {
  initialFilter?: string;
};

export function GamesLobby({ initialFilter = "all" }: GamesLobbyProps) {
  const [filter, setFilter] = useState(initialFilter);
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const base =
      filter === "all"
        ? gameItems
        : gameItems.filter((item) => item.filter === (filter as GameFilter));

    if (!query.trim()) {
      return base;
    }

    const needle = query.trim().toLowerCase();
    return base.filter(
      (item) =>
        item.title.toLowerCase().includes(needle) ||
        item.provider.toLowerCase().includes(needle)
    );
  }, [filter, query]);

  const showGrid = filter !== "all" || Boolean(query.trim());

  return (
    <div className="space-y-6">
      <label className="relative block">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search"
          className="h-12 rounded-xl border-border bg-card pr-3 pl-10 text-base"
        />
      </label>

      <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
        {listingGameFilters.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setFilter(item.id)}
            className={cn(
              "inline-flex h-10 shrink-0 items-center rounded-full px-4 text-[15px] font-medium transition-colors",
              filter === item.id
                ? "bg-primary text-primary-foreground"
                : "bg-foreground/8 text-muted-foreground hover:bg-foreground/12 hover:text-foreground"
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      {showGrid ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
          {visible.map((item) => (
            <GameCard key={item.slug} item={item} />
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          <GameRow title="1win games" items={getTwinGameRow()} />
          <GameRow title="Quick games" items={getQuickGameRow()} />
          <GameRow title="Popular" items={getPopularGameRow()} />
          <GameRow title="All games" items={gameItems} />
        </div>
      )}
    </div>
  );
}
