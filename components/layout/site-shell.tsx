"use client";

import type { ReactNode } from "react";

import { MobileDock } from "@/components/layout/mobile-dock";
import { MobileSheet } from "@/components/layout/mobile-sheet";
import { NavProvider } from "@/components/layout/nav-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteSearch } from "@/components/layout/site-search";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <NavProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <SiteHeader />
      {children}
      <SiteSearch />
      <MobileSheet />
      <MobileDock />
    </NavProvider>
  );
}
