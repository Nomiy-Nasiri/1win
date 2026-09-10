export const paths = {
  home: "/",
  sports: "/sports",
  casino: "/casino",
  games: "/games",
  reviews: "/reviews",
  guides: "/guides",
  blog: "/blog",
} as const;

export type ListPath = (typeof paths)[keyof typeof paths];

export function withQuery(
  path: string,
  query: Record<string, string | undefined>
) {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(query)) {
    if (value) {
      params.set(key, value);
    }
  }

  const search = params.toString();
  return search ? `${path}?${search}` : path;
}

export function sportsPath(category?: string) {
  if (!category || category === "all") {
    return paths.sports;
  }

  return withQuery(paths.sports, { category });
}

export function casinoPath(category?: string) {
  if (!category || category === "all") {
    return paths.casino;
  }

  return withQuery(paths.casino, { category });
}

export function gamesPath(filter?: string) {
  if (!filter || filter === "all") {
    return paths.games;
  }

  return withQuery(paths.games, { filter });
}

export const entries = {
  game: (slug: string) => `${paths.games}#${slug}`,
  sport: (slug: string) => sportsPath(slug),
  review: (slug: string) => `${paths.reviews}#${slug}`,
  guide: (slug: string) => `${paths.guides}#${slug}`,
  post: (slug: string) => `${paths.blog}#${slug}`,
  details: {
    game: (slug: string) => `${paths.games}/${slug}`,
    sport: (slug: string) => `${paths.sports}/${slug}`,
    review: (slug: string) => `${paths.reviews}/${slug}`,
    guide: (slug: string) => `${paths.guides}/${slug}`,
    post: (slug: string) => `${paths.blog}/${slug}`,
  },
};

export function firstSearchParam(
  value: string | string[] | undefined
): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}
