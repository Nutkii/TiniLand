"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { SectionShell } from "./SectionShell";
import { LETTERS } from "@/lib/data";
import { LetterData } from "@/lib/types";
import { useEscapeKey } from "@/lib/useEscapeKey";

function Envelope({ letter, onOpen }: { letter: LetterData; onOpen: () => void }) {
  const [opened, setOpened] = useState(false);

  function handleClick() {
    setOpened(true);
    window.setTimeout(onOpen, 500);
  }

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ y: -6 }}
      className="glass-card relative flex h-40 w-full flex-col items-center justify-center gap-2 overflow-hidden p-4 sm:w-56"
    >
      <motion.div
        className={`absolute inset-x-3 top-3 h-24 origin-top rounded-t-lg bg-gradient-to-br ${letter.color}`}
        animate={{ rotateX: opened ? 180 : 0 }}
        transition={{ duration: 0.5 }}
        style={{ transformStyle: "preserve-3d" }}
      />
      <div
        className={`absolute inset-x-3 bottom-3 h-16 rounded-b-lg bg-gradient-to-br ${letter.color} opacity-90`}
      />
      <span className="z-10 text-4xl">💌</span>
      <span className="z-10 rounded-full bg-white/80 px-3 py-1 font-display text-sm text-lavender-800 shadow-sm">
        {letter.from}
      </span>
    </motion.button>
  );
}

export function LettersSection() {
  const [active, setActive] = useState<LetterData | null>(null);
  const close = useCallback(() => setActive(null), []);
  useEscapeKey(active !== null, close);

  return (
    <SectionShell className="flex flex-col items-center">
      <h2 className="section-title mb-2 text-center">Letters</h2>
      <p className="mb-8 text-center text-lavender-600 dark:text-lavender-100">
        Click an envelope to open a heartfelt message.
      </p>

      <div className="flex flex-wrap justify-center gap-6">
        {LETTERS.map((letter) => (
          <Envelope key={letter.id} letter={letter} onOpen={() => setActive(letter)} />
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-night-900/70 p-6 backdrop-blur-sm"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.7, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className={`glass-card relative w-full max-w-lg bg-gradient-to-br ${active.color} p-8`}
            >
              <button
                onClick={close}
                aria-label="Close letter"
                className="absolute right-4 top-4 rounded-full bg-white/70 p-1.5 text-lavender-700 hover:bg-white"
              >
                <X size={18} />
              </button>
              <p className="mb-1 text-sm uppercase tracking-wide text-lavender-600">
                From {active.from}
              </p>
              <h3 className="mb-4 font-display text-2xl text-lavender-800">{active.title}</h3>
              <div className="space-y-3">
                {active.body.map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 * i }}
                    className="text-lavender-800"
                  >
                    {line}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionShell>
  );
}
