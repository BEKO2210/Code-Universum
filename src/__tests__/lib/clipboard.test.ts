import { describe, it, expect, vi, beforeEach } from "vitest";
import { copyToClipboard } from "@/lib/utils/clipboard";

describe("copyToClipboard", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("copies text using navigator.clipboard API", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: { writeText },
    });

    const result = await copyToClipboard("test code");

    expect(writeText).toHaveBeenCalledWith("test code");
    expect(result).toBe(true);
  });

  it("returns false when clipboard API fails and execCommand unavailable", async () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockRejectedValue(new Error("denied")),
      },
    });
    document.execCommand = vi.fn().mockReturnValue(false);

    const result = await copyToClipboard("test");

    expect(result).toBe(false);
  });
});
