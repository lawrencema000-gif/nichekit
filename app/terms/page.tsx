import Link from "next/link";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "NicheKit terms of service — licence, payments, refunds, and disclaimers. Australian consumer law compliant.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--warm-white)", color: "var(--ink-light)" }}>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/" className="text-sm hover:underline" style={{ color: "var(--terracotta)" }}>&larr; Back to NicheKit</Link>
        <h1 className="text-3xl mt-6 mb-8" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>Terms of Service</h1>
        <div className="space-y-6 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-medium mb-2" style={{ color: "var(--ink)" }}>1. License</h2>
            <p>Purchasing a NicheKit product grants you a personal/business use license. You may use, modify, and customize the templates for your own business or your clients&apos; businesses. You may not resell, redistribute, or share the original template files.</p>
          </section>
          <section>
            <h2 className="text-lg font-medium mb-2" style={{ color: "var(--ink)" }}>2. Payments</h2>
            <p>All payments are processed securely through LemonSqueezy. Prices are in AUD (Australian Dollars). We offer both subscription plans and one-time purchases. Subscriptions can be cancelled at any time from your billing dashboard.</p>
          </section>
          <section>
            <h2 className="text-lg font-medium mb-2" style={{ color: "var(--ink)" }}>3. Refund Policy</h2>
            <p>We offer a 30-day money-back guarantee. If you&apos;re unsatisfied with your purchase, contact us for a full refund.</p>
          </section>
          <section>
            <h2 className="text-lg font-medium mb-2" style={{ color: "var(--ink)" }}>4. Disclaimer</h2>
            <p>Courses and templates are provided &ldquo;as-is&rdquo; for educational purposes. NicheKit is not responsible for business outcomes resulting from the use of our content. Legal document templates (contracts, agreements) are not a substitute for professional legal advice. Income results vary and are not guaranteed.</p>
          </section>
          <section>
            <h2 className="text-lg font-medium mb-2" style={{ color: "var(--ink)" }}>5. Contact</h2>
            <p>Questions? Email support@nichekit.co.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
