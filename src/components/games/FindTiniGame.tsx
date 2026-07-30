"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fireBigConfetti } from "@/lib/confetti";

const EMOJIS = ["👑", "💖", "🎂", "⭐", "🦋", "🌙"];

interface Card {
  id: number;
  emoji: string;
  matched: boolean;
}

function buildDeck(): Card[] {
  const deck = [...EMOJIS, ...EMOJIS].map((emoji, i) => ({
    id: i,
    emoji,
    matched: false,
  }));
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

export function FindTiniGame({ onScore }: { onScore: (score: number) => void }) {
  const [deck, setDeck] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [started, setStarted] = useState(false);

  const won = started && deck.length > 0 && deck.every((c) => c.matched);

  function start() {
    setDeck(buildDeck());
    setFlipped([]);
    setMoves(0);
    setStarted(true);
  }

  function handleFlip(index: number) {
    if (flipped.length === 2) return;
    if (flipped.includes(index) || deck[index].matched) return;

    const nextFlipped = [...flipped, index];
    setFlipped(nextFlipped);

    if (nextFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = nextFlipped;
      if (deck[a].emoji === deck[b].emoji) {
        window.setTimeout(() => {
          setDeck((prev) =>
            prev.map((c, i) => (i === a || i === b ? { ...c, matched: true } : c))
          );
          setFlipped([]);
        }, 400);
      } else {
        window.setTimeout(() => setFlipped([]), 800);
      }
    }
  }

  useEffect(() => {
    if (!won) return;
    fireBigConfetti();
    onScore(moves);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [won]);

  return (
    <div className="flex flex-col items-center">
      <p className="mb-3 text-center text-lavender-600 dark:text-lavender-100">
        Find Tini! Flip cards and match every pair.
      </p>

      {!started && (
        <button onClick={start} className="glow-btn mb-4">
          Start Game
        </button>
      )}

      {started && (
        <>
          <p className="mb-3 font-display text-lavender-700 dark:text-lavender-50">
            Moves: {moves}
          </p>
          <div className="grid grid-cols-4 gap-3">
            {deck.map((card, i) => {
              const isFlipped = flipped.includes(i) || card.matched;
              return (
                <div key={card.id} className="perspective-1000 h-16 w-16 sm:h-20 sm:w-20">
                  <motion.button
                    onClick={() => handleFlip(i)}
                    className="preserve-3d relative h-full w-full"
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.4 }}
                    aria-label="Memory card"
                  >
                    <div className="backface-hidden absolute inset-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-lavender-300 to-blush-300 text-2xl text-white shadow">
                      ❓
                    </div>
                    <div
                      className="backface-hidden absolute inset-0 flex items-center justify-center rounded-xl bg-white text-3xl shadow dark:bg-white/10"
                      style={{ transform: "rotateY(180deg)" }}
                    >
                      {card.emoji}
                    </div>
                  </motion.button>
                </div>
              );
            })}
          </div>
        </>
      )}

      {won && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card mt-6 p-6 text-center"
        >
          <p className="mb-2 text-4xl">🎉</p>
          <p className="mb-3 font-display text-xl text-lavender-700 dark:text-lavender-50">
            Found Tini in {moves} moves!
          </p>
          <button onClick={start} className="glow-btn">
            Play Again
          </button>
        </motion.div>
      )}
    </div>
  );
}
