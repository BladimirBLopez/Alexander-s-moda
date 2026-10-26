"use client";

import { useRef, useState } from "react";

export default function FotoSlot({
  etiqueta,
  src,
}: {
  etiqueta: string;
  src?: string;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [nueva, setNueva] = useState<string | null>(null);
  const mostrar = nueva ?? src;

  function elegir(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) setNueva(URL.createObjectURL(f)); // vista previa local
  }

  return (
    <div className="flex flex-col gap-1.5">
      <button
        type="button"
        onClick={() => input.current?.click()}
        className="boton-tactil group relative aspect-[2/3] w-full overflow-hidden rounded-xl border border-bordo/15 bg-papel"
      >
        {mostrar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={mostrar} alt={etiqueta} className="h-full w-full object-cover" />
        ) : (
          <span className="flex h-full items-center justify-center text-[10px] uppercase tracking-wider text-bordo/40">
            Sin foto
          </span>
        )}
        <span className="absolute inset-x-0 bottom-0 bg-bordo/80 py-1.5 text-center text-[11px] font-medium text-hueso">
          {nueva ? "Cambio pendiente" : "Cambiar foto"}
        </span>
      </button>
      <p className="text-center text-xs text-carbon/70">{etiqueta}</p>
      <input
        ref={input}
        type="file"
        accept="image/*"
        onChange={elegir}
        className="hidden"
      />
    </div>
  );
}
