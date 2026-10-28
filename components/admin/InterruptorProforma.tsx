"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { SeccionTitulo, Tarjeta } from "@/components/admin/ui";

export default function InterruptorProforma({
  inicial,
}: {
  inicial: boolean;
}) {
  const router = useRouter();
  const [activo, setActivo] = useState(inicial);
  const [ocupado, setOcupado] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const bloqueo = useRef(false);

  async function cambiar() {
    if (bloqueo.current) return;
    bloqueo.current = true;
    setOcupado(true);
    setMensaje("");
    setError("");
    const nuevo = !activo;

    try {
      const r = await fetch("/api/admin/proforma-boton", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activo: nuevo }),
      });
      const d: { ok?: boolean; error?: string } = await r
        .json()
        .catch(() => ({}));

      if (!r.ok || d.ok !== true) {
        throw new Error(d.error || "No se pudo guardar");
      }

      setActivo(nuevo);
      setMensaje(
        nuevo
          ? "Guardado. El botón Proforma aparece en el inicio."
          : "Guardado. El botón Proforma ya no aparece en el sitio."
      );
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error desconocido");
    } finally {
      bloqueo.current = false;
      setOcupado(false);
    }
  }

  return (
    <Tarjeta>
      <SeccionTitulo>Botón en el sitio</SeccionTitulo>

      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-bordo">
            Mostrar botón Proforma en el sitio
          </p>
          <p className="mt-0.5 text-xs text-carbon/55">
            {activo
              ? "Encendido: los clientes ven el botón y pueden abrir la proforma."
              : "Apagado: el botón no aparece y la proforma no está disponible."}
          </p>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={activo}
          aria-label="Mostrar botón Proforma en el sitio"
          disabled={ocupado}
          onClick={cambiar}
          className={
            "boton-tactil relative h-8 w-14 shrink-0 rounded-full transition-colors disabled:opacity-50 " +
            (activo ? "bg-bordo" : "bg-carbon/25")
          }
        >
          <span
            className={
              "absolute top-1 h-6 w-6 rounded-full bg-white shadow transition-all " +
              (activo ? "left-7" : "left-1")
            }
          />
        </button>
      </div>

      {mensaje ? (
        <p role="status" className="mt-3 text-sm text-green-700">
          {mensaje}
        </p>
      ) : null}
      {error ? (
        <p role="alert" className="mt-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}
    </Tarjeta>
  );
}
