import type { ColorTela, Tela } from "@/data/telas";
import ListaTelas from "@/components/admin/ListaTelas";

export const dynamic = "force-dynamic";

export default async function TelasPage() {
  const { prisma } = await import("@/lib/prisma");

  const filas = await prisma.tela.findMany({
    orderBy: [{ orden: "asc" }, { id: "asc" }],
  });

  const telas: Tela[] = filas.map((f) => ({
    id: f.id,
    nombre: f.nombre,
    estructura: f.estructura,
    composicion: f.composicion,
    gramaje: f.gramaje,
    ancho: f.ancho,
    caracteristicas: f.caracteristicas as unknown as string[],
    imagenPrincipal: f.imagenPrincipal ?? undefined,
    colores: f.colores as unknown as ColorTela[],
  }));

  return <ListaTelas telas={telas} />;
}
