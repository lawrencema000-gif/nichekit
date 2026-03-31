import Link from "next/link";

export const metadata = { title: "Terms of Service — NicheKit" };

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-300">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <Link href="/" className="text-indigo-400 hover:underline text-sm">&larr; Back to NicheKit</Link>
        <h1 className="text-3xl font-bold text-white mt-6 mb-8">Terms of Service</h1>
        <div className="space-y-6 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-white mb-2">1. License</h2>
            <p>Purchasing a NicheKit product grants you a personal/business use license. You may use, modify, and customize the templates for your own business or your clients&apos; businesses. You may not resell, redistribute, or share the original template files.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-white mb-2">2. Payments</h2>
            <p>All payments are processed securely through LemonSqueezy. Prices are in USD. All sales are one-time purchases — no recurring charges.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-white mb-2">3. Refund Policy</h2>
            <p>We offer a 30-day money-back guarantee. If you&apos;re unsatisfied with your purchase, contact us at support@nichekit.co for a full refund.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-white mb-2">4. Disclaimer</h2>
            <p>Templates are provided &ldquo;as-is&rdquo; for informational purposes. NicheKit is not responsible for business outcomes resulting from the use of these templates. Legal document templates (contracts, agreements) are not a substitute for legal advice.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-white mb-2">5. Contact</h2>
            <p>Questions? Email support@nichekit.co.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
