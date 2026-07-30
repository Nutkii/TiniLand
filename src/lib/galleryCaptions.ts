const STORAGE_KEY = "tiniland-gallery-captions";

export interface GalleryCaptionOverride {
  caption: string;
  memory: string;
}

type OverrideMap = Record<string, GalleryCaptionOverride>;

export function loadCaptionOverrides(): OverrideMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as OverrideMap) : {};
  } catch {
    return {};
  }
}

export function saveCaptionOverride(id: string, override: GalleryCaptionOverride): OverrideMap {
  const current = loadCaptionOverrides();
  const next = { ...current, [id]: override };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}
