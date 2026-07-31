"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Starfield } from "@/components/effects/Starfield";
import { FloatingAmbience } from "@/components/effects/FloatingAmbience";
import { Balloon } from "@/components/gate/Balloon";
import { CakeCandles } from "@/components/gate/CakeCandles";
import { useSite } from "@/components/providers/SiteProvider";

type Phase = "intro" | "ready" | "opening" | "cake";

const BALLOONS = [
  { color: "#ff7bab", left: "6%", delay: 0, duration: 7 },
  { color: "#a97bff", left: "16%", delay: 1.2, duration: 8 },
  { color: "#f8bd2e", left: "82%", delay: 0.6, duration: 6.5 },
  { color: "#ff7bab", left: "90%", delay: 1.8, duration: 9 },
  { color: "#a97bff", left: "50%", delay: 2.4, duration: 7.5 },
];

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

/** The one castle silhouette shared by the wand-sweep intro and the gate opening. */
function CastleSilhouette({ gateOpen }: { gateOpen: boolean }) {
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

      {/* windows */}
      <g fill="#ffd452" opacity="0.75">
        <rect x="170" y="160" width="8" height="14" rx="4" />
        <rect x="222" y="160" width="8" height="14" rx="4" />
        <rect x="88" y="150" width="7" height="12" rx="3.5" />
        <rect x="302" y="150" width="7" height="12" rx="3.5" />
      </g>

      {/* gate: lit archway with two doors that slide open */}
      <clipPath id="gateArch">
        <path d="M184 260 L184 214 A16 16 0 0 1 216 214 L216 260 Z" />
      </clipPath>
      <g clipPath="url(#gateArch)">
        <rect x="184" y="210" width="32" height="50" fill="#ffe58a" opacity="0.9" />
        <motion.rect
          y={210}
          width={17}
          height={50}
          fill="currentColor"
          initial={false}
          animate={{ x: gateOpen ? 168 : 184 }}
          transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
        />
        <motion.rect
          y={210}
          width={17}
          height={50}
          fill="currentColor"
          initial={false}
          animate={{ x: gateOpen ? 216 : 199 }}
          transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
        />
        {gateOpen && (
          <motion.rect
            x={184}
            y={210}
            width={32}
            height={50}
            fill="#fff3c4"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.9, 0] }}
            transition={{ duration: 1.4 }}
          />
        )}
      </g>
    </svg>
  );
}

export function GateSequence() {
  const { finishIntro, enterKingdom } = useSite();
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("intro");
  const advanced = useRef(false);
  const arc = useMemo(() => buildArc(SPARKLES), []);

  const introTotal = reduceMotion ? 1400 : 5800;
  const wandStart = 1.3;
  const wandDuration = 1.5;

  function advanceIntro() {
    if (advanced.current) return;
    advanced.current = true;
    finishIntro();
    setPhase("ready");
  }

  useEffect(() => {
    if (phase !== "intro") return;

    const timer = window.setTimeout(advanceIntro, introTotal);
    window.addEventListener("pointerdown", advanceIntro);
    window.addEventListener("keydown", advanceIntro);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("pointerdown", advanceIntro);
      window.removeEventListener("keydown", advanceIntro);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, introTotal]);

  function handleEnter() {
    if (phase !== "ready") return;
    setPhase("opening");
    window.setTimeout(() => setPhase("cake"), 1900);
  }

  const night = phase === "intro";
  const gateOpen = phase === "opening" || phase === "cake";

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
    >
      {/* night sky, fading out once the gate is ready to be entered */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-night-900 via-night-800 to-lavender-900"
        initial={{ opacity: night ? 1 : 0 }}
        animate={{ opacity: night ? 1 : 0 }}
        transition={{ duration: 1.4 }}
      >
        <Starfield dense />
      </motion.div>

      {/* daytime kingdom sky, fading in for the gate + cake */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-blush-100 via-lavender-100 to-lavender-200"
        initial={{ opacity: night ? 0 : 1 }}
        animate={{ opacity: night ? 0 : 1 }}
        transition={{ duration: 1.4 }}
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {[15, 40, 65, 85].map((top, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/70 blur-sm"
              style={{
                top: `${top}%`,
                left: i % 2 === 0 ? "-10%" : "auto",
                right: i % 2 !== 0 ? "-10%" : "auto",
                width: 140,
                height: 50,
              }}
              animate={{ x: i % 2 === 0 ? ["0%", "160%"] : ["0%", "-160%"] }}
              transition={{ duration: 30 + i * 6, repeat: Infinity, ease: "linear" }}
            />
          ))}
        </div>
        <FloatingAmbience count={12} />
        {BALLOONS.map((b, i) => (
          <Balloon key={i} {...b} />
        ))}
      </motion.div>

      {/* glow behind the castle */}
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

      {/* the one castle, carried from the wand-sweep intro straight into the gate opening */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[46vh] w-[min(820px,96vw)] -translate-x-1/2">
        <motion.div
          className="h-full w-full"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 60, scale: reduceMotion ? 1 : 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: reduceMotion ? 0.3 : 2.6, delay: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
        >
          <CastleSilhouette gateOpen={gateOpen} />
        </motion.div>
      </div>

      {!reduceMotion && phase === "intro" && (
        <>
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
              opacity: { duration: wandDuration, delay: wandStart, times: [0, 0.12, 0.85, 1] },
            }}
            aria-hidden="true"
          />
        </>
      )}

      <AnimatePresence mode="wait">
        {phase === "intro" && (
          <motion.div
            key="intro-title"
            className="relative z-10 mb-[18vh] flex flex-col items-center px-6"
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
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

            <motion.button
              type="button"
              onClick={advanceIntro}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: reduceMotion ? 0.8 : 4.4 }}
              className="mt-8 rounded-full px-4 py-2 font-body text-xs tracking-widest text-gold-100/60 transition-colors hover:text-gold-100"
            >
              SKIP ›
            </motion.button>
          </motion.div>
        )}

        {phase === "ready" && (
          <motion.div
            key="gate-title"
            className="relative z-10 mb-[18vh] flex flex-col items-center px-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.6 } }}
          >
            <h1 className="section-title mb-2 text-center drop-shadow-sm">Welcome to TiniLand</h1>
            <p className="mb-8 text-center font-display text-xl tracking-wide text-lavender-500">
              ბეისდ QUEEN BD
            </p>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              onClick={handleEnter}
              className="glow-btn animate-pulse"
            >
              👑 Enter the Kingdom
            </motion.button>
          </motion.div>
        )}

        {phase === "opening" && (
          <motion.p
            key="opening-line"
            className="relative z-10 mb-[18vh] font-display text-lg text-lavender-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            The gates are opening...
          </motion.p>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase === "cake" && <CakeCandles key="cake" onComplete={enterKingdom} />}
      </AnimatePresence>
    </motion.div>
  );
}
