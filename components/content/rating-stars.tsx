import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

type RatingStarsProps = {
  value: number;
  className?: string;
};

export function RatingStars({ value, className }: RatingStarsProps) {
  const clamped = Math.max(0, Math.min(5, value));

  return (
    <span className={cn("inline-flex items-center gap-0.5", className)} aria-label={`${clamped} out of 5`}>
      {Array.from({ length: 5 }).map((_, index) => {
        const filled = index + 1 <= Math.round(clamped);

        return (
          <Star
            key={index}
            className={cn(
              "size-3",
              filled ? "fill-premium text-premium" : "text-tertiary"
            )}
          />
        );
      })}
    </span>
  );
}
