"use client";

import { useMemo } from "react";

interface Star {
  id: number;
  top: number;
  left: number;
  size: number;
  delay: number;
}

function seedStars(count: number): Star[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    top: (i * 53.7) % 100,
    left: (i * 91.3) % 100,
    size: 1 + (i % 3),
    delay: (i % 12) * 0.25,
  }));
}

export function Starfield({ dense = false }: { dense?: boolean }) {
  const stars = useMemo(() => seedStars(dense ? 140 : 60), [dense]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
