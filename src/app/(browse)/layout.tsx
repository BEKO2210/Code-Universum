import { Header } from "@/components/layout/header";

export default function BrowseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-col flex-1">
        {children}
      </div>
    </div>
  );
}
