import Link from "next/link";
import { notFound } from "next/navigation";
import { productos } from "@/lib/productos";
import EditorUniforme from "@/components/admin/EditorUniforme";

export default async function EditarUniformePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const producto = productos.find((p) => p.id === id);
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
