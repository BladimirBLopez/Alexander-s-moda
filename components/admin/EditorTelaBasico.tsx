"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Tela = {
  id: string;
  nombre: string;
  imagenPrincipal: string | null;
};

export default function EditorTelaBasico({
  inicial,
}: {
  inicial: Tela;
}) {
  const router = useRouter();
  const [nombre, setNombre] = useState(inicial.nombre);
  const [imagen, setImagen] = useState(inicial.imagenPrincipal ?? "");
  const [base, setBase] = useState({
    nombre: inicial.nombre,
    imagen: inicial.imagenPrincipal ?? "",
  });
  const [ocupado, setOcupado] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const cambios =
    nombre.trim() !== base.nombre ||
    imagen !== base.imagen;

  async function subir(file: File) {
    if (ocupado) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Usa JPG, PNG o WebP");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("La imagen supera 10 MB");
      return;
    }

    setOcupado(true);
    setError("");
    setMensaje("");

    try {
      const r = await fetch("/api/admin/firma", { cache: "no-store" });
      const f = await r.json().catch(() => ({}));
      if (!r.ok || !f.apiKey || !f.signature || !f.cloudName) {
        throw new Error(f.error || "No se pudo obtener la firma");
      }

      const fd = new FormData();
      fd.append("file", file);
      fd.append("api_key", f.apiKey);
      fd.append("timestamp", String(f.timestamp));
      fd.append("signature", f.signature);

      const up = await fetch(
        `https://api.cloudinary.com/v1_1/${f.cloudName}/image/upload`,
        { method: "POST", body: fd }
      );
      const resultado = await up.json().catch(() => ({}));

      if (!up.ok || typeof resultado.secure_url !== "string") {
        throw new Error(resultado.error?.message || "Error al subir imagen");
      }

      setImagen(resultado.secure_url);
      setMensaje("Imagen subida. Falta guardar en Neon.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error de conexión");
    } finally {
      setOcupado(false);
    }
  }

  async function guardar() {
    if (ocupado || !cambios) return;
    if (!nombre.trim()) {
      setError("El nombre es obligatorio");
      return;
    }

    setOcupado(true);
    setError("");
    setMensaje("");

    try {
      const datos: {
        nombre?: string;
        imagenPrincipal?: string;
      } = {};

      if (nombre.trim() !== base.nombre) {
        datos.nombre = nombre.trim();
      }
      if (imagen !== base.imagen) {
        datos.imagenPrincipal = imagen;
      }

      const r = await fetch(
        `/api/admin/telas/${encodeURIComponent(inicial.id)}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(datos),
        }
      );
      const resultado = await r.json().catch(() => ({}));

      if (!r.ok) {
        throw new Error(resultado.error || "No se pudo guardar");
      }

      const actualizado = {
        nombre: resultado.tela.nombre as string,
        imagen: (resultado.tela.imagenPrincipal ?? "") as string,
      };

      setNombre(actualizado.nombre);
      setImagen(actualizado.imagen);
      setBase(actualizado);
      setMensaje("Cambios guardados correctamente en Neon");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error de conexión");
    } finally {
      setOcupado(false);
    }
  }

  return (
    <section className="space-y-5 rounded-2xl bg-papel p-5 text-carbon">
      <h1 className="text-2xl font-bold text-bordo">
        Editar tela
      </h1>

      <label className="block text-sm font-medium">
        Nombre de la tela
        <input
          value={nombre}
          maxLength={120}
          disabled={ocupado}
          onChange={(e) => setNombre(e.target.value)}
          className="mt-2 w-full rounded-lg border p-3 text-carbon"
        />
      </label>

      {imagen && (
        <Image
          src={imagen}
          alt={nombre}
          width={500}
          height={500}
          className="mx-auto aspect-square max-w-xs rounded-xl object-cover"
        />
      )}

      <label className="block text-sm font-medium">
        Cambiar fotografía principal
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          disabled={ocupado}
          onChange={(e) => {
            const file = e.currentTarget.files?.[0];
            e.currentTarget.value = "";
            if (file) void subir(file);
          }}
          className="mt-2 block w-full text-sm"
        />
      </label>

      <p className="text-xs text-carbon/60">
        Se conservan todos los colores y sus fotografías.
      </p>

      {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
      {mensaje && <p role="status" className="text-sm text-bordo">{mensaje}</p>}

      <button
        type="button"
        disabled={ocupado || !cambios || !nombre.trim()}
        onClick={() => void guardar()}
        className="w-full rounded-xl bg-bordo px-5 py-3 font-semibold text-white disabled:opacity-50"
      >
        {ocupado ? "Procesando..." : "Guardar cambios"}
      </button>
    </section>
  );
}
