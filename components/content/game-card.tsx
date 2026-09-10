import { RatingStars } from "@/components/content/rating-stars";
import { MediaImage } from "@/components/media/media-image";
import { Badge } from "@/components/ui/badge";
import { getAffiliateAnchorProps } from "@/lib/affiliate";
import type { GameItem } from "@/lib/content";
import { cn } from "@/lib/utils";

type GameCardProps = {
  item: GameItem;
  className?: string;
};

export function GameCard({ item, className }: GameCardProps) {
  const premiumBadge = item.badge === "Editor's Choice";
  const anchorProps = getAffiliateAnchorProps({ destination: item.destination });

  return (
    <a
      {...anchorProps}
      id={item.slug}
      aria-label={`Play ${item.title} on 1win`}
      className={cn(
        "group block scroll-mt-20 overflow-hidden rounded-xl bg-card ring-1 ring-border transition-transform duration-200 hover:-translate-y-0.5 hover:ring-primary/40 focus-visible:ring-3 focus-visible:ring-ring/50 motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        className
      )}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-surface">
        <MediaImage
          cover={item.cover}
          sizes="(max-width: 768px) 50vw, 16vw"
          className="absolute inset-0 size-full object-cover transition-transform duration-200 group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
        />
        {item.badge ? (
          <Badge
            variant={premiumBadge ? "premium" : "default"}
            className="absolute top-2 left-2"
          >
            {item.badge}
          </Badge>
        ) : null}
      </div>
      <div className="space-y-1 p-2.5">
        <p className="text-caption uppercase text-tertiary">{item.category}</p>
        <h3 className="truncate text-small font-semibold text-foreground">{item.title}</h3>
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-caption text-muted-foreground">{item.provider}</p>
          {typeof item.rating === "number" ? (
            <RatingStars value={item.rating} />
          ) : null}
        </div>
      </div>
    </a>
  );
}
