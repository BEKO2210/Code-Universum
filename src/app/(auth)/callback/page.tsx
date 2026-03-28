"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function AuthCallbackPage() {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuth = async () => {
      const supabase = createClient();
      const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
      const home = window.location.origin + base + "/";

      // PKCE flow: the code comes as a query parameter ?code=...
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (code) {
        const { error: exchangeError } =
          await supabase.auth.exchangeCodeForSession(code);

        if (exchangeError) {
          setError(exchangeError.message);
          return;
        }

        // Session is now in localStorage, redirect to homepage
        window.location.replace(home);
        return;
      }

      // Fallback: check if tokens are in hash fragment (implicit flow)
      if (window.location.hash) {
        // Supabase SDK with detectSessionInUrl:true handles this automatically
        // Wait a moment for SDK to process, then check session
        await new Promise((r) => setTimeout(r, 1000));

        const { data } = await supabase.auth.getSession();
        if (data.session) {
          window.location.replace(home);
          return;
        }
      }

      // No code and no hash — something went wrong
      setError("No authentication code received. Please try again.");
    };

    handleAuth();
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
