"use client";
import { useState } from "react";
import { telas, type Tela } from "@/data/telas";

const CARACTERISTICAS_COMUNES = "Durabilidad · Suave al Tacto · Respirabilidad";

export default function VerColores() {
  const [abierto, setAbierto] = useState(false);
  const [telaActiva, setTelaActiva] = useState<Tela | null>(null);

  function cerrar() {
    setAbierto(false);
    setTelaActiva(null);
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setAbierto(true)}
        className="text-[10px] uppercase tracking-[0.08em] text-[var(--color-hueso)] bg-[var(--color-bordo)] rounded-full px-4 py-2 mt-1.5 font-semibold shadow-sm hover:opacity-90 transition"
      >
        Ver colores
      </button>
      <p className="text-[7px] text-[var(--color-bordo)]/60 mt-1.5 tracking-[0.02em]">
        {CARACTERISTICAS_COMUNES}
      </p>

      {abierto && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-6"
          onClick={cerrar}
        >
          <div
            className="bg-[var(--color-papel)] rounded-xl w-full max-w-[360px] max-h-[80vh] overflow-y-auto p-4 border border-[var(--color-hueso)]/50"
            onClick={(e) => e.stopPropagation()}
          >
            <p
              className="text-center text-[10px] uppercase tracking-[0.15em] text-[var(--color-bordo)]/70 font-bold mb-1 pb-2 border-b border-[var(--color-hueso)]/40"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Alexander&apos;s Moda
            </p>

            <div className="flex items-center justify-between mb-3 mt-2">
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
              <div className="grid grid-cols-3 gap-2">
                {telas.map((tela) => (
                  <button
                    key={tela.id}
                    type="button"
                    onClick={() => setTelaActiva(tela)}
                    className="flex flex-col items-center gap-1.5 border border-[var(--color-hueso)]/40 rounded-lg p-1.5 text-center hover:bg-[var(--color-bordo)]/5 transition"
                  >
                    <span
                      className="w-full aspect-square rounded-md border border-[var(--color-hueso)]/40"
                      style={{ backgroundColor: tela.colores[0]?.hex }}
                    />
                    <span
                      className="block text-[8px] uppercase tracking-[0.03em] text-[var(--color-bordo)] font-semibold leading-tight"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {tela.nombre}
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
    </div>
  );
}
