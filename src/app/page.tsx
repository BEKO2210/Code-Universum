"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/header";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

// ============================================
// Real stats from database
// ============================================
function useStats() {
  const [stats, setStats] = useState({ components: 0, sites: 0, contributors: 0 });

  useEffect(() => {
    if (!isSupabaseConfigured) return;
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
        // DB not connected yet — show 0
      }
    };
    load();
  }, []);

  return stats;
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
    component_tags: { tags: { name: string } }[];
  }>>([]);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    const load = async () => {
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from("components")
          .select("id, title, code_html, code_css, code_tailwind, likes_count, profiles!components_author_id_fkey(username, avatar_url), component_tags(tags(name))")
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
  const stats = useStats();
  const recentComponents = useRecentComponents();

  return (
    <div className="min-h-screen bg-[var(--cu-bg-primary)] relative">
      <BackgroundOrbs />
      <Header />

      <div className="relative z-10">
        {/* ======== HERO ======== */}
        <section className="relative pt-12 pb-10 sm:pt-32 sm:pb-24 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--cu-border)] text-xs text-[var(--cu-text-secondary)] mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--cu-neon-green)] animate-pulse" />
                Open Source — MIT Licensed
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[0.95] mb-4 sm:mb-6">
                <span className="bg-gradient-to-r from-[var(--cu-neon-cyan)] via-[var(--cu-neon-purple)] to-[var(--cu-neon-pink)] bg-clip-text text-transparent">
                  Share Your
                </span>
                <br />
                <span className="text-[var(--cu-text-primary)]">UI with the</span>
                <br />
                <span className="text-[var(--cu-text-primary)]">World</span>
              </h1>

              <p className="max-w-xl mx-auto text-sm sm:text-base md:text-lg text-[var(--cu-text-secondary)] leading-relaxed mb-6 sm:mb-10 px-2">
                Upload UI components and full websites. Preview them live in the browser.
                Copy the code with a single click — free and open source.
              </p>
            </motion.div>

            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="max-w-xl mx-auto mb-6"
            >
              <Link href="/components" className="block group">
                <div className="relative flex items-center glass border-[var(--cu-border)] group-hover:border-[rgba(0,240,255,0.2)] transition-colors">
                  <svg className="w-5 h-5 ml-4 text-[var(--cu-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span className="w-full px-4 py-4 text-sm text-[var(--cu-text-muted)]">
                    Search components...
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <Link
                href="/components"
                className="inline-flex items-center gap-2 h-12 px-8 rounded-xl bg-gradient-to-r from-[var(--cu-neon-cyan)] to-[rgba(0,240,255,0.8)] text-[#050510] font-semibold text-sm transition-all hover:shadow-[var(--cu-glow-cyan)] hover:scale-[1.02]"
              >
                Browse Components
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/upload/component"
                className="inline-flex items-center gap-2 h-12 px-8 rounded-xl border border-[var(--cu-border)] text-[var(--cu-text-secondary)] font-medium text-sm transition-all hover:border-[var(--cu-border-hover)] hover:text-[var(--cu-text-primary)]"
              >
                Upload Your Code
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ======== STATS (real from DB) ======== */}
        <section className="px-4 sm:px-6 pb-10 sm:pb-20">
          <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
            {[
              { label: "Components", value: stats.components, accent: "var(--cu-neon-cyan)" },
              { label: "Full Sites", value: stats.sites, accent: "var(--cu-neon-purple)" },
              { label: "Contributors", value: stats.contributors, accent: "var(--cu-neon-pink)" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="glass-subtle p-4 sm:p-6 text-center"
              >
                <div className="text-2xl sm:text-3xl font-bold mb-1" style={{ color: stat.accent }}>
                  {stat.value}
                </div>
                <div className="text-xs text-[var(--cu-text-muted)] uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ======== RECENT COMPONENTS (real from DB) ======== */}
        {recentComponents.length > 0 && (
          <section className="px-4 sm:px-6 pb-16 sm:pb-24">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-[var(--cu-text-primary)]">
                  Recent Uploads
                </h2>
                <Link href="/components" className="text-sm text-[var(--cu-text-secondary)] hover:text-[var(--cu-neon-cyan)] transition-colors flex items-center gap-1">
                  View all
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                {recentComponents.map((item, i) => {
                  const srcdoc = `<!DOCTYPE html><html><head><style>*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}body{display:flex;align-items:center;justify-content:center;min-height:100vh;background:#0a0a1a;color:#f0f0f5;font-family:system-ui,sans-serif}${item.code_css || ""}</style>${item.code_tailwind ? '<script src="https://cdn.tailwindcss.com"></script>' : ""}</head><body>${item.code_html || item.code_tailwind || ""}</body></html>`;

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: i * 0.06 }}
                      className="group glass overflow-hidden hover:border-[rgba(255,255,255,0.15)] transition-all duration-300"
                    >
                      <div className="relative h-48 overflow-hidden border-b border-[var(--cu-border)]">
                        <iframe srcDoc={srcdoc} sandbox="allow-scripts" className="w-full h-full border-0 pointer-events-none" title={item.title} loading="lazy" />
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-sm font-semibold text-[var(--cu-text-primary)] truncate">{item.title}</h3>
                          <span className="flex items-center gap-1 text-xs text-[var(--cu-text-muted)]">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
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

        {/* ======== EMPTY STATE (when no DB) ======== */}
        {recentComponents.length === 0 && (
          <section className="px-4 sm:px-6 pb-16 sm:pb-24">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass p-6 sm:p-10 md:p-16 text-center relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[rgba(0,240,255,0.03)] to-[rgba(168,85,247,0.03)]" />
                <div className="relative">
                  <div className="text-5xl mb-4">&#128640;</div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-[var(--cu-text-primary)]">
                    Ready to launch?
                  </h2>
                  <p className="text-[var(--cu-text-secondary)] mb-8 max-w-md mx-auto">
                    Connect Supabase and start uploading your UI components.
                    Share buttons, cards, loaders, full landing pages — anything.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Link
                      href="/upload/component"
                      className="inline-flex items-center gap-2 h-12 px-8 rounded-xl bg-gradient-to-r from-[var(--cu-neon-cyan)] to-[rgba(0,240,255,0.8)] text-[#050510] font-semibold text-sm hover:shadow-[var(--cu-glow-cyan)]"
                    >
                      Upload Component
                    </Link>
                    <Link
                      href="/upload/site"
                      className="inline-flex items-center gap-2 h-12 px-8 rounded-xl border border-[var(--cu-neon-purple)] text-[var(--cu-neon-purple)] font-medium text-sm hover:shadow-[var(--cu-glow-purple)]"
                    >
                      Upload Full Site
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* ======== FOOTER ======== */}
        <footer className="border-t border-[var(--cu-border)] px-4 sm:px-6 py-6 sm:py-8">
          <div className="max-w-7xl mx-auto flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <div className="text-sm text-[var(--cu-text-muted)]">
              <span className="neon-text-cyan font-bold">Code</span>{" "}
              <span className="text-[var(--cu-text-primary)] font-bold">Universum</span>
              <span className="ml-2">&copy; {new Date().getFullYear()} — MIT Licensed</span>
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
