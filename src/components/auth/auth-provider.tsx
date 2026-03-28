"use client";

import { useEffect, type ReactNode } from "react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { useAuthStore } from "@/stores/auth-store";

export function AuthProvider({ children }: { children: ReactNode }) {
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setUser(null);
      return;
    }

    const supabase = createClient();

    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (session?.user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single();
          setUser(profile);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        try {
          if (session?.user) {
            const { data: profile } = await supabase
              .from("profiles")
              .select("*")
              .eq("id", session.user.id)
              .single();
            setUser(profile);
          } else {
            setUser(null);
          }
        } catch {
          setUser(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [setUser, setLoading]);

  return <>{children}</>;
}
