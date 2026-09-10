import Link from "next/link";

import { MediaImage } from "@/components/media/media-image";
import type { ArticleItem } from "@/lib/content";
import { cn } from "@/lib/utils";

type ArticleCardProps = {
  item: ArticleItem;
  className?: string;
  featured?: boolean;
};

export function ArticleCard({
  item,
  className,
  featured = false,
}: ArticleCardProps) {
  return (
    <Link
      href={item.href}
      id={item.slug}
      className={cn(
        "group grid scroll-mt-20 overflow-hidden rounded-xl bg-card ring-1 ring-border transition-transform duration-200 hover:-translate-y-0.5 hover:ring-primary/35 focus-visible:ring-3 focus-visible:ring-ring/50 motion-reduce:hover:translate-y-0",
        featured ? "md:grid-cols-[1.3fr_1fr]" : "grid-rows-[auto_1fr]",
        className
      )}
    >
      <div
        className={cn(
          "relative bg-surface",
          featured ? "min-h-56" : "aspect-[16/10]"
        )}
      >
        <MediaImage
          cover={item.cover}
          sizes={featured ? "(max-width: 768px) 100vw, 60vw" : "(max-width: 768px) 100vw, 33vw"}
          priority={featured}
          className="absolute inset-0 size-full object-cover"
        />
      </div>
      <div className="flex flex-col justify-center gap-2 p-4 md:p-6">
        <div className="flex items-center gap-2 text-caption uppercase text-tertiary">
          <span>{item.category}</span>
          <span aria-hidden="true">·</span>
          <span>{item.readTime}</span>
        </div>
        <h3 className={cn(featured ? "text-h2" : "text-h3")}>{item.title}</h3>
        <p className="text-small text-muted-foreground">{item.excerpt}</p>
      </div>
    </Link>
  );
}
