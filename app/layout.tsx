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
  metadataBase: new URL(SITE_URL),
  title: {
    default: "NicheKit — Build Your Own E-Commerce Store with AI",
    template: "%s — NicheKit",
  },
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
    "AI for small business australia",
    "NicheKit",
  ],
  authors: [{ name: "NicheKit", url: SITE_URL }],
  creator: "NicheKit",
  publisher: "NicheKit",
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
    title: "NicheKit — Build Your Own E-Commerce Store with AI",
    description:
      "Unconventional courses that teach Australians to build profitable online stores using AI tools. No Shopify. No agencies. Just results.",
    type: "website",
    siteName: "NicheKit",
    locale: "en_AU",
    url: SITE_URL,
    images: [
      {
        url: "/og-image",
        width: 1200,
        height: 630,
        alt: "NicheKit — Build Your Own E-Commerce Store with AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NicheKit — Build Your Own E-Commerce Store with AI",
    description:
      "Courses that teach Australians to build profitable online stores using AI. No Shopify. No agencies.",
    images: ["/og-image"],
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: "/favicon.ico",
  },
  category: "education",
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}#organization`,
    name: "NicheKit",
    url: SITE_URL,
    logo: `${SITE_URL}/og-image`,
    description: "AI-powered e-commerce courses and business templates for Australian entrepreneurs.",
    contactPoint: {
      "@type": "ContactPoint",
      email: "support@nichekit.co",
      contactType: "customer support",
      areaServed: "AU",
      availableLanguage: ["English"],
    },
    knowsAbout: [
      "E-commerce",
      "AI tools",
      "Online store building",
      "SEO",
      "Email marketing",
      "Social media marketing",
      "Australian business",
    ],
    areaServed: { "@type": "Country", name: "Australia" },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}#website`,
    url: SITE_URL,
    name: "NicheKit",
    publisher: { "@id": `${SITE_URL}#organization` },
    inLanguage: "en-AU",
  },
  {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Build Your Own E-Commerce Store with AI",
    description:
      "Complete course teaching Australians to build, launch, and market online stores using AI tools — without Shopify or expensive agencies.",
    provider: { "@id": `${SITE_URL}#organization` },
    educationalLevel: "Beginner",
    courseCode: "NICHEKIT-CORE",
    teaches: [
      "Building an e-commerce store without Shopify",
      "Using AI to generate product descriptions and content",
      "Australian GST and ABN setup",
      "Payment processing with Stripe Australia",
      "Getting first customers without ads",
      "Marketing automation",
    ],
    inLanguage: "en-AU",
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Online",
      courseWorkload: "PT6H",
      inLanguage: "en-AU",
    },
    offers: [
      { "@type": "Offer", name: "Free", price: "0", priceCurrency: "AUD", category: "Freemium" },
      { "@type": "Offer", name: "Starter Plan", price: "29", priceCurrency: "AUD", url: `${SITE_URL}/pricing`, category: "Subscription" },
      { "@type": "Offer", name: "Pro Plan", price: "79", priceCurrency: "AUD", url: `${SITE_URL}/pricing`, category: "Subscription" },
      { "@type": "Offer", name: "Lifetime Access", price: "297", priceCurrency: "AUD", url: `${SITE_URL}/pricing`, category: "OneTimePayment" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Start an Online Store with NicheKit",
    description: "Three steps to launch your own e-commerce store using AI.",
    totalTime: "PT3H",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Sign up free",
        text: "Get instant access to Module 1 and sample templates. See if it's right for you — no credit card needed.",
        url: `${SITE_URL}/signup`,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Follow the courses",
        text: "Step-by-step guides with real examples. AI does the heavy lifting — you make the decisions.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Launch & earn",
        text: "Use the templates, scripts, and playbooks to go live. Start making sales while you're still learning.",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Do I need technical skills?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. The courses are designed for complete beginners. AI handles the technical parts — you follow step-by-step guides.",
        },
      },
      {
        "@type": "Question",
        name: "Why not just use Shopify?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Shopify costs $79+ AUD/month, takes a 2% transaction fee, and locks you into their ecosystem. We teach you to build on free/low-cost platforms you own and control.",
        },
      },
      {
        "@type": "Question",
        name: "Is this for Australians only?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The courses work globally, but we focus on Australian specifics — ABN, GST, AUD pricing, Aussie payment processors, Australian consumer law, and local marketing tactics.",
        },
      },
      {
        "@type": "Question",
        name: "What if I already have a store?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The SEO, email, and social media courses are valuable for any existing business. The consultation calls (Pro plan) are perfect for getting specific feedback on your store.",
        },
      },
      {
        "@type": "Question",
        name: "Can I cancel anytime?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Cancel from your dashboard. You keep access until the end of your billing period. No lock-in, no exit fees.",
        },
      },
      {
        "@type": "Question",
        name: "What's the consultation like?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A 30-minute video call where we review your store, answer questions, and give you a clear action plan. Available monthly on the Pro plan.",
        },
      },
    ],
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU" className={`${dmSans.variable} ${dmSerif.variable} h-full antialiased`}>
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
