import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { adminAutenticado } from "@/lib/admin-auth";

type Ctx = {
  params: Promise<{ id: string }>;
};

export async function PATCH(req: Request, { params }: Ctx) {
  if (!(await adminAutenticado())) {
    return NextResponse.json(
      { error: "no autorizado" },
      { status: 401 }
    );
  }

  const { id } = await params;
  if (!id || id.length > 150) {
    return NextResponse.json(
      { error: "ID invalido" },
      { status: 400 }
    );
  }

  const body: unknown = await req.json().catch(() => null);

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json(
      { error: "Datos invalidos" },
      { status: 400 }
    );
  }

  const b = body as Record<string, unknown>;

  const data: {
    nombre?: string;
    imagenPrincipal?: string;
  } = {};

  if ("nombre" in b) {
    if (
      typeof b.nombre !== "string" ||
      !b.nombre.trim() ||
      b.nombre.trim().length > 120
    ) {
      return NextResponse.json(
        { error: "Nombre invalido" },
        { status: 400 }
      );
    }

    data.nombre = b.nombre.trim();
  }

  if ("imagenPrincipal" in b) {
    if (typeof b.imagenPrincipal !== "string") {
      return NextResponse.json(
        { error: "Imagen invalida" },
        { status: 400 }
      );
    }

    try {
      const url = new URL(b.imagenPrincipal);

      if (
        url.protocol !== "https:" ||
        url.hostname !== "res.cloudinary.com" ||
        !url.pathname.startsWith("/dkq95jus0/image/upload/") ||
        url.pathname === "/dkq95jus0/image/upload/"
      ) {
        throw new Error("URL no permitida");
      }

      data.imagenPrincipal = url.toString();

    } catch {
      return NextResponse.json(
        { error: "La imagen debe pertenecer a Cloudinary" },
        { status: 400 }
      );
    }
  }

  if (Object.keys(data).length === 0) {
    return NextResponse.json(
      { error: "No hay cambios validos" },
      { status: 400 }
    );
  }

  try {
    const { prisma } = await import("@/lib/prisma");

    const tela = await prisma.tela.update({
      where: { id },
      data,
      select: {
        id: true,
        nombre: true,
        imagenPrincipal: true,
      },
    });

    revalidatePath("/admin/telas");
    revalidatePath(`/admin/telas/${id}`);
    revalidatePath("/catalogo/[slug]", "page");

    return NextResponse.json({
      ok: true,
      tela,
    });

  } catch (e) {
    if ((e as { code?: string } | null)?.code === "P2025") {
      return NextResponse.json(
        { error: "Tela no encontrada" },
        { status: 404 }
      );
    }

    console.error("Error actualizando tela", e);

    return NextResponse.json(
      { error: "No se pudo actualizar la tela" },
      { status: 500 }
    );
  }
}
