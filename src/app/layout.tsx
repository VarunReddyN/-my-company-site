import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "creAIve Labs — AI Systems for Service Businesses",
  description: "creAIve Labs builds AI-powered front-desk, follow-up, and operations systems that help service businesses capture more leads, respond instantly, and eliminate repetitive admin work.",
  metadataBase: new URL("https://www.creaivelabs.com"),
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    type: "website",
    url: "https://www.creaivelabs.com",
    title: "creAIve Labs — AI Systems for Service Businesses",
    description: "AI-powered front-desk, follow-up, and operations systems for service businesses. Respond instantly, capture every lead, eliminate admin work.",
    siteName: "creAIve Labs",
  },
  twitter: {
    card: "summary_large_image",
    title: "creAIve Labs — AI Systems for Service Businesses",
    description: "AI-powered front-desk, follow-up, and operations systems for service businesses.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "creAIve Labs",
  alternateName: "creAIve Labs",
  url: "https://www.creaivelabs.com",
  description: "AI-powered front-desk, follow-up, and operations systems for service businesses.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full bg-background text-foreground">{children}</body>
    </html>
  );
}
