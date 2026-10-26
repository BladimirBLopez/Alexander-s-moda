import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductos } from "@/lib/datos";
import EditorUniforme from "@/components/admin/EditorUniforme";

export const dynamic = "force-dynamic";

export default async function EditarUniformePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const producto = (await getProductos()).find((p) => p.id === id);
  if (!producto) notFound();

  return (
    <>
      <Link href="/admin/uniformes" className="mb-3 inline-block text-sm text-bordo">
        ← Uniformes
      </Link>
      <EditorUniforme inicial={producto} />
    </>
  );
}
