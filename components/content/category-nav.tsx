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
              "inline-flex h-9 shrink-0 items-center rounded-full border px-3.5 text-small font-medium transition-colors focus-visible:ring-3 focus-visible:ring-ring/50",
              isActive
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-secondary text-muted-foreground hover:border-primary/40 hover:text-foreground"
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
