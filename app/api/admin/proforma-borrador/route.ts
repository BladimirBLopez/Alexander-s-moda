import { NextResponse } from "next/server";
import { adminAutenticado } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { datosValidos } from "@/lib/proforma-datos";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CLAVE = "proforma_borrador";
const MAX_CARACTERES = 60000;

function error(mensaje: string, estado: number) {
  return NextResponse.json(
    { ok: false, error: mensaje },
    { status: estado }
  );
}

async function leer() {
  const fila = await prisma.ajuste.findUnique({
    where: { clave: CLAVE },
  });

  if (!fila?.valor) return { version: 0, datos: null };

  try {
    const j: unknown = JSON.parse(fila.valor);
    if (!j || typeof j !== "object" || Array.isArray(j)) {
      return { version: 0, datos: null };
    }
    const r = j as Record<string, unknown>;
    const version =
      typeof r.version === "number" && Number.isInteger(r.version)
        ? r.version
        : 0;
    return { version, datos: datosValidos(r.datos) };
  } catch {
    return { version: 0, datos: null };
  }
}

export async function GET() {
  if (!(await adminAutenticado())) {
    return error("No autorizado", 401);
  }

  try {
    const { version, datos } = await leer();
    return NextResponse.json(
      { ok: true, version, datos },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (e) {
    console.error("Error leyendo borrador de proforma", e);
    return error("No se pudo leer el borrador", 500);
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

  const b = body as Record<string, unknown>;
  const datos = datosValidos(b.datos);

  if (!datos) {
    return error("Datos invalidos", 400);
  }

  if (typeof b.base !== "number" || !Number.isInteger(b.base)) {
    return error("Version base invalida", 400);
  }

  try {
    const actual = await leer();

    if (actual.version !== b.base) {
      return NextResponse.json(
        {
          ok: false,
          error: "Otra persona modifico esta proforma",
          conflicto: true,
          version: actual.version,
        },
        { status: 409 }
      );
    }

    const version = actual.version + 1;
    const valor = JSON.stringify({ version, datos });

    if (valor.length > MAX_CARACTERES) {
      return error("El borrador es demasiado grande", 400);
    }

    await prisma.ajuste.upsert({
      where: { clave: CLAVE },
      create: { clave: CLAVE, valor },
      update: { valor },
    });

    return NextResponse.json({ ok: true, version });
  } catch (e) {
    console.error("Error guardando borrador de proforma", e);
    return error("No se pudo guardar el borrador", 500);
  }
}
