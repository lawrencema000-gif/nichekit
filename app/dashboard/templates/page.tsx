import { createClient } from "@/lib/supabase-server";
import Link from "next/link";
import DownloadButton from "@/components/DownloadButton";

const TEMPLATE_PACKS = [
  { niche: "Dental Practices", key: "dentists", icon: "🦷", files: 23 },
  { niche: "Restaurants", key: "restaurants", icon: "🍴", files: 23 },
  { niche: "Real Estate", key: "real-estate", icon: "🏡", files: 23 },
  { niche: "Gyms & Fitness", key: "gyms", icon: "🏋️", files: 23 },
  { niche: "Salons & Spas", key: "salons", icon: "✂️", files: 23 },
  { niche: "E-Commerce", key: "ecommerce", icon: "🛍️", files: 23 },
];

const PRODUCTS_IN_PACK = [
  "90-Day Social Media Calendar",
  "Email Marketing Swipe File (10 templates)",
  "Business Document Kit (invoice, proposal, contract)",
  "SEO Starter Toolkit (keywords + action plan)",
  "Client Acquisition Playbook",
];

export default async function TemplatesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("plan")
    .eq("id", user!.id)
    .single();

  const plan = profile?.plan || "free";
  const hasAccess = plan !== "free";

  return (
    <div>
      <h1 className="text-2xl mb-1" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
        Templates
      </h1>
      <p className="text-sm mb-8" style={{ color: "var(--ink-muted)" }}>
        {hasAccess
          ? "Download any template pack below. All niches included with your plan."
          : "Upgrade to download all template packs across 6 niches."}
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        {TEMPLATE_PACKS.map((pack) => (
          <div
            key={pack.niche}
            className="hover-lift rounded-2xl p-6"
            style={{ background: "var(--warm-white)", border: "1px solid var(--border)" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{pack.icon}</span>
              <div>
                <h2 className="font-medium" style={{ color: "var(--ink)" }}>{pack.niche}</h2>
                <span className="text-xs" style={{ color: "var(--ink-muted)" }}>{pack.files} files &middot; 5 products</span>
              </div>
            </div>

            <ul className="space-y-1.5 mb-5">
              {PRODUCTS_IN_PACK.map((p, i) => (
                <li key={i} className="text-xs flex items-start gap-2" style={{ color: "var(--ink-light)" }}>
                  <span style={{ color: "var(--sage)" }}>✓</span>
                  {p}
                </li>
              ))}
            </ul>

            {hasAccess ? (
              <DownloadButton niche={pack.key} />
            ) : (
              <Link
                href="/pricing"
                className="block text-center w-full py-2.5 rounded-full text-sm font-medium"
                style={{ border: "1px solid var(--border)", color: "var(--ink-muted)" }}
              >
                Upgrade to download
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
