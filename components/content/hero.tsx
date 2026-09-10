import Link from "next/link";

import { AffiliateButton } from "@/components/affiliate/affiliate-button";
import { Container } from "@/components/layout/container";
import { MediaImage } from "@/components/media/media-image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Cover } from "@/lib/content";
import { paths } from "@/lib/routes";

const heroCover: Cover = {
  src: "/media/moneywincover.jpg",
  alt: "WinMoney cover with 1win casino art",
  motif: "arena",
  seed: "hero",
  width: 1200,
  height: 900,
};

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,color-mix(in_oklch,var(--glow)_22%,transparent),transparent_55%)]" />
      <Container className="relative grid items-center gap-8 py-8 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:py-14 lg:gap-12">
        <div className="max-w-xl space-y-5">
          <Badge variant="outline" className="border-primary/40 text-primary">
            Independent 1win coverage
          </Badge>
          <h1 className="text-display text-foreground">
            Sports, casino, and games — covered with a sharp, dark desk.
          </h1>
          <p className="text-body text-muted-foreground">
            WinMoney is an editorial companion to 1win: match briefings, catalog
            notes, and practical guides. No cloned lobby. No copied banners. Just
            a premium reading surface before you decide to play.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <AffiliateButton>Visit 1win</AffiliateButton>
            <Button asChild variant="outline" size="cta">
              <Link href={paths.guides}>Read the guides</Link>
            </Button>
          </div>
          <dl className="grid grid-cols-3 gap-3 pt-2 text-caption text-muted-foreground">
            <div className="rounded-lg border border-border bg-card/70 px-3 py-2">
              <dt className="text-tertiary">Focus</dt>
              <dd className="mt-1 font-heading text-small text-foreground">Sports + casino</dd>
            </div>
            <div className="rounded-lg border border-border bg-card/70 px-3 py-2">
              <dt className="text-tertiary">Format</dt>
              <dd className="mt-1 font-heading text-small text-foreground">Guides & reviews</dd>
            </div>
            <div className="rounded-lg border border-border bg-card/70 px-3 py-2">
              <dt className="text-tertiary">Age</dt>
              <dd className="mt-1 font-heading text-small text-foreground">18+ only</dd>
            </div>
          </dl>
        </div>
        <div className="relative min-h-52 overflow-hidden rounded-2xl ring-1 ring-border md:min-h-[22rem]">
          <MediaImage
            cover={heroCover}
            priority
            sizes="(max-width: 768px) 100vw, 46vw"
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-background/80 via-background/20 to-transparent" />
          <div className="absolute right-4 bottom-4 left-4 max-w-sm rounded-xl border border-border bg-background/80 p-4 backdrop-blur-md">
            <p className="text-caption uppercase tracking-wider text-premium">Editor&apos;s desk</p>
            <p className="mt-1 text-h3">A content-first lobby, not a copy of the operator.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
