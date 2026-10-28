"use client";

import { useEffect } from "react";

export default function Confirmar({
  abierto,
  titulo,
  texto,
  textoOk = "Eliminar",
  tono = "peligro",
  onOk,
  onCancelar,
}: {
  abierto: boolean;
  titulo: string;
  texto?: string;
  textoOk?: string;
  tono?: "peligro" | "normal";
  onOk: () => void;
  onCancelar: () => void;
}) {
  useEffect(() => {
    if (!abierto) return;
    const h = (e: KeyboardEvent) => e.key === "Escape" && onCancelar();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [abierto, onCancelar]);

  if (!abierto) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center"
      onClick={onCancelar}
      role="presentation"
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirmar-titulo"
        className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3
          id="confirmar-titulo"
          className="text-lg font-semibold text-bordo"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {titulo}
        </h3>
        {texto && <p className="mt-1.5 text-sm text-carbon/70">{texto}</p>}
        <div className="mt-5 flex gap-2">
          <button
            type="button"
            onClick={onCancelar}
            className="boton-tactil flex-1 rounded-full border border-bordo/25 py-2.5 text-sm font-medium text-bordo"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onOk}
            className={`boton-tactil flex-1 rounded-full py-2.5 text-sm font-semibold ${
              tono === "peligro" ? "bg-red-700 text-white" : "bg-bordo text-hueso"
            }`}
          >
            {textoOk}
          </button>
        </div>
      </div>
    </div>
  );
}
