"use client";

import { motion } from "framer-motion";

interface BalloonProps {
  color: string;
  left: string;
  delay?: number;
  duration?: number;
  size?: number;
}

export function Balloon({ color, left, delay = 0, duration = 8, size = 60 }: BalloonProps) {
  return (
    <motion.div
      className="absolute bottom-0 flex flex-col items-center"
      style={{ left }}
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: [40, -20, 40], opacity: 1, x: [0, 12, -8, 0] }}
      transition={{
        y: { duration, repeat: Infinity, ease: "easeInOut", delay },
        x: { duration: duration * 1.3, repeat: Infinity, ease: "easeInOut", delay },
        opacity: { duration: 1 },
      }}
    >
      <div
        className="rounded-full shadow-lg"
        style={{
          width: size,
          height: size * 1.2,
          background: `radial-gradient(circle at 30% 30%, white, ${color})`,
        }}
      />
      <div className="h-10 w-px bg-white/60" />
    </motion.div>
  );
}
