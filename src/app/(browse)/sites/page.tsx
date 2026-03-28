"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { useAuthStore } from "@/stores/auth-store";
import type { FullSite, Profile } from "@/types";

interface SiteRow extends FullSite {
  profiles: Pick<Profile, "username" | "avatar_url">;
}

const TYPE_COLORS: Record<string, string> = {
  static: "#00f0ff",
  vite: "#a855f7",
  nextjs: "#ec4899",
  node: "#22ff88",
};

export default function BrowseSitesPage() {
  const [sites, setSites] = useState<SiteRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthStore();

  useEffect(() => {
    if (!isSupabaseConfigured) { setIsLoading(false); return; }
    const load = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("full_sites")
        .select("*, profiles!full_sites_author_id_fkey(username, avatar_url)")
        .eq("is_public", true)
        .order("created_at", { ascending: false })
        .limit(20);
      setSites((data as unknown as SiteRow[]) || []);
      setIsLoading(false);
    };
    load();
  }, []);

  return (
    <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 w-full">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[var(--cu-text-primary)] mb-1 sm:mb-2">Full Sites</h1>
            <p className="text-sm text-[var(--cu-text-secondary)]">
              Complete website projects — preview them live in your browser
            </p>
          </div>
          {user && (
            <Link
              href="/upload/site"
              className="hidden sm:inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-gradient-to-r from-[var(--cu-neon-purple)] to-[var(--cu-neon-pink)] text-white font-semibold text-sm"
            >
              Upload Site
            </Link>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="glass overflow-hidden animate-pulse">
                <div className="h-56 bg-[var(--cu-surface)]" />
                <div className="p-5 space-y-2">
                  <div className="h-4 bg-[var(--cu-surface)] rounded w-2/3" />
                  <div className="h-3 bg-[var(--cu-surface)] rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : sites.length === 0 ? (
          <div className="text-center py-20">
            <svg className="w-12 h-12 mx-auto mb-4 text-[var(--cu-neon-purple)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" /></svg>
            <h2 className="text-lg font-semibold text-[var(--cu-text-primary)] mb-2">No sites yet</h2>
            <p className="text-sm text-[var(--cu-text-secondary)] mb-6">Upload a ZIP file to share a full website project!</p>
            <Link
              href="/upload/site"
              className="inline-flex items-center h-10 px-6 rounded-xl border border-[var(--cu-neon-purple)] text-[var(--cu-neon-purple)] text-sm font-medium hover:shadow-[var(--cu-glow-purple)] transition-all"
            >
              Upload Site
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {sites.map((site, i) => {
              const color = TYPE_COLORS[site.project_type] || "#00f0ff";
              return (
                <motion.div
                  key={site.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="group glass overflow-hidden hover:border-[rgba(255,255,255,0.15)] transition-all"
                >
                  <div className="relative h-48 bg-[var(--cu-bg-secondary)] flex items-center justify-center border-b border-[var(--cu-border)]">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-xl border-2 flex items-center justify-center" style={{ borderColor: color, color }}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
                        </svg>
                      </div>
                      <span className="text-xs text-[var(--cu-text-muted)]">
                        {(site.file_size_bytes / 1024 / 1024).toFixed(1)} MB
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-base font-semibold text-[var(--cu-text-primary)]">{site.title}</h3>
                      <span className="flex items-center gap-1 text-xs text-[var(--cu-text-muted)]">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                        {site.likes_count}
                      </span>
                    </div>
                    {site.description && <p className="text-xs text-[var(--cu-text-secondary)] mb-2 line-clamp-2">{site.description}</p>}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {site.profiles?.avatar_url && <img src={site.profiles.avatar_url} alt="" className="w-4 h-4 rounded-full" />}
                        <span className="text-xs text-[var(--cu-text-secondary)]">{site.profiles?.username}</span>
                      </div>
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full border font-medium" style={{ borderColor: color, color }}>
                        {site.project_type}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>
    </main>
  );
}
