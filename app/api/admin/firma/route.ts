import { createHash } from "crypto";
import { NextResponse } from "next/server";
import { adminAutenticado } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function GET() {
  if (!(await adminAutenticado())) {
    return NextResponse.json(
      { error: "no autorizado" },
      { status: 401 }
    );
  }
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const secret = process.env.CLOUDINARY_API_SECRET;
  if (!apiKey || !secret) {
    return NextResponse.json({ error: "Falta configurar Cloudinary" }, { status: 500 });
  }
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = createHash("sha1")
    .update(`timestamp=${timestamp}${secret}`)
    .digest("hex");
  return NextResponse.json({
    timestamp,
    signature,
    apiKey,
    cloudName: "dkq95jus0",
  });
}
