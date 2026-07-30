"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionShell } from "./SectionShell";
import { COMPLIMENTS } from "@/lib/data";

export function ComplimentSection() {
  const [compliment, setCompliment] = useState(COMPLIMENTS[0]);
  const [key, setKey] = useState(0);

  function generate() {
    let pick = compliment;
    while (pick === compliment) {
      pick = COMPLIMENTS[Math.floor(Math.random() * COMPLIMENTS.length)];
    }
    setCompliment(pick);
    setKey((k) => k + 1);
  }

  return (
    <SectionShell className="flex flex-col items-center">
      <h2 className="section-title mb-2 text-center">Compliment Generator</h2>
      <p className="mb-8 text-center text-lavender-600 dark:text-lavender-100">
        Infinite compliments. All true. Zero effort required.
      </p>

      <div className="glass-card flex min-h-[160px] w-full max-w-lg items-center justify-center p-8 text-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={key}
            initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -16, filter: "blur(4px)" }}
            transition={{ duration: 0.4 }}
            className="font-display text-xl text-lavender-700 dark:text-lavender-50"
          >
            &ldquo;{compliment}&rdquo;
          </motion.p>
        </AnimatePresence>
      </div>

      <button onClick={generate} className="glow-btn mt-8">
        ✨ Generate Compliment
      </button>
    </SectionShell>
  );
}
