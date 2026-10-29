"use client";

import { useEffect, useRef, useState } from "react";
import { inputCls } from "@/components/admin/ui";

type Opcion = { valor: number; texto: string };

export default function Selector({
  label,
  valor,
  opciones,
  onChange,
}: {
  label: string;
  valor: number;
  opciones: Opcion[];
  onChange: (v: number) => void;
}) {
  const [abierto, setAbierto] = useState(false);
  const caja = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!abierto) return;
    const fuera = (e: PointerEvent) => {
      if (caja.current && !caja.current.contains(e.target as Node)) {
        setAbierto(false);
      }
    };
    const tecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAbierto(false);
    };
    document.addEventListener("pointerdown", fuera);
    document.addEventListener("keydown", tecla);
    return () => {
      document.removeEventListener("pointerdown", fuera);
      document.removeEventListener("keydown", tecla);
    };
  }, [abierto]);

  const actual = opciones.find((o) => o.valor === valor);

  return (
    <div ref={caja} className="relative">
      <span className="mb-1 block text-xs font-medium text-carbon/70">
        {label}
      </span>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={abierto}
        onClick={() => setAbierto((a) => !a)}
        className={
          inputCls + " flex items-center justify-between text-left capitalize"
        }
      >
        <span>{actual ? actual.texto : ""}</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          className={
            "text-bordo transition-transform " + (abierto ? "rotate-180" : "")
          }
        >
          <path
            d="M6 9l6 6 6-6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {abierto ? (
        <ul
          role="listbox"
          className="absolute left-0 right-0 top-full z-40 mt-1 max-h-56 overflow-y-auto rounded-lg border border-bordo/20 bg-white py-1 shadow-lg"
        >
          {opciones.map((o) => {
            const elegido = o.valor === valor;
            return (
              <li
                key={o.valor}
                role="option"
                aria-selected={elegido}
                onClick={() => {
                  onChange(o.valor);
                  setAbierto(false);
                }}
                className={
                  "cursor-pointer px-3 py-2.5 text-sm capitalize " +
                  (elegido
                    ? "bg-bordo font-semibold text-hueso"
                    : "text-carbon active:bg-papel")
                }
              >
                {o.texto}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
