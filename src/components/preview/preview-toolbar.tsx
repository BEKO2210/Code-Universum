"use client";

import { motion } from "framer-motion";
import { usePreviewStore } from "@/stores/preview-store";
import { useClipboard } from "@/hooks/use-clipboard";

interface PreviewToolbarProps {
  code?: string;
}

export function PreviewToolbar({ code }: PreviewToolbarProps) {
  const { previewTheme, toggleTheme } = usePreviewStore();
  const { copied, copy } = useClipboard();

  return (
    <div className="flex items-center gap-2 p-2 glass-subtle rounded-xl">
      {/* Theme Toggle */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={toggleTheme}
        className="flex items-center justify-center w-8 h-8 rounded-lg text-[var(--cu-text-secondary)] hover:text-[var(--cu-text-primary)] hover:bg-[var(--cu-surface-hover)] transition-colors"
        title={`Switch to ${previewTheme === "dark" ? "light" : "dark"} mode`}
      >
        {previewTheme === "dark" ? (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </motion.button>

      {/* Copy Button */}
      {code && (
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => copy(code)}
          className="flex items-center justify-center gap-1.5 h-8 px-3 rounded-lg text-xs font-medium text-[var(--cu-text-secondary)] hover:text-[var(--cu-neon-green)] hover:bg-[var(--cu-surface-hover)] transition-colors"
        >
          {copied ? (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy
            </>
          )}
        </motion.button>
      )}
    </div>
  );
}
