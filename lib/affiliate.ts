export const AFFILIATE_URL = process.env.NEXT_PUBLIC_AFFILIATE_URL ?? "";

export const AFFILIATE_LINK_REL = "noopener noreferrer nofollow sponsored";

export type AffiliateDestination =
  | "home"
  | "sports"
  | "casino"
  | "slots"
  | "live"
  | "tables"
  | "games";

const DESTINATION_PATHS: Record<AffiliateDestination, string> = {
  home: "",
  sports: "/betting",
  casino: "/casino",
  slots: "/casino/slots",
  live: "/casino/live",
  tables: "/casino",
  games: "/casino",
};

type AffiliateOptions = {
  destination?: AffiliateDestination;
  path?: string;
};

function joinAffiliatePath(pathname: string, extraPath: string) {
  const basePath = pathname === "/" ? "" : pathname.replace(/\/$/, "");
  const suffix = extraPath.startsWith("/") ? extraPath : `/${extraPath}`;
  return `${basePath}${suffix}`;
}

export function getAffiliateUrl(options?: AffiliateOptions) {
  if (!AFFILIATE_URL) {
    return undefined;
  }

  const extraPath =
    options?.path ??
    (options?.destination ? DESTINATION_PATHS[options.destination] : "");

  if (!extraPath) {
    return AFFILIATE_URL;
  }

  try {
    const url = new URL(AFFILIATE_URL);
    url.pathname = joinAffiliatePath(url.pathname, extraPath);
    return url.toString();
  } catch {
    return AFFILIATE_URL;
  }
}

export function getAffiliateAnchorProps(options?: AffiliateOptions) {
  const href = getAffiliateUrl(options) ?? "#visit-1win";

  return {
    href,
    target: "_blank" as const,
    rel: AFFILIATE_LINK_REL,
    "data-affiliate": "true" as const,
  };
}
