import { Gift } from "lucide-react";

import { HeroCarousel, type HeroSlide } from "@/components/content/hero-carousel";
import { MediaImage } from "@/components/media/media-image";
import { getAffiliateAnchorProps } from "@/lib/affiliate";
import type { Cover } from "@/lib/content";
import { casinoItems } from "@/lib/content";
import { cn } from "@/lib/utils";

const sideCover: Cover = {
  src: "/media/sports.jpg",
  alt: "Free money promotional card",
  motif: "night",
  seed: "free-money",
  width: 800,
  height: 500,
};

const featuredGame =
  casinoItems.find((item) => item.slug === "fortune-tiger") ?? casinoItems[0];

const homeSlides: HeroSlide[] = [
  {
    id: "crypto-casino",
    eyebrow: "Crypto casino of the year",
    title: "Crypto\ncasino #1",
    cta: "Play",
    destination: "home",
    cover: {                                                 
      src: "/media/moneywincover.jpg",
      alt: "Crypto casino promotional banner",
      motif: "arena",
      seed: "lobby-hero",
      width: 1200,
      height: 700,
    },
  },
  {
    id: "sports",
    eyebrow: "Live and prematch",
    title: "Sports\nbetting",
    cta: "Play",
    destination: "sports",
    cover: {
      src: "/media/sports.jpg",
      alt: "Sports promotional banner",
      motif: "arena",
      seed: "home-sports",
      width: 1200,
      height: 700,
    },
  },
  {
    id: "casino-floor",
    eyebrow: "Slots, live, and tables",
    title: "Casino\nlobby",
    cta: "Play",
    destination: "casino",
    cover: {
      src: "/media/sportscover.jpg",
      alt: "Casino promotional banner",
      motif: "cards",
      seed: "home-casino",
      width: 1200,
      height: 700,
    },
  },
  {
    id: "quick-games",
    eyebrow: "Aviator, Lucky Jet, and more",
    title: "Quick\ngames",
    cta: "Play",
    destination: "games",
    cover: {
      src: "/media/moneywin.jpg",
      alt: "Quick games promotional banner",
      motif: "reels",
      seed: "home-games",
      width: 1200,
      height: 700,
    },
  },
];

const casinoSlides: HeroSlide[] = [
  {
    id: "mission-complete",
    title: "Mission Complete:\n€10,000 from SmartSoft",
    cta: "Participate",
    destination: "casino",
    tone: "mission",
  },
  {
    id: "crypto-casino",
    eyebrow: "Crypto casino of the year",
    title: "Crypto\ncasino #1",
    cta: "Play",
    destination: "home",
    cover: {
      src: "/media/moneywincover.jpg",
      alt: "Crypto casino promotional banner",
      motif: "arena",
      seed: "casino-crypto",
      width: 1200,
      height: 700,
    },
  },
  {
    id: "live-casino",
    eyebrow: "Dealers in real time",
    title: "Live\ncasino",
    cta: "Play",
    destination: "live",
    cover: {
      src: "/media/casino_cover.jpg",
      alt: "Live casino promotional banner",
      motif: "live",
      seed: "casino-live",
      width: 1200,
      height: 700,
    },
  },
  {
    id: "free-money",
    eyebrow: "Promos and prizes",
    title: "Free\nmoney",
    cta: "Play",
    destination: "home",
    tone: "gold",
    cover: {
      src: "/media/sports.jpg",
      alt: "Free money promotional banner",
      motif: "night",
      seed: "casino-bonus",
      width: 800,
      height: 500,
    },
  },
];

