import { getPlayableGames } from "@/lib/catalog";
import { casinoItems, gameItems, type GameItem } from "@/lib/content";

export type LobbyChip = {
  id: string;
  label: string;
};

export const LOBBY_CHIPS: readonly LobbyChip[] = [
  { id: "lobby", label: "Lobby" },
  { id: "twin", label: "1win games" },
  { id: "popular", label: "Popular" },
  { id: "fast", label: "Quick games" },
  { id: "live", label: "Live casino" },
  { id: "new", label: "New" },
  { id: "slots", label: "Slots" },
  { id: "tables", label: "Table games" },
] as const;

export const CASINO_SUBNAV: readonly LobbyChip[] = [
  { id: "lobby", label: "Lobby" },
  { id: "live", label: "Live Casino" },
  { id: "fast", label: "Quick games" },
] as const;

type GamePalette = {
  from: string;
  to: string;
  accent: string;
};

const PALETTES: Record<string, GamePalette> = {
  "lucky-jet": { from: "#7c3aed", to: "#2e1065", accent: "#c4b5fd" },
  "speed-and-cash": { from: "#4c1d95", to: "#1e1b4b", accent: "#818cf8" },
  "rocket-queen": { from: "#d946ef", to: "#6b21a8", accent: "#f5d0fe" },
  crash: { from: "#2563eb", to: "#1e3a8a", accent: "#93c5fd" },
  mines: { from: "#06b6d4", to: "#155e75", accent: "#a5f3fc" },
  aviator: { from: "#ef4444", to: "#7f1d1d", accent: "#fecaca" },
  aviatrix: { from: "#1d4ed8", to: "#1e3a8a", accent: "#bfdbfe" },
  "crazy-time": { from: "#f97316", to: "#9a3412", accent: "#fed7aa" },
  blackjack: { from: "#1d4ed8", to: "#1e3a8a", accent: "#93c5fd" },
  "coin-volcano": { from: "#dc2626", to: "#7f1d1d", accent: "#fecaca" },
  "fortune-tiger": { from: "#2563eb", to: "#1e3a8a", accent: "#bfdbfe" },
  "gates-of-olympus": { from: "#7c3aed", to: "#4c1d95", accent: "#ddd6fe" },
  "sweet-bonanza": { from: "#db2777", to: "#9d174d", accent: "#fbcfe8" },
  plinko: { from: "#0d9488", to: "#134e4a", accent: "#99f6e4" },
  jetx: { from: "#0284c7", to: "#0c4a6e", accent: "#bae6fd" },
  spaceman: { from: "#312e81", to: "#1e1b4b", accent: "#c7d2fe" },
  balloon: { from: "#f97316", to: "#9a3412", accent: "#fed7aa" },
  "chicken-road": { from: "#65a30d", to: "#3f6212", accent: "#d9f99d" },
  "lightning-roulette": { from: "#7c3aed", to: "#4c1d95", accent: "#ddd6fe" },
  "lightning-blackjack": { from: "#1e40af", to: "#172554", accent: "#bfdbfe" },
  "big-bass-bonanza": { from: "#0369a1", to: "#0c4a6e", accent: "#bae6fd" },
  "the-dog-house-megaways": { from: "#b45309", to: "#78350f", accent: "#fde68a" },
  "lady-wolf-moon": { from: "#4f46e5", to: "#312e81", accent: "#c7d2fe" },
  "majestic-claws": { from: "#b91c1c", to: "#7f1d1d", accent: "#fecaca" },
  "book-of-merlin": { from: "#a16207", to: "#713f12", accent: "#fde68a" },
  "1win-billion-bonanza": { from: "#ca8a04", to: "#854d0e", accent: "#fef08a" },
  "monopoly-live": { from: "#16a34a", to: "#14532d", accent: "#bbf7d0" },
  "dream-catcher": { from: "#db2777", to: "#9d174d", accent: "#fbcfe8" },
  "teen-patti": { from: "#b45309", to: "#78350f", accent: "#fde68a" },
  "andar-bahar": { from: "#0f766e", to: "#134e4a", accent: "#99f6e4" },
  "european-roulette": { from: "#15803d", to: "#14532d", accent: "#bbf7d0" },
  "american-roulette": { from: "#b91c1c", to: "#7f1d1d", accent: "#fecaca" },
  baccarat: { from: "#1d4ed8", to: "#1e3a8a", accent: "#bfdbfe" },
  "texas-holdem": { from: "#b45309", to: "#7c2d12", accent: "#fed7aa" },
  "caribbean-poker": { from: "#0f766e", to: "#164e63", accent: "#a5f3fc" },
  "roulette-x": { from: "#7c3aed", to: "#4c1d95", accent: "#ddd6fe" },
  rocketman: { from: "#ea580c", to: "#7c2d12", accent: "#fed7aa" },
  "rocket-x": { from: "#0284c7", to: "#1e3a8a", accent: "#bae6fd" },
  pilot: { from: "#0369a1", to: "#0f172a", accent: "#bae6fd" },
  zeppelin: { from: "#4f46e5", to: "#1e1b4b", accent: "#c7d2fe" },
  "space-xy": { from: "#4338ca", to: "#1e1b4b", accent: "#c7d2fe" },
  thimbles: { from: "#ca8a04", to: "#854d0e", accent: "#fef08a" },
};

