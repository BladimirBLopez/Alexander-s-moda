import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { COOKIE, DURACION, crearToken } from "@/lib/sesion";

const hash = (s: string) => createHash("sha256").update(s).digest();

// Límite básico por IP (en memoria: es de mejor esfuerzo en serverless)
const MAX = 5;
const VENTANA = 15 * 60 * 1000;
const intentos = new Map<string, { n: number; hasta: number }>();

export async function POST(req: Request) {
  const id = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "desconocida";
  const ahora = Date.now();
  const reg = intentos.get(id);
  const activo = reg && reg.hasta > ahora ? reg : undefined;

  if (activo && activo.n >= MAX) {
    return Response.json(
      { error: "Demasiados intentos. Probá en 15 minutos." },
      { status: 429 },
    );
  }

  const real = process.env.ADMIN_PASSWORD;
  if (!real || !process.env.ADMIN_SESSION_SECRET) {
    return Response.json({ error: "Servidor sin configurar" }, { status: 500 });
  }

  let clave = "";
  try {
    const body = await req.json();
    if (typeof body?.clave === "string") clave = body.clave;
  } catch {}

  const ok = clave.length > 0 && timingSafeEqual(hash(clave), hash(real));
  if (!ok) {
    intentos.set(id, {
      n: (activo?.n ?? 0) + 1,
      hasta: activo?.hasta ?? ahora + VENTANA,
    });
    await new Promise((r) => setTimeout(r, 600));
    return Response.json({ error: "Contraseña incorrecta" }, { status: 401 });
  }

  intentos.delete(id);
  const token = await crearToken();
  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: DURACION,
  });
  return Response.json({ ok: true });
}
