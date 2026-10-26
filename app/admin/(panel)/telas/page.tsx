import { telas } from "@/data/telas";
import ListaTelas from "@/components/admin/ListaTelas";

export default function TelasPage() {
  return <ListaTelas telas={telas} />;
}
