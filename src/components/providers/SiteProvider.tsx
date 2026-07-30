"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useKonami } from "@/lib/useKonami";
import { fireBigConfetti } from "@/lib/confetti";
import { SectionId } from "@/lib/types";

interface SiteContextValue {
  entered: boolean;
  enterKingdom: () => void;
  section: SectionId;
  goTo: (section: SectionId) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  nightMode: boolean;
  toggleNightMode: () => void;
  secretQueen: boolean;
  registerCrownClick: () => void;
  crownClicks: number;
  discoMode: boolean;
}

const SiteContext = createContext<SiteContextValue | null>(null);

function readStoredTheme(): boolean {
  if (typeof window === "undefined") return false;
  const stored = window.localStorage.getItem("tiniland-dark");
  if (stored !== null) return stored === "1";
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [entered, setEntered] = useState(false);
  const [section, setSection] = useState<SectionId>("home");
  const [darkMode, setDarkMode] = useState(readStoredTheme);
  const [nightMode, setNightMode] = useState(false);
  const [crownClicks, setCrownClicks] = useState(0);
  const [secretQueen, setSecretQueen] = useState(false);
  const [discoMode, setDiscoMode] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode && !secretQueen) root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("tiniland-dark", darkMode ? "1" : "0");
  }, [darkMode, secretQueen]);

  useEffect(() => {
    const root = document.documentElement;
    if (secretQueen) root.classList.add("theme-secret-queen");
    else root.classList.remove("theme-secret-queen");
  }, [secretQueen]);

  useEffect(() => {
    if (!discoMode) return;
    const t = setTimeout(() => setDiscoMode(false), 15000);
    return () => clearTimeout(t);
  }, [discoMode]);

  const activateDisco = useCallback(() => {
    setDiscoMode(true);
    fireBigConfetti();
  }, []);

  useKonami(activateDisco);

  const registerCrownClick = useCallback(() => {
    setCrownClicks((prev) => {
      const next = prev + 1;
      if (next === 10 && !secretQueen) {
        setSecretQueen(true);
        fireBigConfetti();
      }
      return next;
    });
  }, [secretQueen]);

  const value = useMemo<SiteContextValue>(
    () => ({
      entered,
      enterKingdom: () => setEntered(true),
      section,
      goTo: setSection,
      darkMode,
      toggleDarkMode: () => setDarkMode((d) => !d),
      nightMode,
      toggleNightMode: () => setNightMode((n) => !n),
      secretQueen,
      registerCrownClick,
      crownClicks,
      discoMode,
    }),
    [entered, section, darkMode, nightMode, secretQueen, crownClicks, discoMode, registerCrownClick]
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used within SiteProvider");
  return ctx;
}
