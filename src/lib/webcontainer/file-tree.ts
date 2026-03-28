import type { FileSystemTree, DirectoryNode, FileNode } from "@webcontainer/api";
import JSZip from "jszip";

/**
 * Convert a JSZip instance to a WebContainer FileSystemTree.
 * Recursively builds the tree from extracted ZIP contents.
 */
export async function zipToFileSystemTree(zip: JSZip): Promise<FileSystemTree> {
  const tree: FileSystemTree = {};

  const entries = Object.entries(zip.files);

  for (const [path, zipEntry] of entries) {
    if (zipEntry.dir) continue;

    const parts = path.split("/");

    // Skip __MACOSX and hidden files
    if (parts.some((p) => p.startsWith("__") || p === ".DS_Store")) continue;

    // Skip node_modules (user should not upload these)
    if (parts.includes("node_modules")) continue;

    let current = tree;

    for (let i = 0; i < parts.length - 1; i++) {
      const dirName = parts[i];
      if (!current[dirName]) {
        current[dirName] = { directory: {} } as DirectoryNode;
      }
      current = (current[dirName] as DirectoryNode).directory;
    }

    const fileName = parts[parts.length - 1];
    const isBinary = isBinaryFile(fileName);

    if (isBinary) {
      const content = await zipEntry.async("uint8array");
      current[fileName] = {
        file: { contents: content },
      } as unknown as FileNode;
    } else {
      const content = await zipEntry.async("string");
      current[fileName] = {
        file: { contents: content },
      } as FileNode;
    }
  }

  return tree;
}

function isBinaryFile(filename: string): boolean {
  const binaryExts = new Set([
    ".png", ".jpg", ".jpeg", ".gif", ".webp", ".ico", ".svg",
    ".woff", ".woff2", ".ttf", ".eot", ".otf",
    ".mp3", ".mp4", ".webm", ".ogg",
    ".zip", ".gz", ".tar",
    ".wasm",
  ]);

  const ext = filename.slice(filename.lastIndexOf(".")).toLowerCase();
  return binaryExts.has(ext);
}

/**
 * Detect the project type from the file tree.
 */
export function detectProjectType(
  zip: JSZip
): "static" | "node" | "nextjs" | "vite" {
  const files = Object.keys(zip.files);

  const hasPackageJson = files.some(
    (f) => f === "package.json" || f.endsWith("/package.json")
  );

  if (!hasPackageJson) return "static";

  const hasNextConfig = files.some(
    (f) => f.includes("next.config") || f.includes("next.config")
  );
  if (hasNextConfig) return "nextjs";

  const hasViteConfig = files.some((f) => f.includes("vite.config"));
  if (hasViteConfig) return "vite";

  return "node";
}
