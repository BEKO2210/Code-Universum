"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/stores/auth-store";
import { createClient } from "@/lib/supabase/client";

export function Header() {
  const { user, isLoading } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 glass-subtle border-b border-[var(--cu-border)]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
            <span className="text-lg sm:text-xl font-bold">
              <span className="neon-text-cyan">Code</span>{" "}
              <span className="text-[var(--cu-text-primary)]">Universum</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden sm:flex items-center gap-6">
            <Link href="/components" className="text-sm text-[var(--cu-text-secondary)] hover:text-[var(--cu-text-primary)] transition-colors">
              Components
            </Link>
            <Link href="/sites" className="text-sm text-[var(--cu-text-secondary)] hover:text-[var(--cu-text-primary)] transition-colors">
              Sites
            </Link>
          </nav>

          {/* Desktop Auth + Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Upload button — desktop only */}
            {user && (
              <Link
                href="/upload/component"
                className="hidden sm:inline-flex items-center gap-1.5 h-9 px-4 rounded-xl border border-[var(--cu-neon-cyan)] text-[var(--cu-neon-cyan)] text-xs font-medium transition-all hover:bg-[rgba(0,240,255,0.05)] hover:shadow-[var(--cu-glow-cyan)]"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Upload
              </Link>
            )}

            {/* Auth state — desktop */}
            <div className="hidden sm:flex items-center">
              {isLoading ? (
                <div className="w-8 h-8 rounded-full bg-[var(--cu-surface)] animate-pulse" />
              ) : user ? (
                <div className="relative group">
                  <button className="flex items-center gap-2">
                    {user.avatar_url ? (
                      <img src={user.avatar_url} alt={user.username} className="w-8 h-8 rounded-full border border-[var(--cu-border)]" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-[var(--cu-surface)] border border-[var(--cu-border)] flex items-center justify-center text-xs font-bold text-[var(--cu-text-secondary)]">
                        {user.username[0]?.toUpperCase()}
                      </div>
                    )}
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-48 glass-subtle border border-[var(--cu-border)] rounded-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="px-3 py-2 border-b border-[var(--cu-border)]">
                      <p className="text-sm font-medium text-[var(--cu-text-primary)] truncate">{user.display_name || user.username}</p>
                      <p className="text-xs text-[var(--cu-text-muted)] truncate">@{user.username}</p>
                    </div>
                    <Link href="/my-components" className="block px-3 py-2 text-sm text-[var(--cu-text-secondary)] hover:text-[var(--cu-text-primary)] hover:bg-[var(--cu-surface)]">My Components</Link>
                    <Link href="/my-sites" className="block px-3 py-2 text-sm text-[var(--cu-text-secondary)] hover:text-[var(--cu-text-primary)] hover:bg-[var(--cu-surface)]">My Sites</Link>
                    <button onClick={handleSignOut} className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-[var(--cu-surface)]">Sign Out</button>
                  </div>
                </div>
              ) : (
                <Link href="/login" className="inline-flex items-center h-9 px-5 rounded-xl border border-[var(--cu-neon-cyan)] text-[var(--cu-neon-cyan)] text-xs font-medium transition-all hover:bg-[rgba(0,240,255,0.05)] hover:shadow-[var(--cu-glow-cyan)]">
                  Sign In
                </Link>
              )}
            </div>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden flex items-center justify-center w-10 h-10 rounded-xl text-[var(--cu-text-secondary)] hover:text-[var(--cu-text-primary)] hover:bg-[var(--cu-surface)] transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-14 bottom-0 z-40 bg-[var(--cu-bg-primary)]/95 backdrop-blur-lg sm:hidden overflow-y-auto"
          >
            <nav className="flex flex-col p-4 gap-1">
              {/* Nav links */}
              <Link href="/components" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 h-12 px-4 rounded-xl text-base text-[var(--cu-text-primary)] hover:bg-[var(--cu-surface)] transition-colors">
                <svg className="w-5 h-5 text-[var(--cu-neon-cyan)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                Components
              </Link>
              <Link href="/sites" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 h-12 px-4 rounded-xl text-base text-[var(--cu-text-primary)] hover:bg-[var(--cu-surface)] transition-colors">
                <svg className="w-5 h-5 text-[var(--cu-neon-purple)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
                </svg>
                Sites
              </Link>

              <div className="h-px bg-[var(--cu-border)] my-2" />

              {user ? (
                <>
                  {/* User info */}
                  <div className="flex items-center gap-3 px-4 py-3">
                    {user.avatar_url ? (
                      <img src={user.avatar_url} alt={user.username} className="w-10 h-10 rounded-full border border-[var(--cu-border)]" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[var(--cu-surface)] border border-[var(--cu-border)] flex items-center justify-center text-sm font-bold text-[var(--cu-text-secondary)]">
                        {user.username[0]?.toUpperCase()}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium text-[var(--cu-text-primary)]">{user.display_name || user.username}</p>
                      <p className="text-xs text-[var(--cu-text-muted)]">@{user.username}</p>
                    </div>
                  </div>

                  <Link href="/upload/component" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 h-12 px-4 rounded-xl text-base text-[var(--cu-neon-cyan)] hover:bg-[var(--cu-surface)] transition-colors font-medium">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Upload Component
                  </Link>
                  <Link href="/upload/site" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 h-12 px-4 rounded-xl text-base text-[var(--cu-neon-purple)] hover:bg-[var(--cu-surface)] transition-colors font-medium">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    Upload Site
                  </Link>
                  <Link href="/my-components" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 h-12 px-4 rounded-xl text-base text-[var(--cu-text-secondary)] hover:bg-[var(--cu-surface)] transition-colors">
                    My Components
                  </Link>
                  <Link href="/my-sites" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 h-12 px-4 rounded-xl text-base text-[var(--cu-text-secondary)] hover:bg-[var(--cu-surface)] transition-colors">
                    My Sites
                  </Link>

                  <div className="h-px bg-[var(--cu-border)] my-2" />

                  <button onClick={handleSignOut} className="flex items-center gap-3 h-12 px-4 rounded-xl text-base text-red-400 hover:bg-[var(--cu-surface)] transition-colors w-full text-left">
                    Sign Out
                  </button>
                </>
              ) : (
                <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center h-12 mx-4 mt-2 rounded-xl border border-[var(--cu-neon-cyan)] text-[var(--cu-neon-cyan)] text-base font-medium transition-all hover:bg-[rgba(0,240,255,0.05)]">
                  Sign In with GitHub
                </Link>
              )}

              <div className="h-px bg-[var(--cu-border)] my-2" />

              {/* Legal links */}
              <div className="flex gap-4 px-4 py-2">
                <Link href="/terms" onClick={() => setMobileMenuOpen(false)} className="text-xs text-[var(--cu-text-muted)]">Terms</Link>
                <Link href="/privacy" onClick={() => setMobileMenuOpen(false)} className="text-xs text-[var(--cu-text-muted)]">Privacy</Link>
                <Link href="/impressum" onClick={() => setMobileMenuOpen(false)} className="text-xs text-[var(--cu-text-muted)]">Impressum</Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
