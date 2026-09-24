export const LIGHT_STORAGE_KEY = "winmoney-light";

export const LIGHT_BOOT_SCRIPT = `(function(){try{var raw=localStorage.getItem("${LIGHT_STORAGE_KEY}");var n=raw==null?0:Number(raw);if(!Number.isFinite(n))n=0;n=Math.max(0,Math.min(100,Math.round(n)));var root=document.documentElement;root.style.setProperty("--light",n+"%");root.style.colorScheme=n>=55?"light":"dark";}catch(e){}})();`;

export function clampLight(value: number) {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.max(0, Math.min(100, Math.round(value)));
}

export function readStoredLight() {
  const raw = window.localStorage.getItem(LIGHT_STORAGE_KEY);
  return clampLight(raw == null ? 0 : Number(raw));
}

const listeners = new Set<(value: number) => void>();

export function subscribeLight(listener: (value: number) => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function applyLight(value: number) {
  const next = clampLight(value);
  const root = document.documentElement;
  root.style.setProperty("--light", `${next}%`);
  root.style.colorScheme = next >= 55 ? "light" : "dark";

  for (const listener of listeners) {
    listener(next);
  }

  return next;
}
