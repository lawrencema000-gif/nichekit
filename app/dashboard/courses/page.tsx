import Link from "next/link";
import { createClient } from "@/lib/supabase-server";

const COURSES = [
  {
    slug: "build-ecommerce-with-ai",
    title: "Build Your Own E-Commerce Store with AI",
    description: "The complete guide to building a profitable online store without Shopify — using AI tools, free hosting, and Australian-first strategies.",
    modules: 10,
    tag: "Core Course",
    freePreview: true,
  },
  {
    slug: "ai-seo-masterclass",
    title: "AI SEO Masterclass",
    description: "Rank on Google without an agency. AI-powered keyword research, content creation, and local SEO for Aussie businesses.",
    modules: 6,
    tag: "Mini Course",
    freePreview: false,
  },
  {
    slug: "email-marketing-with-ai",
    title: "Email Marketing with AI",
    description: "Build an email list and write sequences that convert — using AI to do 90% of the work.",
    modules: 5,
    tag: "Mini Course",
    freePreview: false,
  },
  {
    slug: "zero-to-first-sale",
    title: "From Zero to First Sale in 7 Days",
    description: "The scrappy, no-BS guide to making your first dollar online. No fluff, no theory — just what works.",
    modules: 7,
    tag: "Beginner",
    freePreview: true,
  },
  {
    slug: "social-media-autopilot",
    title: "Social Media on Autopilot",
    description: "Set up automated posting across Instagram, TikTok, X, and LinkedIn. AI writes it, tools post it, you sleep.",
    modules: 5,
    tag: "Mini Course",
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

  return (
    <div>
      <h1 className="text-2xl mb-1" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
        Courses
      </h1>
      <p className="text-sm mb-8" style={{ color: "var(--ink-muted)" }}>
        {hasAccess ? "You have full access to all courses." : "Upgrade to unlock all courses."}
      </p>

      <div className="space-y-4">
        {COURSES.map((course) => {
          const locked = !hasAccess && !course.freePreview;
          return (
            <div
              key={course.slug}
              className="hover-lift rounded-2xl p-6 flex items-start justify-between gap-4"
              style={{
                background: "var(--warm-white)",
                border: "1px solid var(--border)",
                opacity: locked ? 0.6 : 1,
              }}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="text-xs font-medium px-2.5 py-0.5 rounded-full"
                    style={{ background: "var(--sage-light)", color: "var(--sage)" }}
                  >
                    {course.tag}
                  </span>
                  <span className="text-xs" style={{ color: "var(--ink-muted)" }}>
                    {course.modules} modules
                  </span>
                </div>
                <h2 className="text-lg mb-1" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
                  {course.title}
                </h2>
                <p className="text-sm" style={{ color: "var(--ink-light)" }}>
                  {course.description}
                </p>
              </div>
              <div className="shrink-0">
                {locked ? (
                  <Link
                    href="/pricing"
                    className="inline-block px-4 py-2 rounded-full text-xs font-medium"
                    style={{ border: "1px solid var(--border)", color: "var(--ink-muted)" }}
                  >
                    Upgrade
                  </Link>
                ) : (
                  <Link
                    href={`/dashboard/courses/${course.slug}`}
                    className="inline-block px-4 py-2 rounded-full text-xs font-medium transition hover:opacity-90"
                    style={{ background: "var(--ink)", color: "var(--warm-white)" }}
                  >
                    {course.freePreview && !hasAccess ? "Preview" : "Start"}
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
