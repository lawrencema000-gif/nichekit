import Link from "next/link";
import { createClient } from "@/lib/supabase-server";

const COURSES = [
  {
    slug: "zero-to-first-sale",
    title: "From Zero to First Sale in 7 Days",
    description: "The scrappy, no-BS guide to making your first dollar online. No fluff, no theory — just what works.",
    modules: 7,
    tag: "Start Here",
    time: "~3 hours",
    freePreview: true,
  },
  {
    slug: "build-ecommerce-with-ai",
    title: "Build Your Own E-Commerce Store with AI",
    description: "The complete guide to a profitable online store — without Shopify, without agencies. AI builds it, you launch it.",
    modules: 10,
    tag: "Core Course",
    time: "~6 hours",
    freePreview: true,
  },
  {
    slug: "ai-seo-masterclass",
    title: "Rank on Google Without Paying Agencies",
    description: "AI-powered keyword research, content creation, and local SEO. Get found by Australians searching for what you sell.",
    modules: 6,
    tag: "Growth",
    time: "~3 hours",
    freePreview: false,
  },
  {
    slug: "email-marketing-with-ai",
    title: "Email Marketing Machine",
    description: "Build an email list and write sequences that convert — AI does 90% of the work. Stop paying Mailchimp $50/mo.",
    modules: 5,
    tag: "Growth",
    time: "~2.5 hours",
    freePreview: false,
  },
  {
    slug: "social-media-autopilot",
    title: "Post on 4 Platforms While You Sleep",
    description: "AI generates 30 days of content in 30 minutes. Schedule it once, post everywhere. Engagement on autopilot.",
    modules: 5,
    tag: "Growth",
    time: "~2.5 hours",
    freePreview: false,
  },
];

export default async function CoursesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("plan")
    .eq("id", user!.id)
    .single();

  const plan = profile?.plan || "free";
  const hasAccess = plan !== "free";

  // Get progress for all courses
  const { data: allProgress } = await supabase
    .from("course_progress")
    .select("course_slug, completed")
    .eq("user_id", user!.id);

  const progressMap = new Map<string, number>();
  for (const p of allProgress || []) {
    if (p.completed) {
      progressMap.set(p.course_slug, (progressMap.get(p.course_slug) || 0) + 1);
    }
  }

  const completedCourses = COURSES.filter(c => (progressMap.get(c.slug) || 0) >= c.modules).length;

  return (
    <div>
      <div className="flex items-start justify-between flex-wrap gap-4 mb-8">
        <div>
          <h1 className="text-2xl mb-1" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
            Courses
          </h1>
          <p className="text-sm" style={{ color: "var(--ink-muted)" }}>
            {hasAccess
              ? `${completedCourses} of ${COURSES.length} courses completed`
              : "Start with the free previews, then upgrade for full access."}
          </p>
        </div>

        {/* Milestone badges */}
        {hasAccess && (
          <div className="flex gap-2">
            {[
              { label: "Started", threshold: 1, icon: "🌱" },
              { label: "Halfway", threshold: 17, icon: "🔥" },
              { label: "Graduate", threshold: 33, icon: "🎓" },
            ].map((badge) => {
              const total = (allProgress || []).filter(p => p.completed).length;
              const earned = total >= badge.threshold;
              return (
                <div
                  key={badge.label}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs"
                  title={earned ? `${badge.label} — Earned!` : `${badge.label} — Complete ${badge.threshold} modules`}
                  style={{
                    background: earned ? "var(--sage-light)" : "var(--sand)",
                    color: earned ? "var(--sage)" : "var(--ink-muted)",
                    opacity: earned ? 1 : 0.5,
                  }}
                >
                  <span>{badge.icon}</span>
                  <span className="font-medium">{badge.label}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="space-y-3">
        {COURSES.map((course) => {
          const locked = !hasAccess && !course.freePreview;
          const completed = progressMap.get(course.slug) || 0;
          const percent = Math.round((completed / course.modules) * 100);
          const isDone = completed >= course.modules;

          return (
            <Link
              key={course.slug}
              href={locked ? "/pricing" : `/dashboard/courses/${course.slug}`}
              className="hover-lift block rounded-2xl p-6"
              style={{
                background: "var(--warm-white)",
                border: isDone ? "1.5px solid var(--sage)" : "1px solid var(--border)",
                opacity: locked ? 0.5 : 1,
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span
                      className="text-xs font-medium px-2.5 py-0.5 rounded-full"
                      style={{
                        background: course.tag === "Start Here" ? "var(--terracotta)" : course.tag === "Core Course" ? "var(--ink)" : "var(--sage-light)",
                        color: course.tag === "Start Here" || course.tag === "Core Course" ? "white" : "var(--sage)",
                      }}
                    >
                      {course.tag}
                    </span>
                    <span className="text-xs" style={{ color: "var(--ink-muted)" }}>
                      {course.modules} modules &middot; {course.time}
                    </span>
                    {isDone && (
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: "var(--sage-light)", color: "var(--sage)" }}>
                        Completed ✓
                      </span>
                    )}
                  </div>
                  <h2 className="text-lg mb-1" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
                    {course.title}
                  </h2>
                  <p className="text-sm" style={{ color: "var(--ink-light)" }}>
                    {course.description}
                  </p>

                  {/* Progress bar */}
                  {hasAccess && !locked && (
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex-1 h-1.5 rounded-full overflow-hidden max-w-xs" style={{ background: "var(--sand)" }}>
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${percent}%`, background: isDone ? "var(--sage)" : "var(--terracotta)" }}
                        />
                      </div>
                      <span className="text-xs" style={{ color: "var(--ink-muted)" }}>
                        {completed}/{course.modules}
                      </span>
                    </div>
                  )}
                </div>

                <div className="shrink-0 mt-2">
                  {locked ? (
                    <span
                      className="inline-block px-4 py-2 rounded-full text-xs font-medium"
                      style={{ border: "1px solid var(--border)", color: "var(--ink-muted)" }}
                    >
                      Upgrade
                    </span>
                  ) : (
                    <span
                      className="inline-block px-4 py-2 rounded-full text-xs font-medium"
                      style={{ background: "var(--ink)", color: "var(--warm-white)" }}
                    >
                      {isDone ? "Review" : completed > 0 ? "Continue" : course.freePreview && !hasAccess ? "Preview" : "Start"}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
