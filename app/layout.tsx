import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nichekit.vercel.app";

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
  alternates: {
    canonical: SITE_URL,
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "NicheKit",
    url: SITE_URL,
    description: "Ready-made business templates for small businesses.",
    contactPoint: { "@type": "ContactPoint", email: "support@nichekit.co", contactType: "customer support" },
  },
  {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "NicheKit Complete Bundle",
    description: "All 5 business template products for one niche. Social media calendar, email templates, business documents, SEO toolkit, and client acquisition playbook.",
    brand: { "@type": "Brand", name: "NicheKit" },
    offers: {
      "@type": "Offer",
      price: "67",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: SITE_URL,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "What format are the files?", acceptedAnswer: { "@type": "Answer", text: "Social media calendars are CSV (opens in Excel or Google Sheets). Email templates are HTML. Guides and documents are PDF. No special software needed." } },
      { "@type": "Question", name: "Can I use these for my clients?", acceptedAnswer: { "@type": "Answer", text: "Yes. You have a personal and business use license. Customize them for your clients freely. The only restriction is reselling the original files as-is." } },
      { "@type": "Question", name: "Is this a subscription?", acceptedAnswer: { "@type": "Answer", text: "No. One-time purchase, lifetime access. You also get any future updates to your purchased products at no extra cost." } },
      { "@type": "Question", name: "What if it's not right for me?", acceptedAnswer: { "@type": "Answer", text: "We offer a 30-day money-back guarantee. If the quality isn't what you expected, email us for a full refund — no questions asked." } },
    ],
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmSerif.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
