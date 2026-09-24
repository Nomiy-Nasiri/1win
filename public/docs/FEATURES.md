# WinMoney — Features

## Navigation

- Desktop header links: Home, Casino, Games, Sports.
- Full nav also includes Reviews, Guides, and Blog.
- Mobile dock shows Home, Sports, Casino, and Games.
- Active state matches the current path, including nested routes.
- Category groups in the menu jump to filtered sports, casino, and games views.

## Home lobby

- Hero for the main lobby.
- Horizontal game rows: 1win games, all games, popular, and live casino.
- Each row links through to the matching listing.
- Footer copy covers disclaimer, responsible play, and privacy.

## Sports

- Listing of sport stories.
- Filters: all, football, basketball, tennis, cricket, eSports.
- Each story can point at a category path.

## Casino

- Listing of casino games from the catalog.
- Filters: all, slots, live games, table games.
- Cards carry category, provider, cover, optional badge, and rating.

## Games

- Combined playable catalog (casino items plus standalone games).
- Filters: all, popular, new, featured, quick.
- Cards link out through the affiliate destination for that game.

## Reviews, guides, and blog

- Reviews show a score, category, excerpt, pros, and cons.
- Guides and blog posts show category, excerpt, read time, and cover.
- List items currently jump to an in-page hash (`#slug`).

## Search

- Site search looks across the catalog so visitors can jump to a matching item.

## Affiliate links

- Links are built from `NEXT_PUBLIC_AFFILIATE_URL`.
- Destinations: home, sports, casino, slots, live, tables, games.
- Anchors use `rel="noopener noreferrer nofollow sponsored"`, `target="_blank"`, and `data-affiliate="true"`.

## Visual system

- Dark layout.
- Shared cards, badges, buttons, dialogs, sheets, tabs, and tooltips.
- Cover art uses a motif (arena, pitch, night, cards, reels, live, editorial, grid) when no image source is set.
