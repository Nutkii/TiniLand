"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionShell } from "./SectionShell";
import { FORTUNES } from "@/lib/data";

export function FortuneSection() {
  const [fortune, setFortune] = useState<string | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [key, setKey] = useState(0);

  function reveal() {
    setSpinning(true);
    setFortune(null);
    window.setTimeout(() => {
      const pick = FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
      setFortune(pick);
      setSpinning(false);
      setKey((k) => k + 1);
    }, 1100);
  }

  return (
    <SectionShell className="flex flex-col items-center">
      <h2 className="section-title mb-2 text-center">Birthday Fortune</h2>
      <p className="mb-10 text-center text-lavender-600 dark:text-lavender-100">
        Gaze into the crystal ball for your extremely scientific fortune.
      </p>

      <motion.button
        onClick={reveal}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative mb-8 flex h-48 w-48 items-center justify-center rounded-full"
        aria-label="Reveal your fortune"
      >
        <motion.div
          className="absolute inset-0 rounded-full opacity-70 blur-xl"
          style={{
            background:
              "radial-gradient(circle, #dcc9ff 0%, #a97bff 55%, #8f56f7 100%)",
          }}
          animate={{ opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
        <motion.div
          className="relative flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-white/70 via-lavender-200/60 to-lavender-400/60 shadow-[0_0_50px_rgba(169,123,255,0.7)] backdrop-blur-md"
          animate={spinning ? { rotate: 360 } : {}}
          transition={{ duration: 1.1, ease: "easeInOut" }}
        >
          <span className="text-5xl">🔮</span>
        </motion.div>
      </motion.button>

      <AnimatePresence mode="wait">
        {fortune && (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="glass-card max-w-md p-6 text-center font-display text-lg text-lavender-700 dark:text-lavender-50"
          >
            {fortune}
          </motion.div>
        )}
      </AnimatePresence>
    </SectionShell>
  );
}
