"use client";

import { useEffect } from "react";

export function useEscapeKey(active: boolean, onEscape: () => void) {
  useEffect(() => {
    if (!active) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onEscape();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [active, onEscape]);
}
