"use client";

import Image from "next/image";
import { useState } from "react";
import {
  BotonPrimario,
  SeccionTitulo,
  Tarjeta,
} from "@/components/admin/ui";

export default function PanelProforma() {
  const [archivo, setArchivo] = useState<File | null>(null);
  const [publicado, setPublicado] = useState(false);

  return (
    <div className="space-y-4">
      <Tarjeta>
        <SeccionTitulo>Proforma actual</SeccionTitulo>
        <div className="mx-auto w-full max-w-[260px] overflow-hidden rounded-md border border-bordo/10 shadow-md">
          <Image
            src="/proforma-preview.png"
            alt="Proforma actual"
            width={1700}
            height={2200}
            className="h-auto w-full"
          />
        </div>
        <div className="mt-4 flex justify-center gap-2">
          <a
            href="/proforma.pdf"
            target="_blank"
            className="boton-tactil rounded-full border border-bordo/25 bg-white px-4 py-2 text-sm font-medium text-bordo"
          >
            Ver PDF
          </a>
          <a
            href="/proforma"
            target="_blank"
            className="boton-tactil rounded-full border border-bordo/25 bg-white px-4 py-2 text-sm font-medium text-bordo"
          >
            Ver como cliente
          </a>
        </div>
      </Tarjeta>

      <Tarjeta>
        <SeccionTitulo>Reemplazar proforma</SeccionTitulo>
        <label className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-bronce/50 bg-papel/60 px-4 py-8 text-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-bronce">
            <path d="M12 16V4m0 0l-4 4m4-4l4 4M4 20h16" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-sm font-medium text-bordo">
            {archivo ? archivo.name : "Elegí el nuevo PDF"}
          </span>
          <span className="text-xs text-carbon/50">
            {archivo
              ? `${(archivo.size / 1024 / 1024).toFixed(2)} MB`
              : "Solo archivos .pdf"}
          </span>
          <input
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={(e) => {
              setArchivo(e.target.files?.[0] ?? null);
              setPublicado(false);
            }}
          />
        </label>

        <p className="mt-3 text-xs text-carbon/55">
          La vista previa de la página se genera sola a partir de la primera
          hoja del PDF.
        </p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-xs text-carbon/60">
            {publicado ? "✓ Publicada (demo)" : ""}
          </span>
          <BotonPrimario
            disabled={!archivo}
            onClick={() => setPublicado(true)}
          >
            Publicar proforma
          </BotonPrimario>
        </div>
      </Tarjeta>
    </div>
  );
}
