"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useClipboard } from "@/hooks/use-clipboard";

interface CodeTab {
  label: string;
  lang: string;
  code: string;
}

interface ComponentDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  author: string;
  authorAvatar?: string | null;
  likesCount: number;
  isFullPage: boolean;
  codeHtml?: string | null;
  codeCss?: string | null;
  codeJs?: string | null;
  codeTailwind?: string | null;
}

export function ComponentDetailModal({
  isOpen,
  onClose,
  title,
  author,
  authorAvatar,
  likesCount,
  isFullPage,
  codeHtml,
  codeCss,
  codeJs,
  codeTailwind,
}: ComponentDetailModalProps) {
  const [activeTab, setActiveTab] = useState(0);
  const { copied, copy } = useClipboard();

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Build tabs from available code
  const tabs: CodeTab[] = [];
  if (codeHtml) tabs.push({ label: "HTML", lang: "html", code: codeHtml });
  if (codeCss) tabs.push({ label: "CSS", lang: "css", code: codeCss });
  if (codeJs) tabs.push({ label: "JS", lang: "javascript", code: codeJs });
  if (codeTailwind) tabs.push({ label: "Tailwind", lang: "html", code: codeTailwind });

  // Preview srcdoc
  const html = codeHtml || codeTailwind || "";
  const bodyStyle = isFullPage
    ? "background:#0a0a1a;color:#f0f0f5;font-family:system-ui,sans-serif"
    : "display:flex;align-items:center;justify-content:center;min-height:100vh;background:#0a0a1a;color:#f0f0f5;font-family:system-ui,sans-serif";

  const srcdoc = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}body{${bodyStyle}}${codeCss || ""}</style>
${codeTailwind ? '<script src="https://cdn.tailwindcss.com"><\/script>' : ""}
</head><body>${html}${codeJs ? `<script>${codeJs}<\/script>` : ""}</body></html>`;

  const allCode = [codeHtml, codeCss, codeJs, codeTailwind].filter(Boolean).join("\n\n");

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full sm:max-w-4xl max-h-[95vh] sm:max-h-[90vh] bg-[var(--cu-bg-secondary)] border border-[var(--cu-border)] sm:rounded-2xl overflow-hidden flex flex-col z-10 rounded-t-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-[var(--cu-border)] flex-shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                {isFullPage && (
                  <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-[var(--cu-neon-purple)] text-[#050510] flex-shrink-0">
                    Full Page
                  </span>
                )}
                <h2 className="text-sm sm:text-base font-semibold text-[var(--cu-text-primary)] truncate">
                  {title}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--cu-text-muted)] hover:text-[var(--cu-text-primary)] hover:bg-[var(--cu-surface)] transition-colors flex-shrink-0"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {/* Live Preview */}
              <div className={`relative border-b border-[var(--cu-border)] bg-[#0a0a1a] ${isFullPage ? "h-64 sm:h-96" : "h-48 sm:h-64"}`}>
                <iframe
                  srcDoc={srcdoc}
                  sandbox="allow-scripts"
                  className="w-full h-full border-0"
                  title={`Preview: ${title}`}
                  aria-hidden="true"
                />
              </div>

              {/* Author + Stats */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-[var(--cu-border)]">
                <div className="flex items-center gap-2">
                  {authorAvatar && (
                    <img src={authorAvatar} alt="" className="w-5 h-5 rounded-full" />
                  )}
                  <span className="text-xs text-[var(--cu-text-secondary)]">{author}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-xs text-[var(--cu-text-muted)]">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                    {likesCount}
                  </span>
                  <button
                    onClick={() => copy(allCode)}
                    className="flex items-center gap-1.5 h-8 px-3 rounded-lg text-xs font-medium border border-[var(--cu-neon-cyan)] text-[var(--cu-neon-cyan)] hover:bg-[rgba(0,240,255,0.05)] transition-all"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    {copied ? "Copied!" : "Copy All"}
                  </button>
                </div>
              </div>

              {/* Code Tabs */}
              {tabs.length > 0 && (
                <div>
                  {/* Tab Headers */}
                  <div className="flex border-b border-[var(--cu-border)] overflow-x-auto">
                    {tabs.map((tab, i) => (
                      <button
                        key={tab.label}
                        onClick={() => setActiveTab(i)}
                        className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 text-xs font-medium uppercase tracking-wider whitespace-nowrap transition-colors ${
                          activeTab === i
                            ? "text-[var(--cu-neon-cyan)] border-b-2 border-[var(--cu-neon-cyan)]"
                            : "text-[var(--cu-text-muted)] hover:text-[var(--cu-text-secondary)]"
                        }`}
                      >
                        {tab.label}
                        <CopyTabButton code={tab.code} />
                      </button>
                    ))}
                  </div>

                  {/* Code Block */}
                  <div className="relative">
                    <pre className="p-4 sm:p-5 text-xs sm:text-sm font-mono text-[var(--cu-text-secondary)] leading-relaxed overflow-x-auto max-h-72 sm:max-h-96">
                      <code>{tabs[activeTab]?.code}</code>
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CopyTabButton({ code }: { code: string }) {
  const { copied, copy } = useClipboard();
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        copy(code);
      }}
      className="w-5 h-5 flex items-center justify-center rounded text-[var(--cu-text-muted)] hover:text-[var(--cu-neon-cyan)] transition-colors"
      aria-label="Copy this code"
    >
      {copied ? (
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
      ) : (
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
      )}
    </button>
  );
}
