"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type AvisoData = { texto: string; tipo: "ok" | "error" };

export function useAviso() {
  const [aviso, setAviso] = useState<AvisoData | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const mostrar = useCallback((texto: string, tipo: "ok" | "error" = "ok") => {
    setAviso({ texto, tipo });
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setAviso(null), 2600);
  }, []);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  return { aviso, mostrar };
}

export function Aviso({ aviso }: { aviso: AvisoData | null }) {
  return (
    <div
      aria-live="polite"
      className={`pointer-events-none fixed inset-x-0 top-16 z-50 flex justify-center px-4 transition-all duration-300 ${
        aviso ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
      }`}
    >
      {aviso && (
        <div
          className={`rounded-full px-5 py-2.5 text-sm font-medium shadow-xl ${
            aviso.tipo === "ok"
              ? "bg-bordo-oscuro text-hueso"
              : "bg-red-700 text-white"
          }`}
        >
          {aviso.tipo === "ok" ? "✓ " : "⚠ "}
          {aviso.texto}
        </div>
      )}
    </div>
  );
}
