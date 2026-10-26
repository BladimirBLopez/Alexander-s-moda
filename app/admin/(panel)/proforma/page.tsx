import PanelProforma from "@/components/admin/PanelProforma";
import { Titulo } from "@/components/admin/ui";

export default function ProformaAdminPage() {
  return (
    <>
      <Titulo
        titulo="Proforma"
        sub="El PDF que descargan tus clientes desde el sitio"
      />
      <PanelProforma />
    </>
  );
}
