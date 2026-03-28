import { describe, it, expect } from "vitest";
import { scanZipFile } from "@/lib/utils/security";

// Superpowers TDD: RED-GREEN-REFACTOR
// These tests verify the security scanner catches dangerous uploads

describe("scanZipFile", () => {
  it("rejects files larger than 50MB", async () => {
    const bigFile = new File(["x"], "huge.zip", { type: "application/zip" });
    Object.defineProperty(bigFile, "size", { value: 60 * 1024 * 1024 });

    const result = await scanZipFile(bigFile);

    expect(result.safe).toBe(false);
    expect(result.issues[0]).toContain("too large");
  });

  it("rejects corrupted ZIP files", async () => {
    const badFile = new File(["not-a-zip"], "bad.zip", {
      type: "application/zip",
    });

    const result = await scanZipFile(badFile);

    expect(result.safe).toBe(false);
    expect(result.issues[0]).toContain("corrupted");
  });
});
