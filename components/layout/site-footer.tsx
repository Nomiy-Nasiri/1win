import type { ReactNode } from "react";
import Link from "next/link";

import { AffiliateButton } from "@/components/affiliate/affiliate-button";
import { AffiliateLink } from "@/components/affiliate/affiliate-link";
import { Container } from "@/components/layout/container";
import { NavList } from "@/components/layout/nav-list";
import { SiteLogo } from "@/components/layout/site-logo";
import { Separator } from "@/components/ui/separator";
import { CATEGORY_GROUPS, LEGAL_LINKS, SITE_NAME } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <Container className="grid gap-8 py-10 md:grid-cols-[1.2fr_repeat(3,1fr)]">
        <div className="max-w-sm space-y-4">
          <SiteLogo />
          <p className="text-small text-muted-foreground">
            {SITE_NAME} is an independent editorial site covering sports,
            casino, and games. We are not the 1win operator.
          </p>
          <AffiliateButton size="lg" />
        </div>
        <FooterColumn title="Explore">
          <NavList variant="footer" />
        </FooterColumn>
        <FooterColumn title="Categories">
          {CATEGORY_GROUPS.map((group) => (
            <Link
              key={group.title}
              href={group.items[0].href}
              className="text-small text-muted-foreground transition-colors hover:text-primary"
            >
              {group.title}
            </Link>
          ))}
        </FooterColumn>
        <FooterColumn title="Legal">
          {LEGAL_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-small text-muted-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
          <AffiliateLink className="text-small">Visit 1win</AffiliateLink>
        </FooterColumn>
      </Container>
      <Separator />
      <Container className="flex flex-col gap-2 py-4 text-caption text-tertiary sm:flex-row sm:items-center sm:justify-between">
        <p>18+. Gambling can be addictive. Play only with money you can afford to lose.</p>
        <p>© {new Date().getFullYear()} {SITE_NAME}. Independent affiliate coverage.</p>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-2 content-start">
      <p className="text-caption font-medium uppercase tracking-wider text-tertiary">
        {title}
      </p>
      {children}
    </div>
  );
}
