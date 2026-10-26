"use client";

import { useState } from "react";

export default function BotonSalir({
  enMenu = false,
}: {
  enMenu?: boolean;
}) {
  const [saliendo, setSaliendo] = useState(false);
  const [error, setError] = useState("");

  async function salir() {
    if (saliendo) return;

    setSaliendo(true);
    setError("");

    try {
      const respuesta = await fetch(
        "/api/admin/logout",
        {
          method: "POST",
          credentials: "same-origin",
          cache: "no-store",
        }
      );

      if (!respuesta.ok) {
        throw new Error("No se pudo cerrar la sesion");
      }

      // Recarga completa para no conservar
      // contenido administrativo en el navegador.
      window.location.replace("/admin/login");

    } catch {
      setError(
        "No se pudo cerrar la sesión. Inténtalo otra vez."
      );
      setSaliendo(false);
    }
  }

  return (
    <div className={enMenu ? "w-full" : ""}>
      <button
        type="button"
        onClick={salir}
        disabled={saliendo}
        className={
          enMenu
            ? "w-full rounded-xl px-3 py-2.5 text-left text-sm text-hueso/60 hover:bg-white/5 disabled:opacity-60"
            : "rounded-full border border-hueso/40 px-3.5 py-1.5 text-xs text-hueso disabled:opacity-60"
        }
      >
        {saliendo
          ? "Saliendo..."
          : enMenu
            ? "Cerrar sesión"
            : "Salir"}
      </button>

      {error ? (
        <p
          role="alert"
          className="mt-1 text-xs text-red-300"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
