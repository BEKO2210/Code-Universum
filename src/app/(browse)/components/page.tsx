"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { useAuthStore } from "@/stores/auth-store";
import type { Tag, Component, Profile } from "@/types";
import { useClipboard } from "@/hooks/use-clipboard";

interface ComponentRow extends Component {
  profiles: Pick<Profile, "username" | "avatar_url">;
  component_tags: { tags: Pick<Tag, "id" | "name" | "slug"> }[];
}

export default function BrowseComponentsPage() {
  const [components, setComponents] = useState<ComponentRow[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthStore();

  const loadComponents = useCallback(async () => {
    if (!isSupabaseConfigured) { setIsLoading(false); return; }
    setIsLoading(true);
    const supabase = createClient();

    let query = supabase
      .from("components")
      .select("*, profiles!components_author_id_fkey(username, avatar_url), component_tags(tags(id, name, slug))")
      .eq("is_public", true)
      .order("created_at", { ascending: false })
      .limit(30);

    if (activeTag) {
      // Filter by tag requires a join approach
      const { data: taggedIds } = await supabase
        .from("component_tags")
        .select("component_id, tags!inner(slug)")
        .eq("tags.slug", activeTag);

      if (taggedIds && taggedIds.length > 0) {
        const ids = taggedIds.map((r: { component_id: string }) => r.component_id);
        query = query.in("id", ids);
      } else {
        setComponents([]);
        setIsLoading(false);
        return;
      }
    }

    const { data } = await query;
    setComponents((data as unknown as ComponentRow[]) || []);
    setIsLoading(false);
  }, [activeTag]);

  useEffect(() => {
    loadComponents();
  }, [loadComponents]);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    const loadTags = async () => {
      const supabase = createClient();
      const { data } = await supabase.from("tags").select("*").eq("category", "type").order("name");
      if (data) setTags(data);
    };
    loadTags();
  }, []);

  return (
    <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 w-full">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[var(--cu-text-primary)] mb-1 sm:mb-2">Components</h1>
            <p className="text-sm text-[var(--cu-text-secondary)]">
              Open-source UI elements — copy the code with one click
            </p>
          </div>
          {user && (
            <Link
              href="/upload/component"
              className="hidden sm:inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-gradient-to-r from-[var(--cu-neon-cyan)] to-[rgba(0,240,255,0.8)] text-[#050510] font-semibold text-sm"
            >
              + Upload
            </Link>
          )}
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveTag(null)}
            className={`h-8 px-4 rounded-lg text-xs font-medium border transition-all ${
              !activeTag
                ? "border-[var(--cu-neon-cyan)] text-[var(--cu-neon-cyan)] bg-[rgba(0,240,255,0.06)]"
                : "border-[var(--cu-border)] text-[var(--cu-text-secondary)] hover:border-[var(--cu-border-hover)]"
            }`}
          >
            All
          </button>
          {tags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => setActiveTag(tag.slug === activeTag ? null : tag.slug)}
              className={`h-8 px-4 rounded-lg text-xs font-medium border transition-all ${
                activeTag === tag.slug
                  ? "border-[var(--cu-neon-cyan)] text-[var(--cu-neon-cyan)] bg-[rgba(0,240,255,0.06)]"
                  : "border-[var(--cu-border)] text-[var(--cu-text-secondary)] hover:border-[var(--cu-border-hover)]"
              }`}
            >
              {tag.name}
            </button>
          ))}
        </div>

        {/* Loading state */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="glass overflow-hidden animate-pulse">
                <div className="h-44 bg-[var(--cu-surface)]" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-[var(--cu-surface)] rounded w-2/3" />
                  <div className="h-3 bg-[var(--cu-surface)] rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : components.length === 0 ? (
          <div className="text-center py-20">
            <svg className="w-12 h-12 mx-auto mb-4 text-[var(--cu-neon-cyan)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" /></svg>
            <h2 className="text-lg font-semibold text-[var(--cu-text-primary)] mb-2">
              No components yet
            </h2>
            <p className="text-sm text-[var(--cu-text-secondary)] mb-6">
              Be the first to share a UI component!
            </p>
            <Link
              href="/upload/component"
              className="inline-flex items-center h-10 px-6 rounded-xl border border-[var(--cu-neon-cyan)] text-[var(--cu-neon-cyan)] text-sm font-medium hover:shadow-[var(--cu-glow-cyan)] transition-all"
            >
              Upload Component
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {components.map((item, i) => (
              <ComponentCard key={item.id} item={item} index={i} />
            ))}
          </div>
        )}
      </motion.div>
    </main>
  );
}

