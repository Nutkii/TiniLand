"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

const ICONS = ["💖", "✨", "🦋", "☁️", "🌸", "⭐"];

interface Particle {
  id: number;
  icon: string;
  left: number;
  size: number;
  duration: number;
  delay: number;
}

function seedParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    icon: ICONS[i % ICONS.length],
    left: (i * 137.5) % 100,
    size: 14 + ((i * 7) % 18),
    duration: 14 + (i % 10),
    delay: (i % 8) * -2,
  }));
}

export function FloatingAmbience({ count = 18 }: { count?: number }) {
  const particles = useMemo(() => seedParticles(count), [count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute opacity-60"
          style={{ left: `${p.left}%`, fontSize: p.size, top: "110%" }}
          animate={{ top: "-10%", x: [0, 20, -15, 0] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {p.icon}
        </motion.span>
      ))}
    </div>
  );
}
