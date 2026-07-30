"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { fireBigConfetti, fireConfetti } from "@/lib/confetti";

const CANDLE_COLORS = ["#ff7bab", "#a97bff", "#f8bd2e", "#ff7bab", "#a97bff", "#f8bd2e"];

function Candle({
  lit,
  color,
  onBlow,
}: {
  lit: boolean;
  color: string;
  onBlow: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onBlow}
      disabled={!lit}
      aria-label={lit ? "Blow out candle" : "Candle already blown out"}
      className="flex flex-col items-center focus:outline-none"
    >
      <div className="relative h-6 w-4">
        <AnimatePresence>
          {lit && (
            <motion.div
              key="flame"
              initial={{ opacity: 1, scale: 1 }}
              animate={{ scaleY: [1, 1.15, 0.9, 1], rotate: [-3, 3, -3] }}
              exit={{ opacity: 0, scale: 0.2, y: -18, transition: { duration: 0.4 } }}
              transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-x-0 bottom-0 mx-auto h-4 w-3 rounded-full bg-gradient-to-t from-gold-500 via-gold-300 to-white shadow-[0_0_10px_rgba(248,189,46,0.9)]"
              style={{ clipPath: "ellipse(50% 60% at 50% 65%)" }}
            />
          )}
        </AnimatePresence>
      </div>
      <div
        className="h-8 w-2 rounded-sm shadow-inner transition-opacity"
        style={{ background: color, opacity: lit ? 1 : 0.5 }}
      />
    </button>
  );
}

export function CakeCandles({ onComplete }: { onComplete: () => void }) {
  const [lit, setLit] = useState<boolean[]>(() => CANDLE_COLORS.map(() => true));
  const blownCount = lit.filter((l) => !l).length;
  const allBlown = blownCount === CANDLE_COLORS.length;

  function blow(i: number) {
    if (!lit[i]) return;
    const next = [...lit];
    next[i] = false;
    setLit(next);
    const remaining = next.filter(Boolean).length;
    if (remaining === 0) {
      fireBigConfetti();
      window.setTimeout(onComplete, 1300);
    } else {
      fireConfetti();
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-blush-100 via-lavender-100 to-lavender-200 px-6"
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="section-title z-10 mb-2 text-center drop-shadow-sm"
      >
        Make a Wish!
      </motion.h1>
      <p className="z-10 mb-10 text-center font-display text-lg text-lavender-500">
        {allBlown
          ? "All blown out! ✨"
          : `Blow out all the candles (${blownCount}/${CANDLE_COLORS.length})`}
      </p>

      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-1 flex gap-3">
          {CANDLE_COLORS.map((color, i) => (
            <Candle key={i} lit={lit[i]} color={color} onBlow={() => blow(i)} />
          ))}
        </div>
        <div className="relative h-8 w-56 rounded-t-xl bg-gradient-to-b from-cream to-blush-100 shadow-inner">
          {[20, 45, 70, 95, 130, 155, 180].map((left, i) => (
            <div
              key={i}
              className="absolute top-1.5 h-1.5 w-1.5 rounded-full"
              style={{
                left,
                background: CANDLE_COLORS[i % CANDLE_COLORS.length],
              }}
            />
          ))}
        </div>
        <div className="h-10 w-64 rounded-b-md bg-gradient-to-b from-blush-200 to-blush-300 shadow-lg" />
        <div className="mt-1 h-12 w-72 rounded-b-md bg-gradient-to-b from-lavender-200 to-lavender-300 shadow-xl" />
      </div>
    </motion.div>
  );
}
