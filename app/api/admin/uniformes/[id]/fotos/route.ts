import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { adminAutenticado } from "@/lib/admin-auth";
import { json, revalidarUniformes } from "@/lib/uniformes-db";

type Ctx = {
  params: Promise<{ id: string }>;
};

const SLOTS = [
  "fotoMujerDentro",
  "fotoMujerFuera",
  "fotoHombreDentro",
  "fotoHombreFuera",
  "fotoSeccion2Arriba",
  "fotoSeccion2Izquierda",
  "fotoSeccion2Derecha",
] as const;

export async function PATCH(req: Request, { params }: Ctx) {
  if (!(await adminAutenticado())) {
    return NextResponse.json(
      { error: "No autorizado" },
      { status: 401 }
    );
  }

  const { id } = await params;

  if (!id || id.length > 150) {
    return NextResponse.json(
      { error: "ID inválido" },
      { status: 400 }
    );
  }

  const body: unknown = await req.json().catch(() => null);

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json(
      { error: "Datos inválidos" },
      { status: 400 }
    );
  }

  const datos = body as Record<string, unknown>;
  const fotos = datos.fotos;
  const origenes: unknown = datos.origenes;

  if (!fotos || typeof fotos !== "object" || Array.isArray(fotos)) {
    return NextResponse.json(
      { error: "Formato de fotografías inválido" },
      { status: 400 }
    );
  }

  const entrada = fotos as Record<string, unknown>;

  if (
    !Array.isArray(origenes) ||
    origenes.length !== SLOTS.length ||
    origenes.some(
      (v: unknown) =>
        v !== null &&
        !(
          typeof v === "number" &&
          Number.isInteger(v) &&
          v >= 0 &&
          v < SLOTS.length
        )
    )
  ) {
    return NextResponse.json(
      { error: "Posiciones originales invalidas" },
      { status: 400 }
    );
  }

  const indices = origenes as (number | null)[];

  if (
    Object.keys(entrada).length !== SLOTS.length ||
    !SLOTS.every((s) =>
      Object.prototype.hasOwnProperty.call(entrada, s)
    )
  ) {
    return NextResponse.json(
      { error: "Se requieren las siete posiciones" },
      { status: 400 }
    );
  }

  for (const slot of SLOTS) {
    const valor = entrada[slot];

    if (valor === null) continue;

    if (
      typeof valor !== "string" ||
      valor.length > 2048 ||
      !/^(https:\/\/|\/(?!\/))/.test(valor)
    ) {
      return NextResponse.json(
        { error: "Fotografía inválida: " + slot },
        { status: 400 }
      );
    }
  }

  try {
    const { prisma } = await import("@/lib/prisma");

    const actual = await prisma.producto.findUnique({
      where: { id },
      select: { fotos: true },
    });

    if (!actual) {
      return NextResponse.json(
        { error: "Uniforme no encontrado" },
        { status: 404 }
      );
    }

    const anteriores =
      actual.fotos &&
      typeof actual.fotos === "object" &&
      !Array.isArray(actual.fotos)
        ? actual.fotos as Record<string, unknown>
        : {};

    const nuevas: Record<string, unknown> = {
      ...anteriores,
    };

    const usadas = new Set<number>();

    for (const [i, slot] of SLOTS.entries()) {
      const url = entrada[slot];
      const origen = indices[i];

      if (url === null) {
        if (origen !== null) {
          return NextResponse.json(
            { error: "Origen invalido para foto vacia" },
            { status: 400 }
          );
        }
        delete nuevas[slot];
        delete nuevas[slot + "Zoom"];
        continue;
      }

      if (typeof url !== "string") {
        return NextResponse.json(
          { error: "URL invalida" },
          { status: 400 }
        );
      }

      if (origen !== null) {
        const slotOriginal = SLOTS[origen];

        if (
          usadas.has(origen) ||
          anteriores[slotOriginal] !== url
        ) {
          return NextResponse.json(
            { error: "Origen de fotografia no coincide" },
            { status: 400 }
          );
        }

        usadas.add(origen);

        const zoom = anteriores[slotOriginal + "Zoom"];
        nuevas[slot + "Zoom"] =
          typeof zoom === "string" && zoom ? zoom : url;
      } else {
        nuevas[slot + "Zoom"] = url;
      }

      nuevas[slot] = url;
    }

    await prisma.producto.update({
      where: { id },
      data: {
        fotos: json(nuevas),
      },
    });

    revalidarUniformes();
    revalidatePath("/admin/fotos");

    return NextResponse.json({
      ok: true,
      id,
    });

  } catch (error) {
    console.error("Error guardando fotografías", error);

    return NextResponse.json(
      { error: "No se pudieron guardar las fotografías" },
      { status: 500 }
    );
  }
}
