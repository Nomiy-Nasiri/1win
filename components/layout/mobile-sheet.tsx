"use client";

import { Menu } from "lucide-react";

import { AffiliateButton } from "@/components/affiliate/affiliate-button";
import { NavList } from "@/components/layout/nav-list";
import { useNav } from "@/components/layout/nav-provider";
import { SearchTrigger } from "@/components/layout/site-search";
import { SiteLogo } from "@/components/layout/site-logo";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export function MobileSheetTrigger() {
  const { setSheetOpen } = useNav();

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className="size-11 lg:hidden"
      aria-label="Open menu"
      onClick={() => setSheetOpen(true)}
    >
      <Menu />
    </Button>
  );
}

export function MobileSheet() {
  const { sheetOpen, setSheetOpen } = useNav();

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetContent side="right" className="w-[min(100%,22rem)] gap-0 bg-background">
        <SheetHeader className="border-b border-border">
          <SheetTitle className="sr-only">Site menu</SheetTitle>
          <SheetDescription className="sr-only">
            Main navigation and Play on 1win
          </SheetDescription>
          <div className="flex items-center justify-between gap-3 pr-10">
            <SiteLogo />
            <SearchTrigger />
          </div>
        </SheetHeader>
        <div className="flex flex-1 flex-col overflow-y-auto px-4 py-5">
          <NavList variant="sheet" onNavigate={() => setSheetOpen(false)} />
        </div>
        <Separator />
        <div className="p-4">
          <AffiliateButton className="w-full">Play on 1win</AffiliateButton>
        </div>
      </SheetContent>
    </Sheet>
  );
}
