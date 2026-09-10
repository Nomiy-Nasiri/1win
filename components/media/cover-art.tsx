import { cn } from "@/lib/utils";
import type { CoverMotif } from "@/lib/content";

function hashSeed(seed: string) {
  let hash = 2166136261;
  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

const motifShapes: Record<CoverMotif, string> = {
  arena: "M40 140h240l-40 80H80z",
  pitch: "M40 40h240v160H40z",
  night: "M160 36l28 56 62 8-46 42 12 60-56-32-56 32 12-60-46-42 62-8z",
  cards: "M90 36h90l40 148H130z",
  reels: "M48 48h64v144H48zm80 0h64v144h-64zm80 0h64v144h-64z",
  live: "M160 48a72 72 0 1 1 0 144 72 72 0 0 1 0-144z",
  editorial: "M56 44h208v28H56zm0 48h168v16H56zm0 36h208v16H56zm0 36h140v16H56z",
  grid: "M40 40h70v70H40zm90 0h70v70h-70zm90 0h70v70h-70zM40 130h70v70H40zm90 0h70v70h-70zm90 0h70v70h-70z",
};

type CoverArtProps = {
  motif: CoverMotif;
  seed: string;
  className?: string;
  title?: string;
};

export function CoverArt({ motif, seed, className, title }: CoverArtProps) {
  const hash = hashSeed(seed);
  const shift = hash % 40;
  const glowX = 55 + (hash % 30);
  const glowY = 20 + (hash % 25);
  const shape = motifShapes[motif];
  const gradientId = `cover-${seed.replace(/[^a-zA-Z0-9]/g, "")}`;

  return (
    <svg
      viewBox="0 0 320 240"
      preserveAspectRatio="xMidYMid slice"
      className={cn("block size-full", className)}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    >
      {title ? <title>{title}</title> : null}
      <defs>
        <linearGradient id={`${gradientId}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.22 0.04 255)" />
          <stop offset="55%" stopColor="oklch(0.16 0.03 258)" />
          <stop offset="100%" stopColor="oklch(0.12 0.02 258)" />
        </linearGradient>
        <radialGradient id={`${gradientId}-glow`} cx={`${glowX}%`} cy={`${glowY}%`} r="58%">
          <stop offset="0%" stopColor="oklch(0.66 0.19 255)" stopOpacity="0.55" />
          <stop offset="70%" stopColor="oklch(0.66 0.19 255)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="320" height="240" fill={`url(#${gradientId}-bg)`} />
      <rect width="320" height="240" fill={`url(#${gradientId}-glow)`} />
      <g
        fill="none"
        stroke="oklch(0.66 0.19 255)"
        strokeOpacity="0.28"
        strokeWidth="1.5"
        transform={`translate(${shift - 20} 8)`}
      >
        <path d={shape} />
      </g>
      <g fill="oklch(0.84 0.12 88)" fillOpacity={motif === "cards" || motif === "live" ? 0.18 : 0.08}>
        <circle cx={260 - (hash % 40)} cy={48 + (hash % 20)} r="18" />
      </g>
      <rect width="320" height="240" fill="oklch(0.12 0.02 258)" fillOpacity="0.12" />
    </svg>
  );
}
