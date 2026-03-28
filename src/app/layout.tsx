import type { Metadata, Viewport } from "next";
import { AuthProvider } from "@/components/auth/auth-provider";
import "./globals.css";

const BASE_URL = "https://beko2210.github.io/Code-Universum";

export const viewport: Viewport = {
  themeColor: "#050510",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Code Universum — Open-Source UI Component Library",
    template: "%s | Code Universum",
  },
  description:
    "Upload, discover and preview UI components with live rendering. Share HTML, CSS, Tailwind and React snippets with the developer community. Free and open source.",
  keywords: [
    "UI components",
    "open source",
    "tailwind components",
    "react components",
    "CSS snippets",
    "code sharing",
    "live preview",
    "web design",
    "frontend",
    "developer tools",
  ],
  authors: [{ name: "Belkis Aslani", url: "https://github.com/BEKO2210" }],
  creator: "BEKO2210",
  publisher: "Code Universum",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Code Universum",
    title: "Code Universum — Open-Source UI Component Library",
    description:
      "Upload, discover and preview UI components with live rendering. Free and open source.",
    images: [
      {
        url: `${BASE_URL}/og/og-image.svg`,
        width: 1200,
        height: 630,
        alt: "Code Universum — Share Your UI with the World",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Code Universum — Open-Source UI Component Library",
    description:
      "Upload, discover and preview beautiful UI components. Free and open source.",
    images: [`${BASE_URL}/og/og-image.svg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  manifest: "/Code-Universum/manifest.json",
  icons: {
    icon: "/Code-Universum/favicon.svg",
    apple: "/Code-Universum/apple-touch-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Code Universum",
              url: BASE_URL,
              description:
                "Upload, discover and preview UI components with live rendering. Free and open source.",
              applicationCategory: "DeveloperApplication",
              operatingSystem: "Any",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "EUR",
              },
              author: {
                "@type": "Person",
                name: "Belkis Aslani",
                url: "https://github.com/BEKO2210",
              },
              license: "https://opensource.org/licenses/MIT",
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--cu-bg-primary)] text-[var(--cu-text-primary)]">
        <a href="#main-content" className="sr-only">
          Skip to content
        </a>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
