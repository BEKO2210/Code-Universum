"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function AuthCallbackPage() {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
    const home = window.location.origin + base + "/";

    // Listen for the auth event — Supabase SDK automatically detects
    // hash fragments (#access_token=...) and code params (?code=...)
    // from the URL and processes them internally
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event: string) => {
        if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
          // Auth succeeded — redirect to homepage
          window.location.replace(home);
        }
        if (event === "SIGNED_OUT") {
          setError("Authentication failed. Please try again.");
        }
      }
    );

    // Fallback: if nothing happens after 8 seconds, show error
    const timeout = setTimeout(() => {
      setError("Authentication timed out. Please try again.");
    }, 8000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  if (error) {
    return (
      <main className="flex flex-1 items-center justify-center min-h-screen px-4">
        <div className="glass p-6 sm:p-8 flex flex-col items-center gap-4 max-w-sm w-full text-center">
          <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-sm text-red-400">{error}</p>
          <Link href="/login" className="inline-flex items-center h-10 px-6 rounded-xl border border-[var(--cu-neon-cyan)] text-[var(--cu-neon-cyan)] text-sm font-medium">
            Try Again
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-1 items-center justify-center min-h-screen px-4">
      <div className="glass p-6 sm:p-8 flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-[var(--cu-neon-cyan)] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-[var(--cu-text-secondary)]">Signing you in...</p>
      </div>
    </main>
  );
}
