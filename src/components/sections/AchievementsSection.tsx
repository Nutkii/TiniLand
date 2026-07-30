"use client";

import { motion } from "framer-motion";
import { SectionShell } from "./SectionShell";
import { ACHIEVEMENTS } from "@/lib/data";

const RARITY_STYLES: Record<string, string> = {
  common: "from-lavender-100 to-lavender-200 text-lavender-700",
  rare: "from-blush-100 to-blush-200 text-blush-500",
  epic: "from-lavender-200 to-blush-200 text-lavender-700",
  legendary: "from-gold-200 to-gold-400 text-lavender-900",
};

export function AchievementsSection() {
  return (
    <SectionShell>
      <h2 className="section-title mb-2 text-center">Achievements Unlocked</h2>
      <p className="mb-8 text-center text-lavender-600 dark:text-lavender-100">
        Every legendary title, officially earned.
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {ACHIEVEMENTS.map((a, i) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            whileHover={{ scale: 1.03, rotate: -1 }}
            className={`glass-card flex items-center gap-4 bg-gradient-to-r p-4 ${RARITY_STYLES[a.rarity]}`}
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/60 text-3xl shadow-inner dark:bg-white/10">
              {a.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-lg">{a.title}</h3>
                <span className="rounded-full bg-white/50 px-2 py-0.5 text-[10px] uppercase tracking-wide dark:bg-white/10">
                  {a.rarity}
                </span>
              </div>
              <p className="text-sm opacity-90">{a.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}
