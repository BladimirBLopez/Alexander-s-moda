"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import ImagenTelaCampo from "@/components/admin/ImagenTelaCampo";

type Props = {
  telaId: string;
  nombreTela: string;
  indice: number;
  codigo: string;
  imagenInicial: string;
};

export default function EditorFotoColor({
  telaId,
  nombreTela,
  indice,
  codigo,
  imagenInicial,
}: Props) {
  const router = useRouter();

  const [imagen, setImagen] = useState(imagenInicial);
  const [guardada, setGuardada] = useState(imagenInicial);
  const [subiendo, setSubiendo] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  const ocupado = useRef(false);

  const cambioPendiente = imagen !== guardada;

  async function guardar() {
    if (
      ocupado.current ||
      subiendo ||
      !imagen ||
      !cambioPendiente
    ) {
      return;
    }

    ocupado.current = true;
    setGuardando(true);
    setError("");
    setMensaje("");

    try {
      const respuesta = await fetch(
        "/api/admin/telas/" +
          encodeURIComponent(telaId) +
          "/colores/foto",
        {
          method: "PATCH",
          credentials: "same-origin",
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            indice,
            codigo,
            imagenUrl: imagen,
            imagenAnterior: guardada,
          }),
        }
      );

      const resultado: {
        ok?: boolean;
        error?: string;
        imagenUrl?: string;
      } = await respuesta
        .json()
        .catch(() => ({}));

      if (
        !respuesta.ok ||
        resultado.ok !== true ||
        typeof resultado.imagenUrl !== "string"
      ) {
        throw new Error(
          resultado.error ||
            "No se pudo guardar la fotografía"
        );
      }

      setImagen(resultado.imagenUrl);
      setGuardada(resultado.imagenUrl);
      setMensaje(
        "Fotografía guardada correctamente en el catálogo"
      );

      router.refresh();
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Error al guardar la fotografía"
      );
    } finally {
      ocupado.current = false;
      setGuardando(false);
    }
  }

  return (
    <section className="mx-auto max-w-xl space-y-5 pb-16">
      <Link
        href="/admin/telas"
        className="inline-block text-sm font-medium text-bordo"
      >
        ← Volver a telas
      </Link>

      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-bordo/60">
          {nombreTela}
        </p>

        <h1
          className="mt-2 text-2xl font-semibold text-bordo"
          style={{
            fontFamily: "var(--font-display)",
          }}
        >
          Fotografía del color {codigo}
        </h1>

        <p className="mt-2 text-sm leading-6 text-carbon/65">
          Cambia solamente la fotografía de este color.
          Los demás colores y datos de la tela se conservarán.
        </p>
      </div>

      <ImagenTelaCampo
        titulo={"Color " + codigo}
        url={imagen}
        deshabilitado={guardando}
        onCambiar={(url) => {
          setImagen(url);
          setError("");
          setMensaje("");
        }}
        onSubidaCambiar={setSubiendo}
      />

      {cambioPendiente && !subiendo && (
        <p className="text-center text-xs font-medium text-amber-800">
          Fotografía nueva cargada. Falta guardar el cambio.
        </p>
      )}

      {error && (
        <p
          role="alert"
          className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
        >
          {error}
        </p>
      )}

      {mensaje && (
        <p
          role="status"
          className="rounded-lg bg-white p-3 text-sm font-medium text-bordo"
        >
          {mensaje}
        </p>
      )}

      <button
        type="button"
        disabled={
          !cambioPendiente ||
          subiendo ||
          guardando ||
          !imagen
        }
        onClick={() => void guardar()}
        className="min-h-12 w-full rounded-xl bg-bordo px-5 py-3 text-sm font-semibold text-hueso shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {subiendo
          ? "Subiendo fotografía..."
          : guardando
            ? "Guardando..."
            : "Guardar fotografía"}
      </button>

      <p className="text-center text-xs leading-5 text-carbon/55">
        Solo se actualizará la fotografía del color {codigo}.
      </p>
    </section>
  );
}
