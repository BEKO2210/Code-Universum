"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/stores/auth-store";
import { Header } from "@/components/layout/header";
import { scanZipFile } from "@/lib/utils/security";
import type { Tag } from "@/types";

export default function UploadSitePage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const loadTags = async () => {
      const supabase = createClient();
      const { data } = await supabase.from("tags").select("*").order("category").order("name");
      if (data) setTags(data);
    };
    loadTags();
  }, []);

  const handleFile = useCallback(async (f: File) => {
    if (!f.name.endsWith(".zip")) {
      setError("Only .zip files are accepted");
      return;
    }
    setFile(f);
    setError(null);
    setScanResult([]);

    // Security scan
    const result = await scanZipFile(f);
    if (!result.safe) {
      setScanResult(result.issues);
      setError("Security issues detected — see details below");
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const f = e.dataTransfer.files[0];
      if (f) handleFile(f);
    },
    [handleFile]
  );

  const handleSubmit = async () => {
    if (!user) return router.push("/login");
    if (!title.trim()) return setError("Title is required");
    if (!file) return setError("Please select a ZIP file");
    if (scanResult.length > 0) return setError("Fix security issues before uploading");

    setIsSubmitting(true);
    setError(null);

    try {
      const supabase = createClient();
      const storagePath = `sites/${user.id}/${Date.now()}_${file.name}`;

      // Upload ZIP to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("site-uploads")
        .upload(storagePath, file, {
          contentType: "application/zip",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // Detect project type (basic: check filename patterns)
      const projectType = "static"; // Default; Edge Function will refine this

      // Insert site record
      const { data: site, error: insertError } = await supabase
        .from("full_sites")
        .insert({
          author_id: user.id,
          title: title.trim(),
          description: description.trim() || null,
          storage_path: storagePath,
          file_size_bytes: file.size,
          project_type: projectType,
        })
        .select()
        .single();

      if (insertError) throw insertError;

      // Insert tags
      if (selectedTags.length > 0 && site) {
        const tagRows = selectedTags.map((tagId) => ({
          site_id: site.id,
          tag_id: tagId,
        }));
        await supabase.from("site_tags").insert(tagRows);
      }

      router.push("/sites");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <>
        <Header />
        <main className="flex flex-1 items-center justify-center px-6 py-20">
          <div className="glass p-8 text-center max-w-sm">
            <h2 className="text-xl font-bold mb-3 text-[var(--cu-text-primary)]">Sign in required</h2>
            <p className="text-sm text-[var(--cu-text-secondary)] mb-6">You need to sign in to upload sites.</p>
            <Link href="/login" className="inline-flex items-center h-10 px-6 rounded-xl border border-[var(--cu-neon-cyan)] text-[var(--cu-neon-cyan)] text-sm font-medium">Sign In</Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1 max-w-2xl mx-auto px-6 py-8 w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <h1 className="text-2xl font-bold text-[var(--cu-text-primary)] mb-8">Upload Full Site</h1>

          <div className="flex flex-col gap-5">
            <input
              type="text"
              placeholder="Site title *"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-11 px-4 rounded-xl bg-[var(--cu-surface)] border border-[var(--cu-border)] text-[var(--cu-text-primary)] text-sm placeholder:text-[var(--cu-text-muted)] outline-none focus:border-[var(--cu-neon-cyan)] transition-colors"
            />

            <textarea
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="w-full px-4 py-3 rounded-xl bg-[var(--cu-surface)] border border-[var(--cu-border)] text-[var(--cu-text-primary)] text-sm placeholder:text-[var(--cu-text-muted)] outline-none focus:border-[var(--cu-neon-cyan)] transition-colors resize-none"
            />

            {/* Dropzone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-2xl p-10 text-center transition-all cursor-pointer ${
                isDragging
                  ? "border-[var(--cu-neon-cyan)] bg-[rgba(0,240,255,0.03)]"
                  : file
                  ? "border-[var(--cu-neon-green)] bg-[rgba(34,255,136,0.03)]"
                  : "border-[var(--cu-border)] hover:border-[var(--cu-border-hover)]"
              }`}
              onClick={() => document.getElementById("zip-input")?.click()}
            >
              <input
                id="zip-input"
                type="file"
                accept=".zip"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleFile(f);
                }}
              />
              {file ? (
                <div>
                  <div className="text-[var(--cu-neon-green)] text-3xl mb-2">&#10003;</div>
                  <p className="text-sm font-medium text-[var(--cu-text-primary)]">{file.name}</p>
                  <p className="text-xs text-[var(--cu-text-muted)] mt-1">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              ) : (
                <div>
                  <svg className="w-10 h-10 mx-auto mb-3 text-[var(--cu-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-sm text-[var(--cu-text-secondary)]">
                    Drag & drop your <strong>.zip</strong> file here
                  </p>
                  <p className="text-xs text-[var(--cu-text-muted)] mt-1">or click to browse (max 50 MB)</p>
                </div>
              )}
            </div>

            {/* Security scan issues */}
            {scanResult.length > 0 && (
              <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/5">
                <p className="text-sm font-medium text-red-400 mb-2">Security Issues</p>
                <ul className="list-disc list-inside text-xs text-red-300 space-y-1">
                  {scanResult.map((issue, i) => (
                    <li key={i}>{issue}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tags */}
            {tags.length > 0 && (
              <div>
                <p className="text-xs text-[var(--cu-text-muted)] mb-2">Tags (optional)</p>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <button
                      key={tag.id}
                      onClick={() =>
                        setSelectedTags((prev) =>
                          prev.includes(tag.id) ? prev.filter((t) => t !== tag.id) : [...prev, tag.id]
                        )
                      }
                      className={`h-6 px-2.5 rounded-full text-[10px] font-medium border transition-all ${
                        selectedTags.includes(tag.id)
                          ? "border-[var(--cu-neon-cyan)] text-[var(--cu-neon-cyan)] bg-[rgba(0,240,255,0.08)]"
                          : "border-[var(--cu-border)] text-[var(--cu-text-muted)]"
                      }`}
                    >
                      {tag.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {error && (
              <div className="p-3 rounded-xl border border-red-500/30 bg-red-500/5 text-sm text-red-400">{error}</div>
            )}

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="h-12 rounded-xl bg-gradient-to-r from-[var(--cu-neon-purple)] to-[var(--cu-neon-pink)] text-white font-semibold text-sm transition-all hover:shadow-[var(--cu-glow-purple)] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Uploading...
                </>
              ) : (
                "Publish Site"
              )}
            </button>
          </div>
        </motion.div>
      </main>
    </>
  );
}
