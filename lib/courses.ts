import fs from "fs";
import path from "path";

export interface ModuleMeta {
  slug: string;
  title: string;
  free: boolean;
  time?: string;
  quickWin?: string;
}

export interface CourseMeta {
  title: string;
  slug: string;
  description: string;
  tag: string;
  time?: string;
  outcome?: string;
  modules: ModuleMeta[];
}

const CONTENT_DIR = path.join(process.cwd(), "content", "courses");

export function getCourse(courseSlug: string): CourseMeta | null {
  const metaPath = path.join(CONTENT_DIR, courseSlug, "meta.json");
  if (!fs.existsSync(metaPath)) return null;
  return JSON.parse(fs.readFileSync(metaPath, "utf-8"));
}

export function getModuleContent(courseSlug: string, moduleSlug: string): string | null {
  const mdPath = path.join(CONTENT_DIR, courseSlug, `${moduleSlug}.md`);
  if (!fs.existsSync(mdPath)) return null;
  return fs.readFileSync(mdPath, "utf-8");
}

export function getAllCourses(): CourseMeta[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const dirs = fs.readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory());

  const courses: CourseMeta[] = [];
  for (const dir of dirs) {
    const meta = getCourse(dir.name);
    if (meta) courses.push(meta);
  }
  return courses;
}
