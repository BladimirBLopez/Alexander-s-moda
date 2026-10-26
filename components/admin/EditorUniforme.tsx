"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { BulletItem, Producto } from "@/lib/productos";
import { Aviso, useAviso } from "@/components/admin/aviso";
import BulletsEditor from "@/components/admin/BulletsEditor";
import Confirmar from "@/components/admin/Confirmar";
import FotoSlot from "@/components/admin/FotoSlot";
import VistaPreviaUniforme from "@/components/admin/VistaPreviaUniforme";
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

type Datos = Pick<
  Producto,
  "nombre" | "subtitulo" | "descripcion" | "tipografia"
> & { bulletsMujer: BulletItem[]; bulletsHombre: BulletItem[] };

type Fotos = Record<string, string | undefined>;
type Slot = { k: string; l: string };

const MUJER: Slot[] = [
  { k: "fotoMujerDentro", l: "Camisa" },
  { k: "fotoMujerFuera", l: "Polera" },
];
const HOMBRE: Slot[] = [
  { k: "fotoHombreDentro", l: "Camisa" },
  { k: "fotoHombreFuera", l: "Polera" },
];
const SECCION2: Slot[] = [
  { k: "fotoSeccion2Arriba", l: "Arriba" },
  { k: "fotoSeccion2Izquierda", l: "Izquierda" },
  { k: "fotoSeccion2Derecha", l: "Derecha" },
];
const TODAS = [...MUJER, ...HOMBRE, ...SECCION2].map((s) => s.k);

function GrupoFotos({
  slots,
  fotos,
  base,
  onMover,
  onQuitar,
  onBloqueada,
}: {
  slots: Slot[];
  fotos: Fotos;
  base: Fotos;
  onMover: (slots: Slot[], i: number, d: -1 | 1) => void;
  onQuitar: (k: string) => void;
  onBloqueada: () => void;
}) {
  return (
    <div
      className={`grid gap-3 ${
        slots.length === 3 ? "grid-cols-3" : "max-w-sm grid-cols-2"
      }`}
    >
      {slots.map((s, i) => (
        <FotoSlot
          key={s.k}
          etiqueta={s.l}
          src={fotos[s.k]}
          pendiente={fotos[s.k] !== base[s.k]}
          puedeIzq={i > 0}
          puedeDer={i < slots.length - 1}
          bloqueada
          onBloqueada={onBloqueada}
          onElegir={() => {}}
          onQuitar={() => onQuitar(s.k)}
          onMover={(d) => onMover(slots, i, d)}
        />
      ))}
    </div>
  );
}

