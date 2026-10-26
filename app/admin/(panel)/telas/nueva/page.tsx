import Link from "next/link";
import EditorTela from "@/components/admin/EditorTela";
import { telaVacia } from "@/components/admin/vacios";

export default function NuevaTelaPage() {
  return (
    <>
      <Link href="/admin/telas" className="mb-3 inline-block text-sm text-bordo">
        ← Telas
      </Link>
      <EditorTela inicial={telaVacia} nueva />
    </>
  );
}
