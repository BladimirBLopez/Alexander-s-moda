import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { adminAutenticado } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

function error(mensaje: string, estado: number) {
  return NextResponse.json(
    { ok: false, error: mensaje },
    { status: estado }
  );
}

export async function POST(request: Request) {
  if (!(await adminAutenticado())) {
    return error("No autorizado", 401);
  }

  const body: unknown = await request.json().catch(() => null);

  const activo =
    body && typeof body === "object" && !Array.isArray(body)
      ? (body as Record<string, unknown>).activo
      : undefined;

  if (typeof activo !== "boolean") {
    return error("Solicitud invalida", 400);
  }

  try {
    const valor = activo ? "1" : "0";

    await prisma.ajuste.upsert({
      where: { clave: "proforma_boton" },
      create: { clave: "proforma_boton", valor },
      update: { valor },
    });

    revalidatePath("/");
    revalidatePath("/proforma");
    revalidatePath("/admin/proforma");

    return NextResponse.json({ ok: true, activo });
  } catch (e) {
    console.error("Error guardando interruptor de proforma", e);
    return error("No se pudo guardar. Intenta de nuevo.", 500);
  }
}
