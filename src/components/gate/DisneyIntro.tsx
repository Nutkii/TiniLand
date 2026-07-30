"use client";

import { useEffect, useMemo, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Starfield } from "@/components/effects/Starfield";
import { useSite } from "@/components/providers/SiteProvider";

/** Parabolic arc sweeping up over the castle and back down, in viewport %. */
function buildArc(count: number) {
  return Array.from({ length: count }, (_, i) => {
    const t = i / (count - 1);
    return { x: 8 + 84 * t, y: 58 - 40 * Math.sin(Math.PI * t) };
  });
}

/** Quadratic matching buildArc: peak 18 => control y = 2 * 18 - 58. */
const ARC_PATH = "M 8 58 Q 50 -22 92 58";

const SPARKLES = 26;

function CastleSilhouette() {
  return (
    <svg
      viewBox="0 0 400 260"
      className="h-full w-full text-night-900"
      preserveAspectRatio="xMidYMax meet"
      aria-hidden="true"
    >
      <g fill="currentColor">
        {/* outer towers */}
        <rect x="40" y="150" width="26" height="110" />
        <polygon points="53,105 68,150 38,150" />
        <rect x="334" y="150" width="26" height="110" />
        <polygon points="347,105 362,150 332,150" />

        {/* inner towers */}
        <rect x="78" y="120" width="30" height="140" />
        <polygon points="93,68 110,120 76,120" />
        <rect x="292" y="120" width="30" height="140" />
        <polygon points="307,68 324,120 290,120" />

        {/* curtain walls */}
        <rect x="106" y="178" width="56" height="82" />
        <rect x="238" y="178" width="56" height="82" />

        {/* keep */}
        <rect x="160" y="130" width="80" height="130" />
        <polygon points="200,40 246,130 154,130" />

        {/* tallest spire */}
        <rect x="188" y="70" width="24" height="70" />
        <polygon points="200,6 217,70 183,70" />
      </g>

      {/* pennants */}
      <g fill="#f8bd2e">
        <polygon points="200,6 200,20 218,14" />
        <polygon points="93,68 93,80 108,74" />
        <polygon points="307,68 307,80 322,74" />
      </g>

      {/* lit gate + windows */}
      <path
        d="M184 260 L184 214 A16 16 0 0 1 216 214 L216 260 Z"
        fill="#ffe58a"
        opacity="0.9"
      />
      <g fill="#ffd452" opacity="0.75">
        <rect x="170" y="160" width="8" height="14" rx="4" />
        <rect x="222" y="160" width="8" height="14" rx="4" />
        <rect x="88" y="150" width="7" height="12" rx="3.5" />
        <rect x="302" y="150" width="7" height="12" rx="3.5" />
      </g>
    </svg>
  );
}

