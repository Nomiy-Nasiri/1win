import type { AffiliateDestination } from "@/lib/affiliate";
import { entries, paths } from "@/lib/routes";

export type MediaAsset = {
  src?: string;
  alt: string;
  width?: number;
  height?: number;
};

export type CoverMotif =
  | "arena"
  | "pitch"
  | "night"
  | "cards"
  | "reels"
  | "live"
  | "editorial"
  | "grid";

export type Cover = MediaAsset & {
  motif: CoverMotif;
  seed: string;
};

export type PromoItem = {
  id: string;
  slug: string;
  badge: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  cover: Cover;
  featured?: boolean;
  destination?: AffiliateDestination;
};

export type GameFilter = "popular" | "new" | "featured" | "fast";

export type GameItem = {
  id: string;
  slug: string;
  title: string;
  category: string;
  provider: string;
  href: string;
  destination: AffiliateDestination;
  cover: Cover;
  badge?: string;
  rating?: number;
  filter: GameFilter;
};

export type ReviewItem = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  href: string;
  score: number;
  category: string;
  cover: Cover;
  pros: string[];
  cons: string[];
};

export type ArticleItem = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  href: string;
  category: string;
  readTime: string;
  cover: Cover;
};

export const sportCategories = [
  { id: "all", label: "Sports" },
  { id: "football", label: "Football" },
  { id: "basketball", label: "Basketball" },
  { id: "tennis", label: "Tennis" },
  { id: "cricket", label: "Cricket" },
  { id: "hockey", label: "Hockey" },
  { id: "mma", label: "MMA" },
  { id: "esports", label: "eSports" },
  { id: "live", label: "Live" },
] as const;

export const casinoCategories = [
  { id: "all", label: "Casino" },
  { id: "slots", label: "Slots" },
  { id: "live", label: "Live Games" },
  { id: "tables", label: "Table games" },
] as const;

export const gameFilters = [
  { id: "popular", label: "Popular" },
  { id: "new", label: "New" },
  { id: "featured", label: "Featured" },
  { id: "fast", label: "Quick Games" },
] as const;

const CARD_JPG = {
  sports: "/media/sports.jpg",
  sportsCover: "/media/sportscover.jpg",
  casinoCard: "/media/casino_card.jpg",
  casinoCover: "/media/casino_cover.jpg",
  moneywin: "/media/moneywin.jpg",
  moneywinCover: "/media/moneywincover.jpg",
  images: "/media/images.jpg",
  images6: "/media/images-6.jpg",
  extra: "/media/extra.jpg",
} as const;

const GAME_COVERS: Record<string, readonly string[]> = {
  Slots: [CARD_JPG.casinoCard, CARD_JPG.casinoCover, CARD_JPG.images, CARD_JPG.moneywin],
  "Live Games": [CARD_JPG.casinoCover, CARD_JPG.casinoCard, CARD_JPG.images6],
  "Table games": [CARD_JPG.casinoCard, CARD_JPG.extra, CARD_JPG.images6],
  "Quick Games": [CARD_JPG.moneywin, CARD_JPG.moneywinCover, CARD_JPG.images, CARD_JPG.extra],
};

const SPORT_COVERS = [CARD_JPG.sports, CARD_JPG.sportsCover] as const;

