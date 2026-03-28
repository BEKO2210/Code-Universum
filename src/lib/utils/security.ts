import JSZip from "jszip";

const MAX_ZIP_SIZE = 50 * 1024 * 1024; // 50MB
const MAX_FILE_COUNT = 5000;

const DANGEROUS_EXTENSIONS = new Set([
  ".exe", ".bat", ".cmd", ".com", ".msi", ".scr", ".pif",
  ".sh", ".bash", ".ps1", ".psm1",
  ".dll", ".so", ".dylib",
]);

const DANGEROUS_FILENAMES = new Set([
  ".env", ".env.local", ".env.production",
  "id_rsa", "id_ed25519", "credentials.json",
  ".npmrc", ".pypirc",
]);

export interface SecurityScanResult {
  safe: boolean;
  issues: string[];
}

/**
 * Client-side security scan of a ZIP file before upload.
 */
export async function scanZipFile(file: File): Promise<SecurityScanResult> {
  const issues: string[] = [];

  // Size check
  if (file.size > MAX_ZIP_SIZE) {
    issues.push(`File too large: ${(file.size / 1024 / 1024).toFixed(1)}MB (max 50MB)`);
    return { safe: false, issues };
  }

  try {
    const zip = await JSZip.loadAsync(file);
    const entries = Object.entries(zip.files);

    // File count check
    if (entries.length > MAX_FILE_COUNT) {
      issues.push(`Too many files: ${entries.length} (max ${MAX_FILE_COUNT})`);
    }

    for (const [path, entry] of entries) {
      // Path traversal check
      if (path.includes("..")) {
        issues.push(`Path traversal detected: ${path}`);
      }

      // Dangerous extensions
      const ext = path.slice(path.lastIndexOf(".")).toLowerCase();
      if (DANGEROUS_EXTENSIONS.has(ext)) {
        issues.push(`Dangerous file type: ${path}`);
      }

      // Dangerous filenames
      const filename = path.split("/").pop() || "";
      if (DANGEROUS_FILENAMES.has(filename)) {
        issues.push(`Sensitive file detected: ${path}`);
      }

      // node_modules check
      if (path.includes("node_modules/")) {
        issues.push("ZIP contains node_modules — please remove before uploading");
        break;
      }

      // Symlink check
      if (entry.dir && entry.unixPermissions && (Number(entry.unixPermissions) & 0o120000) === 0o120000) {
        issues.push(`Symlink detected: ${path}`);
      }
    }
  } catch {
    issues.push("Failed to read ZIP file — may be corrupted");
  }

  return { safe: issues.length === 0, issues };
}
