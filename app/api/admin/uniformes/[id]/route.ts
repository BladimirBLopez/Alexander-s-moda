import { NextResponse } from "next/server";
import { adminAutenticado } from "@/lib/admin-auth";
import {
  json,
  limpiarBullets,
  limpiarFotos,
  revalidarUniformes,
  txt,
} from "@/lib/uniformes-db";

type Ctx = { params: Promise<{ id: string }> };

export async function PUT(req: Request, { params }: Ctx) {
  if (!(await adminAutenticado())) {
    return NextResponse.json(
      { error: "no autorizado" },
      { status: 401 }
    );
  }
  const { id } = await params;
  const b = await req.json().catch(() => null);
  if (!b || typeof b !== "object") {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }
  const nombre = txt(b.nombre);
  if (!nombre) {
    return NextResponse.json({ error: "Falta el nombre" }, { status: 400 });
  }
  const { prisma } = await import("@/lib/prisma");
  const actual = await prisma.producto.findUnique({ where: { id } });
  if (!actual) {
    return NextResponse.json({ error: "No existe" }, { status: 404 });
  }
  await prisma.producto.update({
    where: { id },
    data: {
      nombre,
      subtitulo: txt(b.subtitulo),
      descripcion: txt(b.descripcion),
      tipografia: txt(b.tipografia),
      bulletsMujer: json(limpiarBullets(b.bulletsMujer)),
      bulletsHombre: json(limpiarBullets(b.bulletsHombre)),
      fotos: json(limpiarFotos(b.fotos, actual.fotos)),
      ...(Number.isInteger(b.orden) ? { orden: b.orden as number } : {}),
    },
  });
  revalidarUniformes();
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: Request, { params }: Ctx) {
  if (!(await adminAutenticado())) {
    return NextResponse.json(
      { error: "no autorizado" },
      { status: 401 }
    );
  }
  const { id } = await params;
  const { prisma } = await import("@/lib/prisma");
  const actual = await prisma.producto.findUnique({ where: { id } });
  if (!actual) {
    return NextResponse.json({ error: "No existe" }, { status: 404 });
  }
  await prisma.producto.delete({ where: { id } });
  revalidarUniformes();
  return NextResponse.json({ ok: true });
}
