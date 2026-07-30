"use client";

import { motion } from "framer-motion";

function Tower({ height, className }: { height: number; className?: string }) {
  return (
    <div className={`relative flex flex-col items-center ${className ?? ""}`}>
      <div className="w-1.5 origin-bottom bg-gold-400" style={{ height: 20 }} />
      <motion.div
        className="absolute -top-0.5 left-[calc(50%+1px)] h-3.5 w-5 origin-left bg-blush-400"
        style={{ clipPath: "polygon(0 0, 100% 50%, 0 100%)" }}
        animate={{ rotate: [-4, 4, -4] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        className="h-0 w-0 border-x-[26px] border-b-[36px] border-x-transparent border-b-lavender-400 drop-shadow-md"
      />
      <div
        className="rounded-t-md bg-gradient-to-b from-cream to-blush-100 shadow-inner"
        style={{ width: 52, height }}
      >
        <div className="mx-auto mt-2 h-4 w-4 rounded-full bg-lavender-300/70" />
      </div>
    </div>
  );
}

export function Castle({ gateOpen }: { gateOpen: boolean }) {
  return (
    <div className="relative mx-auto flex h-[220px] w-[300px] items-end justify-center sm:h-[280px] sm:w-[420px]">
      {/* Back towers */}
      <div className="absolute bottom-0 left-2 sm:left-4">
        <Tower height={90} />
      </div>
      <div className="absolute bottom-0 right-2 sm:right-4">
        <Tower height={90} />
      </div>

      {/* Central keep */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative flex flex-col items-center">
          <motion.div
            className="absolute -top-2 left-[calc(50%+2px)] h-4 w-7 origin-left bg-blush-400"
            style={{ clipPath: "polygon(0 0, 100% 50%, 0 100%)" }}
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="h-6 w-1.5 bg-gold-400" />
          <div className="h-0 w-0 border-x-[46px] border-b-[44px] border-x-transparent border-b-lavender-400 drop-shadow-md" />
        </div>
        <div className="mb-1 flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-3 w-3 bg-gold-300" />
          ))}
        </div>
        <div className="relative h-[130px] w-[180px] rounded-t-2xl bg-gradient-to-b from-cream via-blush-50 to-lavender-100 shadow-[0_0_40px_rgba(255,196,221,0.6)] sm:h-[170px] sm:w-[220px]">
          {/* windows */}
          <div className="absolute left-4 top-6 h-6 w-4 rounded-t-full bg-lavender-300/80 sm:left-6" />
          <div className="absolute right-4 top-6 h-6 w-4 rounded-t-full bg-lavender-300/80 sm:right-6" />

          {/* Gate arch */}
          <div className="absolute bottom-0 left-1/2 h-20 w-20 -translate-x-1/2 overflow-hidden rounded-t-full bg-night-900/80 sm:h-24 sm:w-24">
            <div className="absolute inset-0 bg-gradient-to-b from-gold-200/40 to-transparent" />
            {/* Doors */}
            <motion.div
              className="absolute inset-y-0 left-0 w-1/2 origin-left border-r border-gold-300/40 bg-gradient-to-br from-lavender-500 to-blush-500"
              animate={{ x: gateOpen ? "-100%" : "0%" }}
              transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
            >
              <div className="absolute right-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-gold-200" />
            </motion.div>
            <motion.div
              className="absolute inset-y-0 right-0 w-1/2 origin-right border-l border-gold-300/40 bg-gradient-to-bl from-lavender-500 to-blush-500"
              animate={{ x: gateOpen ? "100%" : "0%" }}
              transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
            >
              <div className="absolute left-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-gold-200" />
            </motion.div>
            {gateOpen && (
              <motion.div
                className="absolute inset-0 bg-gold-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.9, 0] }}
                transition={{ duration: 1.4 }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
