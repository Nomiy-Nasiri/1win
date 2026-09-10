import Link from "next/link";

import { AffiliateButton } from "@/components/affiliate/affiliate-button";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { paths } from "@/lib/routes";

export default function NotFound() {
  return (
    <main id="main" className="flex flex-1 items-center">
      <Container className="py-16 text-center">
        <p className="text-caption uppercase tracking-wider text-primary">404</p>
        <h1 className="mt-2 text-h1">This desk is empty</h1>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          That page is not on WinMoney. Head home or open a discovery desk.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="cta">
            <Link href={paths.home}>Back home</Link>
          </Button>
          <Button asChild variant="outline" size="cta">
            <Link href={paths.games}>Browse games</Link>
          </Button>
          <AffiliateButton>Play on 1win</AffiliateButton>
        </div>
      </Container>
    </main>
  );
}
