import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ChatWidget } from "@/components/ui/chat-widget";

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
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "creAIve Labs" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "creAIve Labs — AI Systems for Service Businesses",
    description: "AI-powered front-desk, follow-up, and operations systems for service businesses.",
    images: ["/opengraph-image"],
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
        <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7.5' fill='%230d0d0d'/%3E%3Crect width='32' height='32' rx='7.5' fill='%23800000' fill-opacity='0.25'/%3E%3Cpath d='M16 7.5 L23.5 20.5 L8.5 20.5 Z' fill='none' stroke='%23800000' stroke-opacity='0.35' stroke-width='0.6'/%3E%3Cline x1='16' y1='15.5' x2='16' y2='9' stroke='%23c03030' stroke-width='1.1' stroke-opacity='0.80' stroke-linecap='round'/%3E%3Cline x1='16' y1='15.5' x2='22.5' y2='20' stroke='%23c03030' stroke-width='1.1' stroke-opacity='0.80' stroke-linecap='round'/%3E%3Cline x1='16' y1='15.5' x2='9.5' y2='20' stroke='%23c03030' stroke-width='1.1' stroke-opacity='0.80' stroke-linecap='round'/%3E%3Ccircle cx='16' cy='7.5' r='2.2' fill='%23e05555'/%3E%3Ccircle cx='22.5' cy='20.5' r='1.9' fill='%23c03535'/%3E%3Ccircle cx='9.5' cy='20.5' r='1.9' fill='%23c03535'/%3E%3Ccircle cx='16' cy='15.5' r='3.6' fill='%23cc2020'/%3E%3Ccircle cx='16' cy='15.5' r='1.6' fill='%23ff7070'/%3E%3C/svg%3E" />
        <link rel="shortcut icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full bg-background text-foreground">
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
