import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UI Components",
  description:
    "Browse open-source UI components. Buttons, cards, loaders, inputs, toggles and more. Copy the code with one click.",
  alternates: { canonical: "https://beko2210.github.io/Code-Universum/components" },
};

export default function ComponentsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
