import Image from "next/image";
import type { ProformaActual } from "@/lib/proforma";
import { SeccionTitulo, Tarjeta } from "@/components/admin/ui";

export default function PanelProforma({
  proforma,
}: {
  proforma: ProformaActual;
}) {
  return (
    <Tarjeta>
      <SeccionTitulo>Proforma actual</SeccionTitulo>

      <div className="mx-auto w-full max-w-[260px] overflow-hidden rounded-md border border-bordo/10 shadow-md">
        <Image
          src={proforma.previewUrl}
          alt="Proforma actual"
          width={1700}
          height={2200}
          className="h-auto w-full"
        />
      </div>

      <div className="mt-4 flex justify-center gap-2">
        <a
          href={proforma.pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="boton-tactil rounded-full border border-bordo/25 bg-white px-4 py-2 text-sm font-medium text-bordo"
        >
          Ver PDF
        </a>

        <a
          href="/proforma"
          target="_blank"
          rel="noopener noreferrer"
          className="boton-tactil rounded-full border border-bordo/25 bg-white px-4 py-2 text-sm font-medium text-bordo"
        >
          Ver como cliente
        </a>
      </div>
    </Tarjeta>
  );
}
