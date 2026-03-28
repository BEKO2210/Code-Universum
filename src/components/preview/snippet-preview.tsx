"use client";

import { useMemo } from "react";

interface SnippetPreviewProps {
  html?: string;
  css?: string;
  js?: string;
  tailwind?: string;
  theme?: "dark" | "light";
  className?: string;
}

export function SnippetPreview({
  html = "",
  css = "",
  js = "",
  tailwind = "",
  theme = "dark",
  className = "",
}: SnippetPreviewProps) {
  const srcdoc = useMemo(() => {
    const tailwindCdn = tailwind
      ? `<script src="https://cdn.tailwindcss.com"></script>`
      : "";

    return `<!DOCTYPE html>
<html class="${theme}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  ${tailwindCdn}
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      background: ${theme === "dark" ? "#0a0a0a" : "#ffffff"};
      color: ${theme === "dark" ? "#f0f0f5" : "#1a1a1a"};
      font-family: system-ui, -apple-system, sans-serif;
    }
    ${css}
  </style>
</head>
<body>
  ${html || (tailwind ? `<div>${tailwind}</div>` : "<p>No preview</p>")}
  ${js ? `<script>${js}</script>` : ""}
</body>
</html>`;
  }, [html, css, js, tailwind, theme]);

  return (
    <iframe
      srcDoc={srcdoc}
      sandbox="allow-scripts"
      className={`w-full h-full border-0 rounded-[var(--cu-radius-md)] bg-[var(--cu-syntax-bg)] ${className}`}
      title="Component Preview"
    />
  );
}
