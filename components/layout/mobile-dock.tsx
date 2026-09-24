"use client";

import { Menu } from "lucide-react";

import { NavList } from "@/components/layout/nav-list";
import { useNav } from "@/components/layout/nav-provider";
import { cn } from "@/lib/utils";

export function MobileDock() {
  const { sheetOpen, setSheetOpen } = useNav();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden">
      <NavList
        variant="dock"
        className="h-[3.75rem]"
        onNavigate={() => setSheetOpen(false)}
        extra={
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            aria-expanded={sheetOpen}
            aria-label="Open menu"
            className={cn(
              "flex flex-col items-center justify-center gap-0.5 text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50",
              sheetOpen && "text-primary"
            )}
          >
            <Menu className="size-6" aria-hidden="true" />
            <span className="text-xs font-medium">Menu</span>
          </button>
        }
      />
    </div>
  );
}
