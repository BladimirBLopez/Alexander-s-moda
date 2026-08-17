"use client";

import { useState } from "react";

const coloresCamisa = [
  { nombre: "19", hex: "#8ba888" },
  { nombre: "10", hex: "#f0e9d8" },
  { nombre: "06", hex: "#b8393f" },
  { nombre: "04", hex: "#6b4c7a" },
  { nombre: "16", hex: "#e3a9bb" },
  { nombre: "03", hex: "#7fae6a" },
  { nombre: "01", hex: "#8bb2d6" },
  { nombre: "15", hex: "#3f5b8a" },
  { nombre: "25", hex: "#6a7566" },
  { nombre: "13", hex: "#1c1e1c" },
  { nombre: "26", hex: "#8a7a5c" },
  { nombre: "27", hex: "#6e1f2e" },
];

export default function VerColores() {
  const [abierto, setAbierto] = useState(false);

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
          onClick={() => setAbierto(false)}
        >
          <div
            className="bg-[var(--color-papel)] rounded-xl w-full max-w-[320px] max-h-[80vh] overflow-y-auto p-4 border border-[var(--color-hueso)]/50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-[11px] uppercase tracking-[0.08em] text-[var(--color-bordo)] font-bold" style={{ fontFamily: "var(--font-display)" }}>
                Colores disponibles
              </p>
              <button
                type="button"
                onClick={() => setAbierto(false)}
                aria-label="Cerrar"
                className="w-6 h-6 rounded-full bg-[var(--color-bordo)] text-[var(--color-hueso)] flex items-center justify-center text-xs shrink-0"
              >
                ✕
              </button>
            </div>

            <p className="text-[9px] uppercase tracking-[0.05em] text-[var(--color-bordo)] font-semibold border-b border-[var(--color-hueso)]/40 pb-1 mb-2" style={{ fontFamily: "var(--font-display)" }}>
              Camisa
            </p>
            <div className="grid grid-cols-4 gap-1.5">
              {coloresCamisa.map((c) => (
                <div key={c.nombre} className="flex flex-col items-center">
                  <div className="w-full aspect-square rounded border border-[var(--color-hueso)]/40" style={{ backgroundColor: c.hex }} />
                  <span className="text-[6px] text-[var(--color-bordo)]/70 text-center mt-0.5 leading-tight">{c.nombre}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
