import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import type { Prisma } from "@prisma/client";
import { adminAutenticado } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

type Ctx = {
  params: Promise<{ id: string }>;
};

function validarBullets(valor: unknown): boolean {
  if (!Array.isArray(valor) || valor.length > 60) {
    return false;
  }

  for (const item of valor) {
    if (typeof item === "string") {
      if (!item.trim() || item.length > 2000) {
        return false;
      }
      continue;
    }

    if (
      !item ||
      typeof item !== "object" ||
      Array.isArray(item)
    ) {
      return false;
    }

    const b = item as Record<string, unknown>;

    if (
      typeof b.texto !== "string" ||
      !b.texto.trim() ||
      b.texto.length > 2000 ||
      !Array.isArray(b.sublista) ||
      b.sublista.length > 40
    ) {
      return false;
    }

    if (
      b.sublista.some(
        (s: unknown) =>
          typeof s !== "string" ||
          !s.trim() ||
          s.length > 500
      )
    ) {
      return false;
    }

    if (
      b.nota !== undefined &&
      (typeof b.nota !== "string" ||
        b.nota.length > 2000)
    ) {
      return false;
    }

    if (
      Object.keys(b).some(
        (k) => !["texto", "sublista", "nota"].includes(k)
      )
    ) {
      return false;
    }
  }

  return true;
}

export async function PATCH(req: Request, { params }: Ctx) {
  if (!(await adminAutenticado())) {
    return NextResponse.json(
      { error: "No autorizado" },
      { status: 401 }
    );
  }

  const { id } = await params;

  if (
    id !== "uniforme-sport" &&
    id !== "uniforme-casimir"
  ) {
    return NextResponse.json(
      { error: "Uniforme no permitido" },
      { status: 404 }
    );
  }

  const texto = await req.text().catch(() => "");

  if (
    !texto ||
    Buffer.byteLength(texto, "utf8") > 100000
  ) {
    return NextResponse.json(
      { error: "Solicitud invalida" },
      { status: 400 }
    );
  }

  let body: unknown;

  try {
    body = JSON.parse(texto);
  } catch {
    return NextResponse.json(
      { error: "JSON invalido" },
      { status: 400 }
    );
  }

  if (
    !body ||
    typeof body !== "object" ||
    Array.isArray(body)
  ) {
    return NextResponse.json(
      { error: "Datos invalidos" },
      { status: 400 }
    );
  }

  const b = body as Record<string, unknown>;

  if (
    (b.seccion !== "dama" && b.seccion !== "varon") ||
    !validarBullets(b.bullets) ||
    Object.keys(b).some(
      (k) => !["seccion", "bullets"].includes(k)
    )
  ) {
    return NextResponse.json(
      { error: "Descripcion invalida" },
      { status: 400 }
    );
  }

  const bullets = b.bullets as Prisma.InputJsonValue;

  const data =
    b.seccion === "dama"
      ? { bulletsMujer: bullets }
      : { bulletsHombre: bullets };

  try {
    await prisma.producto.update({
      where: { id },
      data,
    });

    revalidatePath("/catalogo/[slug]", "page");
    revalidatePath("/admin/uniformes/" + id);

    return NextResponse.json({ ok: true });

  } catch (e) {
    if (
      (e as { code?: string } | null)?.code === "P2025"
    ) {
      return NextResponse.json(
        { error: "Uniforme no encontrado" },
        { status: 404 }
      );
    }

    console.error("Error guardando descripcion", e);

    return NextResponse.json(
      { error: "No se pudo guardar en Neon" },
      { status: 500 }
    );
  }
}
