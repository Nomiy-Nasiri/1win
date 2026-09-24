"use client";

import { Sun } from "lucide-react";
import { useLayoutEffect, useState } from "react";

import {
  applyLight,
  LIGHT_STORAGE_KEY,
  readStoredLight,
  subscribeLight,
} from "@/lib/light";
import { cn } from "@/lib/utils";

type LightSliderProps = {
  className?: string;
  showLabel?: boolean;
  showIcon?: boolean;
};

export function LightSlider({
  className,
  showLabel = false,
  showIcon = true,
}: LightSliderProps) {
  const [light, setLight] = useState(0);

  useLayoutEffect(() => {
    const sync = (value: number) => setLight(value);
    const unsubscribe = subscribeLight(sync);
    sync(applyLight(readStoredLight()));
    return unsubscribe;
  }, []);

  function onChange(value: number) {
    const next = applyLight(value);
    setLight(next);
    window.localStorage.setItem(LIGHT_STORAGE_KEY, String(next));
  }

  return (
    <label className={cn("flex min-w-0 items-center gap-2", className)}>
      {showIcon ? (
        <Sun className="size-4 shrink-0 text-premium" aria-hidden="true" />
      ) : null}
      <span className={cn("text-caption font-medium", !showLabel && "sr-only")}>
        Light
      </span>
      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={light}
        aria-label="Light"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={light}
        aria-valuetext={`${light} percent`}
        onChange={(event) => onChange(Number(event.target.value))}
        className="light-range min-w-0 w-full flex-1"
        style={{ ["--pct" as string]: `${light}%` }}
      />
      <span className="w-8 shrink-0 text-right text-caption tabular-nums text-muted-foreground">
        {light}
      </span>
    </label>
  );
}

export function LightControl() {
  return (
    <div className="group relative">
      <button
        type="button"
        className="inline-flex size-10 items-center justify-center rounded-full text-foreground outline-none hover:bg-foreground/8 focus-visible:ring-3 focus-visible:ring-ring/50"
        aria-label="Adjust light"
      >
        <Sun className="size-5 text-premium" aria-hidden="true" />
      </button>
      <div
        className={cn(
          "invisible absolute top-full right-0 z-50 w-60 pt-2 opacity-0",
          "group-hover:visible group-hover:opacity-100",
          "group-focus-within:visible group-focus-within:opacity-100"
        )}
      >
        <div className="rounded-xl border border-border bg-popover px-3 py-2.5 shadow-lg">
          <LightSlider showLabel showIcon={false} />
        </div>
      </div>
    </div>
  );
}
