import Link from "next/link";

import { MediaImage } from "@/components/media/media-image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { ReviewItem } from "@/lib/content";
import { cn } from "@/lib/utils";

type ReviewCardProps = {
  item: ReviewItem;
  className?: string;
};

export function ReviewCard({ item, className }: ReviewCardProps) {
  return (
    <Card
      id={item.slug}
      className={cn(
        "scroll-mt-20 gap-0 py-0 ring-border transition-transform duration-200 hover:-translate-y-0.5 hover:ring-primary/35 motion-reduce:hover:translate-y-0",
        className
      )}
    >
      <Link href={item.href} className="block focus-visible:ring-3 focus-visible:ring-ring/50">
        <div className="relative aspect-[16/9] bg-surface">
          <MediaImage
            cover={item.cover}
            sizes="(max-width: 768px) 100vw, 33vw"
            className="absolute inset-0 size-full object-cover"
          />
          <Badge variant="premium" className="absolute top-3 left-3">
            {item.score.toFixed(1)}
          </Badge>
        </div>
        <CardContent className="space-y-3 py-4">
          <p className="text-caption uppercase text-tertiary">{item.category}</p>
          <h3 className="text-h3">{item.title}</h3>
          <p className="text-small text-muted-foreground">{item.excerpt}</p>
          <div className="grid gap-2 text-caption sm:grid-cols-2">
            <ul className="space-y-1 text-muted-foreground">
              {item.pros.map((pro) => (
                <li key={pro}>+ {pro}</li>
              ))}
            </ul>
            <ul className="space-y-1 text-tertiary">
              {item.cons.map((con) => (
                <li key={con}>− {con}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
