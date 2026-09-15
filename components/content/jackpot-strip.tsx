import { ChevronLeft, ChevronRight } from "lucide-react";

import { GameCard } from "@/components/content/game-card";
import { getPopularGameRow, JACKPOT_TOTAL } from "@/lib/lobby";

export function JackpotStrip() {
  const items = getPopularGameRow().slice(0, 8);

  return (
    <section className="overflow-hidden rounded-[22px] bg-[linear-gradient(90deg,#c026d3_0%,#db2777_48%,#f97316_100%)] p-4 sm:p-5">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-base text-white/85">Total jackpot</p>
          <p className="font-heading text-[2.15rem] leading-none font-extrabold tracking-tight text-white sm:text-[2.5rem]">
            {JACKPOT_TOTAL}
          </p>
        </div>
        <div className="hidden items-center gap-1 sm:flex">
          <span className="inline-flex size-8 items-center justify-center rounded-full bg-black/20 text-white">
            <ChevronLeft className="size-4" />
          </span>
          <span className="inline-flex size-8 items-center justify-center rounded-full bg-black/20 text-white">
            <ChevronRight className="size-4" />
          </span>
        </div>
      </div>
      <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1">
        {items.map((item) => (
          <GameCard
            key={`jackpot-${item.slug}`}
            item={item}
            className="w-[128px] shrink-0 sm:w-[148px] lg:w-[168px]"
          />
        ))}
      </div>
    </section>
  );
}
