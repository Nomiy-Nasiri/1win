import Image from "next/image";

import { CoverArt } from "@/components/media/cover-art";
import type { Cover } from "@/lib/content";
import { cn } from "@/lib/utils";

type MediaImageProps = {
  cover: Cover;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function MediaImage({
  cover,
  className,
  sizes = "(max-width: 768px) 100vw, 33vw",
  priority = false,
}: MediaImageProps) {
  if (cover.src) {
    return (
      <Image
        src={cover.src}
        alt={cover.alt}
        fill
        sizes={sizes}
        priority={priority}
        unoptimized={cover.src.endsWith(".svg")}
        className={cn("object-cover", className)}
      />
    );
  }

  return (
    <CoverArt
      motif={cover.motif}
      seed={cover.seed}
      title={cover.alt}
      className={className}
    />
  );
}
