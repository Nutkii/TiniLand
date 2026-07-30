"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Pencil, X } from "lucide-react";
import { SectionShell } from "./SectionShell";
import { GALLERY_PHOTOS } from "@/lib/data";
import { GalleryPhoto } from "@/lib/types";
import { useEscapeKey } from "@/lib/useEscapeKey";
import { loadCaptionOverrides, saveCaptionOverride, GalleryCaptionOverride } from "@/lib/galleryCaptions";

type OverrideMap = Record<string, GalleryCaptionOverride>;

function effectiveText(photo: GalleryPhoto, overrides: OverrideMap): GalleryCaptionOverride {
  return overrides[photo.id] ?? { caption: photo.caption, memory: photo.memory };
}

function FlipCard({
  photo,
  overrides,
  onOpen,
}: {
  photo: GalleryPhoto;
  overrides: OverrideMap;
  onOpen: () => void;
}) {
  const [flipped, setFlipped] = useState(false);
  const text = effectiveText(photo, overrides);

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
        aria-label={`${text.caption} — open memory`}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55 }}
      >
        <div
          className={`backface-hidden absolute inset-0 overflow-hidden rounded-2xl bg-gradient-to-br ${photo.gradient} shadow-lg`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo.src}
            alt={photo.alt}
            className="h-full w-full object-cover"
          />
        </div>
        <div
          className="backface-hidden glass-card absolute inset-0 flex flex-col items-center justify-center p-4 text-center"
          style={{ transform: "rotateY(180deg)" }}
        >
          <p className="font-display text-lg text-lavender-700 dark:text-lavender-50">
            {text.caption}
          </p>
          <p className="mt-2 text-xs text-lavender-500 dark:text-lavender-200">
            {text.memory}
          </p>
        </div>
      </motion.button>
    </div>
  );
}

export function GallerySection() {
  const [active, setActive] = useState<GalleryPhoto | null>(null);
  const [overrides, setOverrides] = useState<OverrideMap>(loadCaptionOverrides);
  const [editing, setEditing] = useState(false);
  const [draftCaption, setDraftCaption] = useState("");
  const [draftMemory, setDraftMemory] = useState("");

  const close = useCallback(() => {
    setActive(null);
    setEditing(false);
  }, []);
  useEscapeKey(active !== null, close);

  function openPhoto(photo: GalleryPhoto) {
    setActive(photo);
    setEditing(false);
  }

  function startEditing() {
    if (!active) return;
    const text = effectiveText(active, overrides);
    setDraftCaption(text.caption);
    setDraftMemory(text.memory);
    setEditing(true);
  }

  function saveEditing() {
    if (!active) return;
    const next = saveCaptionOverride(active.id, {
      caption: draftCaption.trim() || active.caption,
      memory: draftMemory.trim() || active.memory,
    });
    setOverrides(next);
    setEditing(false);
  }

  const activeText = active ? effectiveText(active, overrides) : null;

  return (
    <SectionShell>
      <h2 className="section-title mb-2 text-center">Memory Gallery</h2>
      <p className="mb-8 text-center text-lavender-600 dark:text-lavender-100">
        Hover to flip. Click to zoom in on the chaos. Click the pencil to add your own caption.
      </p>

      <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3">
        {GALLERY_PHOTOS.map((photo) => (
          <FlipCard
            key={photo.id}
            photo={photo}
            overrides={overrides}
            onOpen={() => openPhoto(photo)}
          />
        ))}
      </div>

      <AnimatePresence>
        {active && activeText && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-night-900/70 p-6 backdrop-blur-sm"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={activeText.caption}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 30 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className={`glass-card relative w-full max-w-md overflow-hidden bg-gradient-to-br ${active.gradient} p-6 text-center`}
            >
              <button
                onClick={close}
                aria-label="Close"
                className="absolute right-4 top-4 z-10 rounded-full bg-white/60 p-1.5 text-lavender-700 hover:bg-white"
              >
                <X size={18} />
              </button>
              {!editing && (
                <button
                  onClick={startEditing}
                  aria-label="Edit caption"
                  className="absolute left-4 top-4 z-10 rounded-full bg-white/60 p-1.5 text-lavender-700 hover:bg-white"
                >
                  <Pencil size={16} />
                </button>
              )}

              <div className="mb-4 aspect-square w-full overflow-hidden rounded-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={active.src}
                  alt={active.alt}
                  className="h-full w-full object-cover"
                />
              </div>

              {editing ? (
                <div className="flex flex-col gap-2 text-left">
                  <label className="text-xs font-medium text-lavender-700">
                    Caption
                    <input
                      value={draftCaption}
                      onChange={(e) => setDraftCaption(e.target.value)}
                      className="mt-1 w-full rounded-full border border-white/50 bg-white/80 px-3 py-1.5 text-sm outline-none"
                    />
                  </label>
                  <label className="text-xs font-medium text-lavender-700">
                    Memory
                    <textarea
                      value={draftMemory}
                      onChange={(e) => setDraftMemory(e.target.value)}
                      rows={3}
                      className="mt-1 w-full rounded-2xl border border-white/50 bg-white/80 px-3 py-1.5 text-sm outline-none"
                    />
                  </label>
                  <div className="mt-1 flex justify-end gap-2">
                    <button
                      onClick={() => setEditing(false)}
                      className="rounded-full px-3 py-1.5 text-xs text-lavender-600 hover:bg-white/60"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={saveEditing}
                      className="rounded-full bg-lavender-400 px-3 py-1.5 text-xs text-white"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="font-display text-2xl text-lavender-800">{activeText.caption}</h3>
                  <p className="mt-3 text-lavender-700">{activeText.memory}</p>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionShell>
  );
}
