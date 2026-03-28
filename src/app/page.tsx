"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/header";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

// ============================================
// Real stats from database (shows 0 until Supabase configured)
// ============================================
function useStats() {
  const [stats, setStats] = useState({ components: 0, sites: 0, contributors: 0 });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured) { setLoaded(true); return; }
    const load = async () => {
      try {
        const supabase = createClient();
        const [compRes, siteRes, profileRes] = await Promise.all([
          supabase.from("components").select("id", { count: "exact", head: true }).eq("is_public", true),
          supabase.from("full_sites").select("id", { count: "exact", head: true }).eq("is_public", true),
          supabase.from("profiles").select("id", { count: "exact", head: true }),
        ]);
        setStats({
          components: compRes.count ?? 0,
          sites: siteRes.count ?? 0,
          contributors: profileRes.count ?? 0,
        });
      } catch {
        // DB not connected
      }
      setLoaded(true);
    };
    load();
  }, []);

  return { stats, loaded, connected: isSupabaseConfigured };
}

// ============================================
// Recent components from DB
// ============================================
function useRecentComponents() {
  const [items, setItems] = useState<Array<{
    id: string;
    title: string;
    code_html: string | null;
    code_css: string | null;
    code_tailwind: string | null;
    likes_count: number;
    profiles: { username: string; avatar_url: string | null };
  }>>([]);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    const load = async () => {
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from("components")
          .select("id, title, code_html, code_css, code_tailwind, likes_count, profiles!components_author_id_fkey(username, avatar_url)")
          .eq("is_public", true)
          .order("created_at", { ascending: false })
          .limit(8);
        if (data) setItems(data as unknown as typeof items);
      } catch {
        // DB not connected
      }
    };
    load();
  }, []);

  return items;
}

// ============================================
// Background
// ============================================
function BackgroundOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,240,255,0.06)_0%,transparent_70%)] blur-3xl" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.06)_0%,transparent_70%)] blur-3xl" />
    </div>
  );
}

// ============================================
// Feature items
// ============================================
const FEATURES = [
  {
    title: "Live Preview",
    desc: "Every component renders instantly in an isolated sandbox. See exactly how it looks before you copy.",
    icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
    accent: "var(--cu-neon-cyan)",
  },
  {
    title: "One-Click Copy",
    desc: "Hover over any component, click Copy Code. HTML, CSS, JavaScript or Tailwind -- ready to paste into your project.",
    icon: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z",
    accent: "var(--cu-neon-purple)",
  },
  {
    title: "Upload Anything",
    desc: "Share single components or full website projects as ZIP. We detect the framework and render it live.",
    icon: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12",
    accent: "var(--cu-neon-pink)",
  },
  {
    title: "100% Open Source",
    desc: "Every upload is shared under the MIT License. Free to use, modify and redistribute. No strings attached.",
    icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
    accent: "var(--cu-neon-green)",
  },
];

