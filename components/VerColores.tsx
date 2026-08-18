"use client";
import { useState, useEffect } from "react";
import { telas, type Tela } from "@/data/telas";

const CARACTERISTICAS_COMUNES = [
  {
    label: "Durabilidad",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path d="M6 3h12M6 21h12M8 3c0 5 8 5 8 9s-8 4-8 9M16 3c0 5-8 5-8 9s8 4 8 9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Suave al Tacto",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path d="M7 12a5 5 0 0 1 10 0c1.5 0 3 1 3 3s-1.5 3-3 3H7c-1.5 0-3-1-3-3s1.5-3 3-3Z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 20l1-2M12 20l0-2M15 20l-1-2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Respirabilidad",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path d="M8 3v4M12 3v6M16 3v4M4 11h16M4 11c0 5 2 9 8 10 6-1 8-5 8-10" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function VerColores() {
  const [abierto, setAbierto] = useState(false);
  const [telaActiva, setTelaActiva] = useState<Tela | null>(null);

  function cerrar() {
    setAbierto(false);
    setTelaActiva(null);
  }

  useEffect(() => {
    if (abierto) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [abierto]);

  return (
    <div>
      <button
        type="button"
        onClick={() => setAbierto(true)}
        className="text-[10px] uppercase tracking-[0.08em] text-[var(--color-hueso)] bg-[var(--color-bordo)] rounded-full px-4 py-2 mt-1.5 font-semibold shadow-sm hover:opacity-90 transition"
      >
        Ver opciones
      </button>
      <div className="flex items-center gap-3 mt-2">
        {CARACTERISTICAS_COMUNES.map((c) => (
          <div key={c.label} className="flex flex-col items-center gap-0.5">
            <span className="w-4 h-4 text-[var(--color-bordo)]/70">{c.icon}</span>
            <span className="text-[6px] text-[var(--color-bordo)]/60 text-center leading-tight">
              {c.label}
            </span>
          </div>
        ))}
      </div>

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
              className="text-center text-base uppercase tracking-wide mb-1 pb-2 border-b border-[var(--color-hueso)]/40"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                color: "color-mix(in oklab, var(--color-bordo) 70%, white 30%)",
              }}
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
                      className="w-full aspect-square rounded-md border border-[var(--color-hueso)]/40 flex items-center justify-center"
                      style={{ backgroundColor: tela.colores[0]?.hex ?? "#e5e0d8" }}
                    >
                      {tela.colores.length === 0 && (
                        <span className="text-[6px] text-[var(--color-bordo)]/50 text-center leading-tight px-1">
                          Próx.
                        </span>
                      )}
                    </span>
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
                {telaActiva.colores.length === 0 ? (
                  <p className="text-[9px] text-[var(--color-bordo)]/60 text-center py-6">
                    Colores próximamente disponibles.
                  </p>
                ) : (
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
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
