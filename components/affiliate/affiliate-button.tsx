import type { ReactNode } from "react";
import { ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  getAffiliateAnchorProps,
  type AffiliateDestination,
} from "@/lib/affiliate";
import { cn } from "@/lib/utils";

type AffiliateButtonProps = {
  children?: ReactNode;
  className?: string;
  size?: "default" | "sm" | "lg" | "cta";
  showIcon?: boolean;
  destination?: AffiliateDestination;
};

export function AffiliateButton({
  children = "Visit 1win",
  className,
  size = "cta",
  showIcon = true,
  destination,
}: AffiliateButtonProps) {
  const anchorProps = getAffiliateAnchorProps({ destination });

  return (
    <Button
      asChild
      size={size}
      className={cn(
        "bg-gradient-to-b from-primary to-primary/85 glow-primary hover:from-primary hover:to-primary",
        className
      )}
    >
      <a {...anchorProps}>
        {children}
        {showIcon ? <ExternalLink data-icon="inline-end" /> : null}
      </a>
    </Button>
  );
}
