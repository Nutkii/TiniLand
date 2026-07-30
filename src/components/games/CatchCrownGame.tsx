"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { fireConfetti } from "@/lib/confetti";

interface FallingItem {
  id: number;
  x: number;
  y: number;
  speed: number;
  type: "crown" | "broccoli";
}

const GAME_SECONDS = 30;
const AREA_HEIGHT = 380;

export function CatchCrownGame({ onScore }: { onScore: (score: number) => void }) {
  const [playing, setPlaying] = useState(false);
  const [items, setItems] = useState<FallingItem[]>([]);
  const [basketX, setBasketX] = useState(50);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_SECONDS);
  const [ended, setEnded] = useState(false);

  const idRef = useRef(0);
  const basketRef = useRef(50);
  const areaRef = useRef<HTMLDivElement>(null);
  const spawnRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function start() {
    setItems([]);
    basketRef.current = 50;
    setBasketX(50);
    setScore(0);
    setTimeLeft(GAME_SECONDS);
    setEnded(false);
    setPlaying(true);
  }

  useEffect(() => {
    if (!playing) return;

    spawnRef.current = setInterval(() => {
      setItems((prev) => [
        ...prev,
        {
          id: idRef.current++,
          x: 8 + Math.random() * 84,
          y: -8,
          speed: 3.5 + Math.random() * 3,
          type: Math.random() < 0.72 ? "crown" : "broccoli",
        },
      ]);
    }, 650);

    tickRef.current = setInterval(() => {
      setItems((prev) => {
        const next: FallingItem[] = [];
        let delta = 0;
        for (const item of prev) {
          const newY = item.y + item.speed;
          if (newY >= 80 && Math.abs(item.x - basketRef.current) < 11) {
            delta += item.type === "crown" ? 1 : -1;
            continue;
          }
          if (newY > 100) continue;
          next.push({ ...item, y: newY });
        }
        if (delta !== 0) {
          setScore((s) => {
            const updated = Math.max(0, s + delta);
            if (delta > 0 && updated > 0 && updated % 5 === 0) fireConfetti();
            return updated;
          });
        }
        return next;
      });
    }, 60);

    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setPlaying(false);
          setEnded(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => {
      if (spawnRef.current) clearInterval(spawnRef.current);
      if (tickRef.current) clearInterval(tickRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [playing]);

  useEffect(() => {
    if (ended) onScore(score);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ended]);

  useEffect(() => {
    if (!playing) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.preventDefault();
      const step = e.key === "ArrowLeft" ? -7 : 7;
      const next = Math.min(96, Math.max(4, basketRef.current + step));
      basketRef.current = next;
      setBasketX(next);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [playing]);

  function handlePointerMove(e: React.PointerEvent) {
    const rect = areaRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = Math.min(96, Math.max(4, ((e.clientX - rect.left) / rect.width) * 100));
    basketRef.current = pct;
    setBasketX(pct);
  }

  return (
    <div className="flex flex-col items-center">
      <p className="mb-3 text-lavender-600 dark:text-lavender-100">
        Catch the crowns 👑, dodge the broccoli 🥦. Steer with your mouse, finger, or
        arrow keys.
      </p>

      {!playing && !ended && (
        <button onClick={start} className="glow-btn mb-4">
          Start Game
        </button>
      )}

      {playing && (
        <div className="mb-3 flex gap-6 font-display text-lavender-700 dark:text-lavender-50">
          <span>Score: {score}</span>
          <span>Time: {timeLeft}s</span>
        </div>
      )}

      {(playing || items.length > 0) && (
        <div
          ref={areaRef}
          onPointerMove={handlePointerMove}
          className="relative h-[380px] w-full max-w-md touch-none overflow-hidden rounded-3xl border border-white/40 bg-gradient-to-b from-lavender-100 to-blush-100 dark:from-night-800 dark:to-night-700"
          style={{ height: AREA_HEIGHT }}
        >
          {items.map((item) => (
            <span
              key={item.id}
              className="absolute -translate-x-1/2 text-3xl"
              style={{ left: `${item.x}%`, top: `${item.y}%` }}
            >
              {item.type === "crown" ? "👑" : "🥦"}
            </span>
          ))}
          <motion.div
            className="absolute bottom-2 -translate-x-1/2 text-4xl"
            style={{ left: `${basketX}%` }}
          >
            🧺
          </motion.div>
        </div>
      )}

      {ended && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card mt-4 p-6 text-center"
        >
          <p className="mb-2 text-4xl">{score >= 12 ? "👑" : "🥦"}</p>
          <p className="mb-3 font-display text-xl text-lavender-700 dark:text-lavender-50">
            Final Score: {score}
          </p>
          <button onClick={start} className="glow-btn">
            Play Again
          </button>
        </motion.div>
      )}
    </div>
  );
}
