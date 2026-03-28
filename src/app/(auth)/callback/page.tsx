"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();

    const handleCallback = async () => {
      try {
        // Try hash-based auth first (Supabase PKCE flow)
        const hashParams = new URLSearchParams(
          window.location.hash.substring(1)
        );
        const accessToken = hashParams.get("access_token");
        const refreshToken = hashParams.get("refresh_token");

        if (accessToken && refreshToken) {
          const { error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          if (sessionError) {
            setError(sessionError.message);
            return;
          }
          window.location.href = window.location.origin +
            (process.env.NEXT_PUBLIC_BASE_PATH || "") + "/";
          return;
        }

        // Try code-based auth (OAuth code exchange)
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");

        if (code) {
          const { error: exchangeError } =
            await supabase.auth.exchangeCodeForSession(code);
          if (exchangeError) {
            setError(exchangeError.message);
            return;
          }
          window.location.href = window.location.origin +
            (process.env.NEXT_PUBLIC_BASE_PATH || "") + "/";
          return;
        }

        // No auth params found
        setError("No authentication data received");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Authentication failed");
      }
    };

    handleCallback();
  }, []);

  if (error) {
    return (
      <main className="flex flex-1 items-center justify-center min-h-screen px-4">
        <div className="glass p-6 sm:p-8 flex flex-col items-center gap-4 max-w-sm w-full text-center">
          <svg
            className="w-10 h-10 text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <p className="text-sm text-red-400">{error}</p>
          <a
            href={(process.env.NEXT_PUBLIC_BASE_PATH || "") + "/login"}
            className="inline-flex items-center h-10 px-6 rounded-xl border border-[var(--cu-neon-cyan)] text-[var(--cu-neon-cyan)] text-sm font-medium"
          >
            Try Again
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-1 items-center justify-center min-h-screen px-4">
      <div className="glass p-6 sm:p-8 flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-[var(--cu-neon-cyan)] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-[var(--cu-text-secondary)]">
          Signing you in...
        </p>
      </div>
    </main>
  );
}
