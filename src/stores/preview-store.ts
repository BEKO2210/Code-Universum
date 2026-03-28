import { create } from "zustand";
import type { WebContainerStatus } from "@/types";

interface PreviewState {
  status: WebContainerStatus;
  url: string | null;
  error: string | null;
  previewTheme: "dark" | "light";
  setStatus: (status: WebContainerStatus) => void;
  setUrl: (url: string | null) => void;
  setError: (error: string | null) => void;
  toggleTheme: () => void;
  reset: () => void;
}

export const usePreviewStore = create<PreviewState>((set) => ({
  status: "idle",
  url: null,
  error: null,
  previewTheme: "dark",
  setStatus: (status) => set({ status }),
  setUrl: (url) => set({ url }),
  setError: (error) => set({ error, status: "error" }),
  toggleTheme: () =>
    set((state) => ({
      previewTheme: state.previewTheme === "dark" ? "light" : "dark",
    })),
  reset: () => set({ status: "idle", url: null, error: null }),
}));
