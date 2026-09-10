import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ContainerProps = {
  className?: string;
  children: ReactNode;
  as?: "div" | "section" | "header" | "footer" | "nav";
};

export function Container({
  className,
  children,
  as: Component = "div",
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8",
        className
      )}
    >
      {children}
    </Component>
  );
}
