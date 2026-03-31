import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NicheKit — Ready-Made Business Templates for Small Businesses",
  description:
    "Professional business templates for dentists, restaurants, real estate agents, gyms, salons, and e-commerce stores. Social media calendars, email templates, SEO toolkits, and more. Download instantly.",
  keywords: [
    "business templates",
    "social media calendar",
    "email marketing templates",
    "SEO toolkit",
    "small business templates",
    "dental marketing",
    "restaurant marketing",
    "real estate marketing",
    "NicheKit",
  ],
  openGraph: {
    title: "NicheKit — Ready-Made Business Templates",
    description:
      "Professional templates for small businesses. Social media calendars, email swipe files, SEO toolkits, and more. Download instantly.",
    type: "website",
    siteName: "NicheKit",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