export function DisneyIntro() {
  const { finishIntro } = useSite();
  const reduceMotion = useReducedMotion();
  const done = useRef(false);
  const arc = useMemo(() => buildArc(SPARKLES), []);

  // Reduced motion gets a short static beat instead of the full sweep.
  const total = reduceMotion ? 1600 : 6000;

  const end = useRef(finishIntro);

  useEffect(() => {
    end.current = finishIntro;
  }, [finishIntro]);

  useEffect(() => {
    function finish() {
      if (done.current) return;
      done.current = true;
      end.current();
    }

    const timer = window.setTimeout(finish, total);
    window.addEventListener("pointerdown", finish);
    window.addEventListener("keydown", finish);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("pointerdown", finish);
      window.removeEventListener("keydown", finish);
    };
  }, [total]);

  const wandStart = 1.3;
  const wandDuration = 1.5;

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-night-900 via-night-800 to-lavender-900"
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      <Starfield dense />

      {/* glow behind the castle so the silhouette reads against the sky.
          Positioning lives on the static wrapper: Framer Motion writes an inline
          transform for scale/y, which would clobber a Tailwind -translate-x-1/2. */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-[70vh] w-[120vw] -translate-x-1/2"
        aria-hidden="true"
      >
        <motion.div
          className="h-full w-full rounded-full bg-radial-fade from-lavender-500/45 via-blush-500/15 to-transparent blur-2xl"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reduceMotion ? 0.3 : 2.2, ease: "easeOut" }}
        />
      </div>

      {/* castle: slow camera push in */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[46vh] w-[min(820px,96vw)] -translate-x-1/2">
        <motion.div
          className="h-full w-full"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 60, scale: reduceMotion ? 1 : 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: reduceMotion ? 0.3 : 2.6, delay: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
        >
          <CastleSilhouette />
        </motion.div>
      </div>

      {!reduceMotion && (
        <>
          {/* the wand's drawn arc */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <motion.path
              d={ARC_PATH}
              fill="none"
              stroke="#fff3c4"
              strokeWidth={1.5}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0, opacity: 0.9 }}
              animate={{ pathLength: 1, opacity: [0.9, 0.9, 0] }}
              transition={{
                pathLength: { duration: wandDuration, delay: wandStart, ease: "easeInOut" },
                opacity: { duration: wandDuration + 1.4, delay: wandStart, times: [0, 0.55, 1] },
              }}
            />
          </svg>

          {/* trail sparkles left behind along the arc */}
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            {arc.map((p, i) => (
              <motion.span
                key={i}
                className="absolute rounded-full bg-gold-100 shadow-[0_0_10px_rgba(255,229,138,0.95)]"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: 3 + (i % 3),
                  height: 3 + (i % 3),
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0], scale: [0, 1.6, 0] }}
                transition={{
                  duration: 1.6,
                  delay: wandStart + (i / (SPARKLES - 1)) * wandDuration,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>

          {/* the wand tip itself */}
          <motion.div
            className="pointer-events-none absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_28px_12px_rgba(255,243,196,0.9)]"
            initial={{ left: `${arc[0].x}%`, top: `${arc[0].y}%`, opacity: 0 }}
            animate={{
              left: arc.map((p) => `${p.x}%`),
              top: arc.map((p) => `${p.y}%`),
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              left: { duration: wandDuration, delay: wandStart, ease: "easeInOut" },
              top: { duration: wandDuration, delay: wandStart, ease: "easeInOut" },
              opacity: {
                duration: wandDuration,
                delay: wandStart,
                times: [0, 0.12, 0.85, 1],
              },
            }}
            aria-hidden="true"
          />
        </>
      )}

      <div className="relative z-10 mb-[18vh] flex flex-col items-center px-6">
        <motion.h1
          initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.18, letterSpacing: "0.3em" }}
          animate={{ opacity: 1, scale: 1, letterSpacing: "0.06em" }}
          transition={{ duration: reduceMotion ? 0.3 : 1.4, delay: reduceMotion ? 0.2 : 2.7, ease: "easeOut" }}
          className="animate-shimmer bg-gradient-to-r from-gold-200 via-white to-gold-300 bg-[length:200%_100%] bg-clip-text text-center font-display text-5xl text-transparent drop-shadow-[0_0_30px_rgba(248,189,46,0.5)] sm:text-7xl"
        >
          TiniLand
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0.3 : 1, delay: reduceMotion ? 0.4 : 3.5 }}
          className="mt-4 text-center font-display text-base tracking-[0.35em] text-gold-100/85 sm:text-lg"
        >
          ბეისდ QUEEN BD
        </motion.p>
      </div>

      <motion.button
        type="button"
        onClick={() => end.current()}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: reduceMotion ? 0.8 : 4.4 }}
        className="absolute bottom-6 z-20 rounded-full px-4 py-2 font-body text-xs tracking-widest text-gold-100/60 transition-colors hover:text-gold-100"
      >
        SKIP ›
      </motion.button>
    </motion.div>
  );
}
