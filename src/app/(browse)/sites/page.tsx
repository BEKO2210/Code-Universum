"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const SAMPLE_SITES = [
  { id: "1", title: "SaaS Landing Page", author: "DesignPro", type: "Vite", likes: 421, color: "#00f0ff" },
  { id: "2", title: "Portfolio Dark", author: "WebCraft", type: "Static", likes: 338, color: "#a855f7" },
  { id: "3", title: "E-Commerce Dashboard", author: "UIBuilder", type: "React", likes: 567, color: "#ec4899" },
  { id: "4", title: "Blog Template", author: "DevWriter", type: "Next.js", likes: 289, color: "#22ff88" },
];

export default function BrowseSitesPage() {
  return (
    <main className="flex-1 max-w-7xl mx-auto px-6 py-8 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[var(--cu-text-primary)] mb-2">
              Full Sites
            </h1>
            <p className="text-sm text-[var(--cu-text-secondary)]">
              Upload a ZIP and preview entire websites in-browser via WebContainers
            </p>
          </div>
          <Link
            href="/upload/site"
            className="hidden sm:inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-gradient-to-r from-[var(--cu-neon-purple)] to-[var(--cu-neon-pink)] text-white font-semibold text-sm transition-all duration-300 hover:shadow-[var(--cu-glow-purple)]"
          >
            Upload Site
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {SAMPLE_SITES.map((site, i) => (
            <motion.div
              key={site.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group glass overflow-hidden hover:border-[rgba(255,255,255,0.15)] transition-all duration-300"
            >
              {/* Placeholder preview */}
              <div className="relative h-56 overflow-hidden border-b border-[var(--cu-border)] bg-[var(--cu-bg-secondary)]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-3">
                    <div
                      className="w-16 h-16 rounded-2xl border-2 flex items-center justify-center"
                      style={{ borderColor: site.color, color: site.color }}
                    >
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
                      </svg>
                    </div>
                    <span className="text-xs text-[var(--cu-text-muted)]">Live Preview</span>
                  </div>
                </div>
                {/* Decorative gradient */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1"
                  style={{ background: `linear-gradient(90deg, ${site.color}, transparent)` }}
                />
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-semibold text-[var(--cu-text-primary)]">{site.title}</h3>
                  <span className="flex items-center gap-1 text-xs text-[var(--cu-text-muted)]">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                    {site.likes}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[var(--cu-text-secondary)]">by {site.author}</span>
                  <span
                    className="text-[10px] px-2.5 py-0.5 rounded-full border font-medium"
                    style={{ borderColor: site.color, color: site.color }}
                  >
                    {site.type}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </main>
  );
}
