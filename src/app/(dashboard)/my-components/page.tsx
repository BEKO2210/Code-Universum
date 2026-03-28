"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { useAuthStore } from "@/stores/auth-store";
import type { Component } from "@/types";

export default function MyComponentsPage() {
  const { user } = useAuthStore();
  const [components, setComponents] = useState<Component[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const loadMyComponents = useCallback(async () => {
    if (!isSupabaseConfigured || !user) { setIsLoading(false); return; }
    const supabase = createClient();
    const { data } = await supabase
      .from("components")
      .select("*")
      .eq("author_id", user.id)
      .order("created_at", { ascending: false });
    setComponents((data as Component[]) || []);
    setIsLoading(false);
  }, [user]);

  useEffect(() => { loadMyComponents(); }, [loadMyComponents]);

  const handleDelete = async (id: string) => {
    const supabase = createClient();
    await supabase.from("component_tags").delete().eq("component_id", id);
    await supabase.from("likes").delete().eq("content_type", "component").eq("content_id", id);
    await supabase.from("components").delete().eq("id", id);
    setComponents((prev) => prev.filter((c) => c.id !== id));
    setDeleteConfirm(null);
  };

  const handleEdit = async (id: string) => {
    if (!editTitle.trim()) return;
    const supabase = createClient();
    await supabase.from("components").update({ title: editTitle.trim() }).eq("id", id);
    setComponents((prev) =>
      prev.map((c) => (c.id === id ? { ...c, title: editTitle.trim() } : c))
    );
    setEditingId(null);
  };

  const toggleVisibility = async (id: string, currentPublic: boolean) => {
    const supabase = createClient();
    await supabase.from("components").update({ is_public: !currentPublic }).eq("id", id);
    setComponents((prev) =>
      prev.map((c) => (c.id === id ? { ...c, is_public: !currentPublic } : c))
    );
  };

  if (!user) {
    return (
      <main className="flex flex-1 items-center justify-center px-4 py-20">
        <div className="glass p-6 sm:p-8 text-center max-w-sm w-full">
          <h2 className="text-xl font-bold mb-3 text-[var(--cu-text-primary)]">Sign in required</h2>
          <p className="text-sm text-[var(--cu-text-secondary)] mb-6">Sign in to manage your components.</p>
          <Link href="/login" className="inline-flex items-center h-10 px-6 rounded-xl border border-[var(--cu-neon-cyan)] text-[var(--cu-neon-cyan)] text-sm font-medium">Sign In</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 w-full">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--cu-text-primary)] mb-1">My Components</h1>
          <p className="text-sm text-[var(--cu-text-secondary)]">{components.length} component{components.length !== 1 ? "s" : ""}</p>
        </div>
        <Link href="/upload/component" className="inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-gradient-to-r from-[var(--cu-neon-cyan)] to-[rgba(0,240,255,0.8)] text-[#050510] font-semibold text-sm">
          + New
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass p-4 animate-pulse flex gap-4">
              <div className="w-24 h-16 bg-[var(--cu-surface)] rounded-lg" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-[var(--cu-surface)] rounded w-1/3" />
                <div className="h-3 bg-[var(--cu-surface)] rounded w-1/5" />
              </div>
            </div>
          ))}
        </div>
      ) : components.length === 0 ? (
        <div className="text-center py-20">
          <svg className="w-12 h-12 mx-auto mb-4 text-[var(--cu-neon-cyan)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
          </svg>
          <h2 className="text-lg font-semibold text-[var(--cu-text-primary)] mb-2">No components yet</h2>
          <p className="text-sm text-[var(--cu-text-secondary)] mb-6">Upload your first UI component!</p>
          <Link href="/upload/component" className="inline-flex items-center h-10 px-6 rounded-xl border border-[var(--cu-neon-cyan)] text-[var(--cu-neon-cyan)] text-sm font-medium">
            Upload Component
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {components.map((comp, i) => {
            const html = comp.code_html || comp.code_tailwind || "";
            const srcdoc = `<!DOCTYPE html><html><head><style>*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}body{display:flex;align-items:center;justify-content:center;min-height:100vh;background:#0a0a1a;color:#f0f0f5;font-family:system-ui}${comp.code_css || ""}</style></head><body>${html}</body></html>`;

            return (
              <motion.div
                key={comp.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className="glass p-4 flex flex-col sm:flex-row gap-4"
              >
                {/* Mini preview */}
                <div className="w-full sm:w-32 h-20 rounded-lg overflow-hidden border border-[var(--cu-border)] flex-shrink-0">
                  <iframe srcDoc={srcdoc} sandbox="allow-scripts" className="w-full h-full border-0 pointer-events-none" title={comp.title} loading="lazy" aria-hidden="true" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  {editingId === comp.id ? (
                    <div className="flex gap-2 mb-2">
                      <input
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="flex-1 h-8 px-3 rounded-lg bg-[var(--cu-surface)] border border-[var(--cu-border)] text-sm text-[var(--cu-text-primary)] outline-none focus:border-[var(--cu-neon-cyan)]"
                        onKeyDown={(e) => e.key === "Enter" && handleEdit(comp.id)}
                        autoFocus
                      />
                      <button onClick={() => handleEdit(comp.id)} className="h-8 px-3 rounded-lg text-xs font-medium bg-[var(--cu-neon-cyan)] text-[#050510]">Save</button>
                      <button onClick={() => setEditingId(null)} className="h-8 px-3 rounded-lg text-xs font-medium border border-[var(--cu-border)] text-[var(--cu-text-secondary)]">Cancel</button>
                    </div>
                  ) : (
                    <h3 className="text-sm font-semibold text-[var(--cu-text-primary)] truncate mb-1">{comp.title}</h3>
                  )}
                  <div className="flex items-center gap-3 text-xs text-[var(--cu-text-muted)]">
                    <span>{comp.framework}</span>
                    <span>{comp.is_full_page ? "Full Page" : "Component"}</span>
                    <span className={comp.is_public ? "text-[var(--cu-neon-green)]" : "text-[var(--cu-text-muted)]"}>
                      {comp.is_public ? "Public" : "Private"}
                    </span>
                    <span>{comp.likes_count} likes</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => toggleVisibility(comp.id, comp.is_public)}
                    className="h-8 px-3 rounded-lg text-xs font-medium border border-[var(--cu-border)] text-[var(--cu-text-secondary)] hover:border-[var(--cu-border-hover)] transition-colors"
                    title={comp.is_public ? "Make private" : "Make public"}
                  >
                    {comp.is_public ? "Hide" : "Show"}
                  </button>
                  <button
                    onClick={() => { setEditingId(comp.id); setEditTitle(comp.title); }}
                    className="h-8 px-3 rounded-lg text-xs font-medium border border-[var(--cu-border)] text-[var(--cu-text-secondary)] hover:border-[var(--cu-neon-cyan)] hover:text-[var(--cu-neon-cyan)] transition-colors"
                  >
                    Edit
                  </button>
                  {deleteConfirm === comp.id ? (
                    <div className="flex gap-1">
                      <button onClick={() => handleDelete(comp.id)} className="h-8 px-3 rounded-lg text-xs font-medium bg-red-500/10 border border-red-500/30 text-red-400">Confirm</button>
                      <button onClick={() => setDeleteConfirm(null)} className="h-8 px-3 rounded-lg text-xs font-medium border border-[var(--cu-border)] text-[var(--cu-text-secondary)]">No</button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirm(comp.id)}
                      className="h-8 px-3 rounded-lg text-xs font-medium border border-[var(--cu-border)] text-red-400 hover:border-red-400/30 transition-colors"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </main>
  );
}
