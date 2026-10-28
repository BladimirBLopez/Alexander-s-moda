import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import type { Prisma } from "@prisma/client";
import { adminAutenticado } from "@/lib/admin-auth";

type Contexto = {
  params: Promise<{ id: string }>;
};

export async function PATCH(
  request: Request,
  { params }: Contexto
) {
  if (!(await adminAutenticado())) {
    return NextResponse.json(
      { error: "No autorizado" },
      { status: 401 }
    );
  }

  const { id } = await params;

  if (!id || id.length > 150) {
    return NextResponse.json(
      { error: "ID de tela inválido" },
      { status: 400 }
    );
  }

  const cuerpo: unknown = await request
    .json()
    .catch(() => null);

  if (
    !cuerpo ||
    typeof cuerpo !== "object" ||
    Array.isArray(cuerpo)
  ) {
    return NextResponse.json(
      { error: "Datos inválidos" },
      { status: 400 }
    );
  }

  const datos = cuerpo as Record<string, unknown>;

  const indice = datos.indice;
  const codigo = datos.codigo;
  const imagenUrl = datos.imagenUrl;
  const imagenAnterior = datos.imagenAnterior;

  if (
    typeof indice !== "number" ||
    !Number.isSafeInteger(indice) ||
    indice < 0 ||
    typeof codigo !== "string" ||
    codigo.length > 120 ||
    typeof imagenUrl !== "string" ||
    typeof imagenAnterior !== "string"
  ) {
    return NextResponse.json(
      { error: "Datos de fotografía inválidos" },
      { status: 400 }
    );
  }

  let nuevaUrl: string;

  try {
    const url = new URL(imagenUrl);

    if (
      url.protocol !== "https:" ||
      url.hostname !== "res.cloudinary.com" ||
      url.username ||
      url.password ||
      !url.pathname.startsWith(
        "/dkq95jus0/image/upload/"
      ) ||
      url.pathname === "/dkq95jus0/image/upload/"
    ) {
      throw new Error("URL no permitida");
    }

    nuevaUrl = url.toString();
  } catch {
    return NextResponse.json(
      {
        error:
          "La fotografía debe pertenecer al Cloudinary de Alexander's Moda",
      },
      { status: 400 }
    );
  }

  try {
    const { prisma } = await import("@/lib/prisma");

    const tela = await prisma.tela.findUnique({
      where: { id },
      select: {
        colores: true,
      },
    });

    if (!tela) {
      return NextResponse.json(
        { error: "Tela no encontrada" },
        { status: 404 }
      );
    }

    if (!Array.isArray(tela.colores)) {
      return NextResponse.json(
        { error: "Colores de tela inválidos" },
        { status: 409 }
      );
    }

    const colores = JSON.parse(
      JSON.stringify(tela.colores)
    ) as Array<Record<string, unknown>>;

    const color = colores[indice];

    if (
      !color ||
      typeof color !== "object" ||
      Array.isArray(color) ||
      color.codigo !== codigo
    ) {
      return NextResponse.json(
        {
          error:
            "El orden o código de los colores cambió. Recarga la página.",
        },
        { status: 409 }
      );
    }

    const actual =
      typeof color.imagenUrl === "string"
        ? color.imagenUrl
        : "";

    if (actual !== imagenAnterior) {
      return NextResponse.json(
        {
          error:
            "Esta fotografía ya fue modificada. Recarga antes de continuar.",
        },
        { status: 409 }
      );
    }

    if (actual === nuevaUrl) {
      return NextResponse.json({
        ok: true,
        imagenUrl: actual,
      });
    }

    colores[indice] = {
      ...color,
      imagenUrl: nuevaUrl,
    };

    // Actualización condicionada al JSON leído:
    // evita sobrescribir cambios simultáneos de otros colores.
    const resultado = await prisma.tela.updateMany({
      where: {
        id,
        colores: {
          equals: tela.colores as Prisma.InputJsonValue,
        },
      },
      data: {
        colores: colores as Prisma.InputJsonValue,
      },
    });

    if (resultado.count !== 1) {
      return NextResponse.json(
        {
          error:
            "Los colores fueron modificados mientras editabas. Recarga la página.",
        },
        { status: 409 }
      );
    }

    revalidatePath("/admin/telas");
    revalidatePath(`/admin/telas/${id}`);
    revalidatePath("/catalogo/[slug]", "page");

    return NextResponse.json({
      ok: true,
      codigo,
      imagenUrl: nuevaUrl,
    });
  } catch (error) {
    console.error(
      "Error guardando fotografía de color",
      error
    );

    return NextResponse.json(
      {
        error:
          "No se pudo guardar la fotografía del color",
      },
      { status: 500 }
    );
  }
}
