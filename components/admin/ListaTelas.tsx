"use client";

import Link from "next/link";
import { useState } from "react";
import type { Tela } from "@/data/telas";
import { Aviso, useAviso } from "@/components/admin/aviso";
import {
  BotonIcono,
  BotonSecundario,
  Tarjeta,
  Titulo,
  botonLinkCls,
} from "@/components/admin/ui";

function Resumen({ t }: { t: Tela }) {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="min-w-0">
          <p
            className="truncate font-semibold text-bordo"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t.nombre}
          </p>
          <p className="text-xs text-carbon/55">
            {t.composicion} · {t.colores.length} colores
          </p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {t.colores.slice(0, 14).map((c, i) => (
          <span
            key={i}
            className="h-5 w-5 rounded-full border border-black/10"
            style={{ backgroundColor: c.hex }}
          />
        ))}
        {t.colores.length > 14 && (
          <span className="self-center text-[11px] text-carbon/50">
            +{t.colores.length - 14}
          </span>
        )}
      </div>
    </>
  );
}

export default function ListaTelas({ telas }: { telas: Tela[] }) {
  const [items, setItems] = useState(telas);
  const [ordenando, setOrdenando] = useState(false);
  const { aviso, mostrar } = useAviso();

  function mover(i: number, d: -1 | 1) {
    const j = i + d;
    if (j < 0 || j >= items.length) return;
    const copia = [...items];
    [copia[i], copia[j]] = [copia[j], copia[i]];
    setItems(copia);
  }

  return (
    <>
      <Aviso aviso={aviso} />
      <Titulo
        titulo="Telas"
        sub={
          ordenando
            ? "Usá las flechas para cambiar el orden"
            : "Cada tela con sus colores disponibles"
        }
        accion={
          ordenando ? (
            <button
              type="button"
              className={botonLinkCls}
              onClick={() => {
                setOrdenando(false);
                mostrar("Orden guardado (demo)");
              }}
            >
              Listo
            </button>
          ) : (
            <div className="flex gap-2">
              <BotonSecundario onClick={() => setOrdenando(true)}>
                Ordenar
              </BotonSecundario>
              <Link href="/admin/telas/nueva" className={botonLinkCls}>
                + Nueva
              </Link>
            </div>
          )
        }
      />

      <div className="space-y-3">
        {items.map((t, i) =>
          ordenando ? (
            <Tarjeta key={t.id} className="flex items-center gap-3 !p-3">
              <div className="min-w-0 flex-1">
                <Resumen t={t} />
              </div>
              <div className="flex flex-col gap-1.5">
                <BotonIcono label="Subir" onClick={() => mover(i, -1)} disabled={i === 0}>
                  ↑
                </BotonIcono>
                <BotonIcono
                  label="Bajar"
                  onClick={() => mover(i, 1)}
                  disabled={i === items.length - 1}
                >
                  ↓
                </BotonIcono>
              </div>
            </Tarjeta>
          ) : (
            <Link key={t.id} href={`/admin/telas/${t.id}`} className="block">
              <Tarjeta className="boton-tactil !p-4">
                <Resumen t={t} />
              </Tarjeta>
            </Link>
          ),
        )}
      </div>
    </>
  );
}
