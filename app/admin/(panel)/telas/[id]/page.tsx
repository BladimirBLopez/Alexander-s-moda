import Link from "next/link";
import { notFound } from "next/navigation";
import { telas } from "@/data/telas";
import EditorTela from "@/components/admin/EditorTela";

export default async function EditarTelaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tela = telas.find((t) => t.id === id);
  if (!tela) notFound();

  return (
    <>
      <Link href="/admin/telas" className="mb-3 inline-block text-sm text-bordo">
        ← Telas
      </Link>
      <EditorTela inicial={tela} />
    </>
  );
}
