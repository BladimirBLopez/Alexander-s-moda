import Link from "next/link";
import { notFound } from "next/navigation";

import EditorTelaBasico from "@/components/admin/EditorTelaBasico";

export const dynamic = "force-dynamic";

export default async function EditarTelaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { prisma } = await import("@/lib/prisma");
  const tela = await prisma.tela.findUnique({
    where: { id },
    select: {
      id: true,
      nombre: true,
      imagenPrincipal: true,
    },
  });
  if (!tela) notFound();

  return (
    <>
      <Link href="/admin/telas" className="mb-3 inline-block text-sm text-bordo">
        ← Telas
      </Link>
      <EditorTelaBasico inicial={tela} />
    </>
  );
}
