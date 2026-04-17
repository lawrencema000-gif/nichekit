import Link from "next/link";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How NicheKit collects, uses, and protects your data. We use LemonSqueezy for payments and don't sell your data.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--warm-white)", color: "var(--ink-light)" }}>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/" className="text-sm hover:underline" style={{ color: "var(--terracotta)" }}>&larr; Back to NicheKit</Link>
        <h1 className="text-3xl mt-6 mb-8" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>Privacy Policy</h1>
        <div className="space-y-6 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-medium mb-2" style={{ color: "var(--ink)" }}>1. Data We Collect</h2>
            <p>We collect only what LemonSqueezy requires to process your purchase: email address and payment information. We do not store your payment details &mdash; LemonSqueezy handles all payment processing securely.</p>
          </section>
          <section>
            <h2 className="text-lg font-medium mb-2" style={{ color: "var(--ink)" }}>2. How We Use Your Data</h2>
            <p>Your email is used to deliver your purchased files and send order confirmations. We may occasionally email product updates. You can unsubscribe at any time.</p>
          </section>
          <section>
            <h2 className="text-lg font-medium mb-2" style={{ color: "var(--ink)" }}>3. Third Parties</h2>
            <p>We use LemonSqueezy for payment processing and file delivery, and Vercel for website hosting. We do not sell or share your personal data with anyone else.</p>
          </section>
          <section>
            <h2 className="text-lg font-medium mb-2" style={{ color: "var(--ink)" }}>4. Contact</h2>
            <p>For privacy questions, email support@nichekit.co.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
