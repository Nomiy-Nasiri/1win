# WinMoney — Task Tracker

Status key: **Done** · **In progress** · **Next** · **Later**

## Site shell

| Task | Status | Notes |
| --- | --- | --- |
| Header with Home, Casino, Games, Sports | Done | `components/layout/site-header.tsx` |
| Mobile dock for Home, Sports, Casino, Games | Done | `components/layout/mobile-dock.tsx` |
| Footer and legal anchors | Done | Disclaimer, responsible play, privacy |
| Site search | Done | `components/layout/site-search.tsx` |
| Dark theme and fonts (Geist, Outfit) | Done | Set on the root layout |

## Content surfaces

| Task | Status | Notes |
| --- | --- | --- |
| Home lobby hero and game rows | Done | `app/page.tsx` |
| Sports listing and category filters | Done | `/sports?category=` |
| Casino listing and category filters | Done | `/casino?category=` |
| Games listing and filters | Done | `/games?filter=` |
| Reviews, guides, and blog listings | Done | Hash links into each list |
| Detail pages for a single game, sport, review, guide, or post | Next | Path helpers exist in `lib/routes.ts`; route files are not built yet |
| Replace placeholder covers with real media where needed | Later | Covers support `src` plus a motif fallback |

## Affiliate and compliance

| Task | Status | Notes |
| --- | --- | --- |
| Sponsored affiliate anchors (`nofollow`, new tab) | Done | `lib/affiliate.ts` |
| Destination paths for sports, casino, slots, live, tables, games | Done | Built from `NEXT_PUBLIC_AFFILIATE_URL` |
| Document the public env variable for deploy | Next | Set the URL before production |
| Age gate beyond the 18+ copy | Later | Copy is on the home page today |

## Quality

| Task | Status | Notes |
| --- | --- | --- |
| `npm run lint` | Done | Script is in `package.json` |
| `npm run build` | Done | Production build script |
| Automated tests for filters and affiliate URLs | Later | No test runner is configured yet |
