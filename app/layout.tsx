import type { Metadata } from "next";
import { Geist, Outfit } from "next/font/google";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteShell } from "@/components/layout/site-shell";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LIGHT_BOOT_SCRIPT } from "@/lib/light";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s · ${SITE_NAME}`,
  },
  description:
    "Independent guides, reviews, and coverage of sports, casino, and games on 1win.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${geistSans.variable} ${outfit.variable} dark h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background pb-[4.75rem] lg:pb-0">
        <script dangerouslySetInnerHTML={{ __html: LIGHT_BOOT_SCRIPT }} />
        <TooltipProvider>
          <SiteShell>
            {children}
            <SiteFooter />
          </SiteShell>
        </TooltipProvider>
      </body>
    </html>
  );
}
