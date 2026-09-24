# WinMoney — Project Overview

WinMoney is an independent information site about sports, casino, and games. It covers those topics with listings, reviews, guides, and blog posts, and it sends visitors to 1win through marked affiliate links. It is not operated by, endorsed as official, or a brand clone of 1win.

## Audience

Adults (18+) looking for sports coverage, casino collections, game lists, and short editorial pieces before they decide whether to visit 1win.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Home lobby: hero plus rows for 1win games, all games, popular games, and live casino |
| `/sports` | Sports stories, filterable by football, basketball, tennis, cricket, and eSports |
| `/casino` | Casino games, filterable by slots, live games, and table games |
| `/games` | Playable games, filterable by popular, new, featured, and quick |
| `/reviews` | Scored reviews with pros and cons |
| `/guides` | How-to articles |
| `/blog` | Short editorial posts |

## Stack

- Next.js 16 (App Router) and React 19
- TypeScript
- Tailwind CSS 4 and shadcn/ui
- Static content in `lib/content.ts` (no database)

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Affiliate destinations read `NEXT_PUBLIC_AFFILIATE_URL`. When that variable is empty, affiliate controls fall back to an in-page anchor.

## Editorial rules

- Mark affiliate links in code and open them in a new tab.
- Keep the disclaimer, responsible-play note, and privacy note on the home page.
- Content is 18+ only. Do not encourage chasing losses.
