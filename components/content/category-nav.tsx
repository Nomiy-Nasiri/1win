"use client";

import { cn } from "@/lib/utils";

export type CategoryOption = {
  id: string;
  label: string;
};

type CategoryNavProps = {
  items: readonly CategoryOption[] | CategoryOption[];
  value: string;
  onChange?: (value: string) => void;
  ariaLabel?: string;
  className?: string;
};

export function CategoryNav({
  items,
  value,
  onChange,
  ariaLabel,
  className,
}: CategoryNavProps) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn(
        "no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0",
        className
      )}
    >
      {items.map((item) => {
        const isActive = item.id === value;

        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange?.(item.id)}
            className={cn(
              "inline-flex h-10 shrink-0 items-center rounded-full border px-4 text-[15px] font-medium transition-colors focus-visible:ring-3 focus-visible:ring-ring/50",
              isActive
                ? "border-transparent bg-primary text-primary-foreground"
                : "border-transparent bg-foreground/8 text-muted-foreground hover:bg-foreground/12 hover:text-foreground"
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
