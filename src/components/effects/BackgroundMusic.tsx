"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const VIDEO_ID = "5u4xTa3LR2U";

export function BackgroundMusic() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [muted, setMuted] = useState(true);

  function postCommand(func: string) {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args: [] }),
      "*"
    );
  }

  function toggle() {
    if (muted) {
      postCommand("unMute");
      postCommand("playVideo");
      setMuted(false);
    } else {
      postCommand("mute");
      setMuted(true);
    }
  }

  useEffect(() => {
    postCommand("playVideo");
  }, []);

  return (
    <>
      <iframe
        ref={iframeRef}
        className="pointer-events-none fixed -left-[9999px] -top-[9999px] h-1 w-1 opacity-0"
        src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${VIDEO_ID}&controls=0&enablejsapi=1`}
        allow="autoplay"
        title="Background music"
        aria-hidden="true"
        tabIndex={-1}
      />
      <button
        onClick={toggle}
        aria-label={muted ? "Turn on background music" : "Turn off background music"}
        aria-pressed={!muted}
        title={muted ? "Turn on background music" : "Turn off background music"}
        className="glass-card fixed bottom-6 right-6 z-50 rounded-full p-3 text-lavender-700 shadow-lg hover:bg-white/80 dark:text-lavender-50"
      >
        {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>
    </>
  );
}
