import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Code Universum — UI Component & Website Sharing Platform",
  description:
    "Discover, share, and preview beautiful UI components and full websites. Upload HTML, CSS, Tailwind, React snippets or entire projects with live in-browser rendering.",
  keywords: [
    "UI components",
    "web design",
    "tailwind",
    "react components",
    "code sharing",
    "live preview",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className="min-h-full flex flex-col bg-[var(--cu-bg-primary)] text-[var(--cu-text-primary)]">
        {children}
      </body>
    </html>
  );
}
