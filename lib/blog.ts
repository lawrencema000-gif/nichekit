import fs from "fs";
import path from "path";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tag: string;
  keywords: string[];
  content: string;
}

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
  const posts: BlogPost[] = [];

  for (const file of files) {
    const post = getPost(file.replace(".md", ""));
    if (post) posts.push(post);
  }

  // Sort by date descending
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPost(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");

  // Parse frontmatter (between --- delimiters)
  const fmMatch = raw.match(/^---\n([\s\S]+?)\n---\n([\s\S]*)$/);
  if (!fmMatch) return null;

  const frontmatter = fmMatch[1];
  const content = fmMatch[2];

  const meta: Record<string, string | string[]> = {};
  for (const line of frontmatter.split("\n")) {
    const [key, ...rest] = line.split(":");
    if (!key) continue;
    const value = rest.join(":").trim();
    // Parse arrays (e.g., keywords: [a, b, c])
    if (value.startsWith("[") && value.endsWith("]")) {
      meta[key.trim()] = value.slice(1, -1).split(",").map((s) => s.trim().replace(/^["']|["']$/g, ""));
    } else {
      meta[key.trim()] = value.replace(/^["']|["']$/g, "");
    }
  }

  return {
    slug,
    title: (meta.title as string) || slug,
    description: (meta.description as string) || "",
    date: (meta.date as string) || new Date().toISOString(),
    readTime: (meta.readTime as string) || "5 min",
    tag: (meta.tag as string) || "Guide",
    keywords: (meta.keywords as string[]) || [],
    content,
  };
}
