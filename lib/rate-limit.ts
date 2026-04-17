import { NextRequest, NextResponse } from "next/server";

// In-memory rate limiter (resets on cold start, best-effort for serverless)
// For production-grade limiting, use Upstash Redis or Supabase
const rateMap = new Map<string, { count: number; resetAt: number }>();

// Cleanup stale entries every 5 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, value] of rateMap) {
      if (value.resetAt < now) rateMap.delete(key);
    }
  }, 5 * 60 * 1000);
}

export function rateLimit(
  req: NextRequest,
  options: { limit: number; windowMs: number; identifier?: string }
): { success: boolean; remaining: number } {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  const key = `${options.identifier || req.nextUrl.pathname}:${ip}`;
  const now = Date.now();
  const entry = rateMap.get(key);

  if (!entry || entry.resetAt < now) {
    rateMap.set(key, { count: 1, resetAt: now + options.windowMs });
    return { success: true, remaining: options.limit - 1 };
  }

  entry.count++;
  if (entry.count > options.limit) {
    return { success: false, remaining: 0 };
  }

  return { success: true, remaining: options.limit - entry.count };
}

export function rateLimitResponse() {
  return NextResponse.json(
    { error: "Too many requests. Please try again later." },
    { status: 429, headers: { "Retry-After": "60" } }
  );
}
