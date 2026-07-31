"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionShell } from "./SectionShell";
import { Balloon } from "@/components/gate/Balloon";
import { fireConfetti, fireBigConfetti, fireFireworks } from "@/lib/confetti";

const BALLOONS = [
  { color: "#ff7bab", left: "4%", delay: 0, duration: 8 },
  { color: "#a97bff", left: "14%", delay: 1, duration: 7 },
  { color: "#f8bd2e", left: "24%", delay: 2, duration: 9 },
  { color: "#ff7bab", left: "76%", delay: 0.5, duration: 7.5 },
  { color: "#a97bff", left: "86%", delay: 1.5, duration: 8.5 },
  { color: "#f8bd2e", left: "94%", delay: 2.5, duration: 6.5 },
];

const DODGE_RADIUS = 100;

function randomSpot() {
  // Corners only — keeps clear of the static answer button parked dead center.
  const top = Math.random() < 0.5 ? 8 + Math.random() * 22 : 68 + Math.random() * 22;
  const left = Math.random() < 0.5 ? 8 + Math.random() * 22 : 68 + Math.random() * 22;
  return { top, left };
}

function VerdictQuestion() {
  const [answered, setAnswered] = useState(false);
  const [pos, setPos] = useState(randomSpot);
  const [moveCount, setMoveCount] = useState(0);
  const dodgeRef = useRef<HTMLButtonElement | null>(null);

  function dodge() {
    setPos(randomSpot());
    setMoveCount((c) => c + 1);
  }

  useEffect(() => {
    if (answered) return;

    function handlePointerMove(e: PointerEvent) {
      const btn = dodgeRef.current;
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      if (Math.hypot(dx, dy) < DODGE_RADIUS) dodge();
    }

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [answered]);

  function handleCorrect() {
    setAnswered(true);
    fireConfetti();
  }

  return (
    <div className="glass-card z-10 mb-8 w-full max-w-lg px-6 py-8">
      <h3 className="mb-6 font-display text-xl text-lavender-700 dark:text-lavender-50">
        გვშია + AI, როგორ შეაფასებდით?
      </h3>

      {!answered ? (
        <div className="relative mx-auto h-48 w-full max-w-sm">
          <button
            onClick={handleCorrect}
            className="glow-btn absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            ბეისდ
          </button>

          <AnimatePresence>
            <motion.button
              key={moveCount}
              ref={dodgeRef}
              onClick={dodge}
              onPointerEnter={dodge}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.4 }}
              transition={{ duration: 0.18 }}
              style={{ top: `${pos.top}%`, left: `${pos.left}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-night-800 px-4 py-2 text-sm font-medium text-white shadow-lg"
            >
              ქრიიიიიიინჯ
            </motion.button>
          </AnimatePresence>
        </div>
      ) : (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-lg text-lavender-600 dark:text-lavender-100"
        >
          რასაკვირველია. 👑
        </motion.p>
      )}
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

      <VerdictQuestion />
    </SectionShell>
  );
}