const CATEGORIES = [
  { name: "Full Webpages", icon: "M3 4a1 1 0 011-1h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm1 2v12h16V6H4z" },
  { name: "Buttons", icon: "M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" },
  { name: "Cards", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
  { name: "Navigation", icon: "M4 6h16M4 12h16M4 18h7" },
  { name: "Forms", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
  { name: "Loaders", icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" },
  { name: "Landing Pages", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
  { name: "Pricing", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
];

const STEPS = [
  { num: "01", title: "Sign in", desc: "Authenticate with your GitHub account. One click, no passwords." },
  { num: "02", title: "Upload", desc: "Paste your HTML, CSS, JS or Tailwind code. See the live preview instantly." },
  { num: "03", title: "Share", desc: "Publish your component. Anyone can discover, preview and copy it." },
];

// ============================================
// Main Page
// ============================================
export default function Home() {
  const { stats, loaded, connected } = useStats();
  const recentComponents = useRecentComponents();

  return (
    <div className="min-h-screen bg-[var(--cu-bg-primary)] relative">
      <BackgroundOrbs />
      <Header />

      <div className="relative z-10" id="main-content">

        {/* ======== HERO ======== */}
        <section className="relative pt-16 pb-12 sm:pt-28 sm:pb-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--cu-border)] text-xs text-[var(--cu-text-secondary)] mb-6 sm:mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--cu-neon-green)] animate-pulse" aria-hidden="true" />
                Open Source &middot; MIT Licensed &middot; Free Forever
              </div>

              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[0.95] mb-5 sm:mb-7">
                <span className="bg-gradient-to-r from-[var(--cu-neon-cyan)] via-[var(--cu-neon-purple)] to-[var(--cu-neon-pink)] bg-clip-text text-transparent">
                  The Open Library
                </span>
                <br />
                <span className="text-[var(--cu-text-primary)]">for UI Code</span>
              </h1>

              <p className="max-w-lg mx-auto text-sm sm:text-base md:text-lg text-[var(--cu-text-secondary)] leading-relaxed mb-8 sm:mb-10">
                Upload your best UI components. Discover what others built.
                Copy the code with one click. Every upload is open source.
              </p>
            </div>

            {/* CTA */}
            <div className="animate-fade-in-up animate-delay-100 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link
                href="/components"
                className="inline-flex items-center gap-3 h-14 px-8 w-full sm:w-auto justify-center rounded-2xl bg-gradient-to-r from-[var(--cu-neon-cyan)] to-[rgba(0,200,255,0.9)] text-[#050510] font-semibold text-sm transition-all hover:shadow-[var(--cu-glow-cyan)] hover:scale-[1.02]"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                Browse Components
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/upload/component"
                className="inline-flex items-center gap-3 h-14 px-8 w-full sm:w-auto justify-center rounded-2xl border border-[var(--cu-border)] text-[var(--cu-text-secondary)] font-medium text-sm transition-all hover:border-[var(--cu-neon-purple)] hover:text-[var(--cu-neon-purple)] hover:shadow-[var(--cu-glow-purple)]"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Upload Your Code
              </Link>
            </div>
          </div>
        </section>

        {/* ======== STATS (real from DB, only shown when connected) ======== */}
        {loaded && connected && (stats.components > 0 || stats.sites > 0 || stats.contributors > 0) && (
          <section className="px-4 sm:px-6 pb-12 sm:pb-16">
            <div className="max-w-3xl mx-auto grid grid-cols-3 gap-3 sm:gap-6">
              {[
                { label: "Components", value: stats.components, accent: "var(--cu-neon-cyan)" },
                { label: "Sites", value: stats.sites, accent: "var(--cu-neon-purple)" },
                { label: "Contributors", value: stats.contributors, accent: "var(--cu-neon-pink)" },
              ].map((stat) => (
                <div key={stat.label} className="glass-subtle p-4 sm:p-6 text-center">
                  <div className="text-2xl sm:text-3xl font-bold mb-1" style={{ color: stat.accent }}>
                    {stat.value}
                  </div>
                  <div className="text-[10px] sm:text-xs text-[var(--cu-text-muted)] uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ======== CATEGORIES ======== */}
        <section className="px-4 sm:px-6 pb-16 sm:pb-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 sm:mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--cu-text-primary)] mb-2">
                What you can share
              </h2>
              <p className="text-sm text-[var(--cu-text-muted)]">
                Upload any type of UI component or full website project
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {CATEGORIES.map((cat, i) => (
                <motion.div
                  key={cat.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                >
                  <Link
                    href="/components"
                    className="glass-subtle flex flex-col items-center gap-3 p-5 sm:p-6 text-center hover:border-[rgba(0,240,255,0.2)] transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-xl border border-[var(--cu-border)] flex items-center justify-center text-[var(--cu-text-muted)] group-hover:text-[var(--cu-neon-cyan)] group-hover:border-[rgba(0,240,255,0.3)] transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={cat.icon} />
                      </svg>
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-[var(--cu-text-secondary)] group-hover:text-[var(--cu-text-primary)] transition-colors">
                      {cat.name}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ======== FEATURES ======== */}
        <section className="px-4 sm:px-6 pb-16 sm:pb-24">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {FEATURES.map((feat, i) => (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="glass p-6 sm:p-8 flex gap-4 sm:gap-5 hover:border-[rgba(255,255,255,0.12)] transition-all duration-300"
                >
                  <div
                    className="w-11 h-11 rounded-xl border flex items-center justify-center flex-shrink-0"
                    style={{ borderColor: feat.accent, color: feat.accent }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={feat.icon} />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-[var(--cu-text-primary)] mb-1.5">
                      {feat.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--cu-text-secondary)] leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ======== HOW IT WORKS ======== */}
        <section className="px-4 sm:px-6 pb-16 sm:pb-24">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--cu-text-primary)] mb-2">
                How it works
              </h2>
              <p className="text-sm text-[var(--cu-text-muted)]">
                Three steps. That's it.
              </p>
            </div>
            <div className="flex flex-col gap-6 sm:gap-0 sm:flex-row sm:justify-between sm:items-start relative">
              {/* Connecting line (desktop) */}
              <div className="hidden sm:block absolute top-6 left-[16%] right-[16%] h-px bg-[var(--cu-border)]" aria-hidden="true" />

              {STEPS.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex sm:flex-col sm:items-center sm:text-center gap-4 sm:gap-3 sm:flex-1 relative z-10"
                >
                  <div className="w-12 h-12 rounded-full border border-[var(--cu-neon-cyan)] bg-[var(--cu-bg-primary)] flex items-center justify-center text-[var(--cu-neon-cyan)] text-sm font-bold flex-shrink-0">
                    {step.num}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--cu-text-primary)] mb-1">
                      {step.title}
                    </h3>
                    <p className="text-xs text-[var(--cu-text-muted)] leading-relaxed max-w-[200px]">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ======== RECENT COMPONENTS (real from DB, only if available) ======== */}
        {recentComponents.length > 0 && (
          <section className="px-4 sm:px-6 pb-16 sm:pb-24">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-[var(--cu-text-primary)]">
                  Recently uploaded
                </h2>
                <Link href="/components" className="text-sm text-[var(--cu-text-secondary)] hover:text-[var(--cu-neon-cyan)] transition-colors flex items-center gap-1">
                  View all
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                {recentComponents.map((item, i) => {
                  const html = item.code_html || item.code_tailwind || "";
                  const fp = /<(header|nav|section|footer|main)\b/i.test(html);
                  const bodyCSS = fp
                    ? "background:#0a0a1a;color:#f0f0f5;font-family:system-ui,sans-serif"
                    : "display:flex;align-items:center;justify-content:center;min-height:100vh;background:#0a0a1a;color:#f0f0f5;font-family:system-ui,sans-serif";
                  const srcdoc = `<!DOCTYPE html><html><head><style>*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}body{${bodyCSS}}${item.code_css || ""}</style>${item.code_tailwind ? '<script src="https://cdn.tailwindcss.com"><\/script>' : ""}</head><body>${html}</body></html>`;
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      className="group glass overflow-hidden hover:border-[rgba(255,255,255,0.15)] transition-all duration-300"
                    >
                      <div className={`relative overflow-hidden border-b border-[var(--cu-border)] ${fp ? "h-56 sm:h-64" : "h-44 sm:h-48"}`}>
                        <iframe srcDoc={srcdoc} sandbox="allow-scripts" className="w-full h-full border-0 pointer-events-none" title={item.title} loading="lazy" aria-hidden="true" />
                        {fp && (
                          <div className="absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-[var(--cu-neon-purple)] text-[#050510]">
                            Full Page
                          </div>
                        )}
                      </div>
                      <div className="p-3 sm:p-4">
                        <div className="flex items-center justify-between mb-1.5">
                          <h3 className="text-sm font-semibold text-[var(--cu-text-primary)] truncate">{item.title}</h3>
                          <span className="flex items-center gap-1 text-xs text-[var(--cu-text-muted)]">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                            {item.likes_count}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {item.profiles?.avatar_url && <img src={item.profiles.avatar_url} alt="" className="w-4 h-4 rounded-full" />}
                          <span className="text-xs text-[var(--cu-text-secondary)]">{item.profiles?.username}</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ======== CTA ======== */}
        <section className="px-4 sm:px-6 pb-16 sm:pb-24">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass p-8 sm:p-12 md:p-16 text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[rgba(0,240,255,0.03)] to-[rgba(168,85,247,0.03)]" aria-hidden="true" />
              <div className="relative">
                <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-[var(--cu-text-primary)]">
                  Start sharing your UI
                </h2>
                <p className="text-sm sm:text-base text-[var(--cu-text-secondary)] mb-8 max-w-md mx-auto">
                  Sign in with GitHub, upload your code, and make it available to developers everywhere.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                  <Link
                    href="/login"
                    className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-xl bg-gradient-to-r from-[var(--cu-neon-purple)] to-[var(--cu-neon-pink)] text-white font-semibold text-sm transition-all hover:shadow-[var(--cu-glow-purple)] hover:scale-[1.02]"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    Sign in with GitHub
                  </Link>
                  <Link
                    href="/upload/component"
                    className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-xl border border-[var(--cu-border)] text-[var(--cu-text-secondary)] font-medium text-sm transition-all hover:border-[var(--cu-border-hover)] hover:text-[var(--cu-text-primary)]"
                  >
                    Upload Component
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ======== FOOTER ======== */}
        <footer className="border-t border-[var(--cu-border)] px-4 sm:px-6 py-6 sm:py-8">
          <div className="max-w-7xl mx-auto flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <div className="text-sm text-[var(--cu-text-muted)]">
              <span className="neon-text-cyan font-bold">Code</span>{" "}
              <span className="text-[var(--cu-text-primary)] font-bold">Universum</span>
              <span className="ml-2">&copy; 2026 Belkis Aslani &middot; MIT Licensed</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-[var(--cu-text-muted)]">
              <Link href="/components" className="hover:text-[var(--cu-text-secondary)] transition-colors">Components</Link>
              <Link href="/sites" className="hover:text-[var(--cu-text-secondary)] transition-colors">Sites</Link>
              <Link href="/terms" className="hover:text-[var(--cu-text-secondary)] transition-colors">Terms</Link>
              <Link href="/privacy" className="hover:text-[var(--cu-text-secondary)] transition-colors">Privacy</Link>
              <Link href="/impressum" className="hover:text-[var(--cu-text-secondary)] transition-colors">Impressum</Link>
              <a href="https://github.com/BEKO2210/Code-Universum" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--cu-text-secondary)] transition-colors">GitHub</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
