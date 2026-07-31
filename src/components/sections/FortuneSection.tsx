"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionShell } from "./SectionShell";
import { FORTUNES } from "@/lib/data";

const SEGMENT_COLORS = ["#ffc9dd", "#dcc9ff", "#ffe58a"];
const SIZE = 300;
const CENTER = SIZE / 2;
const RADIUS = 140;
const SEGMENT_ANGLE = 360 / FORTUNES.length;
const SPIN_MS = 4200;

function polar(angleDeg: number, r: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CENTER + r * Math.cos(rad), y: CENTER + r * Math.sin(rad) };
}

function segmentPath(index: number) {
  const start = -90 + index * SEGMENT_ANGLE;
  const end = start + SEGMENT_ANGLE;
  const p1 = polar(start, RADIUS);
  const p2 = polar(end, RADIUS);
  return `M${CENTER},${CENTER} L${p1.x},${p1.y} A${RADIUS},${RADIUS} 0 0 1 ${p2.x},${p2.y} Z`;
}

function shortLabel(text: string) {
  const words = text.replace(/["]/g, "").split(" ");
  return words.slice(0, 2).join(" ") + (words.length > 2 ? "…" : "");
}

export function FortuneSection() {
  const [fortune, setFortune] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [key, setKey] = useState(0);

  function reveal() {
    if (spinning) return;
    setSpinning(true);
    setFortune(null);

    const index = Math.floor(Math.random() * FORTUNES.length);
    const mid = -90 + index * SEGMENT_ANGLE + SEGMENT_ANGLE / 2;
    const target = (((-90 - mid) % 360) + 360) % 360;
    const current = ((rotation % 360) + 360) % 360;
    const diff = ((target - current) % 360 + 360) % 360;
    const nextRotation = rotation + 5 * 360 + diff;
    setRotation(nextRotation);

    window.setTimeout(() => {
      setFortune(FORTUNES[index]);
      setKey((k) => k + 1);
      setSpinning(false);
    }, SPIN_MS);
  }

  return (
    <SectionShell className="flex flex-col items-center">
      <h2 className="section-title mb-2 text-center">Birthday Fortune</h2>
      <p className="mb-10 text-center text-lavender-600 dark:text-lavender-100">
        Spin the wheel for your extremely scientific fortune.
      </p>

      <div className="relative mb-8 h-[300px] w-[300px]">
        <div
          className="absolute left-1/2 top-[-14px] z-10 h-0 w-0 -translate-x-1/2"
          style={{
            borderLeft: "14px solid transparent",
            borderRight: "14px solid transparent",
            borderTop: "22px solid #8f56f7",
            filter: "drop-shadow(0 0 6px rgba(143,86,247,0.7))",
          }}
        />
        <motion.svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="h-full w-full rounded-full shadow-[0_0_60px_rgba(169,123,255,0.6)]"
          animate={{ rotate: rotation }}
          transition={{ duration: SPIN_MS / 1000, ease: [0.15, 0.65, 0.25, 1] }}
        >
          <circle cx={CENTER} cy={CENTER} r={RADIUS + 4} fill="white" opacity={0.6} />
          {FORTUNES.map((f, i) => {
            const mid = -90 + i * SEGMENT_ANGLE + SEGMENT_ANGLE / 2;
            const labelPos = polar(mid, RADIUS * 0.62);
            return (
              <g key={i}>
                <path d={segmentPath(i)} fill={SEGMENT_COLORS[i % SEGMENT_COLORS.length]} stroke="white" strokeWidth={2} />
                <text
                  x={labelPos.x}
                  y={labelPos.y}
                  textAnchor="middle"
                  fontSize={9}
                  fontWeight={600}
                  fill="#4b2490"
                  transform={`rotate(${Math.cos((mid * Math.PI) / 180) < 0 ? mid + 180 : mid}, ${labelPos.x}, ${labelPos.y})`}
                >
                  {shortLabel(f)}
                </text>
              </g>
            );
          })}
          <circle cx={CENTER} cy={CENTER} r={22} fill="#8f56f7" stroke="white" strokeWidth={3} />
        </motion.svg>
      </div>

      <motion.button
        onClick={reveal}
        disabled={spinning}
        whileHover={{ scale: spinning ? 1 : 1.05 }}
        whileTap={{ scale: spinning ? 1 : 0.95 }}
        className="glow-btn mb-8 disabled:opacity-60"
      >
        {spinning ? "Spinning…" : "Spin the Wheel"}
      </motion.button>

      <AnimatePresence mode="wait">
        {fortune && (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="glass-card max-w-md p-6 text-center font-display text-lg text-lavender-700 dark:text-lavender-50"
          >
            {fortune}
          </motion.div>
        )}
      </AnimatePresence>
    </SectionShell>
  );
}
