import { productos } from "@/lib/productos";
import PanelFotos from "@/components/admin/PanelFotos";

export default function FotosPage() {
  return <PanelFotos productos={productos} />;
}
