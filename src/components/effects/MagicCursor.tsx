"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface Sparkle {
  id: number;
  x: number;
  y: number;
}

const FINE_POINTER_QUERY = "(pointer: fine)";

function subscribeToPointer(onChange: () => void) {
  const mql = window.matchMedia(FINE_POINTER_QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

function useHasFinePointer() {
  return useSyncExternalStore(
    subscribeToPointer,
    () => window.matchMedia(FINE_POINTER_QUERY).matches,
    () => false
  );
}

export function MagicCursor() {
  const enabled = useHasFinePointer();
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const idRef = useRef(0);
  const lastSpawn = useRef(0);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 25, stiffness: 300, mass: 0.4 });
  const springY = useSpring(y, { damping: 25, stiffness: 300, mass: 0.4 });

  useEffect(() => {
    if (!enabled) return;

    function handleMove(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);

      const now = Date.now();
      if (now - lastSpawn.current > 90) {
        lastSpawn.current = now;
        const id = idRef.current++;
        setSparkles((prev) => [...prev.slice(-14), { id, x: e.clientX, y: e.clientY }]);
      }
    }

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden="true">
      {sparkles.map((s) => (
        <motion.span
          key={s.id}
          className="absolute text-sm"
          style={{ left: s.x, top: s.y }}
          initial={{ opacity: 0.9, scale: 0.8, x: -6, y: -6 }}
          animate={{ opacity: 0, scale: 1.3, y: -6 - 20 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          onAnimationComplete={() =>
            setSparkles((prev) => prev.filter((p) => p.id !== s.id))
          }
        >
          ✨
        </motion.span>
      ))}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 text-xl drop-shadow-[0_0_6px_rgba(248,189,46,0.8)]"
        style={{ left: springX, top: springY }}
      >
        👑
      </motion.div>
    </div>
  );
}
