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
  { id: "hockey", label: "Ice hockey" },
  { id: "mma", label: "MMA" },
  { id: "esports", label: "Esports" },
  { id: "live", label: "Live" },
] as const;

export const casinoCategories = [
  { id: "all", label: "Casino" },
  { id: "slots", label: "Slots" },
  { id: "live", label: "Live casino" },
  { id: "tables", label: "Table games" },
] as const;

export const gameFilters = [
  { id: "popular", label: "Popular" },
  { id: "new", label: "New" },
  { id: "featured", label: "Featured" },
  { id: "fast", label: "Fast games" },
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
  "Live casino": [CARD_JPG.casinoCover, CARD_JPG.casinoCard, CARD_JPG.images6],
  "Table games": [CARD_JPG.casinoCard, CARD_JPG.extra, CARD_JPG.images6],
  Crash: [CARD_JPG.moneywin, CARD_JPG.moneywinCover, CARD_JPG.images],
  Instant: [CARD_JPG.moneywin, CARD_JPG.images, CARD_JPG.extra, CARD_JPG.images6],
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
  const pool = GAME_COVERS[category] ?? GAME_COVERS.Instant;
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
    badge: "Football",
    title: "League night briefing",
    description: "Form, schedule density, and market shape for the weekend's headline clubs.",
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
    badge: "Basketball",
    title: "Pace and total watch",
    description: "Tempo, rest days, and travel — the numbers that actually move a total.",
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
    badge: "Tennis",
    title: "Surface switcher",
    description: "Who benefits when the tour changes speed, and how to read hold patterns.",
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
    badge: "Cricket",
    title: "Powerplay window",
    description: "Toss, pitch report, and death-over rates distilled into a readable match card.",
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
    badge: "Ice hockey",
    title: "Period pace board",
    description: "Rest, travel, and special-teams shape for the night's ice slate.",
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
    badge: "MMA",
    title: "Card closer notes",
    description: "Reach, pace, and finish rates without the weigh-in noise.",
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
    badge: "Esports",
    title: "Map veto watch",
    description: "Form on the current patch and why a veto can move a series.",
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
    badge: "Live",
    title: "In-play board",
    description: "Live markets that stay readable after kickoff, tip, or first pitch.",
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

export const casinoItems: GameItem[] = [
  makeGame("neon-hold", "Neon Hold", "Slots", "Northline", "slots", "popular", "reels", {
    badge: "Hot",
    rating: 4.6,
  }),
  makeGame("midnight-run", "Midnight Run", "Slots", "Northline", "slots", "new", "night", {
    badge: "New",
    rating: 4.5,
  }),
  makeGame("aurora-spins", "Aurora Spins", "Slots", "Polar Deck", "slots", "new", "reels", {
    badge: "New",
    rating: 4.4,
  }),
  makeGame("city-lights", "City Lights", "Slots", "Polar Deck", "slots", "popular", "night", {
    rating: 4.0,
  }),
  makeGame("volt-reels", "Volt Reels", "Slots", "Northline", "slots", "popular", "reels", {
    rating: 4.3,
  }),
  makeGame("ember-crown", "Ember Crown", "Slots", "Velvet Rail", "slots", "featured", "reels", {
    badge: "Hot",
    rating: 4.7,
  }),
  makeGame("polar-wilds", "Polar Wilds", "Slots", "Polar Deck", "slots", "new", "night", {
    rating: 4.2,
  }),
  makeGame("quartz-line", "Quartz Line", "Slots", "Northline", "slots", "popular", "grid", {
    rating: 4.1,
  }),
  makeGame("dusk-fortunes", "Dusk Fortunes", "Slots", "Polar Deck", "slots", "featured", "night", {
    rating: 4.5,
  }),
  makeGame("steel-orchard", "Steel Orchard", "Slots", "Oak & Spade", "slots", "popular", "reels", {
    rating: 4.0,
  }),
  makeGame("live-orbit", "Live Orbit", "Live casino", "Studio Arc", "live", "featured", "live", {
    badge: "Live",
    rating: 4.7,
  }),
  makeGame("signal-room", "Signal Room", "Live casino", "Studio Arc", "live", "popular", "live", {
    rating: 4.3,
  }),
  makeGame("studio-hold", "Studio Hold", "Live casino", "Studio Arc", "live", "popular", "live", {
    badge: "Live",
    rating: 4.4,
  }),
  makeGame("night-wheel", "Night Wheel", "Live casino", "Velvet Rail", "live", "new", "live", {
    badge: "New",
    rating: 4.5,
  }),
  makeGame("dealer-north", "Dealer North", "Live casino", "Studio Arc", "live", "featured", "cards", {
    rating: 4.6,
  }),
  makeGame("gold-pit", "Gold Pit", "Live casino", "Velvet Rail", "live", "popular", "live", {
    rating: 4.2,
  }),
  makeGame("river-broadcast", "River Broadcast", "Live casino", "Oak & Spade", "live", "new", "live", {
    badge: "Live",
    rating: 4.1,
  }),
  makeGame("river-ace", "River Ace", "Table games", "Oak & Spade", "tables", "popular", "cards", {
    rating: 4.4,
  }),
  makeGame("crown-lane", "Crown Lane", "Table games", "Velvet Rail", "tables", "featured", "cards", {
    badge: "Editor's Choice",
    rating: 4.8,
  }),
  makeGame("deep-stack", "Deep Stack", "Table games", "Oak & Spade", "tables", "featured", "cards", {
    rating: 4.6,
  }),
  makeGame("velvet-rail", "Velvet Rail", "Table games", "Velvet Rail", "tables", "popular", "cards", {
    rating: 4.3,
  }),
  makeGame("oak-draw", "Oak Draw", "Table games", "Oak & Spade", "tables", "new", "cards", {
    badge: "New",
    rating: 4.2,
  }),
  makeGame("midnight-hold", "Midnight Hold", "Table games", "Studio Arc", "tables", "popular", "night", {
    rating: 4.1,
  }),
  makeGame("lattice-spin", "Lattice Spin", "Table games", "Polar Deck", "tables", "new", "grid", {
    rating: 4.0,
  }),
];

export const gameItems: GameItem[] = [
  makeGame("skyline-rise", "Skyline Rise", "Crash", "Pulseworks", "games", "fast", "night", {
    badge: "Hot",
    rating: 4.7,
  }),
  makeGame("jet-pulse", "Jet Pulse", "Crash", "Pulseworks", "games", "fast", "grid", {
    rating: 4.5,
  }),
  makeGame("lucky-drift", "Lucky Drift", "Crash", "Northline", "games", "fast", "night", {
    rating: 4.4,
  }),
  makeGame("mine-field", "Mine Field", "Instant", "Pulseworks", "games", "fast", "grid", {
    rating: 4.3,
  }),
  makeGame("drop-line", "Drop Line", "Instant", "Polar Deck", "games", "fast", "grid", {
    rating: 4.6,
  }),
  makeGame("coin-snap", "Coin Snap", "Instant", "Pulseworks", "games", "fast", "cards", {
    rating: 4.1,
  }),
  makeGame("grid-rush", "Grid Rush", "Instant", "Pulseworks", "games", "fast", "grid", {
    rating: 4.2,
  }),
  makeGame("fast-break", "Fast Break", "Instant", "Pulseworks", "games", "fast", "pitch", {
    rating: 4.1,
  }),
  makeGame("rocket-fold", "Rocket Fold", "Crash", "Studio Arc", "games", "fast", "night", {
    badge: "New",
    rating: 4.4,
  }),
  makeGame("arcade-hold", "Arcade Hold", "Instant", "Velvet Rail", "games", "featured", "grid", {
    badge: "Editor's Choice",
    rating: 4.8,
  }),
  makeGame("pulse-lane", "Pulse Lane", "Instant", "Pulseworks", "games", "popular", "pitch", {
    rating: 4.3,
  }),
  makeGame("night-circuit", "Night Circuit", "Instant", "Northline", "games", "popular", "night", {
    rating: 4.2,
  }),
  makeGame("vault-run", "Vault Run", "Instant", "Oak & Spade", "games", "popular", "cards", {
    rating: 4.0,
  }),
  makeGame("baseline", "Baseline", "Instant", "Pulseworks", "games", "featured", "grid", {
    rating: 4.2,
  }),
  makeGame("analog-spark", "Analog Spark", "Instant", "Polar Deck", "games", "new", "reels", {
    badge: "New",
    rating: 4.4,
  }),
  makeGame("frost-tap", "Frost Tap", "Instant", "Polar Deck", "games", "new", "night", {
    badge: "New",
    rating: 4.3,
  }),
  makeGame("signal-dash", "Signal Dash", "Crash", "Studio Arc", "games", "featured", "live", {
    rating: 4.5,
  }),
  makeGame("ember-tap", "Ember Tap", "Instant", "Velvet Rail", "games", "popular", "reels", {
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
