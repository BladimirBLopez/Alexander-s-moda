import Link from "next/link";
import EditorUniforme from "@/components/admin/EditorUniforme";
import { productoVacio } from "@/components/admin/vacios";

export default function NuevoUniformePage() {
  return (
    <>
      <Link href="/admin/uniformes" className="mb-3 inline-block text-sm text-bordo">
        ← Uniformes
      </Link>
      <EditorUniforme inicial={productoVacio} nuevo />
    </>
  );
}
