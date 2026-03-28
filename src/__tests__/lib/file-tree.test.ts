import { describe, it, expect } from "vitest";
import JSZip from "jszip";
import { zipToFileSystemTree, detectProjectType } from "@/lib/webcontainer/file-tree";

describe("detectProjectType", () => {
  it("returns 'static' when no package.json exists", () => {
    const zip = new JSZip();
    zip.file("index.html", "<h1>Hello</h1>");
    zip.file("style.css", "body {}");

    expect(detectProjectType(zip)).toBe("static");
  });

  it("returns 'vite' when vite.config exists", () => {
    const zip = new JSZip();
    zip.file("package.json", "{}");
    zip.file("vite.config.ts", "export default {}");

    expect(detectProjectType(zip)).toBe("vite");
  });

  it("returns 'node' when only package.json exists", () => {
    const zip = new JSZip();
    zip.file("package.json", "{}");
    zip.file("index.js", "console.log('hi')");

    expect(detectProjectType(zip)).toBe("node");
  });
});

describe("zipToFileSystemTree", () => {
  it("converts a flat ZIP to a file tree", async () => {
    const zip = new JSZip();
    zip.file("index.html", "<h1>Hello</h1>");
    zip.file("style.css", "body { color: red; }");

    const tree = await zipToFileSystemTree(zip);

    expect(tree["index.html"]).toBeDefined();
    expect(tree["style.css"]).toBeDefined();
    expect((tree["index.html"] as { file: { contents: string } }).file.contents).toBe(
      "<h1>Hello</h1>"
    );
  });

  it("skips __MACOSX and .DS_Store files", async () => {
    const zip = new JSZip();
    zip.file("index.html", "<h1>Hello</h1>");
    zip.file("__MACOSX/resource", "junk");
    zip.file(".DS_Store", "junk");

    const tree = await zipToFileSystemTree(zip);

    expect(tree["index.html"]).toBeDefined();
    expect(tree["__MACOSX"]).toBeUndefined();
    expect(tree[".DS_Store"]).toBeUndefined();
  });

  it("skips node_modules", async () => {
    const zip = new JSZip();
    zip.file("index.js", "hello");
    zip.file("node_modules/pkg/index.js", "module");

    const tree = await zipToFileSystemTree(zip);

    expect(tree["index.js"]).toBeDefined();
    expect(tree["node_modules"]).toBeUndefined();
  });

  it("builds nested directory structures", async () => {
    const zip = new JSZip();
    zip.file("src/components/Button.tsx", "<button/>");
    zip.file("src/index.ts", "export {}");

    const tree = await zipToFileSystemTree(zip);

    expect(tree["src"]).toBeDefined();
    const src = (tree["src"] as { directory: Record<string, unknown> }).directory;
    expect(src["index.ts"]).toBeDefined();
    expect(src["components"]).toBeDefined();
  });
});
