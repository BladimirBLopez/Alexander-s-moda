import { NextResponse } from "next/server";
import {
  json,
  limpiarBullets,
  limpiarFotos,
  revalidarUniformes,
  slugify,
  txt,
} from "@/lib/uniformes-db";

export async function POST(req: Request) {
  const b = await req.json().catch(() => null);
  if (!b || typeof b !== "object") {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }
  const nombre = txt(b.nombre);
  if (!nombre) {
    return NextResponse.json({ error: "Falta el nombre" }, { status: 400 });
  }
  const slug = slugify(txt(b.slug) || nombre);
  if (!slug) {
    return NextResponse.json({ error: "Slug inválido" }, { status: 400 });
  }
  const { prisma } = await import("@/lib/prisma");
  const id = `uniforme-${slug}`;
  const existe = await prisma.producto.findFirst({
    where: { OR: [{ slug }, { id }] },
  });
  if (existe) {
    return NextResponse.json(
      { error: "Ya existe un uniforme con ese slug" },
      { status: 409 },
    );
  }
  const ultimo = await prisma.producto.findFirst({
    orderBy: { orden: "desc" },
    select: { orden: true },
  });
  const orden = Number.isInteger(b.orden) ? (b.orden as number) : (ultimo?.orden ?? -1) + 1;
  await prisma.producto.create({
    data: {
      id,
      slug,
      orden,
      nombre,
      subtitulo: txt(b.subtitulo),
      descripcion: txt(b.descripcion),
      tipografia: txt(b.tipografia),
      bulletsMujer: json(limpiarBullets(b.bulletsMujer)),
      bulletsHombre: json(limpiarBullets(b.bulletsHombre)),
      fotos: json(limpiarFotos(b.fotos)),
    },
  });
  revalidarUniformes();
  return NextResponse.json({ ok: true, id, slug });
}
