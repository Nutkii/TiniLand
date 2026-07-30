"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionShell } from "./SectionShell";
import { JOKE_CARDS } from "@/lib/data";
import { JokeCard } from "@/lib/types";

function Flip({ card }: { card: JokeCard }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="perspective-1000 h-48">
      <motion.button
        onClick={() => setOpen((o) => !o)}
        className="preserve-3d relative h-full w-full text-left"
        animate={{ rotateY: open ? 180 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="backface-hidden glass-card absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
          <span className="text-3xl">😂</span>
          <p className="font-display text-lavender-700 dark:text-lavender-50">{card.front}</p>
          <span className="text-xs text-lavender-400">tap to reveal</span>
        </div>
        <div
          className="backface-hidden absolute inset-0 flex items-center justify-center rounded-3xl bg-gradient-to-br from-gold-200 to-blush-200 p-4 text-center shadow-lg"
          style={{ transform: "rotateY(180deg)" }}
        >
          <p className="font-medium text-lavender-800">{card.back}</p>
        </div>
      </motion.button>
    </div>
  );
}

export function JokesSection() {
  return (
    <SectionShell>
      <h2 className="section-title mb-2 text-center">Inside Jokes</h2>
      <p className="mb-8 text-center text-lavender-600 dark:text-lavender-100">
        Flip a card. Relive the chaos.
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {JOKE_CARDS.map((card) => (
          <Flip key={card.id} card={card} />
        ))}
      </div>
    </SectionShell>
  );
}
