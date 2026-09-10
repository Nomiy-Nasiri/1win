import Link from "next/link";

import { SITE_NAME } from "@/lib/site";
import { cn } from "@/lib/utils";

type SiteLogoProps = {
  className?: string;
  compact?: boolean;
};

export function SiteLogo({ className, compact = false }: SiteLogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-2 rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        className
      )}
    >
      <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground glow-primary">
        <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
          <path
            d="M4 17V7l4.4 7.2L13 7v10M14.8 17l3.4-10 3.4 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {compact ? (
        <span className="sr-only">{SITE_NAME}</span>
      ) : (
        <span className="font-heading text-sm font-semibold tracking-tight">
          {SITE_NAME}
        </span>
      )}
    </Link>
  );
}
