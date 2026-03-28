import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upload Component",
  description: "Upload your HTML, CSS, Tailwind or React UI component with live preview. Share it with the developer community.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
