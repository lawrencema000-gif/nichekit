import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import { getAllCourses } from "@/lib/courses";

const LEARNING_PATH = [
  { slug: "zero-to-first-sale", label: "Quick Start", desc: "Make your first sale in 7 days", modules: 7 },
  { slug: "build-ecommerce-with-ai", label: "Build Your Store", desc: "Full e-commerce setup with AI", modules: 10 },
  { slug: "ai-seo-masterclass", label: "Get Found", desc: "Rank on Google + AI search", modules: 6 },
  { slug: "email-marketing-with-ai", label: "Email Machine", desc: "Automated email sequences", modules: 5 },
  { slug: "social-media-autopilot", label: "Go Viral", desc: "Social media on autopilot", modules: 5 },
];

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", user!.id)
    .single();

  const plan = profile?.plan || "free";
  const firstName = profile?.full_name?.split(" ")[0] || "there";
  const hasAccess = plan !== "free";

  // Get all progress
  const { data: allProgress } = await supabase
    .from("course_progress")
    .select("course_slug, module_slug, completed")
    .eq("user_id", user!.id);

  const progressMap = new Map<string, number>();
  const completedTotal = (allProgress || []).filter(p => p.completed).length;
  for (const p of allProgress || []) {
    if (p.completed) {
      progressMap.set(p.course_slug, (progressMap.get(p.course_slug) || 0) + 1);
    }
  }

  // Find the next course to continue (first with incomplete modules)
  const courses = getAllCourses();
  let continueSlug = "";
  let continueModule = "";
  let continueTitle = "";
  for (const pathItem of LEARNING_PATH) {
    const course = courses.find(c => c.slug === pathItem.slug);
    if (!course) continue;
    const done = progressMap.get(course.slug) || 0;
    if (done < course.modules.length) {
      continueSlug = course.slug;
      const nextIdx = done;
      if (course.modules[nextIdx]) {
        continueModule = course.modules[nextIdx].slug;
        continueTitle = course.modules[nextIdx].title;
      }
      break;
    }
  }

  const totalModules = 33;
  const overallPercent = Math.round((completedTotal / totalModules) * 100);

  // Days since signup
  const createdAt = profile?.created_at ? new Date(profile.created_at) : new Date();
  const daysSinceSignup = Math.max(1, Math.floor((Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24)));

  return (
    <div>
      {/* Greeting + overall stats */}
      <div className="flex items-start justify-between flex-wrap gap-4 mb-8">
        <div>
          <h1 className="text-2xl mb-1" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
            G&rsquo;day, {firstName}
          </h1>
          <p className="text-sm" style={{ color: "var(--ink-muted)" }}>
            Day {daysSinceSignup} of your journey &middot; {completedTotal} of {totalModules} modules complete
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-right">
            <span className="block text-2xl font-medium" style={{ fontFamily: "var(--font-display)", color: "var(--terracotta)" }}>
              {overallPercent}%
            </span>
            <span className="text-xs" style={{ color: "var(--ink-muted)" }}>overall</span>
          </div>
          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: `conic-gradient(var(--terracotta) ${overallPercent * 3.6}deg, var(--sand) 0)` }}>
            <div className="w-9 h-9 rounded-full" style={{ background: "var(--cream)" }} />
          </div>
        </div>
      </div>

      {/* Upgrade banner for free users */}
      {plan === "free" && (
        <div
          className="rounded-2xl p-6 mb-8 flex items-center justify-between flex-wrap gap-4"
          style={{ background: "var(--ink)", color: "var(--sand)" }}
        >
          <div>
            <h2 className="text-lg mb-1" style={{ fontFamily: "var(--font-display)", color: "var(--warm-white)" }}>
              Ready to unlock everything?
            </h2>
            <p className="text-sm opacity-80">
              5 courses, 33 modules, 30+ templates, and 1-on-1 calls. From $29/mo.
            </p>
          </div>
          <Link
            href="/pricing"
            className="px-5 py-2.5 rounded-full text-sm font-medium transition hover:opacity-90"
            style={{ background: "var(--terracotta)", color: "white" }}
          >
            See plans
          </Link>
        </div>
      )}

      {/* Continue where you left off */}
      {hasAccess && continueSlug && (
        <div className="mb-8">
          <h2 className="text-sm font-medium mb-3" style={{ color: "var(--ink-muted)" }}>Continue where you left off</h2>
          <Link
            href={`/dashboard/courses/${continueSlug}/${continueModule}`}
            className="hover-lift block rounded-2xl p-6"
            style={{ background: "var(--warm-white)", border: "1.5px solid var(--terracotta)", borderLeftWidth: "4px" }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs mb-1" style={{ color: "var(--terracotta)" }}>Up next</p>
                <h3 className="font-medium mb-0.5" style={{ color: "var(--ink)" }}>{continueTitle}</h3>
                <p className="text-xs" style={{ color: "var(--ink-muted)" }}>
                  {courses.find(c => c.slug === continueSlug)?.title}
                </p>
              </div>
              <span className="px-4 py-2 rounded-full text-sm font-medium" style={{ background: "var(--terracotta)", color: "white" }}>
                Start &rarr;
              </span>
            </div>
          </Link>
        </div>
      )}

      {/* Learning path */}
      <div className="mb-8">
        <h2 className="text-sm font-medium mb-3" style={{ color: "var(--ink-muted)" }}>Your learning path</h2>
        <div className="space-y-2">
          {LEARNING_PATH.map((step, idx) => {
            const course = courses.find(c => c.slug === step.slug);
            const completed = progressMap.get(step.slug) || 0;
            const total = step.modules;
            const percent = Math.round((completed / total) * 100);
            const isDone = completed >= total;
            const isLocked = !hasAccess && idx > 0;

            return (
              <Link
                key={step.slug}
                href={isLocked ? "/pricing" : `/dashboard/courses/${step.slug}`}
                className="hover-lift flex items-center gap-4 rounded-xl p-4"
                style={{
                  background: "var(--warm-white)",
                  border: "1px solid var(--border)",
                  opacity: isLocked ? 0.5 : 1,
                }}
              >
                {/* Step number / check */}
                <span
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-medium shrink-0"
                  style={{
                    background: isDone ? "var(--sage)" : "var(--cream)",
                    color: isDone ? "white" : "var(--ink-muted)",
                    border: isDone ? "none" : "1.5px solid var(--border)",
                  }}
                >
                  {isDone ? "✓" : idx + 1}
                </span>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-medium" style={{ color: "var(--ink)" }}>{step.label}</span>
                    <span className="text-xs" style={{ color: "var(--ink-muted)" }}>&middot; {total} modules</span>
                  </div>
                  <p className="text-xs" style={{ color: "var(--ink-muted)" }}>{step.desc}</p>
                </div>

                {/* Progress */}
                <div className="hidden sm:flex items-center gap-3 shrink-0">
                  <div className="w-24 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--sand)" }}>
                    <div className="h-full rounded-full" style={{ width: `${percent}%`, background: isDone ? "var(--sage)" : "var(--terracotta)" }} />
                  </div>
                  <span className="text-xs w-8 text-right" style={{ color: "var(--ink-muted)" }}>{percent}%</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Quick access grid */}
      <div className="grid sm:grid-cols-3 gap-3">
        <Link
          href="/dashboard/templates"
          className="hover-lift rounded-xl p-5"
          style={{ background: "var(--warm-white)", border: "1px solid var(--border)" }}
        >
          <span className="text-xs font-medium tracking-widest uppercase block mb-2" style={{ color: "var(--sage)" }}>Templates</span>
          <p className="text-sm" style={{ color: "var(--ink)" }}>
            {hasAccess ? "Download 30+ templates" : "3 free samples"}
          </p>
        </Link>

        <Link
          href={plan === "pro" ? "/dashboard/consultation" : "/pricing"}
          className="hover-lift rounded-xl p-5"
          style={{ background: "var(--warm-white)", border: "1px solid var(--border)" }}
        >
          <span className="text-xs font-medium tracking-widest uppercase block mb-2" style={{ color: "var(--terracotta)" }}>
            Consultation
          </span>
          <p className="text-sm" style={{ color: "var(--ink)" }}>
            {plan === "pro" ? "Book your monthly call" : "Pro plan — $79/mo"}
          </p>
        </Link>

        <Link
          href="/dashboard/billing"
          className="hover-lift rounded-xl p-5"
          style={{ background: "var(--warm-white)", border: "1px solid var(--border)" }}
        >
          <span className="text-xs font-medium tracking-widest uppercase block mb-2" style={{ color: "var(--ink-muted)" }}>Billing</span>
          <p className="text-sm" style={{ color: "var(--ink)" }}>
            {plan === "free" ? "Upgrade your plan" : `${plan.charAt(0).toUpperCase() + plan.slice(1)} plan`}
          </p>
        </Link>
      </div>
    </div>
  );
}
