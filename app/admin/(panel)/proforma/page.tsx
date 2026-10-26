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
      <PanelProforma proforma={proforma} />
    </>
  );
}
