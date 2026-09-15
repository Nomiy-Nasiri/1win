import { MediaImage } from "@/components/media/media-image";
import { getAffiliateAnchorProps } from "@/lib/affiliate";
import type { PromoItem } from "@/lib/content";
import { cn } from "@/lib/utils";

type SportTileProps = {
  item: PromoItem;
  className?: string;
};

export function SportTile({ item, className }: SportTileProps) {
  const anchorProps = getAffiliateAnchorProps({
    destination: item.destination ?? "sports",
  });

  return (
    <a
      {...anchorProps}
      id={item.slug}
      aria-label={`${item.title} on 1win`}
      className={cn(
        "group relative block aspect-[16/10] overflow-hidden rounded-[16px] outline-none ring-1 ring-white/8 transition-transform duration-200 hover:-translate-y-0.5 focus-visible:ring-3 focus-visible:ring-ring/50 motion-reduce:hover:translate-y-0",
        className
      )}
    >
      <MediaImage
        cover={item.cover}
        sizes="(max-width: 768px) 100vw, 25vw"
        className="absolute inset-0 size-full object-cover transition-transform duration-200 group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />
      <div className="absolute inset-x-3 bottom-3">
        <p className="text-xs font-semibold tracking-[0.14em] text-white/65 uppercase">
          {item.badge}
        </p>
        <h3 className="text-xl font-extrabold text-white sm:text-2xl">{item.title}</h3>
      </div>
    </a>
  );
}
