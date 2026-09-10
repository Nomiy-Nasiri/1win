import { AffiliateButton } from "@/components/affiliate/affiliate-button";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import type { AffiliateDestination } from "@/lib/affiliate";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  destination?: AffiliateDestination;
};

export function PageHero({
  eyebrow,
  title,
  description,
  destination,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,color-mix(in_oklch,var(--glow)_16%,transparent),transparent_55%)]" />
      <Container className="relative flex flex-col gap-5 py-8 md:flex-row md:items-end md:justify-between md:py-10">
        <div className="max-w-2xl space-y-3">
          <Badge variant="outline" className="border-primary/40 text-primary">
            {eyebrow}
          </Badge>
          <h1 className="text-h1">{title}</h1>
          <p className="text-body text-muted-foreground">{description}</p>
        </div>
        <AffiliateButton destination={destination}>Play on 1win</AffiliateButton>
      </Container>
    </section>
  );
}
