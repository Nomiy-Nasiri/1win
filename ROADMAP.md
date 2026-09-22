# WinMoney — Roadmap

Near-term work stays inside the current static site: finish detail pages, then tighten content and affiliate setup. A backend is out of scope until the listings need editorial workflow beyond `lib/content.ts`.

## Now

- Add detail routes for games, sports, reviews, guides, and posts using the helpers already in `lib/routes.ts`.
- Point listing cards at those routes once each template exists.
- Set `NEXT_PUBLIC_AFFILIATE_URL` for any environment that should leave the site.

## Next

- Fill real cover images where motif art is only a placeholder.
- Expand sports, casino, review, guide, and blog entries in `lib/content.ts`.
- Keep search results in sync when new item types are added.

## Later

- Add tests around path helpers, casino and game filters, and affiliate URL joining.
- Decide whether an age interstitial is required beyond the 18+ responsible-play copy.
- Revisit a CMS or database only if editors need to publish without a code change.
