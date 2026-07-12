import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { getSiteUrl, siteDescription, siteName } from "@/lib/site";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Pop Cult | Find Your Next Favorite Thing",
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Pop Cult | Find Your Next Favorite Thing",
    description: siteDescription,
    url: "/",
    siteName,
    images: [
      {
        url: "/brand/popcult-logo-final.jpg",
        alt: "Pop Cult logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pop Cult | Find Your Next Favorite Thing",
    description: siteDescription,
    images: ["/brand/popcult-logo-final.jpg"],
  },
  icons: {
    icon: "/brand/logofavicon.png",
    apple: "/brand/logofavicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className="h-full scroll-smooth antialiased"
    >
      <body className="min-h-full bg-background text-foreground">
        <div className="flex min-h-screen flex-col">
          <a
            href="#main-content"
            className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-black px-4 py-2 text-sm font-bold text-white transition-transform focus:translate-y-0"
          >
            Skip to content
          </a>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
      </body>
    </html>
  );
}
