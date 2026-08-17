"use client";
import { useState } from "react";
import { telas, type Tela } from "@/data/telas";

export default function VerColores() {
  const [abierto, setAbierto] = useState(false);
  const [telaActiva, setTelaActiva] = useState<Tela | null>(null);

  function cerrar() {
    setAbierto(false);
    setTelaActiva(null);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setAbierto(true)}
        className="text-[8px] uppercase tracking-[0.05em] text-[var(--color-bordo)] border border-[var(--color-bordo)]/40 rounded-full px-2.5 py-0.5 mt-1.5 hover:bg-[var(--color-bordo)]/5 transition"
      >
        Ver colores
      </button>

      {abierto && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-6"
          onClick={cerrar}
        >
          <div
            className="bg-[var(--color-papel)] rounded-xl w-full max-w-[320px] max-h-[80vh] overflow-y-auto p-4 border border-[var(--color-hueso)]/50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3">
              <p
                className="text-[11px] uppercase tracking-[0.08em] text-[var(--color-bordo)] font-bold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {telaActiva ? telaActiva.nombre : "Elegí una tela"}
              </p>
              <button
                type="button"
                onClick={cerrar}
                aria-label="Cerrar"
                className="w-6 h-6 rounded-full bg-[var(--color-bordo)] text-[var(--color-hueso)] flex items-center justify-center text-xs shrink-0"
              >
                ✕
              </button>
            </div>

            {!telaActiva && (
              <div className="flex flex-col gap-2">
                {telas.map((tela) => (
                  <button
                    key={tela.id}
                    type="button"
                    onClick={() => setTelaActiva(tela)}
                    className="flex items-center gap-2.5 border border-[var(--color-hueso)]/40 rounded-lg p-2 text-left hover:bg-[var(--color-bordo)]/5 transition"
                  >
                    <span
                      className="w-8 h-8 rounded shrink-0 border border-[var(--color-hueso)]/40"
                      style={{ backgroundColor: tela.colores[0]?.hex }}
                    />
                    <span className="min-w-0">
                      <span
                        className="block text-[9px] uppercase tracking-[0.05em] text-[var(--color-bordo)] font-semibold truncate"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {tela.nombre}
                      </span>
                      <span className="block text-[7px] text-[var(--color-bordo)]/60 truncate">
                        {tela.caracteristicas.slice(0, 2).join(" · ")}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            )}

            {telaActiva && (
              <div>
                <button
                  type="button"
                  onClick={() => setTelaActiva(null)}
                  className="text-[8px] uppercase tracking-[0.05em] text-[var(--color-bordo)]/70 mb-2 inline-block"
                >
                  ← Volver a telas
                </button>
                <p className="text-[7px] text-[var(--color-bordo)]/60 mb-2">
                  {telaActiva.composicion} · {telaActiva.gramaje}
                </p>
                <div className="grid grid-cols-4 gap-1.5">
                  {telaActiva.colores.map((c) => (
                    <div key={c.codigo} className="flex flex-col items-center">
                      <div
                        className="w-full aspect-square rounded border border-[var(--color-hueso)]/40"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span className="text-[6px] text-[var(--color-bordo)]/70 text-center mt-0.5 leading-tight">
                        {c.codigo}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
