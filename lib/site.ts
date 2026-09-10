import { paths } from "@/lib/routes";

export const SITE_NAME = "WinMoney";

export const SITE_TAGLINE = "Independent coverage of sports, casino, and games";

export const NAV_ITEMS = [
  { href: paths.home, label: "Home", inDock: true },
  { href: paths.sports, label: "Sports", inDock: true },
  { href: paths.casino, label: "Casino", inDock: true },
  { href: paths.games, label: "Games", inDock: true },
  { href: paths.reviews, label: "Reviews", inDock: false },
  { href: paths.guides, label: "Guides", inDock: false },
  { href: paths.blog, label: "Blog", inDock: false },
] as const;

export type NavItem = (typeof NAV_ITEMS)[number];

export const DOCK_ITEMS = NAV_ITEMS.filter((item) => item.inDock);

export const LEGAL_LINKS = [
  { href: "/#disclaimer", label: "Disclaimer" },
  { href: "/#responsible-play", label: "Responsible play" },
  { href: "/#privacy", label: "Privacy" },
] as const;

export const CATEGORY_GROUPS = [
  {
    title: "Sports",
    items: [
      { href: paths.sports, label: "Sports" },
      { href: `${paths.sports}?category=football`, label: "Football" },
      { href: `${paths.sports}?category=basketball`, label: "Basketball" },
      { href: `${paths.sports}?category=tennis`, label: "Tennis" },
      { href: `${paths.sports}?category=cricket`, label: "Cricket" },
      { href: `${paths.sports}?category=esports`, label: "Esports" },
    ],
  },
  {
    title: "Casino",
    items: [
      { href: paths.casino, label: "Casino" },
      { href: `${paths.casino}?category=slots`, label: "Slots" },
      { href: `${paths.casino}?category=live`, label: "Live casino" },
      { href: `${paths.casino}?category=tables`, label: "Table games" },
    ],
  },
  {
    title: "Games",
    items: [
      { href: paths.games, label: "Games" },
      { href: `${paths.games}?filter=popular`, label: "Popular" },
      { href: `${paths.games}?filter=fast`, label: "Fast games" },
      { href: `${paths.games}?filter=new`, label: "New" },
      { href: `${paths.games}?filter=featured`, label: "Featured" },
    ],
  },
] as const;
