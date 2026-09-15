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
  look?: "default" | "login" | "register";
};

export function AffiliateButton({
  children = "Visit 1win",
  className,
  size = "cta",
  showIcon = true,
  destination,
  look = "default",
}: AffiliateButtonProps) {
  const anchorProps = getAffiliateAnchorProps({ destination });

  return (
    <Button
      asChild
      size={size}
      variant={look === "login" ? "ghost" : "default"}
      className={cn(
        look === "default" &&
          "bg-gradient-to-b from-primary to-primary/85 glow-primary hover:from-primary hover:to-primary",
        look === "login" &&
          "border-transparent bg-transparent text-foreground hover:bg-white/8",
        look === "register" &&
          "border-transparent bg-register text-register-foreground hover:bg-register/90",
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
