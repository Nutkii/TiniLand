"use client";

import { useEffect, useState } from "react";

export function Typewriter({
  lines,
  speed = 45,
  lineDelay = 500,
  className = "",
}: {
  lines: string[];
  speed?: number;
  lineDelay?: number;
  className?: string;
}) {
  const [lineIndex, setLineIndex] = useState(0);
  const [text, setText] = useState("");
  const [renderedLines, setRenderedLines] = useState(lines);

  if (renderedLines !== lines) {
    setRenderedLines(lines);
    setLineIndex(0);
    setText("");
  }

  useEffect(() => {
    if (lineIndex >= lines.length) return;
    const full = lines[lineIndex];

    if (text.length < full.length) {
      const t = window.setTimeout(() => setText(full.slice(0, text.length + 1)), speed);
      return () => clearTimeout(t);
    }

    const t = window.setTimeout(() => {
      setLineIndex((i) => i + 1);
      setText("");
    }, lineDelay);
    return () => clearTimeout(t);
  }, [text, lineIndex, lines, speed, lineDelay]);

  return (
    <div className={className}>
      {lines.slice(0, lineIndex).map((line, i) => (
        <p key={i}>{line}</p>
      ))}
      {lineIndex < lines.length && (
        <p>
          {text}
          <span className="animate-pulse">|</span>
        </p>
      )}
    </div>
  );
}
