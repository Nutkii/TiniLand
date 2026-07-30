"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { SectionShell } from "./SectionShell";
import { Balloon } from "@/components/gate/Balloon";
import { Typewriter } from "@/components/effects/Typewriter";
import { fireBigConfetti, fireFireworks } from "@/lib/confetti";

const MESSAGE_LINES = [
  "Happy Birthday Tini ❤️",
  "Thank you for making everyone's life brighter.",
  "Stay iconic.",
  "Stay chaotic.",
  "Stay our Queen.",
  "Love you forever.",
];

const BALLOONS = [
  { color: "#ff7bab", left: "4%", delay: 0, duration: 8 },
  { color: "#a97bff", left: "14%", delay: 1, duration: 7 },
  { color: "#f8bd2e", left: "24%", delay: 2, duration: 9 },
  { color: "#ff7bab", left: "76%", delay: 0.5, duration: 7.5 },
  { color: "#a97bff", left: "86%", delay: 1.5, duration: 8.5 },
  { color: "#f8bd2e", left: "94%", delay: 2.5, duration: 6.5 },
];

function Cake() {
  return (
    <div className="relative mx-auto flex flex-col items-center">
      <div className="mb-1 flex gap-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex flex-col items-center">
            <motion.div
              className="h-4 w-1.5 rounded-full bg-gold-300"
              animate={{ opacity: [0.6, 1, 0.6], scaleY: [1, 1.3, 1] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
              style={{ boxShadow: "0 0 12px 4px rgba(255,196,74,0.8)" }}
            />
            <div className="h-4 w-1 bg-lavender-300" />
          </div>
        ))}
      </div>
      <div className="h-8 w-40 rounded-t-lg bg-blush-200 shadow-inner sm:w-52" />
      <div className="h-10 w-52 bg-lavender-200 shadow-inner sm:w-64" />
      <div className="h-12 w-64 rounded-b-xl bg-gold-200 shadow-lg sm:w-80" />
    </div>
  );
}

export function FinalSurpriseSection() {
  useEffect(() => {
    fireFireworks();
    fireBigConfetti();
  }, []);

  return (
    <SectionShell className="relative flex flex-col items-center justify-center overflow-hidden text-center">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {BALLOONS.map((b, i) => (
          <Balloon key={i} {...b} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="z-10 mb-8"
      >
        <Cake />
      </motion.div>

      <div className="glass-card z-10 max-w-xl px-6 py-8">
        <Typewriter
          lines={MESSAGE_LINES}
          className="space-y-2 font-display text-xl leading-relaxed text-lavender-700 dark:text-lavender-50 sm:text-2xl"
        />
      </div>
    </SectionShell>
  );
}
