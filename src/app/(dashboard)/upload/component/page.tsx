"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { useAuthStore } from "@/stores/auth-store";
import type { Tag, Framework } from "@/types";

const FRAMEWORKS: { value: Framework; label: string }[] = [
  { value: "vanilla", label: "HTML / CSS / JS" },
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
];

export default function UploadComponentPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [codeHtml, setCodeHtml] = useState("");
  const [codeCss, setCodeCss] = useState("");
  const [codeJs, setCodeJs] = useState("");
  const [codeTailwind, setCodeTailwind] = useState("");
  const [framework, setFramework] = useState<Framework>("vanilla");
  const [isFullPage, setIsFullPage] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"html" | "css" | "js" | "tailwind">("html");

  // Load tags from Supabase
  useEffect(() => {
    if (!isSupabaseConfigured) return;
    const loadTags = async () => {
      const supabase = createClient();
      const { data } = await supabase.from("tags").select("*").order("category").order("name");
      if (data) setTags(data);
    };
    loadTags();
  }, []);

  // Live preview -- full page mode renders the HTML as-is (complete webpage)
  // Component mode centers the element in the viewport
  const previewSrcdoc = useMemo(() => {
    const tailwindCdn = codeTailwind
      ? '<script src="https://cdn.tailwindcss.com"><\/script>'
      : "";

    // Full page mode: render the HTML directly (user provides complete page structure)
    if (isFullPage && codeHtml) {
      // If user provides a full HTML document, inject CSS/JS and render
      const hasDoctype = codeHtml.trim().toLowerCase().startsWith("<!doctype") || codeHtml.trim().toLowerCase().startsWith("<html");
      if (hasDoctype) {
        // Inject user CSS + JS into their full document
        const cssInject = codeCss ? `<style>${codeCss}</style>` : "";
        const jsInject = codeJs ? `<script>${codeJs}<\/script>` : "";
        return codeHtml.replace("</head>", `${tailwindCdn}${cssInject}</head>`).replace("</body>", `${jsInject}</body>`);
      }
      // No doctype but full page mode: wrap in a document without centering
      return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
${tailwindCdn}
<style>*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{background:#0a0a1a;color:#f0f0f5;font-family:system-ui,sans-serif}
${codeCss}</style></head>
<body>${codeHtml}
${codeJs ? `<script>${codeJs}<\/script>` : ""}</body></html>`;
    }

    // Component mode: center the element
    return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
${tailwindCdn}
<style>*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{display:flex;align-items:center;justify-content:center;min-height:100vh;background:#0a0a1a;color:#f0f0f5;font-family:system-ui,sans-serif}
${codeCss}</style></head>
<body>${codeHtml || (codeTailwind ? `<div>${codeTailwind}</div>` : '<p style="color:#7b7b9a">Write code to see preview</p>')}
${codeJs ? `<script>${codeJs}<\/script>` : ""}</body></html>`;
  }, [codeHtml, codeCss, codeJs, codeTailwind, isFullPage]);

  const handleSubmit = async () => {
    if (!user) {
      router.push("/login");
      return;
    }
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    if (!codeHtml && !codeCss && !codeJs && !codeTailwind) {
      setError("Please add some code");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const supabase = createClient();

      // Insert component
      const { data: component, error: insertError } = await supabase
        .from("components")
        .insert({
          author_id: user.id,
          title: title.trim(),
          description: description.trim() || null,
          code_html: codeHtml || null,
          code_css: codeCss || null,
          code_js: codeJs || null,
          code_tailwind: codeTailwind || null,
          framework,
        })
        .select()
        .single();

      if (insertError) throw insertError;

      // Insert tags
      if (selectedTags.length > 0 && component) {
        const tagRows = selectedTags.map((tagId) => ({
          component_id: component.id,
          tag_id: tagId,
        }));
        await supabase.from("component_tags").insert(tagRows);
      }

      router.push("/components");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleTag = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId) ? prev.filter((t) => t !== tagId) : [...prev, tagId]
    );
  };

  // Not logged in
  if (!user) {
    return (
        <main className="flex flex-1 items-center justify-center px-4 sm:px-6 py-12 sm:py-20">
          <div className="glass p-8 text-center max-w-sm">
            <h2 className="text-xl font-bold mb-3 text-[var(--cu-text-primary)]">
              Sign in required
            </h2>
            <p className="text-sm text-[var(--cu-text-secondary)] mb-6">
              You need to sign in to upload components.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center h-10 px-6 rounded-xl border border-[var(--cu-neon-cyan)] text-[var(--cu-neon-cyan)] text-sm font-medium transition-all hover:shadow-[var(--cu-glow-cyan)]"
            >
              Sign In
            </Link>
          </div>
        </main>
    );
  }

  return (
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-2xl font-bold text-[var(--cu-text-primary)] mb-8">
            Upload Component
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Code Editor */}
            <div className="flex flex-col gap-4">
              {/* Title */}
              <label htmlFor="comp-title" className="sr-only">Component title</label>
              <input
                id="comp-title"
                type="text"
                placeholder="Component title *"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full h-11 px-4 rounded-xl bg-[var(--cu-surface)] border border-[var(--cu-border)] text-[var(--cu-text-primary)] text-sm placeholder:text-[var(--cu-text-muted)] outline-none focus:border-[var(--cu-neon-cyan)] transition-colors"
              />

              {/* Description */}
              <label htmlFor="comp-desc" className="sr-only">Description</label>
              <textarea
                id="comp-desc"
                placeholder="Short description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className="w-full px-4 py-3 rounded-xl bg-[var(--cu-surface)] border border-[var(--cu-border)] text-[var(--cu-text-primary)] text-sm placeholder:text-[var(--cu-text-muted)] outline-none focus:border-[var(--cu-neon-cyan)] transition-colors resize-none"
              />

              {/* Framework + Full Page Toggle */}
              <div className="flex flex-wrap gap-2">
                {FRAMEWORKS.map((fw) => (
                  <button
                    key={fw.value}
                    onClick={() => setFramework(fw.value)}
                    className={`h-8 px-3 rounded-lg text-xs font-medium border transition-all ${
                      framework === fw.value
                        ? "border-[var(--cu-neon-cyan)] text-[var(--cu-neon-cyan)] bg-[rgba(0,240,255,0.06)]"
                        : "border-[var(--cu-border)] text-[var(--cu-text-secondary)] hover:border-[var(--cu-border-hover)]"
                    }`}
                  >
                    {fw.label}
                  </button>
                ))}
                <div className="w-px bg-[var(--cu-border)]" />
                <button
                  onClick={() => setIsFullPage(!isFullPage)}
                  className={`h-8 px-3 rounded-lg text-xs font-medium border transition-all ${
                    isFullPage
                      ? "border-[var(--cu-neon-purple)] text-[var(--cu-neon-purple)] bg-[rgba(168,85,247,0.06)]"
                      : "border-[var(--cu-border)] text-[var(--cu-text-secondary)] hover:border-[var(--cu-border-hover)]"
                  }`}
                  title="Enable for complete webpages (headers, sections, footers). Disable for single UI components."
                >
                  Full Page
                </button>
              </div>

              {/* Code Tabs */}
              <div className="glass overflow-hidden flex-1 flex flex-col">
                <div className="flex border-b border-[var(--cu-border)]">
                  {(["html", "css", "js", "tailwind"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2.5 text-xs font-medium uppercase tracking-wider transition-colors ${
                        activeTab === tab
                          ? "text-[var(--cu-neon-cyan)] border-b-2 border-[var(--cu-neon-cyan)]"
                          : "text-[var(--cu-text-muted)] hover:text-[var(--cu-text-secondary)]"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="flex-1 min-h-[300px]">
                  {activeTab === "html" && (
                    <textarea
                      value={codeHtml}
                      onChange={(e) => setCodeHtml(e.target.value)}
                      placeholder='<button class="my-btn">Click me</button>'
                      className="w-full h-full min-h-[300px] p-4 bg-transparent text-[var(--cu-text-primary)] text-sm font-mono outline-none resize-none placeholder:text-[var(--cu-text-muted)]"
                      spellCheck={false}
                    />
                  )}
                  {activeTab === "css" && (
                    <textarea
                      value={codeCss}
                      onChange={(e) => setCodeCss(e.target.value)}
                      placeholder=".my-btn { padding: 12px 24px; background: #00f0ff; }"
                      className="w-full h-full min-h-[300px] p-4 bg-transparent text-[var(--cu-text-primary)] text-sm font-mono outline-none resize-none placeholder:text-[var(--cu-text-muted)]"
                      spellCheck={false}
                    />
                  )}
                  {activeTab === "js" && (
                    <textarea
                      value={codeJs}
                      onChange={(e) => setCodeJs(e.target.value)}
                      placeholder='document.querySelector(".my-btn").addEventListener("click", () => { ... })'
                      className="w-full h-full min-h-[300px] p-4 bg-transparent text-[var(--cu-text-primary)] text-sm font-mono outline-none resize-none placeholder:text-[var(--cu-text-muted)]"
                      spellCheck={false}
                    />
                  )}
                  {activeTab === "tailwind" && (
                    <textarea
                      value={codeTailwind}
                      onChange={(e) => setCodeTailwind(e.target.value)}
                      placeholder='<button class="px-6 py-3 bg-cyan-500 text-black font-bold rounded-xl hover:bg-cyan-400 transition">Click</button>'
                      className="w-full h-full min-h-[300px] p-4 bg-transparent text-[var(--cu-text-primary)] text-sm font-mono outline-none resize-none placeholder:text-[var(--cu-text-muted)]"
                      spellCheck={false}
                    />
                  )}
                </div>
              </div>

              {/* Tags */}
              {tags.length > 0 && (
                <div>
                  <p className="text-xs text-[var(--cu-text-muted)] mb-2">Tags (optional)</p>
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map((tag) => (
                      <button
                        key={tag.id}
                        onClick={() => toggleTag(tag.id)}
                        className={`h-6 px-2.5 rounded-full text-[10px] font-medium border transition-all ${
                          selectedTags.includes(tag.id)
                            ? "border-[var(--cu-neon-cyan)] text-[var(--cu-neon-cyan)] bg-[rgba(0,240,255,0.08)]"
                            : "border-[var(--cu-border)] text-[var(--cu-text-muted)] hover:text-[var(--cu-text-secondary)]"
                        }`}
                      >
                        {tag.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Live Preview + Submit */}
            <div className="flex flex-col gap-4">
              <div className="glass overflow-hidden flex-1 flex flex-col min-h-[250px] sm:min-h-[400px]">
                <div className="flex items-center px-4 py-2.5 border-b border-[var(--cu-border)]">
                  <span className="text-xs text-[var(--cu-text-muted)] uppercase tracking-wider">
                    Live Preview
                  </span>
                </div>
                <div className="flex-1 relative">
                  <iframe
                    srcDoc={previewSrcdoc}
                    sandbox="allow-scripts"
                    className="absolute inset-0 w-full h-full border-0"
                    title="Preview"
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-xl border border-red-500/30 bg-red-500/5 text-sm text-red-400">
                  {error}
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="h-12 rounded-xl bg-gradient-to-r from-[var(--cu-neon-cyan)] to-[rgba(0,240,255,0.8)] text-[#050510] font-semibold text-sm transition-all duration-300 hover:shadow-[var(--cu-glow-cyan)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#050510]/30 border-t-[#050510] rounded-full animate-spin" />
                    Uploading...
                  </>
                ) : (
                  "Publish Component"
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </main>
  );
}
