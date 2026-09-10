import type { ReactNode } from "react";

import {
  getAffiliateAnchorProps,
  type AffiliateDestination,
} from "@/lib/affiliate";
import { cn } from "@/lib/utils";

type AffiliateLinkProps = {
  children: ReactNode;
  className?: string;
  destination?: AffiliateDestination;
};

export function AffiliateLink({
  children,
  className,
  destination,
}: AffiliateLinkProps) {
  const anchorProps = getAffiliateAnchorProps({ destination });

  return (
    <a
      {...anchorProps}
      className={cn(
        "font-medium text-primary underline-offset-4 transition-colors hover:underline focus-visible:ring-3 focus-visible:ring-ring/50",
        className
      )}
    >
      {children}
    </a>
  );
}
