"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { SectionShell } from "./SectionShell";
import { GALLERY_PHOTOS } from "@/lib/data";
import { GalleryPhoto } from "@/lib/types";
import { useEscapeKey } from "@/lib/useEscapeKey";

function FlipCard({ photo, onOpen }: { photo: GalleryPhoto; onOpen: () => void }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="perspective-1000 aspect-square">
      <motion.button
        type="button"
        className="preserve-3d relative h-full w-full cursor-pointer"
        onMouseEnter={() => setFlipped(true)}
        onMouseLeave={() => setFlipped(false)}
        onFocus={() => setFlipped(true)}
        onBlur={() => setFlipped(false)}
        onClick={onOpen}
        aria-label={`${photo.caption} — open memory`}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55 }}
      >
        <div
          className={`backface-hidden absolute inset-0 flex items-center justify-center rounded-2xl bg-gradient-to-br ${photo.gradient} text-6xl shadow-lg`}
        >
          {photo.emoji}
        </div>
        <div
          className="backface-hidden glass-card absolute inset-0 flex flex-col items-center justify-center p-4 text-center"
          style={{ transform: "rotateY(180deg)" }}
        >
          <p className="font-display text-lg text-lavender-700 dark:text-lavender-50">
            {photo.caption}
          </p>
          <p className="mt-2 text-xs text-lavender-500 dark:text-lavender-200">
            {photo.memory}
          </p>
        </div>
      </motion.button>
    </div>
  );
}

export function GallerySection() {
  const [active, setActive] = useState<GalleryPhoto | null>(null);
  const close = useCallback(() => setActive(null), []);
  useEscapeKey(active !== null, close);

  return (
    <SectionShell>
      <h2 className="section-title mb-2 text-center">Memory Gallery</h2>
      <p className="mb-8 text-center text-lavender-600 dark:text-lavender-100">
        Hover to flip. Click to zoom in on the chaos.
      </p>

      <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3">
        {GALLERY_PHOTOS.map((photo) => (
          <FlipCard key={photo.id} photo={photo} onOpen={() => setActive(photo)} />
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-night-900/70 p-6 backdrop-blur-sm"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={active.caption}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 30 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className={`glass-card relative w-full max-w-md overflow-hidden bg-gradient-to-br ${active.gradient} p-8 text-center`}
            >
              <button
                onClick={close}
                aria-label="Close"
                className="absolute right-4 top-4 rounded-full bg-white/60 p-1.5 text-lavender-700 hover:bg-white"
              >
                <X size={18} />
              </button>
              <div className="mb-4 text-8xl">{active.emoji}</div>
              <h3 className="font-display text-2xl text-lavender-800">{active.caption}</h3>
              <p className="mt-3 text-lavender-700">{active.memory}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionShell>
  );
}
