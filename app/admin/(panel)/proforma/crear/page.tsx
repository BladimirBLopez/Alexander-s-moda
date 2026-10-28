import Link from "next/link";
import GeneradorProforma from "@/components/admin/GeneradorProforma";
import { Titulo } from "@/components/admin/ui";

export const metadata = { title: "Crear proforma | Alexander's Moda" };

export default function CrearProformaPage() {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Tinos:ital,wght@0,400;0,700;1,400;1,700&family=Arimo:ital,wght@0,400;0,700;1,400;1,700&display=swap"
        precedence="default"
      />
      <Link href="/admin/proforma" className="mb-3 inline-block text-sm text-bordo">
        ← Proforma
      </Link>
      <Titulo
        titulo="Crear proforma"
        sub="Editá los datos y mirá cómo queda la hoja"
      />
      <GeneradorProforma />
    </>
  );
}
