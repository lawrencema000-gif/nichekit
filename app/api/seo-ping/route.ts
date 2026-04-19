import { NextRequest, NextResponse } from "next/server";
import { getAllPosts } from "@/lib/blog";

export const dynamic = "force-dynamic";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://nichekit.vercel.app").trim();
const INDEXNOW_KEY = "c8fab8509404541db42fc62ffdc0493b";

export async function GET(req: NextRequest) {
  // Protect with CRON_SECRET
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret) {
    return NextResponse.json({ error: "Cron not configured" }, { status: 500 });
  }

  if (authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const posts = getAllPosts();
  const urls = [
    SITE_URL,
    `${SITE_URL}/pricing`,
    `${SITE_URL}/blog`,
    ...posts.map((p) => `${SITE_URL}/blog/${p.slug}`),
  ];

  const results: Record<string, string> = {};

  // 1. IndexNow (Bing, Yandex, Naver, Seznam)
  try {
    const indexNowRes = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        host: new URL(SITE_URL).hostname,
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: urls,
      }),
    });
    results.indexnow = `HTTP ${indexNowRes.status}`;
  } catch (err) {
    results.indexnow = `error: ${err instanceof Error ? err.message : "unknown"}`;
  }

  // 2. Google sitemap ping (deprecated in 2023 but still works for some edge cases)
  // Google prefers Search Console submission — this is supplementary
  try {
    const googleRes = await fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(SITE_URL + "/sitemap.xml")}`);
    results.google = `HTTP ${googleRes.status}`;
  } catch (err) {
    results.google = `error: ${err instanceof Error ? err.message : "unknown"}`;
  }

  // 3. Bing sitemap ping
  try {
    const bingRes = await fetch(`https://www.bing.com/ping?sitemap=${encodeURIComponent(SITE_URL + "/sitemap.xml")}`);
    results.bing = `HTTP ${bingRes.status}`;
  } catch (err) {
    results.bing = `error: ${err instanceof Error ? err.message : "unknown"}`;
  }

  console.log(`[SEO Ping] Pinged ${urls.length} URLs. Results:`, results);

  return NextResponse.json({
    success: true,
    urls_pinged: urls.length,
    results,
    ran_at: new Date().toISOString(),
  });
}
