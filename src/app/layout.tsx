import type { Metadata } from "next";
import { AuthProvider } from "@/components/auth/auth-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Code Universum — Open-Source UI Component Library",
  description:
    "Upload, discover and preview UI components with live rendering. Share HTML, CSS, Tailwind and React snippets with the developer community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className="min-h-full flex flex-col bg-[var(--cu-bg-primary)] text-[var(--cu-text-primary)]">
        <a href="#main-content" className="sr-only">Skip to content</a>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
