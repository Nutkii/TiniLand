"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Castle } from "./Castle";
import { Balloon } from "./Balloon";
import { FloatingAmbience } from "@/components/effects/FloatingAmbience";
import { useSite } from "@/components/providers/SiteProvider";

const BALLOONS = [
  { color: "#ff7bab", left: "6%", delay: 0, duration: 7 },
  { color: "#a97bff", left: "16%", delay: 1.2, duration: 8 },
  { color: "#f8bd2e", left: "82%", delay: 0.6, duration: 6.5 },
  { color: "#ff7bab", left: "90%", delay: 1.8, duration: 9 },
  { color: "#a97bff", left: "50%", delay: 2.4, duration: 7.5 },
];

export function EntryGate() {
  const { enterKingdom } = useSite();
  const [opening, setOpening] = useState(false);

  function handleEnter() {
    if (opening) return;
    setOpening(true);
    window.setTimeout(() => {
      enterKingdom();
    }, 1900);
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-blush-100 via-lavender-100 to-lavender-200"
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
    >
      {/* clouds */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {[15, 40, 65, 85].map((top, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/70 blur-sm"
            style={{ top: `${top}%`, left: i % 2 === 0 ? "-10%" : "auto", right: i % 2 !== 0 ? "-10%" : "auto", width: 140, height: 50 }}
            animate={{ x: i % 2 === 0 ? ["0%", "160%"] : ["0%", "-160%"] }}
            transition={{ duration: 30 + i * 6, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </div>

      <FloatingAmbience count={12} />

      {BALLOONS.map((b, i) => (
        <Balloon key={i} {...b} />
      ))}

      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: opening ? 0 : 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="section-title z-10 mb-2 text-center drop-shadow-sm"
      >
        Welcome to TiniLand
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: opening ? 0 : 1 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="z-10 mb-8 text-center font-display text-xl tracking-wide text-lavender-500"
      >
        ბეისდ QUEEN BD
      </motion.p>

      <div className="z-0">
        <Castle gateOpen={opening} />
      </div>

      {!opening && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          onClick={handleEnter}
          className="glow-btn z-10 mt-8 animate-pulse"
        >
          👑 Enter the Kingdom
        </motion.button>
      )}

      {opening && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="z-10 mt-8 font-display text-lg text-lavender-500"
        >
          The gates are opening...
        </motion.p>
      )}
    </motion.div>
  );
}
