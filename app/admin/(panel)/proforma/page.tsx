import Link from "next/link";
import PanelProforma from "@/components/admin/PanelProforma";
import { Titulo } from "@/components/admin/ui";
import { getProformaActual } from "@/lib/proforma";

export const dynamic = "force-dynamic";

export default async function ProformaAdminPage() {
  const proforma = await getProformaActual();

  return (
    <>
      <Titulo
        titulo="Proforma"
        sub="El PDF que descargan tus clientes desde el sitio"
      />
      <Link href="/admin/proforma/crear" className="mb-4 block">
        <div className="boton-tactil flex items-center justify-between rounded-2xl bg-bordo p-4 text-hueso shadow-md">
          <div>
            <p className="text-sm font-semibold">Crear proforma nueva</p>
            <p className="text-xs text-hueso/70">
              Editá los datos, mirá la vista previa y generá PDF y PNG
            </p>
          </div>
          <span className="text-xl">›</span>
        </div>
      </Link>
      <PanelProforma proforma={proforma} />
    </>
  );
}
