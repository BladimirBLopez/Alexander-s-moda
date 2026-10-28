"use client";

import { useRef, useState } from "react";

type Props = {
  titulo: string;
  url?: string | null;
  deshabilitado?: boolean;
  onCambiar: (url: string) => void;
  onSubidaCambiar: (activa: boolean) => void;
};

export default function ImagenTelaCampo({
  titulo,
  url,
  deshabilitado = false,
  onCambiar,
  onSubidaCambiar,
}: Props) {
  const archivoRef = useRef<HTMLInputElement>(null);
  const activoRef = useRef(false);

  const [subiendo, setSubiendo] = useState(false);
  const [error, setError] = useState("");

  const bloqueado = deshabilitado || subiendo;

  async function subir(archivo: File) {
    if (bloqueado || activoRef.current) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(archivo.type)) {
      setError("Solo se permiten JPG, PNG o WebP");
      return;
    }

    if (archivo.size > 10 * 1024 * 1024) {
      setError("La imagen no puede superar 10 MB");
      return;
    }

    activoRef.current = true;
    setSubiendo(true);
    setError("");
    onSubidaCambiar(true);

    try {
      const respuesta = await fetch("/api/admin/firma", {
        cache: "no-store",
      });

      const firma = await respuesta.json().catch(() => ({}));

      if (
        !respuesta.ok ||
        typeof firma.apiKey !== "string" ||
        typeof firma.signature !== "string" ||
        typeof firma.cloudName !== "string"
      ) {
        throw new Error(
          firma.error || "No se pudo autorizar la subida"
        );
      }

      const datos = new FormData();
      datos.append("file", archivo);
      datos.append("api_key", firma.apiKey);
      datos.append("timestamp", String(firma.timestamp));
      datos.append("signature", firma.signature);

      const subida = await fetch(
        `https://api.cloudinary.com/v1_1/${firma.cloudName}/image/upload`,
        {
          method: "POST",
          body: datos,
        }
      );

      const resultado = await subida.json().catch(() => ({}));

      if (
        !subida.ok ||
        typeof resultado.secure_url !== "string"
      ) {
        throw new Error(
          resultado.error?.message || "No se pudo subir la imagen"
        );
      }

      const imagen = resultado.secure_url;

      if (
        !imagen.startsWith(
          `https://res.cloudinary.com/${firma.cloudName}/image/upload/`
        )
      ) {
        throw new Error("La imagen no pertenece al Cloudinary configurado");
      }

      onCambiar(imagen);
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Error al subir la fotografía"
      );
    } finally {
      activoRef.current = false;
      setSubiendo(false);
      onSubidaCambiar(false);
    }
  }

  return (
    <div className="rounded-2xl border border-bordo/10 bg-papel/40 p-4">
      <p className="mb-3 text-sm font-semibold text-bordo">
        {titulo}
      </p>

      <div className="mx-auto max-w-xs overflow-hidden rounded-xl border border-bordo/10 bg-white">
        {url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={url}
            alt={titulo}
            className="aspect-[4/3] w-full object-cover"
          />
        ) : (
          <div className="flex aspect-[4/3] flex-col items-center justify-center gap-3 bg-papel text-bordo/50">
            <svg
              width="35"
              height="35"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="m3 17 5-5 4 4 3-3 6 6" />
            </svg>
            <span className="text-xs">
              Sin fotografía
            </span>
          </div>
        )}
      </div>

      <div className="mt-3 flex flex-wrap justify-center gap-2">
        <button
          type="button"
          disabled={bloqueado}
          onClick={() => archivoRef.current?.click()}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#E5BF83] px-4 text-xs font-bold text-[#50121B] shadow-sm transition hover:bg-[#D9AC67] disabled:opacity-50"
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M14 4h-4L8 7H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2-3Z" />
            <circle cx="12" cy="13" r="3" />
          </svg>
          {subiendo
            ? "Subiendo fotografía..."
            : url
              ? "Cambiar fotografía"
              : "Agregar fotografía"}
        </button>

      </div>

      <input
        ref={archivoRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        disabled={bloqueado}
        onChange={(e) => {
          const archivo = e.target.files?.[0];
          e.target.value = "";

          if (archivo) {
            void subir(archivo);
          }
        }}
      />

      {error && (
        <p role="alert" className="mt-3 text-center text-xs text-red-700">
          {error}
        </p>
      )}

      <p className="mt-3 text-center text-[11px] leading-5 text-carbon/55">
        JPG, PNG o WebP · Máximo 10 MB
        {url && !subiendo ? " · Guardá la tela para confirmar el cambio" : ""}
      </p>
    </div>
  );
}
