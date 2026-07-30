"use client";

import { motion } from "framer-motion";

export function SectionShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={`mx-auto min-h-[70vh] w-full max-w-6xl px-4 py-12 sm:px-6 ${className}`}
    >
      {children}
    </motion.section>
  );
}
