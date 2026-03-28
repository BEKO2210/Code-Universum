"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { useAuthStore } from "@/stores/auth-store";

export default function ProfilePage() {
  const { user, setUser } = useAuthStore();
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setDisplayName(user.display_name || "");
      setBio(user.bio || "");
      setGithubUrl(user.github_url || "");
      setWebsiteUrl(user.website_url || "");
    }
  }, [user]);

  const handleSave = async () => {
    if (!user || !isSupabaseConfigured) return;
    setIsSaving(true);
    setError(null);
    setSaved(false);

    try {
      const supabase = createClient();
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          display_name: displayName.trim() || null,
          bio: bio.trim() || null,
          github_url: githubUrl.trim() || null,
          website_url: websiteUrl.trim() || null,
        })
        .eq("id", user.id);

      if (updateError) throw updateError;

      setUser({
        ...user,
        display_name: displayName.trim() || null,
        bio: bio.trim() || null,
        github_url: githubUrl.trim() || null,
        website_url: websiteUrl.trim() || null,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save profile.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
    window.location.href = window.location.origin + base + "/";
  };

  if (!user) {
    return (
      <main className="flex flex-1 items-center justify-center px-4 py-20">
        <div className="glass p-6 sm:p-8 text-center max-w-sm w-full">
          <h2 className="text-xl font-bold mb-3 text-[var(--cu-text-primary)]">Sign in required</h2>
          <p className="text-sm text-[var(--cu-text-secondary)] mb-6">Sign in to view your profile.</p>
          <Link href="/login" className="inline-flex items-center h-10 px-6 rounded-xl border border-[var(--cu-neon-cyan)] text-[var(--cu-neon-cyan)] text-sm font-medium">Sign In</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8 w-full">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--cu-text-primary)] mb-6 sm:mb-8">Profile</h1>

        {/* Avatar + Username */}
        <div className="glass p-5 sm:p-6 mb-6 flex items-center gap-4">
          {user.avatar_url ? (
            <img src={user.avatar_url} alt={user.username} className="w-16 h-16 rounded-full border-2 border-[var(--cu-border)]" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-[var(--cu-surface)] border-2 border-[var(--cu-border)] flex items-center justify-center text-2xl font-bold text-[var(--cu-text-secondary)]">
              {user.username[0]?.toUpperCase()}
            </div>
          )}
          <div>
            <h2 className="text-lg font-bold text-[var(--cu-text-primary)]">@{user.username}</h2>
            <p className="text-xs text-[var(--cu-text-muted)]">Member since {new Date(user.created_at).toLocaleDateString("de-DE")}</p>
          </div>
        </div>

        {/* Edit form */}
        <div className="space-y-4">
          <div>
            <label htmlFor="display-name" className="block text-xs text-[var(--cu-text-secondary)] mb-1.5">Display Name</label>
            <input
              id="display-name"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder={user.username}
              className="w-full h-11 px-4 rounded-xl bg-[var(--cu-surface)] border border-[var(--cu-border)] text-[var(--cu-text-primary)] text-sm placeholder:text-[var(--cu-text-muted)] outline-none focus:border-[var(--cu-neon-cyan)] transition-colors"
            />
          </div>

          <div>
            <label htmlFor="bio" className="block text-xs text-[var(--cu-text-secondary)] mb-1.5">Bio</label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-[var(--cu-surface)] border border-[var(--cu-border)] text-[var(--cu-text-primary)] text-sm placeholder:text-[var(--cu-text-muted)] outline-none focus:border-[var(--cu-neon-cyan)] transition-colors resize-none"
            />
          </div>

          <div>
            <label htmlFor="github-url" className="block text-xs text-[var(--cu-text-secondary)] mb-1.5">GitHub URL</label>
            <input
              id="github-url"
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/username"
              className="w-full h-11 px-4 rounded-xl bg-[var(--cu-surface)] border border-[var(--cu-border)] text-[var(--cu-text-primary)] text-sm placeholder:text-[var(--cu-text-muted)] outline-none focus:border-[var(--cu-neon-cyan)] transition-colors"
            />
          </div>

          <div>
            <label htmlFor="website-url" className="block text-xs text-[var(--cu-text-secondary)] mb-1.5">Website URL</label>
            <input
              id="website-url"
              type="url"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              placeholder="https://yoursite.com"
              className="w-full h-11 px-4 rounded-xl bg-[var(--cu-surface)] border border-[var(--cu-border)] text-[var(--cu-text-primary)] text-sm placeholder:text-[var(--cu-text-muted)] outline-none focus:border-[var(--cu-neon-cyan)] transition-colors"
            />
          </div>

          {error && (
            <div className="p-3 rounded-xl border border-red-500/30 bg-red-500/5 text-sm text-red-400">{error}</div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="h-11 px-6 rounded-xl bg-gradient-to-r from-[var(--cu-neon-cyan)] to-[rgba(0,240,255,0.8)] text-[#050510] font-semibold text-sm transition-all hover:shadow-[var(--cu-glow-cyan)] disabled:opacity-50 flex items-center gap-2"
            >
              {isSaving ? (
                <div className="w-4 h-4 border-2 border-[#050510]/30 border-t-[#050510] rounded-full animate-spin" />
              ) : saved ? (
                "Saved!"
              ) : (
                "Save Profile"
              )}
            </button>
          </div>
        </div>

        {/* Danger zone */}
        <div className="mt-12 pt-6 border-t border-[var(--cu-border)]">
          <h3 className="text-sm font-semibold text-red-400 mb-3">Sign Out</h3>
          <button
            onClick={handleSignOut}
            className="h-10 px-6 rounded-xl border border-red-500/30 text-red-400 text-sm font-medium hover:bg-red-500/5 transition-colors"
          >
            Sign out of Code Universum
          </button>
        </div>
      </motion.div>
    </main>
  );
}
