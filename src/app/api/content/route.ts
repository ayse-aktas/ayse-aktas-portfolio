import { NextResponse } from "next/server";
import contentData from "@/data/content.json";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Importing JSON directly is compatible with Edge Runtime
    return NextResponse.json(contentData);
  } catch (error) {
    console.error("Content GET error:", error);
    return NextResponse.json(
      { error: "Failed to load content" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  // Cloudflare Pages is read-only. Filesystem writes are not possible.
  // We return a clear error message.
  return NextResponse.json(
    {
      error:
        "Dosya yazma hatası. Üretim ortamında (Cloudflare vb.) içerik güncelleme için bir veritabanı (KV/D1) gereklidir.",
      details: "Production environment is read-only.",
    },
    { status: 405 },
  );
}
