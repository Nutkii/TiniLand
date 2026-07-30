"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { SectionShell } from "./SectionShell";

const TRACKLIST = [
  "Tini's Main Character Anthem",
  "3am Voice Note (The Remix)",
  "Chaos but Make It Catchy",
  "Drama Detected (Interlude)",
  "Certified Queen Theme Song",
];

function toEmbedUrl(raw: string): string | null {
  try {
    const url = new URL(raw.trim());
    if (url.hostname.includes("open.spotify.com")) {
      return raw.replace("open.spotify.com/", "open.spotify.com/embed/");
    }
    if (url.hostname.includes("youtube.com") || url.hostname.includes("youtu.be")) {
      return raw;
    }
    return null;
  } catch {
    return null;
  }
}

export function MusicSection() {
  const [playing, setPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [inputUrl, setInputUrl] = useState("");
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);

  const currentTrack = TRACKLIST[trackIndex];
  const validEmbed = useMemo(() => embedUrl, [embedUrl]);

  function handleLoadPlaylist(e: React.FormEvent) {
    e.preventDefault();
    setEmbedUrl(toEmbedUrl(inputUrl));
  }

  return (
    <SectionShell className="flex flex-col items-center">
      <h2 className="section-title mb-2 text-center">Music</h2>
      <p className="mb-8 text-center text-lavender-600 dark:text-lavender-100">
        The official TiniLand soundtrack.
      </p>

      <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start">
        <div className="flex flex-col items-center gap-4">
          <div className="relative flex h-48 w-48 items-center justify-center">
            <motion.div
              className="absolute h-full w-full rounded-full bg-gradient-to-br from-night-900 via-lavender-700 to-night-900 shadow-xl"
              animate={playing ? { rotate: 360 } : {}}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute inset-6 rounded-full border border-white/10" />
              <div className="absolute inset-12 rounded-full border border-white/10" />
              <div className="absolute inset-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-gold-300 to-blush-400" />
            </motion.div>
          </div>
          <button
            onClick={() => setPlaying((p) => !p)}
            className="glow-btn flex items-center gap-2"
            aria-pressed={playing}
          >
            {playing ? <Pause size={18} /> : <Play size={18} />}
            {playing ? "Pause" : "Play"}
          </button>
          <p className="text-center text-sm text-lavender-500 dark:text-lavender-200">
            Now spinning: {currentTrack}
          </p>
        </div>

        <div className="glass-card w-full max-w-sm p-4">
          <h3 className="mb-3 font-display text-lg text-lavender-700 dark:text-lavender-50">
            Playlist
          </h3>
          <ul className="space-y-1">
            {TRACKLIST.map((track, i) => (
              <li key={track}>
                <button
                  onClick={() => setTrackIndex(i)}
                  className={`w-full rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                    i === trackIndex
                      ? "bg-gradient-to-r from-blush-300 to-lavender-300 text-white"
                      : "hover:bg-white/60 dark:hover:bg-white/10"
                  }`}
                >
                  {i + 1}. {track}
                </button>
              </li>
            ))}
          </ul>

          <form onSubmit={handleLoadPlaylist} className="mt-4 flex gap-2">
            <input
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="Paste a Spotify/YouTube playlist link"
              className="min-w-0 flex-1 rounded-full border border-white/50 bg-white/70 px-3 py-2 text-xs outline-none dark:border-white/10 dark:bg-white/5"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-lavender-400 px-3 py-2 text-xs text-white"
            >
              Load
            </button>
          </form>

          {validEmbed && (
            <div className="mt-4 overflow-hidden rounded-2xl">
              <iframe
                src={validEmbed}
                width="100%"
                height="152"
                style={{ border: 0 }}
                allow="autoplay; encrypted-media"
                loading="lazy"
                title="Embedded playlist"
              />
            </div>
          )}
        </div>
      </div>
    </SectionShell>
  );
}
