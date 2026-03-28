import { Header } from "@/components/layout/header";

export default function BrowseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="flex flex-1">
        {children}
      </div>
    </>
  );
}
