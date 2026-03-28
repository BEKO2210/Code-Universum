import { describe, it, expect, beforeEach } from "vitest";
import { usePreviewStore } from "@/stores/preview-store";

describe("PreviewStore", () => {
  beforeEach(() => {
    usePreviewStore.getState().reset();
  });

  it("starts in idle state", () => {
    const state = usePreviewStore.getState();
    expect(state.status).toBe("idle");
    expect(state.url).toBeNull();
    expect(state.error).toBeNull();
  });

  it("sets status transitions", () => {
    usePreviewStore.getState().setStatus("booting");
    expect(usePreviewStore.getState().status).toBe("booting");

    usePreviewStore.getState().setStatus("ready");
    expect(usePreviewStore.getState().status).toBe("ready");
  });

  it("sets URL when ready", () => {
    usePreviewStore.getState().setUrl("http://localhost:3000");
    expect(usePreviewStore.getState().url).toBe("http://localhost:3000");
  });

  it("sets error and moves to error status", () => {
    usePreviewStore.getState().setError("Boot failed");
    expect(usePreviewStore.getState().status).toBe("error");
    expect(usePreviewStore.getState().error).toBe("Boot failed");
  });

  it("toggles preview theme", () => {
    expect(usePreviewStore.getState().previewTheme).toBe("dark");
    usePreviewStore.getState().toggleTheme();
    expect(usePreviewStore.getState().previewTheme).toBe("light");
    usePreviewStore.getState().toggleTheme();
    expect(usePreviewStore.getState().previewTheme).toBe("dark");
  });

  it("resets to initial state", () => {
    usePreviewStore.getState().setStatus("ready");
    usePreviewStore.getState().setUrl("http://test");
    usePreviewStore.getState().setError("err");

    usePreviewStore.getState().reset();

    const state = usePreviewStore.getState();
    expect(state.status).toBe("idle");
    expect(state.url).toBeNull();
    expect(state.error).toBeNull();
  });
});
