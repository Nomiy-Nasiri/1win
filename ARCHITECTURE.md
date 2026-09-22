# WinMoney — Architecture

The app is a Next.js App Router site. Pages read a static catalog. There is no database and no authenticated user area.

## Layout

```
app/                 Routes and global styles
components/layout/   Header, footer, shell, mobile dock, search
components/content/  Lobby, cards, collections, heroes
components/affiliate/ Affiliate link and button
components/ui/       shadcn primitives
components/media/    Images and cover art
lib/content.ts       Catalog data and content types
lib/catalog.ts       Lookups and casino filters
lib/lobby.ts         Home-row selectors
lib/routes.ts        Paths and query helpers
lib/affiliate.ts     Affiliate URL builder
lib/site.ts          Site name, nav, legal links, category groups
lib/search.ts        Search over the catalog
lib/nav.ts           Active-nav matching
```

## Request flow

1. A page in `app/` renders a collection or lobby component.
2. That component asks `lib/lobby.ts` or `lib/catalog.ts` for items.
3. Those modules read arrays in `lib/content.ts`.
4. Cards render covers and, when the item is a visit action, an affiliate anchor from `lib/affiliate.ts`.

## Routing

Public paths live in `lib/routes.ts`:

- Listings: `/`, `/sports`, `/casino`, `/games`, `/reviews`, `/guides`, `/blog`
- Filters: `?category=` on sports and casino, `?filter=` on games
- Planned detail paths: `/games/[slug]`, `/sports/[slug]`, `/reviews/[slug]`, `/guides/[slug]`, `/blog/[slug]`

Helpers `sportsPath`, `casinoPath`, and `gamesPath` drop the query when the filter is missing or `all`.

## Content model

Shared types in `lib/content.ts`:

- `PromoItem` — promos and sport stories
- `GameItem` — casino and game cards, with an affiliate destination
- `ReviewItem` — scored reviews
- `ArticleItem` — guides and blog posts
- `Cover` — optional image plus a motif used as fallback art

## Affiliate URL

`getAffiliateUrl` reads `NEXT_PUBLIC_AFFILIATE_URL`. A destination or extra path is appended to that base. If the env value is missing or invalid, callers use the fallback href `#visit-1win`.
