"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { NeonButton } from "@/components/ui/neon-button";

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 glass-subtle border-b border-[var(--cu-border)]"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold">
            <span className="neon-text-cyan">Code</span>{" "}
            <span className="text-[var(--cu-text-primary)]">Universum</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden sm:flex items-center gap-6">
          <Link
            href="/components"
            className="text-sm text-[var(--cu-text-secondary)] hover:text-[var(--cu-text-primary)] transition-colors"
          >
            Components
          </Link>
          <Link
            href="/sites"
            className="text-sm text-[var(--cu-text-secondary)] hover:text-[var(--cu-text-primary)] transition-colors"
          >
            Sites
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <NeonButton variant="cyan" size="sm">
            Sign In
          </NeonButton>
        </div>
      </div>
    </motion.header>
  );
}
