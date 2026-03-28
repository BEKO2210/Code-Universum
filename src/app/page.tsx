"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-mesh bg-grid min-h-screen">
      <main className="flex flex-1 w-full max-w-5xl flex-col items-center justify-center px-6 py-24 gap-12">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-6 text-center"
        >
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-[1.1]">
            <span className="neon-text-cyan">Code</span>{" "}
            <span className="text-[var(--cu-text-primary)]">Universum</span>
          </h1>
          <p className="max-w-2xl text-lg sm:text-xl text-[var(--cu-text-secondary)] leading-relaxed">
            Discover, share, and preview beautiful UI components and full
            websites. Upload snippets or entire projects — rendered live in your
            browser.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href="/components"
            className="group relative flex h-14 items-center justify-center gap-2 rounded-2xl border border-[var(--cu-neon-cyan)] px-8 text-[var(--cu-neon-cyan)] font-medium transition-all duration-300 hover:shadow-[var(--cu-glow-cyan)] hover:bg-[rgba(0,240,255,0.05)]"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
            Browse Components
          </a>
          <a
            href="/sites"
            className="group relative flex h-14 items-center justify-center gap-2 rounded-2xl border border-[var(--cu-neon-purple)] px-8 text-[var(--cu-neon-purple)] font-medium transition-all duration-300 hover:shadow-[var(--cu-glow-purple)] hover:bg-[rgba(168,85,247,0.05)]"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"
              />
            </svg>
            Explore Sites
          </a>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full mt-8"
        >
          {[
            {
              title: "Live Preview",
              desc: "Components render instantly. Full sites run in an in-browser Node.js environment.",
              accent: "var(--cu-neon-cyan)",
            },
            {
              title: "One-Click Copy",
              desc: "Copy any component code to your clipboard — HTML, CSS, Tailwind, or React.",
              accent: "var(--cu-neon-purple)",
            },
            {
              title: "Upload Anything",
              desc: "Single snippets or full ZIP projects. We detect the framework and render it live.",
              accent: "var(--cu-neon-pink)",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="glass p-6 flex flex-col gap-3 hover:border-[color:var(--cu-border-hover)] transition-colors duration-300"
              style={{ "--feature-accent": feature.accent } as React.CSSProperties}
            >
              <h3
                className="text-lg font-semibold"
                style={{ color: feature.accent }}
              >
                {feature.title}
              </h3>
              <p className="text-sm text-[var(--cu-text-secondary)] leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}
