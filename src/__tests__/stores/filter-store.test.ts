import { describe, it, expect, beforeEach } from "vitest";
import { useFilterStore } from "@/stores/filter-store";

describe("FilterStore", () => {
  beforeEach(() => {
    useFilterStore.setState({
      selectedTags: [],
      searchQuery: "",
      framework: null,
      sortBy: "newest",
    });
  });

  it("toggles a tag on", () => {
    useFilterStore.getState().toggleTag("button");
    expect(useFilterStore.getState().selectedTags).toEqual(["button"]);
  });

  it("toggles a tag off", () => {
    useFilterStore.setState({ selectedTags: ["button"] });
    useFilterStore.getState().toggleTag("button");
    expect(useFilterStore.getState().selectedTags).toEqual([]);
  });

  it("sets search query", () => {
    useFilterStore.getState().setSearch("neon");
    expect(useFilterStore.getState().searchQuery).toBe("neon");
  });

  it("sets framework filter", () => {
    useFilterStore.getState().setFramework("react");
    expect(useFilterStore.getState().framework).toBe("react");
  });

  it("clears all filters", () => {
    useFilterStore.setState({
      selectedTags: ["button", "card"],
      searchQuery: "test",
      framework: "react",
      sortBy: "popular",
    });

    useFilterStore.getState().clearFilters();

    const state = useFilterStore.getState();
    expect(state.selectedTags).toEqual([]);
    expect(state.searchQuery).toBe("");
    expect(state.framework).toBeNull();
    expect(state.sortBy).toBe("newest");
  });
});
