import type { Metadata } from "next";
import "./globals.css";
import LayoutProvider from "@/providers/LayoutProvider";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Algo Tracker",
  description: "Track your Leetcode progress with ease",
  keywords: [
    "leetcode",
    "algorithms",
    "coding",
    "programming",
    "tracker",
    "progress",
    "interviews",
    "data structures",
  ],
  authors: [{ name: "Med Amine Aifia" }],
  creator: "Med Amine Aifia",
  publisher: "Med Amine Aifia",
  icons: [{ rel: "icon", url: "/icon.svg" }],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  // manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://algo-tracker.com",
    title: "Algo Tracker - Track Your Leetcode Progress",
    description:
      "Track your Leetcode progress with ease. Monitor your algorithm practice, coding interviews preparation, and programming skills development.",
    siteName: "Algo Tracker",
  },
  alternates: {
    canonical: "https://algo-tracker.com",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body suppressHydrationWarning={true}>
        <LayoutProvider>{children}</LayoutProvider>
      </body>
    </html>
  );
}
