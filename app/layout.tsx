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
  title: "NicheKit — Build Your Own E-Commerce Store with AI",
  description:
    "Learn to build, launch, and market your own online store using AI — no Shopify, no agencies, no BS. Courses, templates, and 1-on-1 consultations for Australian businesses.",
  keywords: [
    "build ecommerce store",
    "AI ecommerce course",
    "online store without shopify",
    "ecommerce course australia",
    "AI business tools",
    "build online store with AI",
    "australian ecommerce",
    "NicheKit",
  ],
  openGraph: {
    title: "NicheKit — Build Your Own E-Commerce Store with AI",
    description:
      "Unconventional courses that teach Australians to build profitable online stores using AI tools. No Shopify. No agencies. Just results.",
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
    description: "AI-powered e-commerce courses and business templates for Australian entrepreneurs.",
    contactPoint: { "@type": "ContactPoint", email: "support@nichekit.co", contactType: "customer support" },
  },
  {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Build Your Own E-Commerce Store with AI",
    description: "Complete course teaching Australians to build, launch, and market online stores using AI tools — without Shopify or expensive agencies.",
    provider: { "@type": "Organization", name: "NicheKit", url: SITE_URL },
    offers: [
      { "@type": "Offer", name: "Free", price: "0", priceCurrency: "AUD" },
      { "@type": "Offer", name: "Starter", price: "29", priceCurrency: "AUD", url: SITE_URL + "/pricing" },
      { "@type": "Offer", name: "Pro", price: "79", priceCurrency: "AUD", url: SITE_URL + "/pricing" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "Do I need technical skills?", acceptedAnswer: { "@type": "Answer", text: "No. The courses are designed for complete beginners. AI handles the technical parts — you follow step-by-step guides." } },
      { "@type": "Question", name: "Why not just use Shopify?", acceptedAnswer: { "@type": "Answer", text: "Shopify costs $79+ AUD/month, takes a 2% transaction fee, and locks you into their ecosystem. We teach you to build on free/low-cost platforms you own and control." } },
      { "@type": "Question", name: "Is this for Australians only?", acceptedAnswer: { "@type": "Answer", text: "The courses work globally, but we focus on Australian specifics — ABN, GST, AUD pricing, Aussie payment processors, Australian consumer law, and local marketing tactics." } },
      { "@type": "Question", name: "Can I cancel anytime?", acceptedAnswer: { "@type": "Answer", text: "Yes. Cancel from your dashboard. You keep access until the end of your billing period. No lock-in, no exit fees." } },
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
