"use client";

import { motion } from "framer-motion";

interface TagBadgeProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export function TagBadge({ label, active = false, onClick }: TagBadgeProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`inline-flex items-center h-7 px-3 text-xs font-medium rounded-full border transition-all duration-200 ${
        active
          ? "border-[var(--cu-neon-cyan)] text-[var(--cu-neon-cyan)] bg-[rgba(0,240,255,0.1)]"
          : "border-[var(--cu-border)] text-[var(--cu-text-secondary)] hover:border-[var(--cu-border-hover)] hover:text-[var(--cu-text-primary)]"
      }`}
    >
      {label}
    </motion.button>
  );
}