const sportsSlides: HeroSlide[] = [
  {
    id: "sports",
    eyebrow: "Live and prematch",
    title: "Sports",
    cta: "Play",
    destination: "sports",
    cover: {
      src: "/media/sports.jpg",
      alt: "Sports promotional banner",
      motif: "arena",
      seed: "sports-hero",
      width: 1200,
      height: 700,
    },
  },
  {
    id: "football",
    eyebrow: "Premier League and more",
    title: "Football",
    cta: "Play",
    destination: "sports",
    cover: {
      src: "/media/sportscover.jpg",
      alt: "Football promotional banner",
      motif: "pitch",
      seed: "sports-football",
      width: 1200,
      height: 700,
    },
  },
  {
    id: "live",
    eyebrow: "In-play markets",
    title: "Live\nbetting",
    cta: "Play",
    destination: "sports",
    cover: {
      src: "/media/sports.jpg",
      alt: "Live betting promotional banner",
      motif: "live",
      seed: "sports-live",
      width: 1200,
      height: 700,
    },
  },
];

export function HomeLobbyHero() {
  return (
    <div className="grid gap-3 lg:grid-cols-[minmax(0,1.7fr)_minmax(280px,0.85fr)]">
      <HeroCarousel slides={homeSlides} />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
        <a
          {...getAffiliateAnchorProps({ destination: "home" })}
          className="relative min-h-[132px] overflow-hidden rounded-[22px] bg-[#c4a574] outline-none ring-1 ring-white/8 focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <MediaImage
            cover={sideCover}
            sizes="(max-width: 1024px) 50vw, 28vw"
            className="absolute inset-0 size-full object-cover opacity-35 mix-blend-multiply"
          />
          <div className="relative flex h-full items-end justify-between gap-3 p-4">
            <div>
              <p className="text-base font-semibold text-[#2b2114]">Free money</p>
              <p className="mt-1 max-w-[14rem] text-sm text-[#3b2d1c]/80">
                Giving away prizes and other bonuses
              </p>
            </div>
          </div>
        </a>

        <a
          {...getAffiliateAnchorProps({ destination: "home" })}
          className="relative min-h-[132px] overflow-hidden rounded-[22px] bg-[#1a1a1a] outline-none ring-1 ring-white/8 focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_50%,rgba(61,220,107,0.18),transparent_42%)]" />
          <div className="relative flex h-full items-center justify-between gap-3 p-4">
            <div>
              <p className="text-base font-semibold text-white">Bonuses</p>
              <p className="mt-1 text-sm text-white/55">1 available bonus</p>
            </div>
            <Gift className="size-14 text-white/90" strokeWidth={1.4} />
          </div>
        </a>
      </div>
    </div>
  );
}

export function CasinoLobbyHero() {
  const featuredProps = featuredGame
    ? getAffiliateAnchorProps({ destination: featuredGame.destination })
    : getAffiliateAnchorProps({ destination: "casino" });

  return (
    <div className="grid gap-3 lg:grid-cols-[minmax(0,1.55fr)_minmax(280px,0.9fr)]">
      <HeroCarousel slides={casinoSlides} />

      <a
        {...featuredProps}
        className={cn(
          "relative min-h-[220px] overflow-hidden rounded-[22px] bg-[#5b4dff] p-5 outline-none ring-1 ring-white/8 focus-visible:ring-3 focus-visible:ring-ring/50 md:min-h-[250px] md:p-6"
        )}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.22),transparent_42%)]" />
        <div className="relative flex h-full flex-col">
          <p className="text-center text-xl font-semibold text-white">
            Best game of the week
          </p>
          <p className="mt-1 text-center text-sm text-white/70">
            {featuredGame?.provider}
          </p>
          {featuredGame ? (
            <div className="relative mx-auto mt-4 aspect-[3/4] w-[168px] max-h-[200px] overflow-hidden rounded-xl ring-1 ring-white/20">
              <MediaImage
                cover={featuredGame.cover}
                sizes="160px"
                className="absolute inset-0 size-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <p className="absolute inset-x-2 top-2 text-center text-base font-extrabold text-white uppercase">
                {featuredGame.title}
              </p>
            </div>
          ) : null}
          <span className="mt-auto inline-flex h-12 w-full items-center justify-center rounded-full bg-white text-base font-semibold text-black">
            Play
          </span>
        </div>
      </a>
    </div>
  );
}

export function SportsLobbyHero() {
  return <HeroCarousel slides={sportsSlides} />;
}
