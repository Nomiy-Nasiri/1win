import { AffiliateButton } from "@/components/affiliate/affiliate-button";
import { Container } from "@/components/layout/container";

export function AffiliateBanner() {
  return (
    <section id="visit-1win" className="border-y border-border bg-surface">
      <Container className="flex flex-col items-start justify-between gap-4 py-8 md:flex-row md:items-center">
        <div className="max-w-2xl">
          <p className="text-caption uppercase tracking-wider text-primary">Ready to play?</p>
          <h2 className="mt-1 text-h2">Open 1win in a new tab when you are done reading.</h2>
          <p className="mt-2 text-small text-muted-foreground">
            WinMoney stays independent. The visit button uses the centralized affiliate
            component and never hardcodes the destination.
          </p>
        </div>
        <AffiliateButton />
      </Container>
    </section>
  );
}
