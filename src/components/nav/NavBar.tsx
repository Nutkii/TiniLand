"use client";

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { NAV_ITEMS } from "@/lib/data";
import { useSite } from "@/components/providers/SiteProvider";

export function NavBar() {
  const {
    section,
    goTo,
    darkMode,
    toggleDarkMode,
    nightMode,
    toggleNightMode,
    registerCrownClick,
    secretQueen,
  } = useSite();

  return (
    <header className="sticky top-0 z-40 border-b border-white/30 bg-white/60 backdrop-blur-xl dark:border-white/10 dark:bg-night-800/60">
      <div className="mx-auto max-w-6xl px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.8, rotate: 15 }}
              onClick={registerCrownClick}
              title="???"
              aria-label="TiniLand crown logo"
              className="text-2xl"
            >
              {secretQueen ? "👑✨" : "👑"}
            </motion.button>
            <span className="font-display text-lg text-lavender-500 dark:text-lavender-200">
              TiniLand
            </span>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              onClick={toggleNightMode}
              title="Toggle extra stars"
              aria-label="Toggle night stars"
              aria-pressed={nightMode}
              className={`rounded-full p-2 text-lg transition-colors ${
                nightMode ? "bg-lavender-500/20" : "hover:bg-white/60 dark:hover:bg-white/10"
              }`}
            >
              🌙
            </button>
            <button
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
              aria-pressed={darkMode}
              className="rounded-full p-2 text-lavender-600 transition-colors hover:bg-white/60 dark:text-gold-200 dark:hover:bg-white/10"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>

        <nav
          className="mt-2 flex flex-wrap justify-center gap-1.5"
          aria-label="Main sections"
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => goTo(item.id)}
              aria-current={section === item.id ? "page" : undefined}
              className={`relative shrink-0 whitespace-nowrap rounded-full px-2.5 py-1.5 text-[13px] font-medium transition-colors ${
                section === item.id
                  ? "bg-gradient-to-r from-blush-400 to-lavender-400 text-white shadow"
                  : "text-lavender-600 hover:bg-white/60 dark:text-lavender-200 dark:hover:bg-white/10"
              }`}
            >
              <span className="mr-1">{item.emoji}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
