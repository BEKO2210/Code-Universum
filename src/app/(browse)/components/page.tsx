"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const SAMPLE_COMPONENTS = [
  {
    id: "1", title: "Neon Pulse Button", author: "CodeUniverse", likes: 342, category: "Button",
    html: `<button style="padding:14px 32px;font-size:15px;font-weight:600;color:#00f0ff;background:transparent;border:2px solid #00f0ff;border-radius:12px;cursor:pointer;font-family:system-ui;letter-spacing:.5px">Hover Me</button>`,
  },
  {
    id: "2", title: "Glass Profile Card", author: "DesignPro", likes: 518, category: "Card",
    html: `<div style="padding:28px;background:rgba(255,255,255,0.05);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.1);border-radius:20px;text-align:center;color:#f0f0f5;font-family:system-ui;width:180px"><div style="font-size:28px;margin-bottom:8px">&#9830;</div><div style="font-weight:700;font-size:16px">Premium</div><div style="font-size:12px;color:#8888aa;margin-top:4px">Glass card</div></div>`,
  },
  {
    id: "3", title: "Gradient Badge Set", author: "BadgeUI", likes: 156, category: "Badge",
    html: `<div style="display:flex;gap:8px"><span style="padding:6px 16px;font-size:11px;font-weight:700;color:white;border-radius:50px;background:linear-gradient(135deg,#00f0ff,#a855f7);font-family:system-ui">New</span><span style="padding:6px 16px;font-size:11px;font-weight:700;color:white;border-radius:50px;background:linear-gradient(135deg,#a855f7,#ec4899);font-family:system-ui">Pro</span></div>`,
  },
  {
    id: "4", title: "Floating Input", author: "FormCraft", likes: 231, category: "Input",
    html: `<div style="font-family:system-ui;color:#f0f0f5"><input style="width:200px;padding:12px 0 6px;font-size:14px;background:transparent;border:none;border-bottom:2px solid rgba(255,255,255,0.15);color:#f0f0f5;outline:none" placeholder="Enter email..." /></div>`,
  },
  {
    id: "5", title: "Orbit Loader", author: "AnimateUI", likes: 267, category: "Loader",
    html: `<style>.ring{position:absolute;inset:0;border:3px solid transparent;border-top-color:#00f0ff;border-radius:50%;animation:s 1.2s linear infinite}.r2{inset:8px;border-top-color:#a855f7;animation-duration:.8s;animation-direction:reverse}@keyframes s{to{transform:rotate(360deg)}}</style><div style="position:relative;width:50px;height:50px"><div class="ring"></div><div class="ring r2"></div><div style="position:absolute;top:50%;left:50%;width:6px;height:6px;background:#ec4899;border-radius:50%;transform:translate(-50%,-50%);box-shadow:0 0 10px #ec4899"></div></div>`,
  },
  {
    id: "6", title: "Neon Toggle", author: "SwitchMaster", likes: 189, category: "Toggle",
    html: `<style>.ts{position:relative;width:52px;height:28px;display:inline-block}.ts input{opacity:0;width:0;height:0}.sl{position:absolute;inset:0;background:#1a1a2e;border-radius:28px;cursor:pointer;transition:.3s;border:1px solid rgba(255,255,255,0.1)}.sl:before{content:"";position:absolute;height:20px;width:20px;left:3px;bottom:3px;background:#555;border-radius:50%;transition:.3s}.ts input:checked+.sl{background:rgba(0,240,255,0.15);border-color:#00f0ff}.ts input:checked+.sl:before{transform:translateX(24px);background:#00f0ff;box-shadow:0 0 10px rgba(0,240,255,0.6)}</style><label class="ts"><input type="checkbox" checked /><span class="sl"></span></label>`,
  },
];

export default function BrowseComponentsPage() {
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
              Components
            </h1>
            <p className="text-sm text-[var(--cu-text-secondary)]">
              Browse 4,300+ open-source UI elements
            </p>
          </div>
          <Link
            href="/upload/component"
            className="hidden sm:inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-gradient-to-r from-[var(--cu-neon-cyan)] to-[rgba(0,240,255,0.8)] text-[#050510] font-semibold text-sm transition-all duration-300 hover:shadow-[var(--cu-glow-cyan)]"
          >
            Submit
          </Link>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {["All", "Buttons", "Cards", "Inputs", "Loaders", "Toggles", "Badges"].map((cat, i) => (
            <button
              key={cat}
              className={`h-8 px-4 rounded-lg text-xs font-medium border transition-all ${
                i === 0
                  ? "border-[var(--cu-neon-cyan)] text-[var(--cu-neon-cyan)] bg-[rgba(0,240,255,0.06)]"
                  : "border-[var(--cu-border)] text-[var(--cu-text-secondary)] hover:border-[var(--cu-border-hover)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SAMPLE_COMPONENTS.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group glass overflow-hidden hover:border-[rgba(255,255,255,0.15)] transition-all duration-300"
            >
              <div className="relative h-44 overflow-hidden border-b border-[var(--cu-border)]">
                <iframe
                  srcDoc={`<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="display:flex;align-items:center;justify-content:center;min-height:100vh;background:#0a0a1a;margin:0">${item.html}</body></html>`}
                  sandbox="allow-scripts"
                  className="w-full h-full border-0 pointer-events-none"
                  title={item.title}
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="text-sm font-semibold text-[var(--cu-text-primary)] truncate">
                    {item.title}
                  </h3>
                  <span className="flex items-center gap-1 text-xs text-[var(--cu-text-muted)]">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                    {item.likes}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[var(--cu-text-secondary)]">by {item.author}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full border border-[var(--cu-border)] text-[var(--cu-text-muted)]">{item.category}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </main>
  );
}