function ComponentCard({ item, index }: { item: ComponentRow; index: number }) {
  const { copied, copy } = useClipboard();

  // Use DB flag first, fallback to auto-detection
  const html = item.code_html || item.code_tailwind || "";
  const isFullPage = item.is_full_page || /<(header|nav|section|footer|main|article)\b/i.test(html)
    || html.trim().toLowerCase().startsWith("<!doctype")
    || html.trim().toLowerCase().startsWith("<html");

  const bodyStyle = isFullPage
    ? "background:#0a0a1a;color:#f0f0f5;font-family:system-ui,sans-serif"
    : "display:flex;align-items:center;justify-content:center;min-height:100vh;background:#0a0a1a;color:#f0f0f5;font-family:system-ui,sans-serif";

  const srcdoc = `<!DOCTYPE html><html><head><style>*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{${bodyStyle}}
${item.code_css || ""}</style>
${item.code_tailwind ? '<script src="https://cdn.tailwindcss.com"><\/script>' : ""}
</head><body>${html}</body></html>`;

  const allCode = [item.code_html, item.code_css, item.code_js, item.code_tailwind]
    .filter(Boolean)
    .join("\n\n");

  const handleLike = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Toggle like
    const { data: existing } = await supabase
      .from("likes")
      .select("id")
      .eq("user_id", user.id)
      .eq("content_type", "component")
      .eq("content_id", item.id)
      .single();

    if (existing) {
      await supabase.from("likes").delete().eq("id", existing.id);
      await supabase.from("components").update({ likes_count: Math.max(0, item.likes_count - 1) }).eq("id", item.id);
    } else {
      await supabase.from("likes").insert({ user_id: user.id, content_type: "component", content_id: item.id });
      await supabase.from("components").update({ likes_count: item.likes_count + 1 }).eq("id", item.id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="group glass overflow-hidden hover:border-[rgba(255,255,255,0.15)] transition-all duration-300"
    >
      {/* Preview */}
      <div className={`relative overflow-hidden border-b border-[var(--cu-border)] ${isFullPage ? "h-56 sm:h-64" : "h-44"}`}>
        <iframe
          srcDoc={srcdoc}
          sandbox="allow-scripts"
          className="w-full h-full border-0 pointer-events-none"
          title={item.title}
          loading="lazy"
          aria-hidden="true"
        />
        {/* Full Page Badge */}
        {isFullPage && (
          <div className="absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-[var(--cu-neon-purple)] text-[#050510]">
            Full Page
          </div>
        )}
        {/* Overlay actions */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--cu-bg-primary)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-3 gap-2">
          <button
            onClick={() => copy(allCode)}
            className="px-3 py-1.5 text-xs font-medium rounded-full border transition-all bg-[rgba(0,0,0,0.6)] backdrop-blur-sm border-[var(--cu-neon-cyan)] text-[var(--cu-neon-cyan)] hover:bg-[rgba(0,240,255,0.1)]"
          >
            {copied ? "Copied!" : "Copy Code"}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-[var(--cu-text-primary)] truncate">{item.title}</h3>
          <button onClick={handleLike} className="flex items-center gap-1 text-xs text-[var(--cu-text-muted)] hover:text-red-400 transition-colors">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            {item.likes_count}
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {item.profiles?.avatar_url && (
              <img src={item.profiles.avatar_url} alt="" className="w-4 h-4 rounded-full" />
            )}
            <span className="text-xs text-[var(--cu-text-secondary)]">{item.profiles?.username || "Anonymous"}</span>
          </div>
          <div className="flex gap-1">
            {item.component_tags?.slice(0, 2).map((ct) => (
              <span key={ct.tags.id} className="text-[10px] px-2 py-0.5 rounded-full border border-[var(--cu-border)] text-[var(--cu-text-muted)]">
                {ct.tags.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
