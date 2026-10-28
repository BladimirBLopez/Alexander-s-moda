import { NextResponse } from "next/server";
import { adminAutenticado } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { datosValidos } from "@/lib/proforma-datos";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CLAVE = "proforma_modelo";
const MAX_CARACTERES = 60000;

function error(mensaje: string, estado: number) {
  return NextResponse.json(
    { ok: false, error: mensaje },
    { status: estado }
  );
}

export async function GET() {
  if (!(await adminAutenticado())) {
    return error("No autorizado", 401);
  }

  try {
    const fila = await prisma.ajuste.findUnique({
      where: { clave: CLAVE },
    });

    let modelo = null;

    if (fila?.valor) {
      try {
        modelo = datosValidos(JSON.parse(fila.valor));
      } catch {
        modelo = null;
      }
    }

    return NextResponse.json(
      { ok: true, modelo },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (e) {
    console.error("Error leyendo modelo de proforma", e);
    return error("No se pudo leer el modelo", 500);
  }
}

export async function POST(request: Request) {
  if (!(await adminAutenticado())) {
    return error("No autorizado", 401);
  }

  const body: unknown = await request.json().catch(() => null);

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return error("Solicitud invalida", 400);
  }

  const modelo = datosValidos(
    (body as Record<string, unknown>).modelo
  );

  if (!modelo) {
    return error("Datos invalidos", 400);
  }

  const valor = JSON.stringify(modelo);

  if (valor.length > MAX_CARACTERES) {
    return error("El modelo es demasiado grande", 400);
  }

  try {
    await prisma.ajuste.upsert({
      where: { clave: CLAVE },
      create: { clave: CLAVE, valor },
      update: { valor },
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Error guardando modelo de proforma", e);
    return error("No se pudo guardar el modelo", 500);
  }
}
