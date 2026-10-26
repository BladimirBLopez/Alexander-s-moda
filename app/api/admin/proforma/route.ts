import { createHash, randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { adminAutenticado } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const CLOUD = "dkq95jus0";
const MAX_BYTES = 10 * 1024 * 1024;
const PREFIJO = "alexanders-moda/proformas/proforma-";

function error(mensaje: string, estado: number) {
  return NextResponse.json(
    { ok: false, error: mensaje },
    { status: estado }
  );
}

function credenciales() {
  const key = process.env.CLOUDINARY_API_KEY;
  const secret = process.env.CLOUDINARY_API_SECRET;
  return key && secret ? { key, secret } : null;
}

async function disponible(
  url: string,
  tipo: "pdf" | "png"
): Promise<boolean> {
  const r = await fetch(url, {
    cache: "no-store",
    headers: { Range: "bytes=0-2047" },
    signal: AbortSignal.timeout(30000),
  });

  const contenido =
    (r.headers.get("content-type") || "").toLowerCase();

  await r.body?.cancel();

  return (
    r.ok &&
    (tipo === "pdf"
      ? contenido.includes("pdf")
      : contenido.includes("image/png"))
  );
}

export async function GET() {
  if (!(await adminAutenticado())) {
    return error("No autorizado", 401);
  }

  const cred = credenciales();

  if (!cred) {
    return error("Falta configurar Cloudinary", 503);
  }

  const publicId =
    PREFIJO + randomUUID().replace(/-/g, "");

  const timestamp = Math.floor(Date.now() / 1000);

  const signature = createHash("sha1")
    .update(
      "public_id=" + publicId +
      "&timestamp=" + timestamp +
      cred.secret
    )
    .digest("hex");

  return NextResponse.json(
    {
      ok: true,
      cloudName: CLOUD,
      apiKey: cred.key,
      timestamp,
      publicId,
      signature,
      maxBytes: MAX_BYTES,
    },
    {
      headers: { "Cache-Control": "no-store" },
    }
  );
}

export async function POST(request: Request) {
  if (!(await adminAutenticado())) {
    return error("No autorizado", 401);
  }

  const cred = credenciales();

  if (!cred) {
    return error("Falta configurar Cloudinary", 503);
  }

  const body: unknown = await request
    .json()
    .catch(() => null);

  if (
    !body ||
    typeof body !== "object" ||
    Array.isArray(body)
  ) {
    return error("Solicitud invalida", 400);
  }

  const publicId =
    (body as Record<string, unknown>).publicId;

  if (
    typeof publicId !== "string" ||
    !/^alexanders-moda\/proformas\/proforma-[a-f0-9]{32}$/.test(
      publicId
    )
  ) {
    return error("Identificador de PDF invalido", 400);
  }

  try {
    const autenticacion = Buffer.from(
      cred.key + ":" + cred.secret
    ).toString("base64");

    const ruta = publicId
      .split("/")
      .map(encodeURIComponent)
      .join("/");

    const consulta = await fetch(
      "https://api.cloudinary.com/v1_1/" +
        CLOUD +
        "/resources/image/upload/" +
        ruta,
      {
        headers: {
          Authorization: "Basic " + autenticacion,
        },
        cache: "no-store",
        signal: AbortSignal.timeout(20000),
      }
    );

    if (!consulta.ok) {
      return error(
        "No se pudo verificar el PDF en Cloudinary",
        502
      );
    }

    const dato: unknown = await consulta.json();

    if (
      !dato ||
      typeof dato !== "object" ||
      Array.isArray(dato)
    ) {
      return error("Respuesta de Cloudinary invalida", 502);
    }

    const recurso = dato as Record<string, unknown>;

    if (
      recurso.public_id !== publicId ||
      recurso.format !== "pdf" ||
      recurso.resource_type !== "image" ||
      recurso.type !== "upload" ||
      typeof recurso.bytes !== "number" ||
      recurso.bytes < 1 ||
      recurso.bytes > MAX_BYTES ||
      typeof recurso.secure_url !== "string"
    ) {
      return error(
        "El archivo no cumple los requisitos de PDF",
        400
      );
    }

    const pdfUrl = recurso.secure_url;

    const url = new URL(pdfUrl);

    if (
      url.protocol !== "https:" ||
      url.hostname !== "res.cloudinary.com" ||
      !url.pathname.startsWith(
        "/" + CLOUD + "/image/upload/"
      ) ||
      !url.pathname.toLowerCase().endsWith(".pdf")
    ) {
      return error("URL del PDF invalida", 400);
    }

    const previewUrl = pdfUrl
      .replace(
        "/image/upload/",
        "/image/upload/w_900/"
      )
      .replace(/\.pdf$/i, ".png");

    const [pdfDisponible, imagenDisponible] =
      await Promise.all([
        disponible(pdfUrl, "pdf"),
        disponible(previewUrl, "png"),
      ]);

    if (!pdfDisponible || !imagenDisponible) {
      return error(
        "El PDF o su vista previa no estan disponibles " +
          "publicamente. Revisa la seguridad de PDF " +
          "en Cloudinary.",
        409
      );
    }

    await prisma.ajuste.upsert({
      where: { clave: "proforma_actual" },
      create: {
        clave: "proforma_actual",
        valor: JSON.stringify({
          pdfUrl,
          previewUrl,
        }),
      },
      update: {
        valor: JSON.stringify({
          pdfUrl,
          previewUrl,
        }),
      },
    });

    revalidatePath("/proforma");
    revalidatePath("/admin/proforma");

    return NextResponse.json({
      ok: true,
      pdfUrl,
      previewUrl,
    });

  } catch (e) {
    console.error("Error publicando proforma", e);

    return error(
      "No se pudo completar la publicacion. " +
        "La proforma anterior se conserva.",
      500
    );
  }
}
