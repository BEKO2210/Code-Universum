"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Header } from "@/components/layout/header";

// ============================================
// Showcase component previews (embedded HTML/CSS)
// ============================================
const SHOWCASE_ITEMS = [
  {
    id: "neon-btn",
    title: "Neon Pulse Button",
    author: "CodeUniverse",
    likes: 342,
    category: "Button",
    html: `<button class="neon-btn">Hover Me</button>`,
    css: `
      .neon-btn {
        padding: 14px 32px;
        font-size: 15px;
        font-weight: 600;
        color: #00f0ff;
        background: transparent;
        border: 2px solid #00f0ff;
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-family: system-ui, sans-serif;
        letter-spacing: 0.5px;
      }
      .neon-btn:hover {
        background: rgba(0, 240, 255, 0.1);
        box-shadow: 0 0 20px rgba(0, 240, 255, 0.4), 0 0 60px rgba(0, 240, 255, 0.15), inset 0 0 20px rgba(0, 240, 255, 0.05);
        transform: translateY(-2px);
      }
      body { display:flex;align-items:center;justify-content:center;min-height:100vh;background:#0a0a1a;margin:0; }
    `,
  },
  {
    id: "glass-card",
    title: "Glassmorphism Card",
    author: "DesignPro",
    likes: 518,
    category: "Card",
    html: `<div class="g-card"><div class="g-icon">&#9830;</div><h3>Premium</h3><p>Glass effect card</p></div>`,
    css: `
      .g-card {
        padding: 32px;
        background: rgba(255,255,255,0.05);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 20px;
        text-align: center;
        color: #f0f0f5;
        font-family: system-ui, sans-serif;
        transition: all 0.3s ease;
        width: 200px;
      }
      .g-card:hover { border-color: rgba(168,85,247,0.4); transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.3); }
      .g-icon { font-size: 28px; margin-bottom: 12px; color: #a855f7; }
      .g-card h3 { font-size: 18px; margin: 0 0 6px; font-weight: 700; }
      .g-card p { font-size: 13px; color: #8888aa; margin: 0; }
      body { display:flex;align-items:center;justify-content:center;min-height:100vh;background:#0a0a1a;margin:0; }
    `,
  },
  {
    id: "loader-ring",
    title: "Orbit Loader",
    author: "AnimateUI",
    likes: 267,
    category: "Loader",
    html: `<div class="loader"><div class="ring"></div><div class="ring r2"></div><div class="dot"></div></div>`,
    css: `
      .loader { position: relative; width: 60px; height: 60px; }
      .ring {
        position: absolute; inset: 0;
        border: 3px solid transparent;
        border-top-color: #00f0ff;
        border-radius: 50%;
        animation: spin 1.2s linear infinite;
      }
      .r2 { inset: 8px; border-top-color: #a855f7; animation-duration: 0.8s; animation-direction: reverse; }
      .dot {
        position: absolute; top: 50%; left: 50%;
        width: 8px; height: 8px;
        background: #ec4899;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        box-shadow: 0 0 10px #ec4899;
      }
      @keyframes spin { to { transform: rotate(360deg); } }
      body { display:flex;align-items:center;justify-content:center;min-height:100vh;background:#0a0a1a;margin:0; }
    `,
  },
  {
    id: "toggle-switch",
    title: "Glow Toggle",
    author: "SwitchMaster",
    likes: 189,
    category: "Toggle",
    html: `<label class="toggle"><input type="checkbox" checked /><span class="slider"></span></label>`,
    css: `
      .toggle { position: relative; width: 56px; height: 30px; display: inline-block; }
      .toggle input { opacity: 0; width: 0; height: 0; }
      .slider {
        position: absolute; inset: 0; background: #1a1a2e;
        border-radius: 30px; cursor: pointer; transition: 0.3s;
        border: 1px solid rgba(255,255,255,0.1);
      }
      .slider:before {
        content: ""; position: absolute; height: 22px; width: 22px;
        left: 3px; bottom: 3px; background: #555;
        border-radius: 50%; transition: 0.3s;
      }
      .toggle input:checked + .slider { background: rgba(0,240,255,0.15); border-color: #00f0ff; }
      .toggle input:checked + .slider:before { transform: translateX(26px); background: #00f0ff; box-shadow: 0 0 12px rgba(0,240,255,0.6); }
      body { display:flex;align-items:center;justify-content:center;min-height:100vh;background:#0a0a1a;margin:0; }
    `,
  },
  {
    id: "input-float",
    title: "Floating Label Input",
    author: "FormCraft",
    likes: 231,
    category: "Input",
    html: `<div class="float-group"><input type="text" class="float-input" placeholder=" " /><label class="float-label">Email</label><div class="float-line"></div></div>`,
    css: `
      .float-group { position: relative; width: 220px; }
      .float-input {
        width: 100%; padding: 14px 0 6px; font-size: 15px;
        background: transparent; border: none;
        border-bottom: 2px solid rgba(255,255,255,0.1);
        color: #f0f0f5; outline: none;
        font-family: system-ui, sans-serif;
        transition: border-color 0.3s;
      }
      .float-label {
        position: absolute; left: 0; top: 14px;
        font-size: 15px; color: #555570;
        pointer-events: none; transition: 0.3s;
        font-family: system-ui, sans-serif;
      }
      .float-input:focus ~ .float-label,
      .float-input:not(:placeholder-shown) ~ .float-label {
        top: -6px; font-size: 11px; color: #00f0ff;
      }
      .float-input:focus { border-bottom-color: #00f0ff; }
      .float-line { position: absolute; bottom: 0; left: 50%; width: 0; height: 2px; background: #00f0ff; transition: 0.3s; }
      .float-input:focus ~ .float-line { left: 0; width: 100%; }
      body { display:flex;align-items:center;justify-content:center;min-height:100vh;background:#0a0a1a;margin:0; }
    `,
  },
  {
    id: "gradient-badge",
    title: "Gradient Badge",
    author: "BadgeUI",
    likes: 156,
    category: "Button",
    html: `<span class="badge">New</span><span class="badge b2">Pro</span><span class="badge b3">Hot</span>`,
    css: `
      .badge {
        display: inline-block; padding: 6px 18px;
        font-size: 12px; font-weight: 700;
        color: white; border-radius: 50px;
        background: linear-gradient(135deg, #00f0ff, #a855f7);
        font-family: system-ui, sans-serif;
        margin: 0 4px; letter-spacing: 0.5px;
        box-shadow: 0 4px 15px rgba(0,240,255,0.2);
      }
      .b2 { background: linear-gradient(135deg, #a855f7, #ec4899); box-shadow: 0 4px 15px rgba(168,85,247,0.2); }
      .b3 { background: linear-gradient(135deg, #ec4899, #f97316); box-shadow: 0 4px 15px rgba(236,72,153,0.2); }
      body { display:flex;align-items:center;justify-content:center;gap:8px;min-height:100vh;background:#0a0a1a;margin:0; }
    `,
  },
  {
    id: "skeleton-loader",
    title: "Shimmer Skeleton",
    author: "LoaderPro",
    likes: 198,
    category: "Loader",
    html: `<div class="skel"><div class="skel-avatar"></div><div class="skel-lines"><div class="skel-line w80"></div><div class="skel-line w60"></div></div></div>`,
    css: `
      .skel { display:flex; gap:14px; padding:20px; width:240px; background:rgba(255,255,255,0.03); border-radius:16px; border:1px solid rgba(255,255,255,0.06); }
      .skel-avatar { width:44px;height:44px;border-radius:50%;background:rgba(255,255,255,0.06);flex-shrink:0;animation:shimmer 1.5s infinite; }
      .skel-lines { flex:1;display:flex;flex-direction:column;gap:10px;justify-content:center; }
      .skel-line { height:10px;border-radius:6px;background:rgba(255,255,255,0.06);animation:shimmer 1.5s infinite; }
      .w80 { width:80%; } .w60 { width:60%;animation-delay:0.2s; }
      @keyframes shimmer { 0%,100%{opacity:0.4} 50%{opacity:1} }
      body { display:flex;align-items:center;justify-content:center;min-height:100vh;background:#0a0a1a;margin:0; }
    `,
  },
  {
    id: "checkbox-fancy",
    title: "Bouncy Checkbox",
    author: "CheckUI",
    likes: 274,
    category: "Checkbox",
    html: `<label class="cb"><input type="checkbox" checked /><span class="checkmark"><svg viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span class="cb-text">Accept terms</span></label>`,
    css: `
      .cb { display:flex;align-items:center;gap:10px;cursor:pointer;font-family:system-ui,sans-serif;color:#f0f0f5;font-size:14px; }
      .cb input { display:none; }
      .checkmark {
        width:24px;height:24px;border-radius:7px;border:2px solid rgba(255,255,255,0.15);
        display:flex;align-items:center;justify-content:center;transition:all 0.2s;
        background:transparent;
      }
      .checkmark svg { width:14px;height:14px;color:transparent;transition:0.2s; }
      .cb input:checked ~ .checkmark { background:#00f0ff;border-color:#00f0ff;animation:bounce 0.3s; box-shadow:0 0 12px rgba(0,240,255,0.3); }
      .cb input:checked ~ .checkmark svg { color:#0a0a1a; }
      .cb-text { user-select:none; }
      @keyframes bounce { 0%{transform:scale(1)} 50%{transform:scale(1.2)} 100%{transform:scale(1)} }
      body { display:flex;align-items:center;justify-content:center;min-height:100vh;background:#0a0a1a;margin:0; }
    `,
  },
];

