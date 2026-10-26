"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import type { ColorTela, Tela } from "@/data/telas";
import { Aviso, useAviso } from "@/components/admin/aviso";
import Confirmar from "@/components/admin/Confirmar";
import {
  BarraGuardar,
  BotonSecundario,
  Campo,
  Pestanas,
  SeccionTitulo,
  Tarjeta,
  Titulo,
  inputCls,
} from "@/components/admin/ui";

export default function EditorTela({
  inicial,
  nueva = false,
}: {
  inicial: Tela;
  nueva?: boolean;
}) {
  const router = useRouter();
  const [t, setT] = useState<Tela>(inicial);
  const [guardado, setGuardado] = useState<Tela>(inicial);
  const [vista, setVista] = useState<"editar" | "previa">("editar");
  const [sel, setSel] = useState<number | null>(null);
  const [nuevaCar, setNuevaCar] = useState("");
  const [quitarColorIdx, setQuitarColorIdx] = useState<number | null>(null);
  const [borrar, setBorrar] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const guardandoRef = useRef(false);
  const { aviso, mostrar } = useAviso();

  const sucio = JSON.stringify(t) !== JSON.stringify(guardado);
  const setCampo = (k: keyof Tela, v: string) => setT({ ...t, [k]: v });

  const setColor = (i: number, parche: Partial<ColorTela>) =>
    setT({
      ...t,
      colores: t.colores.map((c, k) => (k === i ? { ...c, ...parche } : c)),
    });

  function agregarColor() {
    setT({ ...t, colores: [...t.colores, { codigo: "", hex: "#cccccc" }] });
    setSel(t.colores.length);
  }

  function moverColor(i: number, d: -1 | 1) {
    const j = i + d;
    if (j < 0 || j >= t.colores.length) return;
    const copia = [...t.colores];
    [copia[i], copia[j]] = [copia[j], copia[i]];
    setT({ ...t, colores: copia });
    setSel(j);
  }

  function quitarColor(i: number) {
    setT({ ...t, colores: t.colores.filter((_, k) => k !== i) });
    setSel(null);
    setQuitarColorIdx(null);
    mostrar("Color eliminado (falta guardar)");
  }

  function agregarCar() {
    const v = nuevaCar.trim();
    if (!v) return;
    setT({ ...t, caracteristicas: [...t.caracteristicas, v] });
    setNuevaCar("");
  }

  async function guardar() {
    if (guardandoRef.current) return;

    if (!t.nombre.trim()) {
      mostrar("Escribí el nombre de la tela", "error");
      return;
    }

    if (!nueva) {
      mostrar(
        "La edición completa de telas todavía no está conectada a Neon",
        "error"
      );
      return;
    }

    guardandoRef.current = true;
    setGuardando(true);

    try {
      const respuesta = await fetch("/api/admin/telas", {
        method: "POST",
        credentials: "same-origin",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: t.nombre,
          estructura: t.estructura,
          composicion: t.composicion,
          gramaje: t.gramaje,
          ancho: t.ancho,
          caracteristicas: t.caracteristicas,
          imagenPrincipal: t.imagenPrincipal ?? null,
          colores: t.colores,
        }),
      });

      const resultado: {
        ok?: boolean;
        error?: string;
        tela?: { id: string };
      } = await respuesta.json().catch(() => ({}));

      if (
        respuesta.status !== 201 ||
        resultado.ok !== true ||
        !resultado.tela?.id
      ) {
        throw new Error(
          resultado.error || "No se pudo registrar la tela"
        );
      }

      setGuardado(t);
      mostrar("Tela creada correctamente en Neon");
      router.replace("/admin/telas");
      router.refresh();

    } catch (error) {
      mostrar(
        error instanceof Error
          ? error.message
          : "Error de conexión al crear la tela",
        "error"
      );
    } finally {
      guardandoRef.current = false;
      setGuardando(false);
    }
  }

  function eliminar() {
    setBorrar(false);
    mostrar("Tela eliminada (demo)");
    setTimeout(() => router.push("/admin/telas"), 1000);
  }

  const colorSel = sel !== null ? t.colores[sel] : null;

  return (
    <>
      <Aviso aviso={aviso} />
      <Titulo
        titulo={nueva ? "Nueva tela" : t.nombre}
        sub="Datos de la tela y sus colores"
      />

      <Pestanas
        valor={vista}
        onCambiar={setVista}
        opciones={[
          { id: "editar", label: "Editar" },
          { id: "previa", label: "Vista previa" },
        ]}
      />

      {vista === "previa" ? (
        <Tarjeta className="!p-5">
          <p className="mb-3 text-center text-xs text-carbon/50">
            Así se verá en “Ver telas” (aproximado)
          </p>
          <h2
            className="text-center text-xl font-semibold text-bordo"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t.nombre || "Nombre de la tela"}
          </h2>
          <p className="mt-1 text-center text-xs text-carbon/60">
            {[t.composicion, t.gramaje, t.ancho].filter(Boolean).join(" · ")}
          </p>
          {t.caracteristicas.length > 0 && (
            <div className="mt-3 flex flex-wrap justify-center gap-1.5">
              {t.caracteristicas.map((c, i) => (
                <span
                  key={i}
                  className="rounded-full bg-papel px-2.5 py-0.5 text-[11px] text-bordo"
                >
                  {c}
                </span>
              ))}
            </div>
          )}
          <div className="mt-5 grid grid-cols-5 gap-3 sm:grid-cols-6">
            {t.colores.map((c, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <span
                  className="h-11 w-11 rounded-full border border-black/10 shadow-inner"
                  style={{ backgroundColor: c.hex }}
                />
                <span className="text-[10px] text-carbon/60">{c.codigo}</span>
              </div>
            ))}
          </div>
          {t.colores.length === 0 && (
            <p className="mt-4 text-center text-xs text-carbon/40">
              Aún no hay colores
            </p>
          )}
        </Tarjeta>
      ) : (
        <div className="space-y-4">
          <Tarjeta>
            <SeccionTitulo>Datos técnicos</SeccionTitulo>
            <div className="grid gap-3 sm:grid-cols-2">
              <Campo label="Nombre">
                <input value={t.nombre} onChange={(e) => setCampo("nombre", e.target.value)} placeholder="Ej: Fill a Fill" className={inputCls} />
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
                      setT({
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
            {t.colores.length === 0 && (
              <p className="py-4 text-center text-xs text-carbon/40">
                Tocá “+ Color” para agregar el primero
              </p>
            )}

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
                <div className="mt-3 flex flex-wrap gap-2">
                  <BotonSecundario onClick={() => moverColor(sel, -1)} disabled={sel === 0}>
                    ◀ Antes
                  </BotonSecundario>
                  <BotonSecundario
                    onClick={() => moverColor(sel, 1)}
                    disabled={sel === t.colores.length - 1}
                  >
                    Después ▶
                  </BotonSecundario>
                  <BotonSecundario onClick={() => setSel(null)}>Listo</BotonSecundario>
                  <BotonSecundario
                    onClick={() => setQuitarColorIdx(sel)}
                    className="!border-red-300 !text-red-700"
                  >
                    Eliminar
                  </BotonSecundario>
                </div>
              </div>
            )}
          </Tarjeta>

          {!nueva && (
            <Tarjeta className="!border-red-200">
              <SeccionTitulo>Zona de peligro</SeccionTitulo>
              <p className="mb-3 text-xs text-carbon/60">
                La tela y todos sus colores dejarán de verse en el sitio.
              </p>
              <BotonSecundario
                onClick={() => setBorrar(true)}
                className="!border-red-300 !text-red-700"
              >
                Eliminar tela
              </BotonSecundario>
            </Tarjeta>
          )}
        </div>
      )}

      <BarraGuardar
        sucio={sucio && !guardando}
        onGuardar={guardar}
        etiqueta={guardando ? "Guardando..." : nueva ? "Crear tela" : "Guardar"}
      />

      <Confirmar
        abierto={quitarColorIdx !== null}
        titulo="¿Eliminar este color?"
        texto={
          quitarColorIdx !== null
            ? `Se quita el color ${t.colores[quitarColorIdx]?.codigo || "nuevo"} de ${t.nombre || "la tela"}.`
            : undefined
        }
        onCancelar={() => setQuitarColorIdx(null)}
        onOk={() => quitarColorIdx !== null && quitarColor(quitarColorIdx)}
      />
      <Confirmar
        abierto={borrar}
        titulo={`¿Eliminar ${t.nombre}?`}
        texto="Se borra la tela con todos sus colores. No se puede deshacer."
        onCancelar={() => setBorrar(false)}
        onOk={eliminar}
      />
    </>
  );
}
