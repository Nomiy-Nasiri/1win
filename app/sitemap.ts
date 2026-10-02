import type { MetadataRoute } from "next";

import { blogItems, guideItems, reviewItems } from "@/lib/content";
import { paths } from "@/lib/routes";
import { SITE_URL } from "@/lib/site";

function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const listings = [
    paths.home,
    paths.sports,
    paths.casino,
    paths.games,
    paths.reviews,
    paths.guides,
    paths.blog,
    paths.about,
  ];

  const articles = [...blogItems, ...guideItems, ...reviewItems].map(
    (item) => item.href
  );

  return [...listings, ...articles].map((path) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
  }));
}
