"use client";

import { motion } from "framer-motion";
import { SectionShell } from "./SectionShell";
import { useSite } from "@/components/providers/SiteProvider";

export function HomeSection() {
  const { goTo, secretQueen } = useSite();

  return (
    <SectionShell className="flex flex-col items-center justify-center text-center">
      <motion.div
        className="mb-4 text-6xl"
        animate={{ y: [0, -14, 0], rotate: [-6, 6, -6] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        👑
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, type: "spring" }}
        className="section-title"
      >
        Happy Birthday, Tini!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="mt-4 max-w-xl text-lg text-lavender-700 dark:text-lavender-100"
      >
        Welcome to your very own kingdom — built entirely out of love, chaos,
        inside jokes, and way too many exclamation points.
        {secretQueen && " Also, you found the secret gold theme. Of course you did."}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4"
      >
        {[
          { label: "Take the Quiz", id: "quiz" as const, emoji: "🧠" },
          { label: "See Memories", id: "gallery" as const, emoji: "🖼️" },
          { label: "Play Games", id: "games" as const, emoji: "🎮" },
          { label: "Read Letters", id: "letters" as const, emoji: "💌" },
        ].map((item) => (
          <motion.button
            key={item.id}
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => goTo(item.id)}
            className="glass-card flex flex-col items-center gap-2 px-4 py-5 font-display text-sm text-lavender-600 dark:text-lavender-100"
          >
            <span className="text-2xl">{item.emoji}</span>
            {item.label}
          </motion.button>
        ))}
      </motion.div>
    </SectionShell>
  );
}
