import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllPosts, getPost } from "@/lib/blog";
import { autoLinkContent } from "@/lib/internal-links";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://nichekit.vercel.app").trim();

// Pre-generate all blog post pages at build time (static)
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Not found" };

  const url = `${SITE_URL}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      url,
      images: [`/og-image`],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [`/og-image`],
    },
  };
}

// Simple markdown renderer (same pattern as course reader)
function renderMarkdown(md: string): string {
  const codeBlocks: string[] = [];
  let processed = md.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
    codeBlocks.push(`<pre class="md-pre"><code>${code.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>`);
    return `%%CODEBLOCK_${codeBlocks.length - 1}%%`;
  });

  processed = processed
    .replace(/^### (.+)$/gm, '<h3 class="md-h3">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="md-h2">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="md-h1">$1</h1>')
    .replace(/^(-{3,}|\*{3,}|_{3,})$/gm, '<hr class="md-hr" />')
    .replace(/^> (.+)$/gm, '<blockquote class="md-blockquote">$1</blockquote>')
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="md-img" loading="lazy" />')
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, '<code class="md-code">$1</code>')
    .replace(/^\- (.+)$/gm, '<li class="md-li">$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li class="md-li-num"><span class="md-num">$1.</span> $2</li>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="md-link">$1</a>')
    .replace(/(^\|.+\|$\n?)+/gm, (tableBlock) => {
      const rows = tableBlock.trim().split("\n").map((row) => {
        const cells = row.split("|").filter(Boolean).map((c) => c.trim());
        if (cells.every((c) => /^[-:]+$/.test(c))) return "";
        return `<tr>${cells.map((c) => `<td class="md-td">${c}</td>`).join("")}</tr>`;
      }).filter(Boolean).join("");
      return `<table class="md-table">${rows}</table>`;
    })
    .replace(/\n{2,}/g, "</p><p>")
    .replace(/^(?!<[hpuoltrdbi])/gm, "");

  codeBlocks.forEach((block, i) => {
    processed = processed.replace(`%%CODEBLOCK_${i}%%`, block);
  });

  return processed;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  // Auto-link keyword phrases to related blog posts (SEO boost)
  const linkedContent = autoLinkContent(post.content, post.slug);
  const html = renderMarkdown(linkedContent);
  const allPosts = getAllPosts();
  const relatedPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 3);

  // BlogPosting JSON-LD schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: "NicheKit",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "NicheKit",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/og-image`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
    keywords: post.keywords.join(", "),
    inLanguage: "en-AU",
    image: `${SITE_URL}/og-image`,
  };

  // BreadcrumbList schema
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${SITE_URL}/blog/${post.slug}` },
    ],
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--warm-white)" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* Nav */}
      <nav
        className="sticky top-0 z-50 backdrop-blur-md"
        style={{ background: "rgba(253,251,247,0.85)", borderBottom: "1px solid var(--border)" }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-lg tracking-tight" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
            NicheKit
          </Link>
          <div className="hidden sm:flex items-center gap-8 text-sm" style={{ color: "var(--ink-light)" }}>
            <Link href="/#courses" className="hover:text-[var(--ink)] transition">Courses</Link>
            <Link href="/blog" className="hover:text-[var(--ink)] transition">Blog</Link>
            <Link href="/pricing" className="hover:text-[var(--ink)] transition">Pricing</Link>
            <Link href="/login" className="hover:text-[var(--ink)] transition">Log in</Link>
          </div>
          <Link
            href="/signup"
            className="text-sm font-medium px-5 py-2 rounded-full transition hover:opacity-90"
            style={{ background: "var(--ink)", color: "var(--warm-white)" }}
          >
            Start free
          </Link>
        </div>
      </nav>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-6 py-16">
        {/* Breadcrumb */}
        <nav className="text-sm mb-6" style={{ color: "var(--ink-muted)" }} aria-label="Breadcrumb">
          <Link href="/blog" style={{ color: "var(--terracotta)" }} className="hover:underline">
            &larr; Back to blog
          </Link>
        </nav>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-4">
          <span
            className="text-xs font-medium px-2.5 py-0.5 rounded-full"
            style={{ background: "var(--sage-light)", color: "var(--sage)" }}
          >
            {post.tag}
          </span>
          <span className="text-xs" style={{ color: "var(--ink-muted)" }}>
            {formatDate(post.date)} &middot; {post.readTime} read
          </span>
        </div>

        {/* Content */}
        <div
          className="prose-nichekit"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-16 pt-8" style={{ borderTop: "1px solid var(--border)" }}>
            <h2 className="text-lg mb-4" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
              Keep reading
            </h2>
            <div className="space-y-3">
              {relatedPosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="block hover-lift rounded-xl p-5"
                  style={{ background: "var(--cream)", border: "1px solid var(--border)" }}
                >
                  <span className="text-xs font-medium mb-1 block" style={{ color: "var(--terracotta)" }}>
                    {p.tag}
                  </span>
                  <span className="text-base font-medium" style={{ color: "var(--ink)" }}>
                    {p.title}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>

      {/* CTA */}
      <section className="noise-bg py-16 px-6 text-center" style={{ background: "var(--ink)" }}>
        <h2 className="text-2xl md:text-3xl mb-3" style={{ fontFamily: "var(--font-display)", color: "var(--warm-white)" }}>
          Ready to actually build something?
        </h2>
        <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: "var(--sand)" }}>
          Stop reading about it. Start doing it. Free courses, no credit card.
        </p>
        <Link
          href="/signup"
          className="inline-flex items-center px-8 py-3 rounded-full text-sm font-medium transition hover:opacity-90"
          style={{ background: "var(--terracotta)", color: "white" }}
        >
          Start free &rarr;
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6" style={{ background: "var(--warm-white)", borderTop: "1px solid var(--border)" }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm" style={{ color: "var(--ink-muted)" }}>
          <span style={{ fontFamily: "var(--font-display)", color: "var(--ink-light)" }}>NicheKit</span>
          <div className="flex items-center gap-6">
            <Link href="/pricing" className="hover:text-[var(--ink)] transition">Pricing</Link>
            <Link href="/blog" className="hover:text-[var(--ink)] transition">Blog</Link>
            <Link href="/terms" className="hover:text-[var(--ink)] transition">Terms</Link>
            <Link href="/privacy" className="hover:text-[var(--ink)] transition">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
