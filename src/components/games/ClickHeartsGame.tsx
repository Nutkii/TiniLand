"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { fireConfetti } from "@/lib/confetti";

const GAME_SECONDS = 15;

export function ClickHeartsGame({ onScore }: { onScore: (score: number) => void }) {
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_SECONDS);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [popId, setPopId] = useState(0);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function randomPos() {
    return { x: 10 + Math.random() * 80, y: 12 + Math.random() * 70 };
  }

  function start() {
    setScore(0);
    setTimeLeft(GAME_SECONDS);
    setEnded(false);
    setPlaying(true);
    setPos(randomPos());
  }

  useEffect(() => {
    if (!playing) return;
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
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [playing]);

  useEffect(() => {
    if (ended) onScore(score);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ended]);

  function handleClick() {
    setScore((s) => s + 1);
    setPopId((p) => p + 1);
    setPos(randomPos());
    if ((score + 1) % 10 === 0) fireConfetti();
  }

  return (
    <div className="flex flex-col items-center">
      <p className="mb-3 text-lavender-600 dark:text-lavender-100">
        Click as many hearts as you can before time runs out!
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

      {playing && (
        <div className="relative h-[380px] w-full max-w-md overflow-hidden rounded-3xl border border-white/40 bg-gradient-to-b from-blush-100 to-lavender-100 dark:from-night-800 dark:to-night-700">
          <motion.button
            key={popId}
            onClick={handleClick}
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 0.25 }}
            className="absolute -translate-x-1/2 -translate-y-1/2 text-5xl"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            aria-label="Click the heart"
          >
            💖
          </motion.button>
        </div>
      )}

      {ended && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card mt-4 p-6 text-center"
        >
          <p className="mb-2 text-4xl">{score >= 20 ? "💘" : "💖"}</p>
          <p className="mb-3 font-display text-xl text-lavender-700 dark:text-lavender-50">
            Final Score: {score} hearts
          </p>
          <button onClick={start} className="glow-btn">
            Play Again
          </button>
        </motion.div>
      )}
    </div>
  );
}
