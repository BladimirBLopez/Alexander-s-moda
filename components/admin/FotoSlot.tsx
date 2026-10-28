"use client";

import { useRef, useState } from "react";
import { BotonIcono } from "@/components/admin/ui";

const MAX_MB = 10;

export default function FotoSlot({
  etiqueta,
  src,
  pendiente,
  puedeIzq,
  puedeDer,
  onElegir,
  onMover,
  bloqueada = false,
  onBloqueada,
  onSubidaCambiar,
}: {
  etiqueta: string;
  src?: string;
  pendiente: boolean;
  puedeIzq: boolean;
  puedeDer: boolean;
  onElegir: (url: string) => void;
  onQuitar: () => void;
  onMover: (d: -1 | 1) => void;
  bloqueada?: boolean;
  onBloqueada?: () => void;
  onSubidaCambiar?: (activa: boolean) => void;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [estado, setEstado] = useState<"" | "subiendo" | "error">("");
  const [msg, setMsg] = useState("");

  async function subir(f: File) {
    if (bloqueada || estado === "subiendo") return;
    if (f.size > MAX_MB * 1024 * 1024) {
      setEstado("error");
      setMsg("La foto pesa más de 10 MB");
      return;
    }
    onSubidaCambiar?.(true);
    setEstado("subiendo");
    setMsg("");
    try {
      const r = await fetch("/api/admin/firma", { cache: "no-store" });
      const fi = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(fi.error || "No se pudo firmar");
      const fd = new FormData();
      fd.append("file", f);
      fd.append("api_key", fi.apiKey);
      fd.append("timestamp", String(fi.timestamp));
      fd.append("signature", fi.signature);
      const up = await fetch(
        "https://api.cloudinary.com/v1_1/" + fi.cloudName + "/image/upload",
        { method: "POST", body: fd },
      );
      const d = await up.json().catch(() => ({}));
      if (!up.ok || !d.secure_url) {
        throw new Error((d && d.error && d.error.message) || "Falló la subida");
      }
      onElegir(d.secure_url);
      setEstado("");
    } catch (e) {
      setEstado("error");
      setMsg(e instanceof Error ? e.message : "Error de conexión");
    } finally {
      onSubidaCambiar?.(false);
    }
  }

  return (
    <div className="flex flex-col gap-1.5">
      <button
        type="button"
        disabled={estado === "subiendo"}
        onClick={() => (bloqueada ? onBloqueada?.() : input.current?.click())}
        className="boton-tactil relative aspect-[2/3] w-full overflow-hidden rounded-xl border border-bordo/15 bg-papel"
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={etiqueta} className="h-full w-full object-cover" />
        ) : (
          <span className="flex h-full items-center justify-center text-[10px] uppercase tracking-wider text-bordo/40">
            Sin foto
          </span>
        )}
        <span className="absolute inset-x-0 bottom-0 bg-bordo/80 py-1.5 text-center text-[11px] font-medium text-hueso">
          {estado === "subiendo"
            ? "Subiendo..."
            : estado === "error"
              ? "Error, reintentar"
              : pendiente
                ? "Cambio pendiente"
                : src
                  ? "Cambiar foto"
                  : "Subir foto"}
        </span>
      </button>
      <p className="text-center text-[11px] leading-tight text-carbon/70">
        {etiqueta}
      </p>
      {estado === "error" && msg ? (
        <p className="text-center text-[10px] leading-tight text-red-700">{msg}</p>
      ) : null}
      <div className="flex justify-center gap-1">
        <BotonIcono label="Mover antes" onClick={() => onMover(-1)} disabled={bloqueada || estado === "subiendo" || !puedeIzq}>
          ◀
        </BotonIcono>
        <BotonIcono label="Mover después" onClick={() => onMover(1)} disabled={bloqueada || estado === "subiendo" || !puedeDer}>
          ▶
        </BotonIcono>
      </div>
      <input
        ref={input}
        type="file"
        disabled={bloqueada || estado === "subiendo"}
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) subir(f);
          e.target.value = "";
        }}
      />
    </div>
  );
}
