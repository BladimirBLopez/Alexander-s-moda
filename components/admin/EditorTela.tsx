"use client";

import { useState } from "react";
import type { ColorTela, Tela } from "@/data/telas";
import {
  BarraGuardar,
  BotonSecundario,
  Campo,
  SeccionTitulo,
  Tarjeta,
  Titulo,
  inputCls,
} from "@/components/admin/ui";

export default function EditorTela({ inicial }: { inicial: Tela }) {
  const [t, setT] = useState<Tela>(inicial);
  const [guardado, setGuardado] = useState<Tela>(inicial);
  const [estado, setEstado] = useState<"idle" | "ok">("idle");
  const [sel, setSel] = useState<number | null>(null);
  const [nuevaCar, setNuevaCar] = useState("");

  const sucio = JSON.stringify(t) !== JSON.stringify(guardado);
  const cambiar = (nueva: Tela) => {
    setEstado("idle");
    setT(nueva);
  };
  const setCampo = (k: keyof Tela, v: string) => cambiar({ ...t, [k]: v });

  const setColor = (i: number, parche: Partial<ColorTela>) =>
    cambiar({
      ...t,
      colores: t.colores.map((c, k) => (k === i ? { ...c, ...parche } : c)),
    });

  function agregarColor() {
    cambiar({ ...t, colores: [...t.colores, { codigo: "", hex: "#cccccc" }] });
    setSel(t.colores.length);
  }

  function quitarColor(i: number) {
    cambiar({ ...t, colores: t.colores.filter((_, k) => k !== i) });
    setSel(null);
  }

  function agregarCar() {
    const v = nuevaCar.trim();
    if (!v) return;
    cambiar({ ...t, caracteristicas: [...t.caracteristicas, v] });
    setNuevaCar("");
  }

  const colorSel = sel !== null ? t.colores[sel] : null;

  return (
    <>
      <Titulo titulo={t.nombre} sub="Datos de la tela y sus colores" />

      <div className="space-y-4">
        <Tarjeta>
          <SeccionTitulo>Datos técnicos</SeccionTitulo>
          <div className="grid gap-3 sm:grid-cols-2">
            <Campo label="Nombre">
              <input value={t.nombre} onChange={(e) => setCampo("nombre", e.target.value)} className={inputCls} />
            </Campo>
            <Campo label="Estructura">
              <input value={t.estructura} onChange={(e) => setCampo("estructura", e.target.value)} className={inputCls} />
            </Campo>
            <Campo label="Composición">
              <input value={t.composicion} onChange={(e) => setCampo("composicion", e.target.value)} className={inputCls} />
            </Campo>
            <Campo label="Gramaje">
              <input value={t.gramaje} onChange={(e) => setCampo("gramaje", e.target.value)} className={inputCls} />
            </Campo>
            <Campo label="Ancho">
              <input value={t.ancho} onChange={(e) => setCampo("ancho", e.target.value)} className={inputCls} />
            </Campo>
          </div>
        </Tarjeta>

        <Tarjeta>
          <SeccionTitulo>Características</SeccionTitulo>
          <div className="flex flex-wrap gap-2">
            {t.caracteristicas.map((c, i) => (
              <span
                key={`${c}-${i}`}
                className="inline-flex items-center gap-1.5 rounded-full bg-papel px-3 py-1 text-xs text-bordo"
              >
                {c}
                <button
                  type="button"
                  aria-label={`Quitar ${c}`}
                  onClick={() =>
                    cambiar({
                      ...t,
                      caracteristicas: t.caracteristicas.filter((_, k) => k !== i),
                    })
                  }
                  className="text-bordo/50"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <input
              value={nuevaCar}
              onChange={(e) => setNuevaCar(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && agregarCar()}
              placeholder="Nueva característica"
              className={inputCls}
            />
            <BotonSecundario onClick={agregarCar}>Agregar</BotonSecundario>
          </div>
        </Tarjeta>

        <Tarjeta>
          <div className="mb-3 flex items-center justify-between">
            <SeccionTitulo>Colores ({t.colores.length})</SeccionTitulo>
            <BotonSecundario onClick={agregarColor}>+ Color</BotonSecundario>
          </div>

          <div className="grid grid-cols-5 gap-2.5 sm:grid-cols-7">
            {t.colores.map((c, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSel(sel === i ? null : i)}
                className={`boton-tactil flex flex-col items-center gap-1 rounded-xl p-1.5 ${
                  sel === i ? "bg-hueso/40 ring-2 ring-bronce" : ""
                }`}
              >
                <span
                  className="h-10 w-10 rounded-full border border-black/10 shadow-inner"
                  style={{ backgroundColor: c.hex }}
                />
                <span className="text-[10px] text-carbon/60">
                  {c.codigo || "—"}
                </span>
              </button>
            ))}
          </div>

          {colorSel && sel !== null && (
            <div className="mt-4 rounded-xl border border-bronce/30 bg-papel/70 p-3">
              <p className="mb-2 text-xs font-semibold text-bordo">
                Editando color {colorSel.codigo || "nuevo"}
              </p>
              <div className="flex items-end gap-2">
                <Campo label="Código">
                  <input
                    value={colorSel.codigo}
                    onChange={(e) => setColor(sel, { codigo: e.target.value })}
                    className={inputCls}
                  />
                </Campo>
                <Campo label="Color">
                  <input
                    type="color"
                    value={colorSel.hex}
                    onChange={(e) => setColor(sel, { hex: e.target.value })}
                    className="h-[42px] w-14 cursor-pointer rounded-lg border border-bordo/20 bg-white p-1"
                  />
                </Campo>
              </div>
              <div className="mt-3 flex gap-2">
                <BotonSecundario onClick={() => setSel(null)}>Listo</BotonSecundario>
                <BotonSecundario
                  onClick={() => quitarColor(sel)}
                  className="!border-red-300 !text-red-700"
                >
                  Eliminar color
                </BotonSecundario>
              </div>
            </div>
          )}
        </Tarjeta>
      </div>

      <BarraGuardar
        sucio={sucio}
        estado={estado}
        onGuardar={() => {
          // Diseño: aún sin conexión a la base de datos
          setGuardado(t);
          setEstado("ok");
        }}
      />
    </>
  );
}
