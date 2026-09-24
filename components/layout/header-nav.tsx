"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dices, Gamepad2, Gift, Home, Trophy } from "lucide-react";

import { getAffiliateAnchorProps } from "@/lib/affiliate";
import { isNavItemActive } from "@/lib/nav";
import { HEADER_ITEMS } from "@/lib/site";
import { cn } from "@/lib/utils";

const ICONS = {
  Home,
  Casino: Dices,
  Games: Gamepad2,
  Sports: Trophy,
} as const;

export function HeaderNav({
  className,
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const freeMoneyProps = getAffiliateAnchorProps({ destination: "home" });

  return (
    <nav
      aria-label="Main"
      className={cn("hidden items-center gap-1 lg:flex", className)}
    >
      {HEADER_ITEMS.slice(0, 2).map((item) => (
        <HeaderPill
          key={item.label}
          href={item.href}
          label={item.label}
          active={isNavItemActive(item.href, pathname)}
          onNavigate={onNavigate}
        />
      ))}
      <a
        {...freeMoneyProps}
        onClick={onNavigate}
        className="inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[15px] font-medium text-muted-foreground transition-colors hover:bg-foreground/8 hover:text-foreground"
      >
        <Gift className="size-4" />
        Free money
      </a>
      {HEADER_ITEMS.slice(2).map((item) => (
        <HeaderPill
          key={item.label}
          href={item.href}
          label={item.label}
          active={isNavItemActive(item.href, pathname)}
          onNavigate={onNavigate}
        />
      ))}
    </nav>
  );
}

function HeaderPill({
  href,
  label,
  active,
  onNavigate,
}: {
  href: string;
  label: string;
  active: boolean;
  onNavigate?: () => void;
}) {
  const Icon = ICONS[label as keyof typeof ICONS];

  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[15px] font-medium transition-colors",
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-foreground/8 hover:text-foreground"
      )}
    >
      {Icon ? <Icon className="size-4" /> : null}
      {label}
    </Link>
  );
}
