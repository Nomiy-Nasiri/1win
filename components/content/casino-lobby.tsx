"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { CasinoLobbyHero } from "@/components/content/lobby-hero";
import { GameCard } from "@/components/content/game-card";
import { GameRow } from "@/components/content/game-row";
import { JackpotStrip } from "@/components/content/jackpot-strip";
import { Input } from "@/components/ui/input";
import {
  CASINO_SUBNAV,
  filterLobbyGames,
  getLiveGameRow,
  getPopularGameRow,
  getProviders,
  getQuickGameRow,
  getTwinGameRow,
  LOBBY_CHIPS,
} from "@/lib/lobby";
import { paths } from "@/lib/routes";
import { cn } from "@/lib/utils";

export function CasinoLobby({ initialChip = "lobby" }: { initialChip?: string }) {
  const [subnav, setSubnav] = useState(
    initialChip === "live" || initialChip === "fast" ? initialChip : "lobby"
  );
  const [chip, setChip] = useState(initialChip);
  const [query, setQuery] = useState("");
  const [provider, setProvider] = useState("");
  const providers = getProviders();

  const activeChip = query || provider ? chip : subnav === "lobby" ? chip : subnav;
  const filtered = useMemo(
    () =>
      filterLobbyGames({
        chip: activeChip,
        query,
        provider,
      }),
    [activeChip, provider, query]
  );

  const showGrid = Boolean(query || provider || (chip !== "lobby" && subnav === "lobby") || subnav !== "lobby");

  return (
    <div className="space-y-6">
      <div className="no-scrollbar flex gap-2 overflow-x-auto">
        {CASINO_SUBNAV.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setSubnav(item.id);
              setChip(item.id);
            }}
            className={cn(
              "inline-flex h-10 shrink-0 items-center rounded-full px-4 text-[15px] font-medium transition-colors",
              subnav === item.id
                ? "bg-primary text-primary-foreground"
                : "bg-foreground/8 text-muted-foreground hover:bg-foreground/12 hover:text-foreground"
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <CasinoLobbyHero />

      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_220px]">
        <label className="relative block">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search"
            className="h-12 rounded-xl border-border bg-card pr-3 pl-10 text-base"
          />
        </label>
        <label className="block">
          <span className="sr-only">Providers</span>
          <select
            value={provider}
            onChange={(event) => setProvider(event.target.value)}
            className="h-12 w-full rounded-xl border border-border bg-card px-3 text-base text-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <option value="">Providers</option>
            {providers.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
        {LOBBY_CHIPS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setChip(item.id);
              if (item.id === "live" || item.id === "fast" || item.id === "lobby") {
                setSubnav(item.id);
              }
            }}
            className={cn(
              "inline-flex h-10 shrink-0 items-center rounded-full px-4 text-[15px] font-medium transition-colors",
              chip === item.id
                ? "bg-primary text-primary-foreground"
                : "bg-foreground/8 text-muted-foreground hover:bg-foreground/12 hover:text-foreground"
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      {showGrid ? (
        filtered.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
            {filtered.map((item) => (
              <GameCard key={item.slug} item={item} />
            ))}
          </div>
        ) : (
          <p className="py-10 text-center text-sm text-muted-foreground">
            No games match this search.
          </p>
        )
      ) : (
        <div className="space-y-8">
          <GameRow
            title="1win games"
            items={getTwinGameRow()}
            href={paths.games}
          />
          <GameRow title="Popular" items={getPopularGameRow()} />
          <GameRow
            title="Live casino"
            items={getLiveGameRow()}
            href={`${paths.casino}?category=live`}
          />
          <GameRow title="Quick games" items={getQuickGameRow()} href={paths.games} />
        </div>
      )}

      <JackpotStrip />
    </div>
  );
}
