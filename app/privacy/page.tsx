import Link from "next/link";

export const metadata = { title: "Privacy Policy — NicheKit" };

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-300">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <Link href="/" className="text-indigo-400 hover:underline text-sm">&larr; Back to NicheKit</Link>
        <h1 className="text-3xl font-bold text-white mt-6 mb-8">Privacy Policy</h1>
        <div className="space-y-6 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-white mb-2">1. Data We Collect</h2>
            <p>We collect only what LemonSqueezy requires to process your purchase: email address and payment information. We do not store your payment details — LemonSqueezy handles all payment processing securely.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-white mb-2">2. How We Use Your Data</h2>
            <p>Your email is used to deliver your purchased files and send order confirmations. We may occasionally email product updates. You can unsubscribe at any time.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-white mb-2">3. Third Parties</h2>
            <p>We use LemonSqueezy for payment processing and file delivery, and Vercel for website hosting. We do not sell or share your personal data with anyone else.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-white mb-2">4. Contact</h2>
            <p>For privacy questions, email support@nichekit.co.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