const CATEGORIES = [
  { name: "All", slug: "all", count: 4324, icon: "M4 6h16M4 12h16M4 18h16" },
  { name: "Buttons", slug: "button", count: 789, icon: "M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" },
  { name: "Cards", slug: "card", count: 1141, icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
  { name: "Inputs", slug: "input", count: 423, icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" },
  { name: "Loaders", slug: "loader", count: 356, icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" },
  { name: "Toggles", slug: "toggle", count: 158, icon: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" },
  { name: "Checkboxes", slug: "checkbox", count: 203, icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
];

const STATS = [
  { label: "UI Elements", value: "4,300+", accent: "var(--cu-neon-cyan)" },
  { label: "Contributors", value: "850+", accent: "var(--cu-neon-purple)" },
  { label: "Downloads", value: "2.1M+", accent: "var(--cu-neon-pink)" },
  { label: "Open Source", value: "MIT", accent: "var(--cu-neon-green)" },
];

// ============================================
// Preview Card Component
// ============================================
function ShowcaseCard({ item, index }: { item: (typeof SHOWCASE_ITEMS)[number]; index: number }) {
  const srcdoc = `<!DOCTYPE html><html><head><style>${item.css}</style></head><body>${item.html}</body></html>`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="group relative glass overflow-hidden hover:border-[rgba(255,255,255,0.15)] transition-all duration-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)]">
        {/* Preview */}
        <div className="relative h-48 overflow-hidden border-b border-[var(--cu-border)]">
          <iframe
            srcDoc={srcdoc}
            sandbox="allow-scripts"
            className="w-full h-full border-0 pointer-events-none"
            title={item.title}
            loading="lazy"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--cu-bg-primary)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
            <span className="px-4 py-1.5 text-xs font-medium text-[var(--cu-neon-cyan)] border border-[var(--cu-neon-cyan)] rounded-full bg-[rgba(0,240,255,0.05)] backdrop-blur-sm">
              Get Code
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-[var(--cu-text-primary)] truncate">
              {item.title}
            </h3>
            <span className="flex items-center gap-1 text-xs text-[var(--cu-text-muted)]">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              {item.likes}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-[var(--cu-text-secondary)]">
              by {item.author}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full border border-[var(--cu-border)] text-[var(--cu-text-muted)]">
              {item.category}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================
// Stats Section
// ============================================
function StatsBar() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
      {STATS.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
          className="glass-subtle p-4 sm:p-6 text-center"
        >
          <div
            className="text-2xl sm:text-3xl font-bold mb-1"
            style={{ color: stat.accent }}
          >
            {stat.value}
          </div>
          <div className="text-xs text-[var(--cu-text-muted)] uppercase tracking-wider">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ============================================
// Category Pills
// ============================================
function CategoryBar() {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {CATEGORIES.map((cat, i) => (
        <motion.div
          key={cat.slug}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: i * 0.05 }}
        >
          <Link
            href="/components"
            className={`group inline-flex items-center gap-2 h-10 px-4 rounded-xl border transition-all duration-200 ${
              cat.slug === "all"
                ? "border-[var(--cu-neon-cyan)] text-[var(--cu-neon-cyan)] bg-[rgba(0,240,255,0.06)]"
                : "border-[var(--cu-border)] text-[var(--cu-text-secondary)] hover:border-[var(--cu-border-hover)] hover:text-[var(--cu-text-primary)]"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={cat.icon} />
            </svg>
            <span className="text-sm font-medium">{cat.name}</span>
            <span className="text-[10px] text-[var(--cu-text-muted)] font-mono">
              {cat.count}
            </span>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

// ============================================
// Animated Background Orbs
// ============================================
function BackgroundOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,240,255,0.06)_0%,transparent_70%)] blur-3xl" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.06)_0%,transparent_70%)] blur-3xl" />
      <div className="absolute top-[40%] left-[50%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(236,72,153,0.04)_0%,transparent_70%)] blur-3xl" />
    </div>
  );
}

// ============================================
// Main Page
// ============================================
export default function Home() {
  const gridRef = useRef<HTMLDivElement>(null);
  const isGridInView = useInView(gridRef, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen bg-[var(--cu-bg-primary)] relative">
      <BackgroundOrbs />
      <Header />

      <div className="relative z-10">
        {/* ======== HERO ======== */}
        <section className="relative pt-20 pb-16 sm:pt-32 sm:pb-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Tag */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--cu-border)] text-xs text-[var(--cu-text-secondary)] mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--cu-neon-green)] animate-pulse" />
                Open Source UI Library — MIT Licensed
              </div>

              {/* Title */}
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[0.95] mb-6">
                <span className="bg-gradient-to-r from-[var(--cu-neon-cyan)] via-[var(--cu-neon-purple)] to-[var(--cu-neon-pink)] bg-clip-text text-transparent">
                  The Largest
                </span>
                <br />
                <span className="text-[var(--cu-text-primary)]">
                  Open-Source UI
                </span>
                <br />
                <span className="text-[var(--cu-text-primary)]">
                  Library
                </span>
              </h1>

              <p className="max-w-xl mx-auto text-base sm:text-lg text-[var(--cu-text-secondary)] leading-relaxed mb-10">
                Discover, share and preview thousands of beautiful UI components.
                Copy the code with a single click — HTML, CSS, Tailwind & React.
              </p>
            </motion.div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-xl mx-auto mb-6"
            >
              <div className="relative group">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[rgba(0,240,255,0.15)] via-[rgba(168,85,247,0.15)] to-[rgba(236,72,153,0.15)] blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-center glass border-[var(--cu-border)] group-focus-within:border-[rgba(0,240,255,0.3)] transition-colors">
                  <svg
                    className="w-5 h-5 ml-4 text-[var(--cu-text-muted)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search 4,300+ components..."
                    className="w-full bg-transparent px-4 py-4 text-sm text-[var(--cu-text-primary)] placeholder:text-[var(--cu-text-muted)] outline-none"
                  />
                  <kbd className="hidden sm:inline-flex items-center mr-4 px-2 py-0.5 text-[10px] text-[var(--cu-text-muted)] border border-[var(--cu-border)] rounded-md font-mono">
                    /
                  </kbd>
                </div>
              </div>
            </motion.div>

            {/* Quick CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <Link
                href="/components"
                className="inline-flex items-center gap-2 h-12 px-8 rounded-xl bg-gradient-to-r from-[var(--cu-neon-cyan)] to-[rgba(0,240,255,0.8)] text-[#050510] font-semibold text-sm transition-all duration-300 hover:shadow-[var(--cu-glow-cyan)] hover:scale-[1.02]"
              >
                Browse Components
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/upload/component"
                className="inline-flex items-center gap-2 h-12 px-8 rounded-xl border border-[var(--cu-border)] text-[var(--cu-text-secondary)] font-medium text-sm transition-all duration-300 hover:border-[var(--cu-border-hover)] hover:text-[var(--cu-text-primary)]"
              >
                Submit Component
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ======== STATS ======== */}
        <section className="px-6 pb-16 sm:pb-20">
          <div className="max-w-4xl mx-auto">
            <StatsBar />
          </div>
        </section>

        {/* ======== CATEGORIES ======== */}
        <section className="px-6 pb-12">
          <div className="max-w-5xl mx-auto">
            <CategoryBar />
          </div>
        </section>

        {/* ======== SHOWCASE GRID ======== */}
        <section className="px-6 pb-24" ref={gridRef}>
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--cu-text-primary)]">
                Trending Components
              </h2>
              <Link
                href="/components"
                className="text-sm text-[var(--cu-text-secondary)] hover:text-[var(--cu-neon-cyan)] transition-colors flex items-center gap-1"
              >
                View all
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {SHOWCASE_ITEMS.map((item, i) => (
                <ShowcaseCard key={item.id} item={item} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ======== CTA SECTION ======== */}
        <section className="px-6 pb-24">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass p-10 sm:p-16 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[rgba(0,240,255,0.03)] to-[rgba(168,85,247,0.03)]" />
              <div className="relative">
                <h2 className="text-2xl sm:text-4xl font-bold mb-4 text-[var(--cu-text-primary)]">
                  Ready to share your UI?
                </h2>
                <p className="text-[var(--cu-text-secondary)] mb-8 max-w-md mx-auto">
                  Upload your components and full websites. Get instant live previews and share with the community.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    href="/upload/component"
                    className="inline-flex items-center gap-2 h-12 px-8 rounded-xl bg-gradient-to-r from-[var(--cu-neon-purple)] to-[var(--cu-neon-pink)] text-white font-semibold text-sm transition-all duration-300 hover:shadow-[var(--cu-glow-purple)] hover:scale-[1.02]"
                  >
                    Upload Component
                  </Link>
                  <Link
                    href="/upload/site"
                    className="inline-flex items-center gap-2 h-12 px-8 rounded-xl border border-[var(--cu-neon-purple)] text-[var(--cu-neon-purple)] font-medium text-sm transition-all duration-300 hover:bg-[rgba(168,85,247,0.05)] hover:shadow-[var(--cu-glow-purple)]"
                  >
                    Upload Full Site (ZIP)
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ======== FOOTER ======== */}
        <footer className="border-t border-[var(--cu-border)] px-6 py-8">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-[var(--cu-text-muted)]">
              <span className="neon-text-cyan font-bold">Code</span>{" "}
              <span className="text-[var(--cu-text-primary)] font-bold">Universum</span>
              <span className="ml-2">— Open Source, MIT Licensed</span>
            </div>
            <div className="flex items-center gap-6 text-xs text-[var(--cu-text-muted)]">
              <Link href="/components" className="hover:text-[var(--cu-text-secondary)] transition-colors">
                Components
              </Link>
              <Link href="/sites" className="hover:text-[var(--cu-text-secondary)] transition-colors">
                Sites
              </Link>
              <a
                href="https://github.com/BEKO2210/Code-Universum"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--cu-text-secondary)] transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
