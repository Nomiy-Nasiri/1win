import {
  blogItems,
  casinoItems,
  gameFilters,
  gameItems,
  guideItems,
  reviewItems,
  sportStories,
} from "@/lib/content";

export const listingGameFilters = [
  { id: "all", label: "All" },
  ...gameFilters,
] as const;

export const CASINO_CATEGORY_MAP = {
  slots: "Slots",
  live: "Live Games",
  tables: "Table games",
} as const;

export type CasinoCategoryId = keyof typeof CASINO_CATEGORY_MAP;

export function getCasinoGames() {
  return casinoItems;
}

export function getPlayableGames() {
  return [...casinoItems, ...gameItems];
}

export function getGameBySlug(slug: string) {
  return getPlayableGames().find((item) => item.slug === slug);
}

export function getSportBySlug(slug: string) {
  return sportStories.find((item) => item.slug === slug);
}

export function getReviewBySlug(slug: string) {
  return reviewItems.find((item) => item.slug === slug);
}

export function getGuideBySlug(slug: string) {
  return guideItems.find((item) => item.slug === slug);
}

export function getPostBySlug(slug: string) {
  return blogItems.find((item) => item.slug === slug);
}

export function filterCasinoGames(category?: string) {
  const games = getCasinoGames();

  if (!category || category === "all") {
    return games;
  }

  const label = CASINO_CATEGORY_MAP[category as CasinoCategoryId];
  if (!label) {
    return games;
  }

  return games.filter((item) => item.category === label);
}
