"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useAuthStore } from "@/stores/auth-store";
import { createClient } from "@/lib/supabase/client";

export function Header() {
  const { user, isLoading } = useAuthStore();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 glass-subtle border-b border-[var(--cu-border)]"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold">
            <span className="neon-text-cyan">Code</span>{" "}
            <span className="text-[var(--cu-text-primary)]">Universum</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden sm:flex items-center gap-6">
          <Link
            href="/components"
            className="text-sm text-[var(--cu-text-secondary)] hover:text-[var(--cu-text-primary)] transition-colors"
          >
            Components
          </Link>
          <Link
            href="/sites"
            className="text-sm text-[var(--cu-text-secondary)] hover:text-[var(--cu-text-primary)] transition-colors"
          >
            Sites
          </Link>
        </nav>

        {/* Auth */}
        <div className="flex items-center gap-3">
          {isLoading ? (
            <div className="w-8 h-8 rounded-full bg-[var(--cu-surface)] animate-pulse" />
          ) : user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/upload/component"
                className="hidden sm:inline-flex items-center gap-1.5 h-9 px-4 rounded-xl border border-[var(--cu-neon-cyan)] text-[var(--cu-neon-cyan)] text-xs font-medium transition-all hover:bg-[rgba(0,240,255,0.05)] hover:shadow-[var(--cu-glow-cyan)]"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Upload
              </Link>
              <div className="relative group">
                <button className="flex items-center gap-2">
                  {user.avatar_url ? (
                    <img
                      src={user.avatar_url}
                      alt={user.username}
                      className="w-8 h-8 rounded-full border border-[var(--cu-border)]"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[var(--cu-surface)] border border-[var(--cu-border)] flex items-center justify-center text-xs font-bold text-[var(--cu-text-secondary)]">
                      {user.username[0]?.toUpperCase()}
                    </div>
                  )}
                </button>
                {/* Dropdown */}
                <div className="absolute right-0 top-full mt-2 w-48 glass-subtle border border-[var(--cu-border)] rounded-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="px-3 py-2 border-b border-[var(--cu-border)]">
                    <p className="text-sm font-medium text-[var(--cu-text-primary)] truncate">
                      {user.display_name || user.username}
                    </p>
                    <p className="text-xs text-[var(--cu-text-muted)] truncate">
                      @{user.username}
                    </p>
                  </div>
                  <Link
                    href="/my-components"
                    className="block px-3 py-2 text-sm text-[var(--cu-text-secondary)] hover:text-[var(--cu-text-primary)] hover:bg-[var(--cu-surface)]"
                  >
                    My Components
                  </Link>
                  <Link
                    href="/my-sites"
                    className="block px-3 py-2 text-sm text-[var(--cu-text-secondary)] hover:text-[var(--cu-text-primary)] hover:bg-[var(--cu-surface)]"
                  >
                    My Sites
                  </Link>
                  <Link
                    href="/profile"
                    className="block px-3 py-2 text-sm text-[var(--cu-text-secondary)] hover:text-[var(--cu-text-primary)] hover:bg-[var(--cu-surface)]"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-[var(--cu-surface)]"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center h-9 px-5 rounded-xl border border-[var(--cu-neon-cyan)] text-[var(--cu-neon-cyan)] text-xs font-medium transition-all hover:bg-[rgba(0,240,255,0.05)] hover:shadow-[var(--cu-glow-cyan)]"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </motion.header>
  );
}
