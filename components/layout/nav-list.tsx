"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Dices,
  Gamepad2,
  Home,
  Newspaper,
  Star,
  Trophy,
} from "lucide-react";

import { isNavItemActive } from "@/lib/nav";
import { DOCK_ITEMS, NAV_ITEMS, type NavItem } from "@/lib/site";
import { cn } from "@/lib/utils";

const NAV_ICONS = {
  Home,
  Sports: Trophy,
  Casino: Dices,
  Games: Gamepad2,
  Reviews: Star,
  Guides: BookOpen,
  Blog: Newspaper,
} as const;

type NavListVariant = "desktop" | "sheet" | "dock" | "footer";

type NavListProps = {
  variant: NavListVariant;
  items?: readonly NavItem[];
  onNavigate?: () => void;
  className?: string;
  extra?: ReactNode;
};

export function NavList({
  variant,
  items,
  onNavigate,
  className,
  extra,
}: NavListProps) {
  const pathname = usePathname();
  const links = items ?? (variant === "dock" ? DOCK_ITEMS : NAV_ITEMS);

  return (
    <nav
      aria-label={
        variant === "dock" ? "Primary" : variant === "footer" ? "Explore" : "Main"
      }
      className={cn(
        variant === "desktop" && "hidden items-center gap-1 lg:flex",
        variant === "sheet" && "grid gap-1",
        variant === "dock" && "grid h-full grid-cols-5",
        variant === "footer" && "grid gap-2 content-start",
        className
      )}
    >
      {links.map((item) => {
        const active = isNavItemActive(item.href, pathname);
        const Icon = NAV_ICONS[item.label];

        return (
          <Link
            key={`${item.label}-${item.href}`}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50",
              variant === "desktop" &&
                "rounded-md px-2.5 py-1.5 text-small font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              variant === "desktop" && active && "bg-accent text-primary",
              variant === "sheet" &&
                "flex min-h-12 items-center rounded-lg px-3 text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground",
              variant === "sheet" && active && "bg-accent text-primary",
              variant === "dock" &&
                "flex flex-col items-center justify-center gap-0.5 text-white/45 hover:text-foreground",
              variant === "dock" && active && "text-primary",
              variant === "footer" &&
                "text-small text-muted-foreground hover:text-primary"
            )}
          >
            {variant === "dock" && Icon ? (
              <Icon className="size-6" aria-hidden="true" />
            ) : null}
            <span className={cn(variant === "dock" && "text-xs font-medium")}>
              {item.label}
            </span>
          </Link>
        );
      })}
      {extra}
    </nav>
  );
}
