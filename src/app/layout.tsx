import type { Metadata, Viewport } from "next";
import "@fontsource-variable/archivo/wdth.css";
import "./globals.css";
import { siteConfig } from "@/content/site";
import { categories } from "@/content/services";
import { businessSchema } from "@/lib/schema";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { JsonLd, MobileActionBar } from "@/components/ui";
import { ScrollReveal } from "@/components/motion";
import { Suspense } from "react";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Electricians in ${siteConfig.city}, 35+ years experience`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_PK",
    siteName: siteConfig.name,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
  category: "Home services",
};

export const viewport: Viewport = {
  themeColor: "#0a1a33",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-PK">
      <body className="min-h-dvh antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:bg-brand focus:text-white focus:px-4 focus:py-2 focus:font-semibold"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileActionBar />
        <Suspense fallback={null}>
          <ScrollReveal />
        </Suspense>
        <JsonLd data={businessSchema(categories)} />
      </body>
    </html>
  );
}
