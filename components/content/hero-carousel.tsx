"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { MediaImage } from "@/components/media/media-image";
import {
  getAffiliateAnchorProps,
  type AffiliateDestination,
} from "@/lib/affiliate";
import type { Cover } from "@/lib/content";
import { cn } from "@/lib/utils";

const INTERVAL_MS = 3000;

export type HeroSlide = {
  id: string;
  eyebrow?: string;
  title: string;
  cta: string;
  destination: AffiliateDestination;
  cover?: Cover;
  tone?: "image" | "mission" | "gold" | "violet";
};

export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (slides.length < 2) {
      return;
    }

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches || paused) {
      return;
    }

    const timer = window.setTimeout(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, INTERVAL_MS);

    return () => window.clearTimeout(timer);
  }, [index, paused, slides.length]);

  const goTo = (next: number) => {
    const total = slides.length;
    setIndex(((next % total) + total) % total);
  };

  return (
    <div
      className="relative min-h-[220px] overflow-hidden rounded-[22px] ring-1 ring-white/8 md:min-h-[280px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((slide, slideIndex) => (
        <div
          key={slide.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-500 motion-reduce:transition-none",
            slideIndex === index
              ? "z-10 opacity-100"
              : "pointer-events-none z-0 opacity-0"
          )}
          aria-hidden={slideIndex !== index}
        >
          <HeroSlideCard
            slide={slide}
            priority={slideIndex === 0}
            heading={slideIndex === 0 ? "h1" : "h2"}
          />
        </div>
      ))}

      {slides.length > 1 ? (
        <>
          <button
            type="button"
            aria-label="Previous banner"
            onClick={() => goTo(index - 1)}
            className="absolute top-1/2 left-3 z-20 hidden size-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white hover:bg-black/55 focus-visible:ring-3 focus-visible:ring-ring/50 sm:inline-flex"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Next banner"
            onClick={() => goTo(index + 1)}
            className="absolute top-1/2 right-3 z-20 hidden size-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white hover:bg-black/55 focus-visible:ring-3 focus-visible:ring-ring/50 sm:inline-flex"
          >
            <ChevronRight className="size-5" />
          </button>
          <div className="absolute inset-x-0 bottom-3 z-20 flex justify-center gap-2">
            {slides.map((slide, slideIndex) => (
              <button
                key={slide.id}
                type="button"
                aria-label={`Show banner ${slideIndex + 1}`}
                aria-current={slideIndex === index}
                onClick={() => goTo(slideIndex)}
                className={cn(
                  "h-2 rounded-full transition-all",
                  slideIndex === index
                    ? "w-6 bg-white"
                    : "w-2 bg-white/40 hover:bg-white/70"
                )}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

function HeroSlideCard({
  slide,
  priority,
  heading: Heading,
}: {
  slide: HeroSlide;
  priority?: boolean;
  heading: "h1" | "h2";
}) {
  const titleLines = slide.title.split("\n");

  return (
    <a
      {...getAffiliateAnchorProps({ destination: slide.destination })}
      className="relative flex size-full min-h-[220px] flex-col justify-between overflow-hidden p-5 outline-none focus-visible:ring-3 focus-visible:ring-ring/50 md:min-h-[280px] md:p-8"
    >
      {slide.tone === "mission" ? (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(120deg,#1e293b_0%,#0f172a_55%,#111827_100%)]" />
          <div className="absolute top-1/2 right-6 size-36 -translate-y-1/2 rounded-[28px] bg-[linear-gradient(160deg,#ff4d4d,#7f1d1d)] shadow-[0_20px_50px_rgba(0,0,0,0.35)] sm:right-10 sm:size-44" />
        </>
      ) : null}
      {slide.tone === "gold" ? (
        <div className="absolute inset-0 bg-[linear-gradient(120deg,#c4a574_0%,#8a6a3d_100%)]" />
      ) : null}
      {slide.tone === "violet" ? (
        <div className="absolute inset-0 bg-[linear-gradient(120deg,#5b4dff_0%,#312e81_100%)]" />
      ) : null}
      {slide.cover ? (
        <MediaImage
          cover={slide.cover}
          priority={priority}
          sizes="(max-width: 1024px) 100vw, 65vw"
          className={cn(
            "absolute inset-0 size-full object-cover",
            slide.tone === "gold" && "opacity-35 mix-blend-multiply"
          )}
        />
      ) : null}
      {slide.tone !== "mission" ? (
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/20" />
      ) : null}
      <div className="relative max-w-md space-y-3">
        {slide.eyebrow ? (
          <p className="text-xs font-semibold tracking-[0.18em] text-white/70 uppercase">
            {slide.eyebrow}
          </p>
        ) : null}
        <Heading className="font-heading text-[2.1rem] leading-[0.95] font-extrabold tracking-tight text-white uppercase sm:text-[3rem]">
          {titleLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </Heading>
      </div>
      <span className="relative inline-flex h-12 w-fit items-center rounded-full bg-white px-7 text-base font-semibold text-black shadow-sm">
        {slide.cta}
      </span>
    </a>
  );
}
