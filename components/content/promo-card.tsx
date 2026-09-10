import Link from "next/link";

import { MediaImage } from "@/components/media/media-image";
import { Badge } from "@/components/ui/badge";
import { getAffiliateAnchorProps } from "@/lib/affiliate";
import type { PromoItem } from "@/lib/content";
import { cn } from "@/lib/utils";

type PromoCardProps = {
  item: PromoItem;
  className?: string;
  size?: "default" | "feature";
};

export function PromoCard({
  item,
  className,
  size = "default",
}: PromoCardProps) {
  const classNames = cn(
    "group relative isolate block min-h-44 scroll-mt-20 overflow-hidden rounded-xl ring-1 ring-border transition-transform duration-200 hover:scale-[1.015] focus-visible:ring-3 focus-visible:ring-ring/50 motion-reduce:transition-none motion-reduce:hover:scale-100",
    size === "feature" && "min-h-56 md:min-h-72",
    className
  );
  const body = (
    <>
      <MediaImage
        cover={item.cover}
        sizes={
          size === "feature"
            ? "(max-width: 768px) 100vw, 50vw"
            : "(max-width: 768px) 100vw, 25vw"
        }
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/15" />
      <div className="relative flex h-full min-h-44 flex-col justify-end gap-2 p-4 md:p-5">
        <Badge variant={item.featured ? "premium" : "default"}>{item.badge}</Badge>
        <h3 className="text-h3 text-foreground">{item.title}</h3>
        <p className="max-w-md text-small text-muted-foreground">{item.description}</p>
        <span className="text-small font-medium text-primary">{item.cta} →</span>
      </div>
    </>
  );

  if (item.destination) {
    return (
      <a
        {...getAffiliateAnchorProps({ destination: item.destination })}
        id={item.slug}
        aria-label={`${item.cta}: ${item.title}`}
        className={classNames}
      >
        {body}
      </a>
    );
  }

  return (
    <Link href={item.href} id={item.slug} className={classNames}>
      {body}
    </Link>
  );
}
