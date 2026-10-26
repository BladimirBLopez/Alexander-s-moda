"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { ProformaActual } from "@/lib/proforma";
import {
  BotonPrimario,
  SeccionTitulo,
  Tarjeta,
} from "@/components/admin/ui";

const MAX_MB = 10;

type Firma = {
  ok?: boolean;
  error?: string;
  cloudName?: string;
  apiKey?: string;
  timestamp?: number;
  signature?: string;
  publicId?: string;
  maxBytes?: number;
};

type Publicacion = {
  ok?: boolean;
  error?: string;
  pdfUrl?: string;
  previewUrl?: string;
};

export default function PanelProforma({
  proforma,
}: {
  proforma: ProformaActual;
}) {
  const router = useRouter();

  const [actual, setActual] =
    useState<ProformaActual>(proforma);

  const [archivo, setArchivo] =
    useState<File | null>(null);

  const [ocupado, setOcupado] = useState(false);
  const [fase, setFase] = useState("");
  const [error, setError] = useState("");
  const [publicado, setPublicado] = useState(false);

  const bloqueo = useRef(false);

  async function publicar() {
    if (bloqueo.current || !archivo) return;

    bloqueo.current = true;
    setOcupado(true);
    setError("");
    setPublicado(false);

    try {
      if (
        !archivo.name.toLowerCase().endsWith(".pdf") ||
        archivo.size < 1 ||
        archivo.size > MAX_MB * 1024 * 1024
      ) {
        throw new Error(
          "Selecciona un PDF valido de hasta 10 MB"
        );
      }

      const cabecera = new Uint8Array(
        await archivo.slice(0, 5).arrayBuffer()
      );

      if (
        String.fromCharCode(...cabecera) !== "%PDF-"
      ) {
        throw new Error(
          "El archivo seleccionado no parece un PDF valido"
        );
      }

      setFase("Preparando subida segura...");

      const respuestaFirma = await fetch(
        "/api/admin/proforma",
        { cache: "no-store" }
      );

      const firma: Firma = await respuestaFirma
        .json()
        .catch(() => ({}));

      if (!respuestaFirma.ok || firma.ok !== true) {
        throw new Error(
          firma.error || "No se pudo autorizar la subida"
        );
      }

      if (
        firma.cloudName !== "dkq95jus0" ||
        !firma.apiKey ||
        !firma.signature ||
        !firma.timestamp ||
        !firma.publicId
      ) {
        throw new Error(
          "La firma recibida esta incompleta"
        );
      }

      if (
        firma.maxBytes &&
        archivo.size > firma.maxBytes
      ) {
        throw new Error(
          "El PDF supera el limite permitido"
        );
      }

      setFase("Subiendo PDF a Cloudinary...");

      const datos = new FormData();

      datos.append("file", archivo);
      datos.append("api_key", firma.apiKey);
      datos.append(
        "timestamp",
        String(firma.timestamp)
      );
      datos.append("signature", firma.signature);
      datos.append("public_id", firma.publicId);

      const respuestaCloudinary = await fetch(
        "https://api.cloudinary.com/v1_1/" +
          firma.cloudName +
          "/image/upload",
        {
          method: "POST",
          body: datos,
        }
      );

      const subida: {
        secure_url?: string;
        error?: { message?: string };
      } = await respuestaCloudinary
        .json()
        .catch(() => ({}));

      if (
        !respuestaCloudinary.ok ||
        !subida.secure_url
      ) {
        throw new Error(
          subida.error?.message ||
          "Cloudinary no pudo recibir el PDF"
        );
      }

      setFase(
        "Verificando archivo y publicando..."
      );

      const respuestaPublicacion = await fetch(
        "/api/admin/proforma",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            publicId: firma.publicId,
          }),
        }
      );

      const resultado: Publicacion =
        await respuestaPublicacion
          .json()
          .catch(() => ({}));

      if (
        !respuestaPublicacion.ok ||
        resultado.ok !== true ||
        !resultado.pdfUrl ||
        !resultado.previewUrl
      ) {
        throw new Error(
          resultado.error ||
          "No se pudo confirmar la publicacion"
        );
      }

      setActual({
        pdfUrl: resultado.pdfUrl,
        previewUrl: resultado.previewUrl,
      });

      setArchivo(null);
      setPublicado(true);
      router.refresh();

    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Error desconocido al publicar"
      );
    } finally {
      bloqueo.current = false;
      setOcupado(false);
      setFase("");
    }
  }

  return (
    <div className="space-y-4">
      <Tarjeta>
        <SeccionTitulo>
          Proforma actual
        </SeccionTitulo>

        <div className="mx-auto w-full max-w-[260px] overflow-hidden rounded-md border border-bordo/10 shadow-md">
          <Image
            src={actual.previewUrl}
            alt="Proforma actual"
            width={1700}
            height={2200}
            className="h-auto w-full"
          />
        </div>

        <div className="mt-4 flex justify-center gap-2">
          <a
            href={actual.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="boton-tactil rounded-full border border-bordo/25 bg-white px-4 py-2 text-sm font-medium text-bordo"
          >
            Ver PDF
          </a>

          <a
            href="/proforma"
            target="_blank"
            rel="noopener noreferrer"
            className="boton-tactil rounded-full border border-bordo/25 bg-white px-4 py-2 text-sm font-medium text-bordo"
          >
            Ver como cliente
          </a>
        </div>
      </Tarjeta>

      <Tarjeta>
        <SeccionTitulo>
          Reemplazar proforma
        </SeccionTitulo>

        <label className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-bronce/50 bg-papel/60 px-4 py-8 text-center">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="text-bronce"
          >
            <path
              d="M12 16V4m0 0l-4 4m4-4l4 4M4 20h16"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <span className="text-sm font-medium text-bordo">
            {archivo
              ? archivo.name
              : "Elegí el nuevo PDF"}
          </span>

          <span className="text-xs text-carbon/50">
            {archivo
              ? (archivo.size / 1024 / 1024).toFixed(2) +
                " MB"
              : "Solo archivos PDF · máximo 10 MB"}
          </span>

          <input
            type="file"
            accept=".pdf,application/pdf"
            disabled={ocupado}
            className="hidden"
            onChange={(e) => {
              setArchivo(e.target.files?.[0] ?? null);
              setPublicado(false);
              setError("");
              e.target.value = "";
            }}
          />
        </label>

        <p className="mt-3 text-xs text-carbon/55">
          Al publicar, se comprobará que el PDF y
          la vista previa de su primera página
          estén disponibles.
        </p>

        {fase ? (
          <p
            role="status"
            className="mt-3 text-sm text-bordo"
          >
            {fase}
          </p>
        ) : null}

        {error ? (
          <p
            role="alert"
            className="mt-3 text-sm text-red-700"
          >
            {error}
            {" "}
            La proforma anterior se conserva.
          </p>
        ) : null}

        {publicado ? (
          <p
            role="status"
            className="mt-3 text-sm text-green-700"
          >
            Proforma publicada correctamente.
          </p>
        ) : null}

        <div className="mt-4 flex justify-end">
          <BotonPrimario
            disabled={!archivo || ocupado}
            onClick={publicar}
          >
            {ocupado
              ? "Procesando..."
              : "Publicar proforma"}
          </BotonPrimario>
        </div>
      </Tarjeta>
    </div>
  );
}
