import { MediaImage } from "@/components/media/media-image";
import { getAffiliateAnchorProps } from "@/lib/affiliate";
import type { GameItem } from "@/lib/content";
import { getGamePalette, mockPlayingCount } from "@/lib/lobby";
import { cn } from "@/lib/utils";

type GameCardProps = {
  item: GameItem;
  className?: string;
  priority?: boolean;
};

export function GameCard({ item, className, priority = false }: GameCardProps) {
  const anchorProps = getAffiliateAnchorProps({ destination: item.destination });
  const palette = getGamePalette(item.slug);
  const playing = mockPlayingCount(item.slug);

  return (
    <a
      {...anchorProps}
      id={item.slug}
      aria-label={`Play ${item.title} on 1win`}
      className={cn(
        "group relative block aspect-[3/4] overflow-hidden rounded-[16px] outline-none ring-1 ring-white/5 transition-transform duration-200 hover:-translate-y-1 focus-visible:ring-3 focus-visible:ring-ring/50 motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        className
      )}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(160deg, ${palette.from} 0%, ${palette.to} 72%)`,
        }}
      />
      <MediaImage
        cover={item.cover}
        sizes="(max-width: 768px) 48vw, 16vw"
        priority={priority}
        className="absolute inset-0 size-full object-cover opacity-45 mix-blend-overlay transition-transform duration-200 group-hover:scale-105 motion-reduce:group-hover:scale-100"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/20" />
      <div className="absolute inset-x-3 top-3">
        <p className="text-[11px] font-semibold tracking-[0.14em] text-white/75 uppercase sm:text-xs">
          {item.provider}
        </p>
        <h3 className="mt-1 line-clamp-3 text-[17px] leading-[1.05] font-extrabold tracking-tight text-white uppercase drop-shadow-sm sm:text-[19px] lg:text-[21px]">
          {item.title}
        </h3>
      </div>
      <div className="absolute inset-x-3 bottom-2.5 flex items-center gap-1.5 text-xs font-medium text-white/90 sm:text-[13px]">
        <span className="size-2 rounded-full bg-[#3DDC6B] shadow-[0_0_8px_#3DDC6B]" />
        <span>{playing.toLocaleString()} playing</span>
      </div>
    </a>
  );
}
