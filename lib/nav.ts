import type { NavItem } from "@/lib/site";

export function isNavItemActive(
  href: NavItem["href"] | string,
  pathname: string
) {
  const pathOnly = href.split("?")[0] ?? href;

  if (pathOnly === "/") {
    return pathname === "/";
  }

  return pathname === pathOnly || pathname.startsWith(`${pathOnly}/`);
}
