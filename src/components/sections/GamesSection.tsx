"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionShell } from "./SectionShell";
import { CatchCrownGame } from "@/components/games/CatchCrownGame";
import { ClickHeartsGame } from "@/components/games/ClickHeartsGame";
import { FindTiniGame } from "@/components/games/FindTiniGame";

type GameId = "crown" | "hearts" | "findtini";

const GAMES: { id: GameId; label: string; emoji: string }[] = [
  { id: "crown", label: "Catch the Crown", emoji: "👑" },
  { id: "hearts", label: "Click the Hearts", emoji: "💖" },
  { id: "findtini", label: "Find Tini", emoji: "🔍" },
];

export function GamesSection() {
  const [active, setActive] = useState<GameId>("crown");
  const [scores, setScores] = useState<Record<GameId, number | null>>({
    crown: null,
    hearts: null,
    findtini: null,
  });

  function recordScore(id: GameId, score: number) {
    setScores((prev) => ({ ...prev, [id]: score }));
  }

  return (
    <SectionShell className="flex flex-col items-center">
      <h2 className="section-title mb-2 text-center">Mini Games</h2>
      <p className="mb-6 text-center text-lavender-600 dark:text-lavender-100">
        Three tiny games. Zero chill.
      </p>

      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {GAMES.map((g) => (
          <button
            key={g.id}
            onClick={() => setActive(g.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              active === g.id
                ? "bg-gradient-to-r from-blush-400 to-lavender-400 text-white shadow"
                : "glass-card text-lavender-600 dark:text-lavender-100"
            }`}
          >
            {g.emoji} {g.label}
            {scores[g.id] !== null && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="ml-2 rounded-full bg-gold-300 px-2 py-0.5 text-xs text-lavender-900"
              >
                {scores[g.id]}
              </motion.span>
            )}
          </button>
        ))}
      </div>

      <div className="glass-card w-full max-w-lg p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {active === "crown" && (
              <CatchCrownGame onScore={(s) => recordScore("crown", s)} />
            )}
            {active === "hearts" && (
              <ClickHeartsGame onScore={(s) => recordScore("hearts", s)} />
            )}
            {active === "findtini" && (
              <FindTiniGame onScore={(s) => recordScore("findtini", s)} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </SectionShell>
  );
}
