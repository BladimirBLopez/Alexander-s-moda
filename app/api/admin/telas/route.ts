import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import type { Prisma } from "@prisma/client";
import { adminAutenticado } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const CAMPOS = [
  "estructura",
  "composicion",
  "gramaje",
  "ancho",
] as const;

function rechazar(error: string, status = 400) {
  return NextResponse.json(
    { ok: false, error },
    { status }
  );
}

function imagenValida(valor: string): boolean {
  if (valor.length > 600) return false;

  try {
    const url = new URL(valor);

    return (
      url.protocol === "https:" &&
      url.hostname === "res.cloudinary.com" &&
      url.username === "" &&
      url.password === "" &&
      url.pathname.startsWith(
        "/dkq95jus0/image/upload/"
      ) &&
      url.pathname.length >
        "/dkq95jus0/image/upload/".length
    );
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!(await adminAutenticado())) {
    return rechazar("No autorizado", 401);
  }

  const texto = await request.text().catch(() => null);

  if (
    !texto ||
    Buffer.byteLength(texto, "utf8") > 300000
  ) {
    return rechazar("Solicitud vacia o demasiado grande");
  }

  let cuerpo: unknown;

  try {
    cuerpo = JSON.parse(texto);
  } catch {
    return rechazar("JSON invalido");
  }

  if (
    !cuerpo ||
    typeof cuerpo !== "object" ||
    Array.isArray(cuerpo)
  ) {
    return rechazar("Datos de tela invalidos");
  }

  const b = cuerpo as Record<string, unknown>;

  if (
    typeof b.nombre !== "string" ||
    !b.nombre.trim() ||
    b.nombre.trim().length > 120
  ) {
    return rechazar(
      "El nombre debe tener entre 1 y 120 caracteres"
    );
  }

  const campos = {
    estructura: "",
    composicion: "",
    gramaje: "",
    ancho: "",
  };

  for (const campo of CAMPOS) {
    const valor = b[campo];

    if (
      typeof valor !== "string" ||
      valor.length > 250
    ) {
      return rechazar("Campo invalido: " + campo);
    }

    campos[campo] = valor.trim();
  }

  if (
    !Array.isArray(b.caracteristicas) ||
    b.caracteristicas.length > 40
  ) {
    return rechazar("Caracteristicas invalidas");
  }

  const caracteristicas: string[] = [];

  for (const item of b.caracteristicas) {
    if (
      typeof item !== "string" ||
      !item.trim() ||
      item.trim().length > 120
    ) {
      return rechazar(
        "Una caracteristica es invalida"
      );
    }

    caracteristicas.push(item.trim());
  }

  if (
    !Array.isArray(b.colores) ||
    b.colores.length > 200
  ) {
    return rechazar(
      "La lista de colores es invalida"
    );
  }

  const colores: {
    codigo: string;
    hex: string;
    imagenUrl?: string;
  }[] = [];

  const codigos = new Set<string>();

  for (const item of b.colores) {
    if (
      !item ||
      typeof item !== "object" ||
      Array.isArray(item)
    ) {
      return rechazar("Color invalido");
    }

    const color = item as Record<string, unknown>;

    if (
      typeof color.codigo !== "string" ||
      !color.codigo.trim() ||
      color.codigo.trim().length > 40
    ) {
      return rechazar("Codigo de color invalido");
    }

    if (
      typeof color.hex !== "string" ||
      !/^#[0-9a-fA-F]{6}$/.test(color.hex)
    ) {
      return rechazar("Valor hexadecimal invalido");
    }

    const codigo = color.codigo.trim();
    const clave = codigo.toLowerCase();

    if (codigos.has(clave)) {
      return rechazar(
        "Hay codigos de color repetidos"
      );
    }

    codigos.add(clave);

    const nuevoColor: {
      codigo: string;
      hex: string;
      imagenUrl?: string;
    } = {
      codigo,
      hex: color.hex.toLowerCase(),
    };

    if (
      color.imagenUrl !== undefined &&
      color.imagenUrl !== null &&
      color.imagenUrl !== ""
    ) {
      if (
        typeof color.imagenUrl !== "string" ||
        !imagenValida(color.imagenUrl)
      ) {
        return rechazar(
          "Imagen de color no permitida"
        );
      }

      nuevoColor.imagenUrl = color.imagenUrl;
    }

    colores.push(nuevoColor);
  }

  let imagenPrincipal: string | null = null;

  if (
    b.imagenPrincipal !== undefined &&
    b.imagenPrincipal !== null &&
    b.imagenPrincipal !== ""
  ) {
    if (
      typeof b.imagenPrincipal !== "string" ||
      !imagenValida(b.imagenPrincipal)
    ) {
      return rechazar(
        "La imagen principal no es valida"
      );
    }

    imagenPrincipal = b.imagenPrincipal;
  }

  try {
    const ultimo = await prisma.tela.aggregate({
      _max: { orden: true },
    });

    const tela = await prisma.tela.create({
      data: {
        id: "tela-" + randomUUID(),
        orden: (ultimo._max.orden ?? -1) + 1,
        nombre: b.nombre.trim(),
        ...campos,
        caracteristicas:
          caracteristicas as Prisma.InputJsonValue,
        imagenPrincipal,
        colores: colores as Prisma.InputJsonValue,
      },
      select: {
        id: true,
        nombre: true,
        orden: true,
      },
    });

    revalidatePath("/admin");
    revalidatePath("/admin/telas");
    revalidatePath("/catalogo/[slug]", "page");

    return NextResponse.json(
      { ok: true, tela },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error creando tela", error);

    return rechazar(
      "No se pudo registrar la tela en Neon",
      500
    );
  }
}
