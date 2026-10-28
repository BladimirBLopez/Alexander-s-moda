"use client";

import Link from "next/link";
import { useState } from "react";
import type { Tela } from "@/data/telas";
import {
  Tarjeta,
  Titulo,
  botonLinkCls,
} from "@/components/admin/ui";

type Linea = "sport" | "casimir";


function ResumenTela({ tela }: { tela: Tela }) {
  const enlace =
    "/admin/telas/" + encodeURIComponent(tela.id);

  const principal =
    tela.imagenPrincipal ??
    tela.colores.find((c) => c.imagenUrl)?.imagenUrl;

  return (
    <Tarjeta className="!p-3">
      <Link
        href={enlace}
        className="flex items-start gap-3"
      >
        <div
          className="h-20 w-20 shrink-0 rounded-xl border border-bordo/10 bg-cover bg-center"
          style={{
            backgroundColor:
              tela.colores[0]?.hex ?? "#e8e0d4",
            backgroundImage: principal
              ? 'url("' + principal + '")'
              : undefined,
          }}
          aria-hidden="true"
        />

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p
              className="font-semibold leading-tight text-bordo"
              style={{
                fontFamily: "var(--font-display)",
              }}
            >
              {tela.nombre}
            </p>
            <span
              className="text-bordo/50"
              aria-hidden="true"
            >
              ›
            </span>
          </div>

          <p className="mt-1 text-xs text-carbon/65">
            {tela.colores.length} colores
          </p>

          {tela.composicion && (
            <p className="mt-1 line-clamp-2 text-[11px] text-carbon/55">
              {tela.composicion}
            </p>
          )}

          <p className="mt-2 text-[11px] font-semibold text-bordo">
            Editar datos de la tela
          </p>
        </div>
      </Link>

      {tela.colores.length > 0 && (
        <div className="mt-4 border-t border-bordo/10 pt-3">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs font-semibold text-bordo">
              Fotografías de colores
            </p>

            <span className="rounded-full bg-papel px-2.5 py-1 text-[11px] text-bordo/75">
              {tela.colores.filter(
                (c) => Boolean(c.imagenUrl)
              ).length}
              {" de "}
              {tela.colores.length}
              {" con foto"}
            </span>
          </div>

          <p className="mb-3 text-[11px] text-carbon/60">
            Tocá una fotografía para cambiarla.
          </p>

          <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
            {tela.colores.map((color, i) => (
              <Link
                key={color.codigo + "-" + i}
                href={enlace + "?color=" + i}
                aria-label={
                  "Cambiar foto del color " +
                  color.codigo +
                  " de " +
                  tela.nombre
                }
                className="group block min-w-0"
              >
                <span
                  className="relative block aspect-square w-full overflow-hidden rounded-lg border border-bordo/10 bg-cover bg-center shadow-sm transition group-hover:border-bordo/50"
                  style={{
                    backgroundColor: color.hex,
                    backgroundImage: color.imagenUrl
                      ? 'url("' + color.imagenUrl + '")'
                      : undefined,
                  }}
                >
                  <span className="absolute inset-x-0 bottom-0 flex min-h-6 items-center justify-center gap-1 bg-[#E5BF83]/95 px-1 text-[9px] font-bold text-[#50121B]">
                    <svg
                      width="12"
                      height="12"
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
                    {color.imagenUrl ? "Cambiar" : "Agregar"}
                  </span>
                </span>

                <span className="mt-1 block truncate text-center text-[10px] font-medium text-carbon/75">
                  {color.codigo}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </Tarjeta>
  );
}

function GrupoTelas({
  titulo,
  descripcion,
  telas,
}: {
  titulo: string;
  descripcion: string;
  telas: Tela[];
}) {
  return (
    <section className="space-y-3">
      <div>
        <div className="flex items-center justify-between gap-3">
          <h2
            className="text-lg font-semibold text-bordo"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {titulo}
          </h2>

          <span className="shrink-0 rounded-full bg-papel px-3 py-1 text-xs font-semibold text-bordo">
            {telas.length}
          </span>
        </div>

        <p className="mt-1 text-xs leading-5 text-carbon/60">
          {descripcion}
        </p>
      </div>

      {telas.length > 0 ? (
        <div className="grid gap-3 lg:grid-cols-2">
          {telas.map((tela) => (
            <ResumenTela
              key={tela.id}
              tela={tela}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-bordo/20 px-4 py-6 text-center text-sm text-carbon/60">
          No hay telas registradas en este grupo.
        </div>
      )}
    </section>
  );
}

export default function ListaTelas({
  telas,
}: {
  telas: Tela[];
}) {
  const [linea, setLinea] = useState<Linea>("sport");

  // Mismas relaciones que el catálogo público actual:
  // Camisas: todas las telas.
  // Faldas/pantalones: Drill Confort Dockers.
  // Ambos uniformes comparten estos registros de Neon.
  const telasCamisas = telas;

  const telasFaldasPantalones = telas.filter(
    (tela) => tela.id === "drill-confort-dockers"
  );

  const cantidadColores = telas.reduce(
    (total, tela) => total + tela.colores.length,
    0
  );

  const nombreLinea = linea === "sport" ? "Sport" : "Casimir";

  return (
    <div className="space-y-5">
      <Titulo
        titulo="Telas y colores"
        sub="Organizadas según el catálogo"
        accion={
          <Link
            href="/admin/telas/nueva"
            className={botonLinkCls}
          >
            + Nueva tela
          </Link>
        }
      />

      <div className="grid grid-cols-2 gap-2">
        {(["sport", "casimir"] as const).map((opcion) => {
          const activo = opcion === linea;

          return (
            <button
              key={opcion}
              type="button"
              aria-pressed={activo}
              onClick={() => setLinea(opcion)}
              className={
                "min-h-14 rounded-xl px-3 py-3 text-sm font-semibold transition " +
                (activo
                  ? "bg-bordo text-hueso shadow-md"
                  : "border border-bordo/15 bg-white text-bordo hover:bg-papel")
              }
            >
              {opcion === "sport" ? "SPORT" : "CASIMIR"}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-2 text-xs text-carbon/65">
        <span className="rounded-full bg-papel px-3 py-1.5">
          {telas.length} telas
        </span>

        <span className="rounded-full bg-papel px-3 py-1.5">
          {cantidadColores} colores
        </span>
      </div>

      <div className="space-y-1">
        <h2
          className="text-xl font-semibold text-bordo"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Uniforme {nombreLinea}
        </h2>

        <p className="text-xs leading-5 text-carbon/65">
          Selecciona una tela para modificar su información,
          fotografía y colores disponibles.
        </p>
      </div>

      <GrupoTelas
        titulo="Telas para camisas"
        descripcion="Todas las telas que muestra actualmente el selector de camisas."
        telas={telasCamisas}
      />

      <div className="border-t border-bordo/10 pt-5">
        <GrupoTelas
          titulo="Telas para faldas y pantalones"
          descripcion="Tela utilizada por el selector de colores de faldas y pantalones."
          telas={telasFaldasPantalones}
        />
      </div>

      <p className="text-xs leading-5 text-carbon/60">
        Sport y Casimir comparten actualmente estas telas.
        Si editas una, el cambio se reflejará donde esa
        misma tela aparezca en el catálogo.
      </p>
    </div>
  );
}
