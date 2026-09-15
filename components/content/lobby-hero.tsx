import { Gift } from "lucide-react";

import { MediaImage } from "@/components/media/media-image";
import { getAffiliateAnchorProps } from "@/lib/affiliate";
import type { Cover } from "@/lib/content";
import { casinoItems } from "@/lib/content";
import { cn } from "@/lib/utils";

const mainCover: Cover = {
  src: "/media/moneywincover.jpg",
  alt: "Crypto casino promotional banner",
  motif: "arena",
  seed: "lobby-hero",
  width: 1200,
  height: 700,
};

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

function HeroCta({ children }: { children: string }) {
  return (
    <span className="inline-flex h-12 w-fit items-center rounded-full bg-white px-7 text-base font-semibold text-black shadow-sm">
      {children}
    </span>
  );
}

export function HomeLobbyHero() {
  return (
    <div className="grid gap-3 lg:grid-cols-[minmax(0,1.7fr)_minmax(280px,0.85fr)]">
      <a
        {...getAffiliateAnchorProps({ destination: "home" })}
        className="group relative min-h-[220px] overflow-hidden rounded-[22px] outline-none ring-1 ring-white/8 focus-visible:ring-3 focus-visible:ring-ring/50 md:min-h-[280px]"
      >
        <MediaImage
          cover={mainCover}
          priority
          sizes="(max-width: 1024px) 100vw, 65vw"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/20" />
        <div className="relative flex h-full min-h-[220px] flex-col justify-between p-5 md:min-h-[280px] md:p-8">
          <div className="max-w-md space-y-3">
            <p className="text-xs font-semibold tracking-[0.18em] text-white/70 uppercase">
              Crypto casino of the year
            </p>
            <h1 className="font-heading text-[2.4rem] leading-[0.95] font-extrabold tracking-tight text-white uppercase sm:text-[3.35rem]">
              Crypto
              <br />
              casino #1
            </h1>
          </div>
          <HeroCta>Play</HeroCta>
        </div>
      </a>

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
      <a
        {...getAffiliateAnchorProps({ destination: "casino" })}
        className="relative min-h-[220px] overflow-hidden rounded-[22px] outline-none ring-1 ring-white/8 focus-visible:ring-3 focus-visible:ring-ring/50 md:min-h-[250px]"
      >
        <div className="absolute inset-0 bg-[linear-gradient(120deg,#1e293b_0%,#0f172a_55%,#111827_100%)]" />
        <div className="absolute top-1/2 right-6 size-36 -translate-y-1/2 rounded-[28px] bg-[linear-gradient(160deg,#ff4d4d,#7f1d1d)] shadow-[0_20px_50px_rgba(0,0,0,0.35)] sm:right-10 sm:size-44" />
        <div className="relative flex h-full min-h-[220px] flex-col justify-between p-5 md:min-h-[250px] md:p-8">
          <h2 className="max-w-sm font-heading text-[2.1rem] leading-[1.05] font-extrabold tracking-tight text-white sm:text-[2.6rem]">
            Mission Complete:
            <br />
            €10,000 from SmartSoft
          </h2>
          <HeroCta>Participate</HeroCta>
        </div>
      </a>

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
  return (
    <a
      {...getAffiliateAnchorProps({ destination: "sports" })}
      className="relative block min-h-[220px] overflow-hidden rounded-[22px] outline-none ring-1 ring-white/8 focus-visible:ring-3 focus-visible:ring-ring/50 md:min-h-[260px]"
    >
      <MediaImage
        cover={{
          src: "/media/sports.jpg",
          alt: "Sports promotional banner",
          motif: "arena",
          seed: "sports-hero",
          width: 1200,
          height: 700,
        }}
        priority
        sizes="100vw"
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-transparent" />
      <div className="relative flex min-h-[220px] flex-col justify-between p-5 md:min-h-[260px] md:p-8">
        <div className="max-w-lg">
          <p className="text-xs font-semibold tracking-[0.18em] text-white/70 uppercase">
            Live and prematch
          </p>
          <h1 className="mt-2 font-heading text-[2.4rem] leading-[0.95] font-extrabold tracking-tight text-white uppercase sm:text-[3.35rem]">
            Sports
          </h1>
          <p className="mt-3 max-w-md text-base text-white/75">
            Football, basketball, tennis, cricket, and more — open the 1win
            sportsbook with our referral.
          </p>
        </div>
        <HeroCta>Play</HeroCta>
      </div>
    </a>
  );
}
