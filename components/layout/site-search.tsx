"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

import { useNav } from "@/components/layout/nav-provider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { searchSite } from "@/lib/search";
import { cn } from "@/lib/utils";

export function SearchTrigger({ className }: { className?: string }) {
  const { setSearchOpen, setSheetOpen } = useNav();

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={cn("size-11 lg:size-8", className)}
      aria-label="Search"
      onClick={() => {
        setSheetOpen(false);
        setSearchOpen(true);
      }}
    >
      <Search />
    </Button>
  );
}

export function SiteSearch() {
  const { searchOpen, setSearchOpen } = useNav();
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchSite(query), [query]);

  return (
    <Dialog
      open={searchOpen}
      onOpenChange={(open) => {
        setSearchOpen(open);
        if (!open) {
          setQuery("");
        }
      }}
    >
      <DialogContent className="gap-3 sm:max-w-xl" showCloseButton>
        <DialogHeader>
          <DialogTitle>Search WinMoney</DialogTitle>
          <DialogDescription>
            Jump to a desk or guide here, or open a game on 1win.
          </DialogDescription>
        </DialogHeader>
        <Input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search sports, casino, games, reviews..."
          className="h-11"
          autoFocus
        />
        <ul className="max-h-72 overflow-y-auto">
          {results.length === 0 ? (
            <li className="px-2 py-6 text-center text-small text-muted-foreground">
              No matches for “{query}”.
            </li>
          ) : (
            results.map((item) => (
              <li key={`${item.group}-${item.href}-${item.title}`}>
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer nofollow sponsored"
                    onClick={() => setSearchOpen(false)}
                    className="flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 hover:bg-accent focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    <span className="text-sm font-medium">{item.title}</span>
                    <span className="text-caption uppercase text-tertiary">
                      {item.group}
                    </span>
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setSearchOpen(false)}
                    className="flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 hover:bg-accent focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    <span className="text-sm font-medium">{item.title}</span>
                    <span className="text-caption uppercase text-tertiary">
                      {item.group}
                    </span>
                  </Link>
                )}
              </li>
            ))
          )}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
