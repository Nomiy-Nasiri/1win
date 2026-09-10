import {
  blogItems,
  casinoItems,
  gameItems,
  guideItems,
  promoItems,
  reviewItems,
  sportStories,
} from "@/lib/content";
import { getAffiliateUrl } from "@/lib/affiliate";
import { NAV_ITEMS } from "@/lib/site";

export type SearchHit = {
  href: string;
  title: string;
  group: string;
  external?: boolean;
};

export function getSearchIndex(): SearchHit[] {
  const affiliateReady = Boolean(getAffiliateUrl());

  return [
    ...NAV_ITEMS.map((item) => ({
      href: item.href,
      title: item.label,
      group: "Pages",
    })),
    ...promoItems.map((item) => ({
      href: item.href,
      title: item.title,
      group: "Featured",
    })),
    ...sportStories.map((item) => ({
      href: getAffiliateUrl({ destination: item.destination }) ?? item.href,
      title: item.title,
      group: "Sports",
      external: affiliateReady,
    })),
    ...casinoItems.map((item) => ({
      href: getAffiliateUrl({ destination: item.destination }) ?? item.href,
      title: item.title,
      group: "Casino",
      external: affiliateReady,
    })),
    ...gameItems.map((item) => ({
      href: getAffiliateUrl({ destination: item.destination }) ?? item.href,
      title: item.title,
      group: "Games",
      external: affiliateReady,
    })),
    ...reviewItems.map((item) => ({
      href: item.href,
      title: item.title,
      group: "Reviews",
    })),
    ...guideItems.map((item) => ({
      href: item.href,
      title: item.title,
      group: "Guides",
    })),
    ...blogItems.map((item) => ({
      href: item.href,
      title: item.title,
      group: "Blog",
    })),
  ];
}

export function searchSite(query: string): SearchHit[] {
  const normalized = query.trim().toLowerCase();

  if (!normalized) {
    return getSearchIndex().filter((item) => item.group === "Pages");
  }

  return getSearchIndex().filter((item) => {
    return (
      item.title.toLowerCase().includes(normalized) ||
      item.group.toLowerCase().includes(normalized)
    );
  });
}
