import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import fs from "fs";
import path from "path";

const NICHE_MAP: Record<string, string> = {
  dentists: "Dental-Practices",
  restaurants: "Restaurants",
  "real-estate": "Real-Estate-Agents",
  gyms: "Gyms-&-Fitness-Centers",
  salons: "Salons-&-Spas",
  ecommerce: "E-Commerce-Stores",
};

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("plan")
    .eq("id", user.id)
    .single();

  if (!profile || profile.plan === "free") {
    return NextResponse.json({ error: "Upgrade required" }, { status: 403 });
  }

  const niche = req.nextUrl.searchParams.get("niche");
  if (!niche || !NICHE_MAP[niche]) {
    return NextResponse.json({ error: "Invalid niche" }, { status: 400 });
  }

  const fileName = `Complete-Bundle-${NICHE_MAP[niche]}.zip`;
  const filePath = path.join(process.cwd(), "products", fileName);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  const fileBuffer = fs.readFileSync(filePath);

  return new NextResponse(fileBuffer, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${fileName}"`,
    },
  });
}
