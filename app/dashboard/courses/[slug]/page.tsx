import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { getCourse } from "@/lib/courses";

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("plan")
    .eq("id", user!.id)
    .single();

  const plan = profile?.plan || "free";
  const hasAccess = plan !== "free";

  // Get completed modules
  const { data: progress } = await supabase
    .from("course_progress")
    .select("module_slug, completed")
    .eq("user_id", user!.id)
    .eq("course_slug", slug);

  const completedModules = new Set(
    (progress || []).filter((p) => p.completed).map((p) => p.module_slug)
  );

  const completedCount = completedModules.size;
  const totalModules = course.modules.length;
  const progressPercent = totalModules > 0 ? Math.round((completedCount / totalModules) * 100) : 0;

  return (
    <div>
      <Link href="/dashboard/courses" className="text-sm hover:underline" style={{ color: "var(--terracotta)" }}>
        &larr; All courses
      </Link>

      <div className="mt-4 mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full" style={{ background: "var(--sage-light)", color: "var(--sage)" }}>
            {course.tag}
          </span>
          <span className="text-xs" style={{ color: "var(--ink-muted)" }}>
            {totalModules} modules
          </span>
        </div>
        <h1 className="text-2xl mb-2" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
          {course.title}
        </h1>
        <p className="text-sm mb-4" style={{ color: "var(--ink-light)" }}>
          {course.description}
        </p>

        {/* Progress bar */}
        {hasAccess && completedCount > 0 && (
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "var(--sand)" }}>
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${progressPercent}%`, background: "var(--terracotta)" }}
              />
            </div>
            <span className="text-xs font-medium" style={{ color: "var(--ink-muted)" }}>
              {progressPercent}%
            </span>
          </div>
        )}
      </div>

      <div className="space-y-2">
        {course.modules.map((mod, idx) => {
          const locked = !hasAccess && !mod.free;
          const completed = completedModules.has(mod.slug);

          return (
            <div
              key={mod.slug}
              className="rounded-xl p-4 flex items-center justify-between"
              style={{
                background: "var(--warm-white)",
                border: "1px solid var(--border)",
                opacity: locked ? 0.5 : 1,
              }}
            >
              <div className="flex items-center gap-4">
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium shrink-0"
                  style={{
                    background: completed ? "var(--sage)" : "var(--cream)",
                    color: completed ? "white" : "var(--ink-muted)",
                    border: completed ? "none" : "1px solid var(--border)",
                  }}
                >
                  {completed ? "✓" : idx + 1}
                </span>
                <div>
                  <span className="text-sm font-medium block" style={{ color: "var(--ink)" }}>
                    {mod.title}
                  </span>
                  {mod.free && !hasAccess && (
                    <span className="text-xs" style={{ color: "var(--sage)" }}>Free preview</span>
                  )}
                </div>
              </div>

              {locked ? (
                <Link
                  href="/pricing"
                  className="text-xs px-3 py-1.5 rounded-full"
                  style={{ border: "1px solid var(--border)", color: "var(--ink-muted)" }}
                >
                  Upgrade
                </Link>
              ) : (
                <Link
                  href={`/dashboard/courses/${slug}/${mod.slug}`}
                  className="text-xs px-3 py-1.5 rounded-full transition hover:opacity-90"
                  style={{ background: "var(--ink)", color: "var(--warm-white)" }}
                >
                  {completed ? "Review" : "Start"}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
