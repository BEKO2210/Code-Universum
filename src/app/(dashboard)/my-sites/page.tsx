"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { useAuthStore } from "@/stores/auth-store";
import type { FullSite } from "@/types";

export default function MySitesPage() {
  const { user } = useAuthStore();
  const [sites, setSites] = useState<FullSite[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const loadMySites = useCallback(async () => {
    if (!isSupabaseConfigured || !user) { setIsLoading(false); return; }
    const supabase = createClient();
    const { data } = await supabase
      .from("full_sites")
      .select("*")
      .eq("author_id", user.id)
      .order("created_at", { ascending: false });
    setSites((data as FullSite[]) || []);
    setIsLoading(false);
  }, [user]);

  useEffect(() => { loadMySites(); }, [loadMySites]);

  const handleDelete = async (id: string, storagePath: string) => {
    const supabase = createClient();
    await supabase.storage.from("site-uploads").remove([storagePath]);
    await supabase.from("site_tags").delete().eq("site_id", id);
    await supabase.from("likes").delete().eq("content_type", "site").eq("content_id", id);
    await supabase.from("full_sites").delete().eq("id", id);
    setSites((prev) => prev.filter((s) => s.id !== id));
    setDeleteConfirm(null);
  };

  const handleEdit = async (id: string) => {
    if (!editTitle.trim()) return;
    const supabase = createClient();
    await supabase.from("full_sites").update({ title: editTitle.trim() }).eq("id", id);
    setSites((prev) =>
      prev.map((s) => (s.id === id ? { ...s, title: editTitle.trim() } : s))
    );
    setEditingId(null);
  };

  const toggleVisibility = async (id: string, currentPublic: boolean) => {
    const supabase = createClient();
    await supabase.from("full_sites").update({ is_public: !currentPublic }).eq("id", id);
    setSites((prev) =>
      prev.map((s) => (s.id === id ? { ...s, is_public: !currentPublic } : s))
    );
  };

  if (!user) {
    return (
      <main className="flex flex-1 items-center justify-center px-4 py-20">
        <div className="glass p-6 sm:p-8 text-center max-w-sm w-full">
          <h2 className="text-xl font-bold mb-3 text-[var(--cu-text-primary)]">Sign in required</h2>
          <p className="text-sm text-[var(--cu-text-secondary)] mb-6">Sign in to manage your sites.</p>
          <Link href="/login" className="inline-flex items-center h-10 px-6 rounded-xl border border-[var(--cu-neon-cyan)] text-[var(--cu-neon-cyan)] text-sm font-medium">Sign In</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 w-full">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--cu-text-primary)] mb-1">My Sites</h1>
          <p className="text-sm text-[var(--cu-text-secondary)]">{sites.length} site{sites.length !== 1 ? "s" : ""}</p>
        </div>
        <Link href="/upload/site" className="inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-gradient-to-r from-[var(--cu-neon-purple)] to-[var(--cu-neon-pink)] text-white font-semibold text-sm">
          + New
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="glass p-4 animate-pulse flex gap-4">
              <div className="w-24 h-16 bg-[var(--cu-surface)] rounded-lg" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-[var(--cu-surface)] rounded w-1/3" />
                <div className="h-3 bg-[var(--cu-surface)] rounded w-1/5" />
              </div>
            </div>
          ))}
        </div>
      ) : sites.length === 0 ? (
        <div className="text-center py-20">
          <svg className="w-12 h-12 mx-auto mb-4 text-[var(--cu-neon-purple)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
          </svg>
          <h2 className="text-lg font-semibold text-[var(--cu-text-primary)] mb-2">No sites yet</h2>
          <p className="text-sm text-[var(--cu-text-secondary)] mb-6">Upload a ZIP to share a full website project!</p>
          <Link href="/upload/site" className="inline-flex items-center h-10 px-6 rounded-xl border border-[var(--cu-neon-purple)] text-[var(--cu-neon-purple)] text-sm font-medium">
            Upload Site
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {sites.map((site, i) => (
            <motion.div
              key={site.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              className="glass p-4 flex flex-col sm:flex-row gap-4"
            >
              {/* Icon */}
              <div className="w-full sm:w-20 h-16 rounded-lg border border-[var(--cu-border)] bg-[var(--cu-bg-secondary)] flex items-center justify-center flex-shrink-0">
                <svg className="w-8 h-8 text-[var(--cu-neon-purple)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
                </svg>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                {editingId === site.id ? (
                  <div className="flex gap-2 mb-2">
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="flex-1 h-8 px-3 rounded-lg bg-[var(--cu-surface)] border border-[var(--cu-border)] text-sm text-[var(--cu-text-primary)] outline-none focus:border-[var(--cu-neon-cyan)]"
                      onKeyDown={(e) => e.key === "Enter" && handleEdit(site.id)}
                      autoFocus
                    />
                    <button onClick={() => handleEdit(site.id)} className="h-8 px-3 rounded-lg text-xs font-medium bg-[var(--cu-neon-cyan)] text-[#050510]">Save</button>
                    <button onClick={() => setEditingId(null)} className="h-8 px-3 rounded-lg text-xs font-medium border border-[var(--cu-border)] text-[var(--cu-text-secondary)]">Cancel</button>
                  </div>
                ) : (
                  <h3 className="text-sm font-semibold text-[var(--cu-text-primary)] truncate mb-1">{site.title}</h3>
                )}
                <div className="flex items-center gap-3 text-xs text-[var(--cu-text-muted)]">
                  <span>{site.project_type}</span>
                  <span>{(site.file_size_bytes / 1024 / 1024).toFixed(1)} MB</span>
                  <span className={site.is_public ? "text-[var(--cu-neon-green)]" : "text-[var(--cu-text-muted)]"}>
                    {site.is_public ? "Public" : "Private"}
                  </span>
                  <span>{site.likes_count} likes</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => toggleVisibility(site.id, site.is_public)} className="h-8 px-3 rounded-lg text-xs font-medium border border-[var(--cu-border)] text-[var(--cu-text-secondary)] hover:border-[var(--cu-border-hover)] transition-colors">
                  {site.is_public ? "Hide" : "Show"}
                </button>
                <button onClick={() => { setEditingId(site.id); setEditTitle(site.title); }} className="h-8 px-3 rounded-lg text-xs font-medium border border-[var(--cu-border)] text-[var(--cu-text-secondary)] hover:border-[var(--cu-neon-cyan)] hover:text-[var(--cu-neon-cyan)] transition-colors">
                  Edit
                </button>
                {deleteConfirm === site.id ? (
                  <div className="flex gap-1">
                    <button onClick={() => handleDelete(site.id, site.storage_path)} className="h-8 px-3 rounded-lg text-xs font-medium bg-red-500/10 border border-red-500/30 text-red-400">Confirm</button>
                    <button onClick={() => setDeleteConfirm(null)} className="h-8 px-3 rounded-lg text-xs font-medium border border-[var(--cu-border)] text-[var(--cu-text-secondary)]">No</button>
                  </div>
                ) : (
                  <button onClick={() => setDeleteConfirm(site.id)} className="h-8 px-3 rounded-lg text-xs font-medium border border-[var(--cu-border)] text-red-400 hover:border-red-400/30 transition-colors">
                    Delete
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </main>
  );
}
