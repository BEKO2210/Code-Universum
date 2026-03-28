import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upload Site",
  description: "Upload a ZIP file of your website project. Preview it live in the browser with WebContainers.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
