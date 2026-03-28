import { create } from "zustand";

interface FilterState {
  selectedTags: string[];
  searchQuery: string;
  framework: string | null;
  sortBy: "newest" | "popular" | "trending";
  toggleTag: (tagSlug: string) => void;
  setSearch: (query: string) => void;
  setFramework: (framework: string | null) => void;
  setSortBy: (sort: "newest" | "popular" | "trending") => void;
  clearFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  selectedTags: [],
  searchQuery: "",
  framework: null,
  sortBy: "newest",
  toggleTag: (tagSlug) =>
    set((state) => ({
      selectedTags: state.selectedTags.includes(tagSlug)
        ? state.selectedTags.filter((t) => t !== tagSlug)
        : [...state.selectedTags, tagSlug],
    })),
  setSearch: (searchQuery) => set({ searchQuery }),
  setFramework: (framework) => set({ framework }),
  setSortBy: (sortBy) => set({ sortBy }),
  clearFilters: () =>
    set({ selectedTags: [], searchQuery: "", framework: null, sortBy: "newest" }),
}));