function hashSeed(seed: string) {
  let hash = 2166136261;
  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function coverSrcFor(slug: string, category: string) {
  const pool = GAME_COVERS[category] ?? GAME_COVERS["Quick Games"];
  return pool[hashSeed(slug) % pool.length];
}

function sportCoverSrc(slug: string) {
  return SPORT_COVERS[hashSeed(slug) % SPORT_COVERS.length];
}

function makeGame(
  slug: string,
  title: string,
  category: string,
  provider: string,
  destination: AffiliateDestination,
  filter: GameFilter,
  motif: CoverMotif,
  extras: { badge?: string; rating?: number } = {}
): GameItem {
  return {
    id: slug,
    slug,
    title,
    category,
    provider,
    href: entries.game(slug),
    destination,
    filter,
    badge: extras.badge,
    rating: extras.rating,
    cover: {
      src: coverSrcFor(slug, category),
      motif,
      seed: slug,
      alt: `${title} cover art`,
      width: 600,
      height: 800,
    },
  };
}

export const promoItems: PromoItem[] = [
  {
    id: "featured-sports",
    slug: "featured-sports",
    badge: "Featured Sports",
    title: "Tonight's marquee fixtures",
    description: "Editorial picks across football, basketball, and tennis — odds context without the noise.",
    href: paths.sports,
    cta: "Browse sports",
    featured: true,
    cover: {
      src: CARD_JPG.sportsCover,
      alt: "Sports cover art",
      motif: "arena",
      seed: "sports-hero",
      width: 960,
      height: 540,
    },
  },
  {
    id: "casino-games",
    slug: "casino-games",
    badge: "Casino Games",
    title: "Tables, live rooms, and slots",
    description: "A dense catalog overview with independent notes on volatility, pace, and table feel.",
    href: paths.casino,
    cta: "Open casino",
    cover: {
      src: CARD_JPG.casinoCover,
      alt: "Casino cover art",
      motif: "cards",
      seed: "casino-hero",
      width: 960,
      height: 540,
    },
  },
  {
    id: "popular-games",
    slug: "popular-games",
    badge: "Popular Games",
    title: "What players are opening",
    description: "A rotating shortlist of high-interest titles, grouped by format rather than hype banners.",
    href: paths.games,
    cta: "See games",
    cover: {
      src: CARD_JPG.moneywin,
      alt: "WinMoney games art",
      motif: "reels",
      seed: "games-hero",
      width: 960,
      height: 540,
    },
  },
  {
    id: "latest-guides",
    slug: "latest-guides",
    badge: "Latest Guides",
    title: "Play smarter, not louder",
    description: "Practical walkthroughs for markets, live tables, and bankroll habits — written for readers, not ads.",
    href: paths.guides,
    cta: "Read guides",
    cover: {
      src: CARD_JPG.moneywinCover,
      alt: "WinMoney guides cover",
      motif: "editorial",
      seed: "guides-hero",
      width: 960,
      height: 540,
    },
  },
];

export const sportStories: PromoItem[] = [
  {
    id: "football-desk",
    slug: "football",
    badge: "Sports",
    title: "Football",
    description: "1win sportsbook: Premier League, La Liga, Serie A, Champions League, and more football markets.",
    href: entries.sport("football"),
    destination: "sports",
    cta: "Open on 1win",
    cover: {
      src: sportCoverSrc("football"),
      alt: "Abstract football pitch under cool floodlights",
      motif: "pitch",
      seed: "football",
      width: 800,
      height: 500,
    },
  },
  {
    id: "basketball-desk",
    slug: "basketball",
    badge: "Sports",
    title: "Basketball",
    description: "1win sportsbook: NBA, EuroLeague, and other basketball leagues with prematch and live odds.",
    href: entries.sport("basketball"),
    destination: "sports",
    cta: "Open on 1win",
    cover: {
      src: sportCoverSrc("basketball"),
      alt: "Abstract basketball court with a blue arc",
      motif: "night",
      seed: "basketball",
      width: 800,
      height: 500,
    },
  },
  {
    id: "tennis-desk",
    slug: "tennis",
    badge: "Sports",
    title: "Tennis",
    description: "1win sportsbook: ATP, WTA, Australian Open, Roland Garros, Wimbledon, and US Open.",
    href: entries.sport("tennis"),
    destination: "sports",
    cta: "Open on 1win",
    cover: {
      src: sportCoverSrc("tennis"),
      alt: "Abstract tennis court geometry",
      motif: "grid",
      seed: "tennis",
      width: 800,
      height: 500,
    },
  },
  {
    id: "cricket-desk",
    slug: "cricket",
    badge: "Sports",
    title: "Cricket",
    description: "1win sportsbook: IPL, Big Bash League, ICC World Cup, and other cricket markets.",
    href: entries.sport("cricket"),
    destination: "sports",
    cta: "Open on 1win",
    cover: {
      src: sportCoverSrc("cricket"),
      alt: "Abstract cricket ground with a gold crease line",
      motif: "arena",
      seed: "cricket",
      width: 800,
      height: 500,
    },
  },
  {
    id: "hockey-desk",
    slug: "hockey",
    badge: "Sports",
    title: "Hockey",
    description: "1win sportsbook: NHL, KHL, and other hockey leagues with live and prematch markets.",
    href: entries.sport("hockey"),
    destination: "sports",
    cta: "Open on 1win",
    cover: {
      src: sportCoverSrc("hockey"),
      alt: "Abstract ice hockey rink under blue lights",
      motif: "night",
      seed: "hockey",
      width: 800,
      height: 500,
    },
  },
  {
    id: "mma-desk",
    slug: "mma",
    badge: "Sports",
    title: "MMA",
    description: "1win sportsbook: UFC, Bellator, PFL, and other MMA cards.",
    href: entries.sport("mma"),
    destination: "sports",
    cta: "Open on 1win",
    cover: {
      src: sportCoverSrc("mma"),
      alt: "Abstract MMA cage under cool floodlights",
      motif: "arena",
      seed: "mma",
      width: 800,
      height: 500,
    },
  },
  {
    id: "esports-desk",
    slug: "esports",
    badge: "Sports",
    title: "eSports",
    description: "1win eSports: Counter-Strike 2, Dota 2, League of Legends, Valorant, and more.",
    href: entries.sport("esports"),
    destination: "sports",
    cta: "Open on 1win",
    cover: {
      src: sportCoverSrc("esports"),
      alt: "Abstract esports stage with electric grid lines",
      motif: "grid",
      seed: "esports",
      width: 800,
      height: 500,
    },
  },
  {
    id: "live-desk",
    slug: "live",
    badge: "Sports",
    title: "Live",
    description: "1win Live betting: in-play markets after kickoff, tip-off, or first ball.",
    href: entries.sport("live"),
    destination: "sports",
    cta: "Open on 1win",
    cover: {
      src: sportCoverSrc("live"),
      alt: "Abstract live betting board with a pulse mark",
      motif: "live",
      seed: "live-sport",
      width: 800,
      height: 500,
    },
  },
];

const SPORT_LEAGUES: Record<string, { title: string; description: string }> = {
  football: {
    title: "Popular leagues",
    description: "Premier League, La Liga, Serie A, and Champions League.",
  },
  basketball: {
    title: "Popular leagues",
    description: "NBA, EuroLeague, and other basketball leagues.",
  },
  tennis: {
    title: "Popular tours",
    description: "ATP, WTA, and Grand Slam markets.",
  },
  cricket: {
    title: "Popular leagues",
    description: "IPL, Big Bash League, and ICC competitions.",
  },
  hockey: {
    title: "Popular leagues",
    description: "NHL, KHL, and other hockey leagues.",
  },
  mma: {
    title: "Popular promotions",
    description: "UFC, Bellator, PFL, and other MMA cards.",
  },
  esports: {
    title: "Popular titles",
    description: "Counter-Strike 2, Dota 2, League of Legends, and Valorant.",
  },
  live: {
    title: "Popular sports",
    description: "Football, basketball, tennis, cricket, and more in-play.",
  },
};

function makeSportMarket(
  sportId: string,
  sportLabel: string,
  marketId: string,
  badge: string,
  title: string,
  description: string,
  motif: CoverMotif
): PromoItem {
  const slug = `${sportId}-${marketId}`;

  return {
    id: slug,
    slug,
    badge,
    title,
    description,
    href: entries.sport(sportId),
    destination: "sports",
    cta: "Open on 1win",
    cover: {
      src: sportCoverSrc(slug),
      alt: `${title} — ${sportLabel}`,
      motif,
      seed: slug,
      width: 800,
      height: 500,
    },
  };
}

export function getSportMarketCards(sportId: string): PromoItem[] {
  const sport = sportCategories.find((item) => item.id === sportId);

  if (!sport || sport.id === "all") {
    return [];
  }

  const label = sport.label;
  const leagues = SPORT_LEAGUES[sport.id] ?? {
    title: "Popular leagues",
    description: `${label} leagues and competitions on 1win.`,
  };

  return [
    makeSportMarket(
      sport.id,
      label,
      "featured",
      "Featured",
      "Featured matches",
      `Top ${label} fixtures on the 1win sportsbook.`,
      "arena"
    ),
    makeSportMarket(
      sport.id,
      label,
      "live",
      "Live",
      "Live",
      `In-play ${label} markets after the event starts.`,
      "live"
    ),
    makeSportMarket(
      sport.id,
      label,
      "upcoming",
      "Upcoming",
      "Upcoming",
      `Next ${label} events, prematch markets, and start times.`,
      "grid"
    ),
    makeSportMarket(
      sport.id,
      label,
      "leagues",
      "Leagues",
      leagues.title,
      leagues.description,
      "pitch"
    ),
    makeSportMarket(
      sport.id,
      label,
      "outrights",
      "Outrights",
      "Outrights",
      `Winner, champion, and tournament markets for ${label}.`,
      "night"
    ),
    makeSportMarket(
      sport.id,
      label,
      "today",
      "Today",
      "Today's markets",
      `Today's ${label} card — live and prematch on 1win.`,
      "editorial"
    ),
  ];
}

export const casinoItems: GameItem[] = [
  makeGame("fortune-tiger", "Fortune Tiger", "Slots", "PG Soft", "slots", "popular", "reels", {
    badge: "Hot",
    rating: 4.6,
  }),
  makeGame("gates-of-olympus", "Gates of Olympus", "Slots", "Pragmatic Play", "slots", "popular", "reels", {
    rating: 4.7,
  }),
  makeGame("sweet-bonanza", "Sweet Bonanza", "Slots", "Pragmatic Play", "slots", "featured", "reels", {
    badge: "Hot",
    rating: 4.7,
  }),
  makeGame("1win-billion-bonanza", "1win Billion Bonanza", "Slots", "BGaming", "slots", "featured", "reels", {
    rating: 4.5,
  }),
  makeGame("lady-wolf-moon", "Lady Wolf Moon", "Slots", "BGaming", "slots", "new", "night", {
    badge: "New",
    rating: 4.4,
  }),
  makeGame("majestic-claws", "Majestic Claws", "Slots", "Spinomenal", "slots", "new", "reels", {
    badge: "New",
    rating: 4.3,
  }),
  makeGame("book-of-merlin", "Book of Merlin", "Slots", "1X2gaming", "slots", "popular", "reels", {
    rating: 4.2,
  }),
  makeGame("coin-volcano", "Coin Volcano", "Slots", "BGaming", "slots", "popular", "reels", {
    rating: 4.1,
  }),
  makeGame("the-dog-house-megaways", "The Dog House Megaways", "Slots", "Pragmatic Play", "slots", "featured", "reels", {
    rating: 4.5,
  }),
  makeGame("big-bass-bonanza", "Big Bass Bonanza", "Slots", "Pragmatic Play", "slots", "popular", "reels", {
    rating: 4.4,
  }),
  makeGame("crazy-time", "Crazy Time", "Live Games", "Evolution", "live", "featured", "live", {
    badge: "Live",
    rating: 4.8,
  }),
  makeGame("lightning-roulette", "Lightning Roulette", "Live Games", "Evolution", "live", "popular", "live", {
    badge: "Live",
    rating: 4.6,
  }),
  makeGame("lightning-blackjack", "Lightning Blackjack", "Live Games", "Evolution", "live", "featured", "cards", {
    rating: 4.5,
  }),
  makeGame("monopoly-live", "Monopoly Live", "Live Games", "Evolution", "live", "popular", "live", {
    badge: "Live",
    rating: 4.4,
  }),
  makeGame("dream-catcher", "Dream Catcher", "Live Games", "Evolution", "live", "new", "live", {
    badge: "New",
    rating: 4.3,
  }),
  makeGame("teen-patti", "Teen Patti", "Live Games", "Evolution", "live", "popular", "cards", {
    badge: "Live",
    rating: 4.2,
  }),
  makeGame("andar-bahar", "Andar Bahar", "Live Games", "Pragmatic Play", "live", "new", "cards", {
    badge: "Live",
    rating: 4.1,
  }),
  makeGame("european-roulette", "European Roulette", "Table games", "Evolution", "tables", "popular", "cards", {
    rating: 4.4,
  }),
  makeGame("american-roulette", "American Roulette", "Table games", "Evolution", "tables", "popular", "cards", {
    rating: 4.1,
  }),
  makeGame("blackjack", "Blackjack", "Table games", "Evolution", "tables", "featured", "cards", {
    badge: "Editor's Choice",
    rating: 4.8,
  }),
  makeGame("baccarat", "Baccarat", "Table games", "Evolution", "tables", "featured", "cards", {
    rating: 4.5,
  }),
  makeGame("texas-holdem", "Texas Hold'em", "Table games", "Evolution", "tables", "popular", "cards", {
    rating: 4.3,
  }),
  makeGame("caribbean-poker", "Caribbean Poker", "Table games", "Evolution", "tables", "new", "cards", {
    badge: "New",
    rating: 4.2,
  }),
  makeGame("roulette-x", "Roulette X", "Table games", "1win", "tables", "new", "grid", {
    rating: 4.0,
  }),
];

export const gameItems: GameItem[] = [
  makeGame("aviator", "Aviator", "Quick Games", "Spribe", "games", "fast", "night", {
    badge: "Hot",
    rating: 4.8,
  }),
  makeGame("lucky-jet", "Lucky Jet", "Quick Games", "SmartSoft", "games", "fast", "night", {
    badge: "Hot",
    rating: 4.7,
  }),
  makeGame("jetx", "JetX", "Quick Games", "SmartSoft", "games", "fast", "grid", {
    rating: 4.6,
  }),
  makeGame("plinko", "Plinko", "Quick Games", "Spribe", "games", "fast", "grid", {
    rating: 4.5,
  }),
  makeGame("mines", "Mines", "Quick Games", "1win", "games", "fast", "grid", {
    rating: 4.4,
  }),
  makeGame("rocket-queen", "Rocket Queen", "Quick Games", "1win", "games", "fast", "night", {
    badge: "New",
    rating: 4.4,
  }),
  makeGame("crash", "Crash", "Quick Games", "1win", "games", "fast", "night", {
    rating: 4.3,
  }),
  makeGame("balloon", "Balloon", "Quick Games", "SmartSoft", "games", "fast", "reels", {
    rating: 4.2,
  }),
  makeGame("aviatrix", "Aviatrix", "Quick Games", "Aviatrix", "games", "featured", "night", {
    rating: 4.5,
  }),
  makeGame("space-xy", "Space XY", "Quick Games", "BGaming", "games", "featured", "grid", {
    badge: "Editor's Choice",
    rating: 4.6,
  }),
  makeGame("rocketman", "Rocketman", "Quick Games", "SmartSoft", "games", "popular", "night", {
    rating: 4.3,
  }),
  makeGame("rocket-x", "Rocket X", "Quick Games", "SmartSoft", "games", "popular", "grid", {
    rating: 4.2,
  }),
  makeGame("pilot", "Pilot", "Quick Games", "SmartSoft", "games", "popular", "night", {
    rating: 4.1,
  }),
  makeGame("zeppelin", "Zeppelin", "Quick Games", "SmartSoft", "games", "featured", "night", {
    rating: 4.2,
  }),
  makeGame("spaceman", "Spaceman", "Quick Games", "Pragmatic Play", "games", "new", "night", {
    badge: "New",
    rating: 4.4,
  }),
  makeGame("chicken-road", "Chicken Road", "Quick Games", "InOut", "games", "new", "pitch", {
    badge: "New",
    rating: 4.3,
  }),
  makeGame("speed-and-cash", "Speed & Cash", "Quick Games", "1win", "games", "popular", "live", {
    rating: 4.2,
  }),
  makeGame("thimbles", "Thimbles", "Quick Games", "SmartSoft", "games", "fast", "cards", {
    rating: 4.1,
  }),
];

export const reviewItems: ReviewItem[] = [
  {
    id: "sportsbook-desk",
    slug: "sportsbook-desk",
    title: "Sportsbook desk: speed vs. depth",
    excerpt: "How the live board is organized, where markets hide, and whether the mobile layout keeps up after kickoff.",
    href: entries.review("sportsbook-desk"),
    score: 8.4,
    category: "Sports",
    pros: ["Fast live board", "Clear market labels"],
    cons: ["Dense on small screens"],
    cover: {
      src: CARD_JPG.sports,
      alt: "Sportsbook review cover",
      motif: "arena",
      seed: "review-sports",
      width: 960,
      height: 540,
    },
  },
  {
    id: "live-tables",
    slug: "live-tables",
    title: "Live tables after midnight",
    excerpt: "Dealer pacing, table limits, and whether the lobby actually helps you find a seat instead of a banner.",
    href: entries.review("live-tables"),
    score: 8.1,
    category: "Casino",
    pros: ["Readable lobbies", "Stable streams"],
    cons: ["Limited high-limit notes"],
    cover: {
      src: CARD_JPG.casinoCard,
      alt: "Live casino review cover",
      motif: "live",
      seed: "review-live",
      width: 960,
      height: 540,
    },
  },
  {
    id: "slots-catalog",
    slug: "slots-catalog",
    title: "Slots catalog: signal over sparkle",
    excerpt: "We scored the library on filter quality, provider mix, and how quickly you can get back to a game you liked.",
    href: entries.review("slots-catalog"),
    score: 7.9,
    category: "Games",
    pros: ["Strong provider mix", "Useful filters"],
    cons: ["Uneven thumbnails"],
    cover: {
      src: CARD_JPG.images,
      alt: "Slots catalog review cover",
      motif: "reels",
      seed: "review-slots",
      width: 960,
      height: 540,
    },
  },
];

export const guideItems: ArticleItem[] = [
  {
    id: "reading-a-match-card",
    slug: "reading-a-match-card",
    title: "How to read a match card in two minutes",
    excerpt: "A compact checklist for form, rest, and market movement before you open a fixture.",
    href: entries.guide("reading-a-match-card"),
    category: "Sports",
    readTime: "6 min",
    cover: {
      src: CARD_JPG.sports,
      alt: "Match card guide cover",
      motif: "editorial",
      seed: "guide-match",
      width: 960,
      height: 540,
    },
  },
  {
    id: "live-casino-pacing",
    slug: "live-casino-pacing",
    title: "Live casino pacing without the rush",
    excerpt: "What to watch between hands, and how table speed changes your decisions.",
    href: entries.guide("live-casino-pacing"),
    category: "Casino",
    readTime: "5 min",
    cover: {
      src: CARD_JPG.casinoCard,
      alt: "Live casino pacing guide cover",
      motif: "live",
      seed: "guide-live",
      width: 960,
      height: 540,
    },
  },
  {
    id: "session-limits",
    slug: "session-limits",
    title: "Set a session limit you will actually keep",
    excerpt: "Practical rules for time and spend, written for people who already know they should.",
    href: entries.guide("session-limits"),
    category: "Play well",
    readTime: "4 min",
    cover: {
      src: CARD_JPG.moneywinCover,
      alt: "Session limits guide cover",
      motif: "grid",
      seed: "guide-limits",
      width: 960,
      height: 540,
    },
  },
  {
    id: "new-player-map",
    slug: "new-player-map",
    title: "A new-player map of sports, casino, and games",
    excerpt: "Where to start if you want coverage first and an account later.",
    href: entries.guide("new-player-map"),
    category: "Getting started",
    readTime: "8 min",
    cover: {
      src: CARD_JPG.moneywinCover,
      alt: "New player map guide cover",
      motif: "arena",
      seed: "guide-map",
      width: 1200,
      height: 900,
    },
  },
];

export const blogItems: ArticleItem[] = [
  {
    id: "weekend-slate",
    slug: "weekend-slate",
    title: "The weekend slate, without the shout",
    excerpt: "Four fixtures, one live table trend, and the games people actually reopened.",
    href: entries.post("weekend-slate"),
    category: "Roundup",
    readTime: "7 min",
    cover: {
      src: CARD_JPG.sportsCover,
      alt: "Abstract weekend slate editorial cover",
      motif: "editorial",
      seed: "blog-slate",
      width: 960,
      height: 540,
    },
  },
  {
    id: "blue-hour-markets",
    slug: "blue-hour-markets",
    title: "Blue-hour markets: why late lines feel louder",
    excerpt: "A look at liquidity, public money, and why the last hour before a match feels different.",
    href: entries.post("blue-hour-markets"),
    category: "Analysis",
    readTime: "9 min",
    cover: {
      src: CARD_JPG.extra,
      alt: "Abstract market movement editorial cover",
      motif: "night",
      seed: "blog-markets",
      width: 960,
      height: 540,
    },
  },
  {
    id: "catalog-notes",
    slug: "catalog-notes",
    title: "Catalog notes from a week in the lobby",
    excerpt: "New titles, retired thumbnails, and the filters we wish every casino used.",
    href: entries.post("catalog-notes"),
    category: "Lobby",
    readTime: "5 min",
    cover: {
      src: CARD_JPG.images6,
      alt: "Abstract lobby catalog editorial cover",
      motif: "reels",
      seed: "blog-lobby",
      width: 960,
      height: 540,
    },
  },
];
