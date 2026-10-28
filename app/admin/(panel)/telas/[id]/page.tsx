import Link from "next/link";
import { notFound } from "next/navigation";

import EditorTelaBasico from "@/components/admin/EditorTelaBasico";
import EditorFotoColor from "@/components/admin/EditorFotoColor";

export const dynamic = "force-dynamic";

export default async function EditarTelaPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    color?: string | string[];
  }>;
}) {
  const { id } = await params;
  const consulta = await searchParams;

  const { prisma } = await import("@/lib/prisma");

  const tela = await prisma.tela.findUnique({
    where: { id },
    select: {
      id: true,
      nombre: true,
      imagenPrincipal: true,
      colores: true,
    },
  });

  if (!tela) {
    notFound();
  }

  const valor = consulta.color;

  if (valor !== undefined) {
    if (
      typeof valor !== "string" ||
      !/^(0|[1-9][0-9]*)$/.test(valor)
    ) {
      notFound();
    }

    const indice = Number(valor);

    if (
      !Number.isSafeInteger(indice) ||
      !Array.isArray(tela.colores) ||
      indice >= tela.colores.length
    ) {
      notFound();
    }

    const color = tela.colores[indice];

    if (
      !color ||
      typeof color !== "object" ||
      Array.isArray(color) ||
      typeof color.codigo !== "string"
    ) {
      notFound();
    }

    return (
      <EditorFotoColor
        key={indice}
        telaId={tela.id}
        nombreTela={tela.nombre}
        indice={indice}
        codigo={color.codigo}
        imagenInicial={
          typeof color.imagenUrl === "string"
            ? color.imagenUrl
            : ""
        }
      />
    );
  }

  return (
    <>
      <Link
        href="/admin/telas"
        className="mb-3 inline-block text-sm text-bordo"
      >
        ← Telas
      </Link>

      <EditorTelaBasico
        inicial={{
          id: tela.id,
          nombre: tela.nombre,
          imagenPrincipal: tela.imagenPrincipal,
        }}
      />
    </>
  );
}