function hashSeed(seed: string) {
  let hash = 2166136261;
  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

export function getGamePalette(slug: string): GamePalette {
  const mapped = PALETTES[slug];
  if (mapped) {
    return mapped;
  }

  const hue = hashSeed(slug) % 360;
  return {
    from: `hsl(${hue} 72% 42%)`,
    to: `hsl(${hue} 68% 16%)`,
    accent: `hsl(${hue} 80% 82%)`,
  };
}

export function mockPlayingCount(seed: string) {
  return 2 + (hashSeed(seed) % 1180);
}

function bySlug(items: GameItem[], slugs: readonly string[]) {
  const map = new Map(items.map((item) => [item.slug, item]));
  return slugs
    .map((slug) => map.get(slug))
    .filter((item): item is GameItem => Boolean(item));
}

function uniqueGames(items: GameItem[]) {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.slug)) {
      return false;
    }
    seen.add(item.slug);
    return true;
  });
}

const TWIN_SLUGS = [
  "lucky-jet",
  "speed-and-cash",
  "rocket-queen",
  "crash",
  "mines",
  "aviator",
  "plinko",
  "jetx",
  "blackjack",
] as const;

const ALL_GAMES_SLUGS = [
  "aviator",
  "fortune-tiger",
  "crazy-time",
  "aviatrix",
  "coin-volcano",
  "blackjack",
  "gates-of-olympus",
  "sweet-bonanza",
  "jetx",
  "plinko",
  "lightning-roulette",
  "spaceman",
] as const;

const POPULAR_SLUGS = [
  "fortune-tiger",
  "coin-volcano",
  "crazy-time",
  "sweet-bonanza",
  "gates-of-olympus",
  "big-bass-bonanza",
  "aviatrix",
  "lucky-jet",
  "mines",
] as const;

export function getTwinGameRow() {
  const pool = [...gameItems, ...casinoItems];
  return uniqueGames([
    ...bySlug(pool, TWIN_SLUGS),
    ...gameItems.filter((item) => item.category === "Quick Games"),
  ]);
}

export function getAllGamesRow() {
  const pool = getPlayableGames();
  return uniqueGames([...bySlug(pool, ALL_GAMES_SLUGS), ...pool]);
}

export function getPopularGameRow() {
  const pool = getPlayableGames();
  return uniqueGames([
    ...bySlug(pool, POPULAR_SLUGS),
    ...pool.filter((item) => item.filter === "popular"),
  ]);
}

export function getLiveGameRow() {
  return casinoItems.filter((item) => item.category === "Live Games");
}

export function getNewGameRow() {
  return getPlayableGames().filter((item) => item.filter === "new");
}

export function getSlotGameRow() {
  return casinoItems.filter((item) => item.category === "Slots");
}

export function getTableGameRow() {
  return casinoItems.filter((item) => item.category === "Table games");
}

export function getQuickGameRow() {
  return gameItems.filter(
    (item) => item.category === "Quick Games" || item.filter === "fast"
  );
}

export function getProviders() {
  return [...new Set(getPlayableGames().map((item) => item.provider))].sort();
}

export function filterLobbyGames(options: {
  chip?: string;
  query?: string;
  provider?: string;
}) {
  const chip = options.chip ?? "lobby";
  const query = options.query?.trim().toLowerCase() ?? "";
  const provider = options.provider ?? "";

  let items: GameItem[];

  switch (chip) {
    case "twin":
      items = getTwinGameRow();
      break;
    case "popular":
      items = getPopularGameRow();
      break;
    case "fast":
      items = getQuickGameRow();
      break;
    case "live":
      items = getLiveGameRow();
      break;
    case "new":
      items = getNewGameRow();
      break;
    case "slots":
      items = getSlotGameRow();
      break;
    case "tables":
      items = getTableGameRow();
      break;
    default:
      items = getPlayableGames();
  }

  if (provider) {
    items = items.filter((item) => item.provider === provider);
  }

  if (query) {
    items = items.filter((item) => {
      return (
        item.title.toLowerCase().includes(query) ||
        item.provider.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      );
    });
  }

  return uniqueGames(items);
}

export const JACKPOT_TOTAL = "$12,847,620";
