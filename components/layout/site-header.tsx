"use client";

import { AffiliateButton } from "@/components/affiliate/affiliate-button";
import { Container } from "@/components/layout/container";
import { HeaderNav } from "@/components/layout/header-nav";
import { LightControl } from "@/components/layout/light-slider";
import { MobileSheetTrigger } from "@/components/layout/mobile-sheet";
import { SiteLogo } from "@/components/layout/site-logo";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-md">
      <Container className="flex h-[4.5rem] items-center gap-3 lg:gap-5">
        <SiteLogo className="[&_span:last-child]:text-lg [&_span:last-child]:font-extrabold" />
        <HeaderNav />
        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <LightControl />
          <AffiliateButton
            look="login"
            size="sm"
            showIcon={false}
            className="hidden sm:inline-flex lg:h-10 lg:px-3.5 lg:text-[15px]"
          >
            Login
          </AffiliateButton>
          <AffiliateButton
            look="register"
            size="sm"
            showIcon={false}
            className="lg:h-10 lg:px-4 lg:text-[15px]"
          >
            Registration
          </AffiliateButton>
          <MobileSheetTrigger />
        </div>
      </Container>
    </header>
  );
}
