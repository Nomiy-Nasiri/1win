import Link from "next/link";

import { MediaImage } from "@/components/media/media-image";
import { Card, CardContent } from "@/components/ui/card";
import type { ArticleItem } from "@/lib/content";
import { cn } from "@/lib/utils";

type GuideCardProps = {
  item: ArticleItem;
  className?: string;
};

export function GuideCard({ item, className }: GuideCardProps) {
  return (
    <Card
      id={item.slug}
      className={cn(
        "scroll-mt-20 gap-0 py-0 ring-border transition-transform duration-200 hover:-translate-y-0.5 hover:ring-primary/35 motion-reduce:hover:translate-y-0",
        className
      )}
    >
      <Link href={item.href} className="flex h-full flex-col focus-visible:ring-3 focus-visible:ring-ring/50">
        <div className="relative aspect-[16/10] bg-surface">
          <MediaImage
            cover={item.cover}
            sizes="(max-width: 768px) 100vw, 25vw"
            className="absolute inset-0 size-full object-cover"
          />
        </div>
        <CardContent className="flex flex-1 flex-col gap-2 py-4">
          <div className="flex items-center justify-between gap-2 text-caption text-tertiary">
            <span className="uppercase">{item.category}</span>
            <span>{item.readTime}</span>
          </div>
          <h3 className="text-h3">{item.title}</h3>
          <p className="text-small text-muted-foreground">{item.excerpt}</p>
        </CardContent>
      </Link>
    </Card>
  );
}
