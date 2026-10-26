import { cookies } from "next/headers";
import { COOKIE } from "@/lib/sesion";

export async function POST() {
  (await cookies()).delete(COOKIE);
  return Response.json({ ok: true });
}
