import { getProductos } from "@/lib/datos";
import PanelFotos from "@/components/admin/PanelFotos";

export const dynamic = "force-dynamic";

export default async function FotosPage() {
  const productos = await getProductos();

  return <PanelFotos productos={productos} />;
}
