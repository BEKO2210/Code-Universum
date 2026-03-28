"use client";

import { useMemo } from "react";

interface SnippetPreviewProps {
  html?: string;
  css?: string;
  js?: string;
  tailwind?: string;
  theme?: "dark" | "light";
  fullPage?: boolean;
  className?: string;
}

export function SnippetPreview({
  html = "",
  css = "",
  js = "",
  tailwind = "",
  theme = "dark",
  fullPage,
  className = "",
}: SnippetPreviewProps) {
  const srcdoc = useMemo(() => {
    const tailwindCdn = tailwind
      ? `<script src="https://cdn.tailwindcss.com"><\/script>`
      : "";

    // Auto-detect full page if not explicitly set
    const isFullPage = fullPage ?? (
      /<(header|nav|section|footer|main|article)\b/i.test(html)
      || html.trim().toLowerCase().startsWith("<!doctype")
      || html.trim().toLowerCase().startsWith("<html")
    );

    // If user provided a complete HTML document, render it directly
    if (isFullPage && (html.trim().toLowerCase().startsWith("<!doctype") || html.trim().toLowerCase().startsWith("<html"))) {
      const cssInject = css ? `<style>${css}</style>` : "";
      const jsInject = js ? `<script>${js}<\/script>` : "";
      return html
        .replace("</head>", `${tailwindCdn}${cssInject}</head>`)
        .replace("</body>", `${jsInject}</body>`);
    }

    const bodyStyle = isFullPage
      ? `background: ${theme === "dark" ? "#0a0a0a" : "#ffffff"}; color: ${theme === "dark" ? "#f0f0f5" : "#1a1a1a"}; font-family: system-ui, -apple-system, sans-serif;`
      : `display: flex; align-items: center; justify-content: center; min-height: 100vh; background: ${theme === "dark" ? "#0a0a0a" : "#ffffff"}; color: ${theme === "dark" ? "#f0f0f5" : "#1a1a1a"}; font-family: system-ui, -apple-system, sans-serif;`;

    return `<!DOCTYPE html>
<html class="${theme}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  ${tailwindCdn}
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { ${bodyStyle} }
    ${css}
  </style>
</head>
<body>
  ${html || (tailwind ? `<div>${tailwind}</div>` : '<p style="color:#7b7b9a">No preview</p>')}
  ${js ? `<script>${js}<\/script>` : ""}
</body>
</html>`;
  }, [html, css, js, tailwind, theme, fullPage]);

  return (
    <iframe
      srcDoc={srcdoc}
      sandbox="allow-scripts"
      className={`w-full h-full border-0 rounded-[var(--cu-radius-md)] bg-[var(--cu-syntax-bg)] ${className}`}
      title="Component Preview"
      loading="lazy"
    />
  );
}
