import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  title: string;
  description?: string;
  href?: string;
  actionLabel?: string;
  className?: string;
};

export function SectionHeader({
  title,
  description,
  href,
  actionLabel = "View all",
  className,
}: SectionHeaderProps) {
  return (
    <div                 
      className={cn(
        "mb-4 flex items-end justify-between gap-4",
        className
      )}
    >
      <div className="min-w-0">
        <h2 className="text-h2 text-foreground">{title}</h2>
        {description ? (
          <p className="mt-1 text-small text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {href ? (
        <Link
          href={href}
          className="inline-flex shrink-0 items-center gap-1 text-small text-muted-foreground transition-colors hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {actionLabel}
          <ArrowRight className="size-3.5" />
        </Link>
      ) : null}
    </div>
  );
}
            