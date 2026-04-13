import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { getCourse, getModuleContent } from "@/lib/courses";
import MarkCompleteButton from "@/components/MarkCompleteButton";

function renderMarkdown(md: string): string {
  // Pre-process: extract code blocks to protect them from other replacements
  const codeBlocks: string[] = [];
  let processed = md.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
    codeBlocks.push(`<pre class="md-pre"><code>${code.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>`);
    return `%%CODEBLOCK_${codeBlocks.length - 1}%%`;
  });

  processed = processed
    // Headings
    .replace(/^### (.+)$/gm, '<h3 class="md-h3">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="md-h2">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="md-h1">$1</h1>')
    // Horizontal rules
    .replace(/^(-{3,}|\*{3,}|_{3,})$/gm, '<hr class="md-hr" />')
    // Blockquotes
    .replace(/^> (.+)$/gm, '<blockquote class="md-blockquote">$1</blockquote>')
    // Images
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="md-img" loading="lazy" />')
    // Bold + italic
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="md-code">$1</code>')
    // Checklists
    .replace(/^\- \[x\] (.+)$/gm, '<div class="md-check done">✓ $1</div>')
    .replace(/^\- \[ \] (.+)$/gm, '<div class="md-check">☐ $1</div>')
    // Lists
    .replace(/^\- (.+)$/gm, '<li class="md-li">$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li class="md-li-num"><span class="md-num">$1.</span> $2</li>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="md-link" target="_blank" rel="noopener">$1</a>')
    // Tables (wrap in <table>)
    .replace(/(^\|.+\|$\n?)+/gm, (tableBlock) => {
      const rows = tableBlock.trim().split("\n").map((row) => {
        const cells = row.split("|").filter(Boolean).map((c) => c.trim());
        if (cells.every((c) => /^[-:]+$/.test(c))) return "";
        return `<tr>${cells.map((c) => `<td class="md-td">${c}</td>`).join("")}</tr>`;
      }).filter(Boolean).join("");
      return `<table class="md-table">${rows}</table>`;
    })
    // Paragraphs
    .replace(/\n{2,}/g, "</p><p>")
    .replace(/^(?!<[hpuoltrdbi])/gm, "");

  // Restore code blocks
  codeBlocks.forEach((block, i) => {
    processed = processed.replace(`%%CODEBLOCK_${i}%%`, block);
  });

  return processed;
}

export default async function ModuleReaderPage({
  params,
}: {
  params: Promise<{ slug: string; module: string }>;
}) {
  const { slug, module: moduleSlug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const moduleIndex = course.modules.findIndex((m) => m.slug === moduleSlug);
  if (moduleIndex === -1) notFound();

  const mod = course.modules[moduleIndex];
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("plan")
    .eq("id", user!.id)
    .single();

  const plan = profile?.plan || "free";
  const hasAccess = plan !== "free";

  if (!hasAccess && !mod.free) {
    redirect("/pricing");
  }

  const content = getModuleContent(slug, moduleSlug);
  if (!content) {
    return (
      <div>
        <Link href={`/dashboard/courses/${slug}`} className="text-sm hover:underline" style={{ color: "var(--terracotta)" }}>
          &larr; Back to course
        </Link>
        <div className="mt-8 p-8 rounded-2xl text-center" style={{ background: "var(--cream)", border: "1px solid var(--border)" }}>
          <h1 className="text-xl mb-2" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
            Coming Soon
          </h1>
          <p className="text-sm" style={{ color: "var(--ink-muted)" }}>
            This module is being written and will be available soon. Check back shortly.
          </p>
        </div>
      </div>
    );
  }

  // Check completion status
  const { data: progressData } = await supabase
    .from("course_progress")
    .select("completed")
    .eq("user_id", user!.id)
    .eq("course_slug", slug)
    .eq("module_slug", moduleSlug)
    .single();

  const isCompleted = progressData?.completed || false;

  const prevModule = moduleIndex > 0 ? course.modules[moduleIndex - 1] : null;
  const nextModule = moduleIndex < course.modules.length - 1 ? course.modules[moduleIndex + 1] : null;

  const htmlContent = renderMarkdown(content);

  return (
    <div>
      <Link href={`/dashboard/courses/${slug}`} className="text-sm hover:underline" style={{ color: "var(--terracotta)" }}>
        &larr; {course.title}
      </Link>

      <div className="mt-4 mb-2 flex items-center gap-3">
        <span className="text-xs" style={{ color: "var(--ink-muted)" }}>
          Module {moduleIndex + 1} of {course.modules.length}
        </span>
        {mod.free && !hasAccess && (
          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "var(--sage-light)", color: "var(--sage)" }}>
            Free preview
          </span>
        )}
      </div>

      {/* Article content */}
      <article
        className="prose-nichekit mt-6 mb-12"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      {/* Mark complete + navigation */}
      <div className="py-8" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <MarkCompleteButton
            courseSlug={slug}
            moduleSlug={moduleSlug}
            initialCompleted={isCompleted}
          />

          <div className="flex gap-3">
            {prevModule && (
              <Link
                href={`/dashboard/courses/${slug}/${prevModule.slug}`}
                className="text-sm px-4 py-2 rounded-full"
                style={{ border: "1px solid var(--border)", color: "var(--ink-light)" }}
              >
                &larr; Previous
              </Link>
            )}
            {nextModule && (
              <Link
                href={`/dashboard/courses/${slug}/${nextModule.slug}`}
                className="text-sm px-4 py-2 rounded-full transition hover:opacity-90"
                style={{ background: "var(--ink)", color: "var(--warm-white)" }}
              >
                Next &rarr;
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
