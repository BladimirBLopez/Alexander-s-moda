"use client";

import { useRef } from "react";
import { BotonIcono } from "@/components/admin/ui";

export default function FotoSlot({
  etiqueta,
  src,
  pendiente,
  puedeIzq,
  puedeDer,
  onElegir,
  onQuitar,
  onMover,
}: {
  etiqueta: string;
  src?: string;
  pendiente: boolean;
  puedeIzq: boolean;
  puedeDer: boolean;
  onElegir: (url: string) => void;
  onQuitar: () => void;
  onMover: (d: -1 | 1) => void;
}) {
  const input = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-1.5">
      <button
        type="button"
        onClick={() => input.current?.click()}
        className="boton-tactil relative aspect-[2/3] w-full overflow-hidden rounded-xl border border-bordo/15 bg-papel"
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={etiqueta} className="h-full w-full object-cover" />
        ) : (
          <span className="flex h-full items-center justify-center text-[10px] uppercase tracking-wider text-bordo/40">
            Sin foto
          </span>
        )}
        <span className="absolute inset-x-0 bottom-0 bg-bordo/80 py-1.5 text-center text-[11px] font-medium text-hueso">
          {pendiente ? "Cambio pendiente" : src ? "Cambiar foto" : "Subir foto"}
        </span>
      </button>
      <p className="text-center text-[11px] leading-tight text-carbon/70">
        {etiqueta}
      </p>
      <div className="flex justify-center gap-1">
        <BotonIcono label="Mover antes" onClick={() => onMover(-1)} disabled={!puedeIzq}>
          ◀
        </BotonIcono>
        <BotonIcono label="Quitar foto" onClick={onQuitar} disabled={!src}>
          ✕
        </BotonIcono>
        <BotonIcono label="Mover después" onClick={() => onMover(1)} disabled={!puedeDer}>
          ▶
        </BotonIcono>
      </div>
      <input
        ref={input}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onElegir(URL.createObjectURL(f));
          e.target.value = "";
        }}
      />
    </div>
  );
}
