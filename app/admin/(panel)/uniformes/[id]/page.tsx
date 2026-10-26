import Link from "next/link";
import { notFound } from "next/navigation";
import type { BulletItem } from "@/lib/productos";
import EditorContenidoUniforme from "@/components/admin/EditorContenidoUniforme";

export const dynamic = "force-dynamic";

const SLOTS = [
  "fotoMujerDentro",
  "fotoMujerFuera",
  "fotoHombreDentro",
  "fotoHombreFuera",
  "fotoSeccion2Arriba",
  "fotoSeccion2Izquierda",
  "fotoSeccion2Derecha",
] as const;

export default async function EditarUniformePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (
    id !== "uniforme-sport" &&
    id !== "uniforme-casimir"
  ) {
    notFound();
  }

  const { prisma } = await import("@/lib/prisma");

  const producto = await prisma.producto.findUnique({
    where: { id },
    select: {
      id: true,
      nombre: true,
      bulletsMujer: true,
      bulletsHombre: true,
      fotos: true,
    },
  });

  if (!producto) notFound();

  const almacenadas =
    producto.fotos &&
    typeof producto.fotos === "object" &&
    !Array.isArray(producto.fotos)
      ? producto.fotos as Record<string, unknown>
      : {};

  const fotos = SLOTS.map((campo) =>
    typeof almacenadas[campo] === "string"
      ? almacenadas[campo] as string
      : null
  );

  return (
    <>
      <Link
        href="/admin/uniformes"
        className="mb-3 inline-block text-sm text-bordo"
      >
        ← Uniformes
      </Link>

      <EditorContenidoUniforme
        inicial={{
          id: producto.id,
          nombre: producto.nombre,
          bulletsMujer:
            producto.bulletsMujer as unknown as BulletItem[],
          bulletsHombre:
            producto.bulletsHombre as unknown as BulletItem[],
          fotos,
        }}
      />
    </>
  );
}
