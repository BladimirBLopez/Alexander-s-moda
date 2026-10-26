import { createHash, timingSafeEqual } from "node:crypto";
import type { Prisma } from "@prisma/client";
import { productos } from "@/lib/productos";
import { telas } from "@/data/telas";
import { fotosDe } from "@/lib/datos";

const hash = (s: string) => createHash("sha256").update(s).digest();

function claveOk(dada: string | null) {
  const real = process.env.ADMIN_PASSWORD;
  if (!real || !dada) return false;
  return timingSafeEqual(hash(dada), hash(real));
}

const VARS = [
  "DATABASE_URL",
  "ADMIN_PASSWORD",
  "ADMIN_SESSION_SECRET",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
];

export async function POST(req: Request) {
  if (!claveOk(req.headers.get("x-clave"))) {
    return Response.json({ error: "no autorizado" }, { status: 401 });
  }
  const env = Object.fromEntries(VARS.map((k) => [k, Boolean(process.env[k])]));
  if (!process.env.DATABASE_URL) {
    return Response.json({ error: "falta DATABASE_URL", env }, { status: 500 });
  }
  try {
    const { prisma } = await import("@/lib/prisma");
    const hecho = await prisma.ajuste.findUnique({ where: { clave: "seed_hecho" } });
    if (hecho) {
      return Response.json({ error: "el seed ya se ejecutó", env }, { status: 409 });
    }
    for (const [i, p] of productos.entries()) {
      const datos = {
        slug: p.id.replace(/^uniforme-/, ""),
        orden: i,
        nombre: p.nombre,
        subtitulo: p.subtitulo,
        descripcion: p.descripcion,
        tipografia: p.tipografia,
        bulletsMujer: p.bulletsMujer as unknown as Prisma.InputJsonValue,
        bulletsHombre: p.bulletsHombre as unknown as Prisma.InputJsonValue,
        fotos: fotosDe(p),
      };
      await prisma.producto.upsert({
        where: { id: p.id },
        update: datos,
        create: { id: p.id, ...datos },
      });
    }
    for (const [i, t] of telas.entries()) {
      const datos = {
        orden: i,
        nombre: t.nombre,
        estructura: t.estructura,
        composicion: t.composicion,
        gramaje: t.gramaje,
        ancho: t.ancho,
        caracteristicas: t.caracteristicas as unknown as Prisma.InputJsonValue,
        imagenPrincipal: t.imagenPrincipal ?? null,
        colores: t.colores as unknown as Prisma.InputJsonValue,
      };
      await prisma.tela.upsert({
        where: { id: t.id },
        update: datos,
        create: { id: t.id, ...datos },
      });
    }
    await prisma.ajuste.create({
      data: { clave: "seed_hecho", valor: new Date().toISOString() },
    });
    return Response.json({ ok: true, productos: productos.length, telas: telas.length, env });
  } catch (e) {
    return Response.json(
      { error: e instanceof Error ? e.message : "error", env },
      { status: 500 },
    );
  }
}
