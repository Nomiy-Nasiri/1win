"use client";

import { AffiliateButton } from "@/components/affiliate/affiliate-button";
import { Container } from "@/components/layout/container";
import { MobileSheetTrigger } from "@/components/layout/mobile-sheet";
import { NavList } from "@/components/layout/nav-list";
import { SearchTrigger } from "@/components/layout/site-search";
import { SiteLogo } from "@/components/layout/site-logo";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/80 backdrop-blur-md">
      <Container className="flex h-14 items-center gap-4 lg:gap-6">
        <SiteLogo />
        <NavList variant="desktop" />
        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <SearchTrigger />
          <AffiliateButton className="hidden lg:inline-flex" size="lg">
            Play on 1win
          </AffiliateButton>
          <MobileSheetTrigger />
        </div>
      </Container>
    </header>
  );
}
