import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Full Sites",
  description:
    "Browse and preview complete website projects. Upload ZIP files and run them live in the browser via WebContainers.",
  alternates: { canonical: "https://beko2210.github.io/Code-Universum/sites" },
};

export default function SitesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
