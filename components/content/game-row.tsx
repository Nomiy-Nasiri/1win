"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { GameCard } from "@/components/content/game-card";
import type { GameItem } from "@/lib/content";
import { cn } from "@/lib/utils";

type GameRowProps = {
  title: string;
  items: GameItem[];
  href?: string;
  icon?: ReactNode;
  className?: string;
  priority?: boolean;
};

export function GameRow({
  title,
  items,
  href,
  icon,
  className,
  priority = false,
}: GameRowProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  if (items.length === 0) {
    return null;
  }

  const scrollByCards = (direction: number) => {
    const node = scrollerRef.current;
    if (!node) {
      return;
    }

    node.scrollBy({ left: direction * 520, behavior: "smooth" });
  };

  const heading = (
    <span className="flex items-center gap-2 text-lg font-semibold text-foreground">
      {icon}
      {title}
      {href ? <ChevronRight className="size-5 text-muted-foreground" /> : null}
    </span>
  );

  return (
    <section className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between gap-3">
        {href ? (
          <Link
            href={href}
            className="rounded-md outline-none hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {heading}
          </Link>
        ) : (
          <h2>{heading}</h2>
        )}
        <div className="hidden items-center gap-1.5 sm:flex">
          <RowArrow
            label={`Scroll ${title} left`}
            onClick={() => scrollByCards(-1)}
          >
            <ChevronLeft className="size-4" />
          </RowArrow>
          <RowArrow
            label={`Scroll ${title} right`}
            onClick={() => scrollByCards(1)}
          >
            <ChevronRight className="size-4" />
          </RowArrow>
        </div>
      </div>
      <div
        ref={scrollerRef}
        className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:gap-3.5 sm:px-0"
      >
        {items.map((item, index) => (
          <GameCard
            key={item.slug}
            item={item}
            priority={priority && index < 4}
            className="w-[148px] shrink-0 sm:w-[172px] lg:w-[196px] xl:w-[210px]"
          />
        ))}
      </div>
    </section>
  );
}

function RowArrow({
  children,
  label,
  onClick,
}: {
  children: ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="inline-flex size-9 items-center justify-center rounded-full bg-white/8 text-foreground transition-colors hover:bg-white/14 focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      {children}
    </button>
  );
}
