"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function AuthCallbackPage() {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
    const home = window.location.origin + base + "/";
    const supabase = createClient();

    // With detectSessionInUrl:true and flowType:"pkce",
    // the Supabase SDK automatically detects the ?code= param
    // and exchanges it for a session. We just need to wait for it.
    const checkSession = async () => {
      // Give the SDK time to process the URL and exchange the code
      await new Promise((r) => setTimeout(r, 1500));

      const { data, error: sessionError } = await supabase.auth.getSession();

      if (sessionError) {
        setError(sessionError.message);
        return;
      }

      if (data.session) {
        window.location.replace(home);
        return;
      }

      // If no session yet, try one more time after a longer delay
      await new Promise((r) => setTimeout(r, 2000));
      const { data: retryData } = await supabase.auth.getSession();

      if (retryData.session) {
        window.location.replace(home);
        return;
      }

      setError("Could not complete sign in. Please try again.");
    };

    checkSession();
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
