"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useSite } from "@/components/providers/SiteProvider";

export function DiscoOverlay() {
  const { discoMode } = useSite();

  return (
    <AnimatePresence>
      {discoMode && (
        <>
          <motion.div
            key="disco-wash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none fixed inset-0 z-[9990] mix-blend-overlay"
            style={{
              background:
                "linear-gradient(120deg, #ff5cad, #ffd452, #6ee7ff, #a97bff, #ff5cad)",
              backgroundSize: "300% 300%",
              animation: "disco-pan 4s linear infinite",
            }}
            aria-hidden="true"
          />
          <motion.div
            key="disco-lights"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.25, 0.6, 0.25] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="pointer-events-none fixed inset-0 z-[9991]"
            style={{
              background:
                "radial-gradient(circle at 20% 20%, rgba(255,92,173,0.5), transparent 40%), radial-gradient(circle at 80% 30%, rgba(110,231,255,0.5), transparent 40%), radial-gradient(circle at 50% 85%, rgba(255,212,82,0.5), transparent 45%)",
            }}
            aria-hidden="true"
          />
          <motion.div
            key="disco-badge"
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1, rotate: [-2, 2, -2] }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ rotate: { duration: 0.8, repeat: Infinity } }}
            className="pointer-events-none fixed left-1/2 top-24 z-[9997] -translate-x-1/2 rounded-full bg-night-900/85 px-6 py-2 font-display text-sm text-white shadow-xl"
            role="status"
          >
            🕺 DISCO MODE ACTIVATED 🪩
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
