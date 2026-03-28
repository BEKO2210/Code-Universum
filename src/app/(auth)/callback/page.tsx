"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    const handleCallback = async () => {
      const { error } = await supabase.auth.exchangeCodeForSession(
        window.location.href
      );

      if (error) {
        router.replace("/login?error=auth_failed");
      } else {
        router.replace("/");
      }
    };

    handleCallback();
  }, [router]);

  return (
    <main className="flex flex-1 items-center justify-center min-h-screen bg-mesh">
      <div className="glass p-8 flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-[var(--cu-neon-cyan)] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-[var(--cu-text-secondary)]">
          Signing you in...
        </p>
      </div>
    </main>
  );
}