export default function EditorUniforme({
  inicial,
  nuevo = false,
}: {
  inicial: Producto;
  nuevo?: boolean;
}) {
  const router = useRouter();
  const base: Datos = {
    nombre: inicial.nombre,
    subtitulo: inicial.subtitulo,
    descripcion: inicial.descripcion,
    tipografia: inicial.tipografia,
    bulletsMujer: inicial.bulletsMujer,
    bulletsHombre: inicial.bulletsHombre,
  };
  const fotosBase: Fotos = Object.fromEntries(
    TODAS.map((k) => [
      k,
      (inicial as unknown as Record<string, unknown>)[k] as string | undefined,
    ]),
  );

  const [d, setD] = useState<Datos>(base);
  const [guardado, setGuardado] = useState<Datos>(base);
  const [fotos, setFotos] = useState<Fotos>(fotosBase);
  const [fotosGuardadas, setFotosGuardadas] = useState<Fotos>(fotosBase);
  const [slug, setSlug] = useState("");
  const [vista, setVista] = useState<"editar" | "previa">("editar");
  const [borrar, setBorrar] = useState(false);
  const [quitar, setQuitar] = useState<string | null>(null);
  const [ocupado, setOcupado] = useState(false);
  const { aviso, mostrar } = useAviso();

  const sucio =
    JSON.stringify(d) !== JSON.stringify(guardado) ||
    JSON.stringify(fotos) !== JSON.stringify(fotosGuardadas);
  const set = <K extends keyof Datos>(k: K, v: Datos[K]) =>
    setD({ ...d, [k]: v });

  function mover(slots: Slot[], i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= slots.length) return;
    setFotos({
      ...fotos,
      [slots[i].k]: fotos[slots[j].k],
      [slots[j].k]: fotos[slots[i].k],
    });
  }

  const bloqueada = () =>
    mostrar(
      "Subir fotos nuevas se activa en el Paso 6 (Cloudinary). Por ahora podés mover y quitar.",
      "error",
    );

  async function guardar() {
    if (ocupado) return;
    if (!d.nombre.trim()) {
      mostrar("Escribí el nombre del uniforme", "error");
      return;
    }
    const fotosOut: Record<string, string> = {};
    for (const k of TODAS) {
      const u = fotos[k];
      if (u) fotosOut[k] = u;
    }
    if (Object.values(fotosOut).some((u) => u.startsWith("blob:"))) {
      mostrar("Hay una foto temporal sin subir", "error");
      return;
    }
    setOcupado(true);
    try {
      const res = await fetch(
        nuevo ? "/api/admin/uniformes" : `/api/admin/uniformes/${inicial.id}`,
        {
          method: nuevo ? "POST" : "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...d,
            fotos: fotosOut,
            ...(nuevo ? { slug } : {}),
          }),
        },
      );
      const r = await res.json().catch(() => ({}));
      if (!res.ok) {
        mostrar(r.error || "No se pudo guardar", "error");
        return;
      }
      setGuardado(d);
      setFotosGuardadas(fotos);
      if (nuevo) {
        mostrar("Uniforme creado");
        setTimeout(() => router.push(`/admin/uniformes/${r.id}`), 900);
      } else {
        mostrar("Cambios guardados");
        router.refresh();
      }
    } catch {
      mostrar("Error de conexión", "error");
    } finally {
      setOcupado(false);
    }
  }

  async function eliminar() {
    setBorrar(false);
    try {
      const res = await fetch(`/api/admin/uniformes/${inicial.id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        mostrar("No se pudo eliminar", "error");
        return;
      }
      mostrar("Uniforme eliminado");
      setTimeout(() => {
        router.push("/admin/uniformes");
        router.refresh();
      }, 900);
    } catch {
      mostrar("Error de conexión", "error");
    }
  }

  const etiquetaQuitar = quitar
    ? [...MUJER, ...HOMBRE, ...SECCION2].find((s) => s.k === quitar)?.l
    : undefined;

  return (
    <>
      <Aviso aviso={aviso} />
      <Titulo
        titulo={nuevo ? "Nuevo uniforme" : `Uniforme ${d.nombre}`}
        sub="Textos, puntos y fotos, todo en un solo lugar"
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
        <VistaPreviaUniforme
          {...d}
          fotos={{
            md: fotos.fotoMujerDentro,
            mf: fotos.fotoMujerFuera,
            hd: fotos.fotoHombreDentro,
            hf: fotos.fotoHombreFuera,
            sa: fotos.fotoSeccion2Arriba,
            si: fotos.fotoSeccion2Izquierda,
            sd: fotos.fotoSeccion2Derecha,
          }}
        />
      ) : (
        <div className="space-y-4">
          <Tarjeta>
            <SeccionTitulo>1 · Datos generales</SeccionTitulo>
            <div className="space-y-3">
              <Campo label="Nombre">
                <input
                  value={d.nombre}
                  onChange={(e) => set("nombre", e.target.value)}
                  placeholder="Ej: Sport"
                  className={inputCls}
                />
              </Campo>
              {nuevo && (
                <Campo label="Slug (dirección web, opcional)">
                  <input
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="Ej: sport (si lo dejás vacío se arma del nombre)"
                    className={inputCls}
                  />
                </Campo>
              )}
              <Campo label="Subtítulo (tela principal)">
                <input
                  value={d.subtitulo}
                  onChange={(e) => set("subtitulo", e.target.value)}
                  className={inputCls}
                />
              </Campo>
              <Campo label="Descripción">
                <textarea
                  rows={2}
                  value={d.descripcion}
                  onChange={(e) => set("descripcion", e.target.value)}
                  className={inputCls}
                />
              </Campo>
              <Campo label="Tipografía">
                <input
                  value={d.tipografia}
                  onChange={(e) => set("tipografia", e.target.value)}
                  className={inputCls}
                />
              </Campo>
            </div>
          </Tarjeta>

          <Tarjeta>
            <SeccionTitulo>2 · Dama</SeccionTitulo>
            <p className="mb-2 text-xs font-medium text-carbon/60">Fotos</p>
            <GrupoFotos
              slots={MUJER}
              fotos={fotos}
              base={fotosGuardadas}
              onMover={mover}
              onQuitar={setQuitar}
              onBloqueada={bloqueada}
            />
            <p className="mb-2 mt-5 text-xs font-medium text-carbon/60">
              Qué incluye
            </p>
            <BulletsEditor
              items={d.bulletsMujer}
              onChange={(v) => set("bulletsMujer", v)}
            />
          </Tarjeta>

          <Tarjeta>
            <SeccionTitulo>3 · Varón</SeccionTitulo>
            <p className="mb-2 text-xs font-medium text-carbon/60">Fotos</p>
            <GrupoFotos
              slots={HOMBRE}
              fotos={fotos}
              base={fotosGuardadas}
              onMover={mover}
              onQuitar={setQuitar}
              onBloqueada={bloqueada}
            />
            <p className="mb-2 mt-5 text-xs font-medium text-carbon/60">
              Qué incluye
            </p>
            <BulletsEditor
              items={d.bulletsHombre}
              onChange={(v) => set("bulletsHombre", v)}
            />
          </Tarjeta>

          <Tarjeta>
            <SeccionTitulo>4 · Sección 2</SeccionTitulo>
            <GrupoFotos
              slots={SECCION2}
              fotos={fotos}
              base={fotosGuardadas}
              onMover={mover}
              onQuitar={setQuitar}
              onBloqueada={bloqueada}
            />
          </Tarjeta>

          {!nuevo && (
            <Tarjeta className="!border-red-200">
              <SeccionTitulo>Zona de peligro</SeccionTitulo>
              <p className="mb-3 text-xs text-carbon/60">
                El uniforme dejará de verse en el catálogo.
              </p>
              <BotonSecundario
                onClick={() => setBorrar(true)}
                className="!border-red-300 !text-red-700"
              >
                Eliminar uniforme
              </BotonSecundario>
            </Tarjeta>
          )}
        </div>
      )}

      <BarraGuardar
        sucio={sucio}
        onGuardar={guardar}
        etiqueta={nuevo ? "Crear uniforme" : "Guardar"}
      />

      <Confirmar
        abierto={borrar}
        titulo={`¿Eliminar uniforme ${d.nombre}?`}
        texto="Se borran sus textos y fotos y deja de aparecer en el catálogo. No se puede deshacer."
        onCancelar={() => setBorrar(false)}
        onOk={eliminar}
      />

      <Confirmar
        abierto={quitar !== null}
        titulo="¿Quitar esta foto?"
        texto={
          etiquetaQuitar
            ? `Se quita la foto “${etiquetaQuitar}”. Se aplica al guardar.`
            : undefined
        }
        textoOk="Quitar"
        onCancelar={() => setQuitar(null)}
        onOk={() => {
          if (quitar) setFotos({ ...fotos, [quitar]: undefined });
          setQuitar(null);
        }}
      />
    </>
  );
}
