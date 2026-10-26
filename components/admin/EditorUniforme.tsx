"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { BulletItem, Producto } from "@/lib/productos";
import { Aviso, useAviso } from "@/components/admin/aviso";
import BulletsEditor from "@/components/admin/BulletsEditor";
import Confirmar from "@/components/admin/Confirmar";
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
  const [d, setD] = useState<Datos>(base);
  const [guardado, setGuardado] = useState<Datos>(base);
  const [vista, setVista] = useState<"editar" | "previa">("editar");
  const [borrar, setBorrar] = useState(false);
  const { aviso, mostrar } = useAviso();

  const sucio = JSON.stringify(d) !== JSON.stringify(guardado);
  const set = <K extends keyof Datos>(k: K, v: Datos[K]) =>
    setD({ ...d, [k]: v });

  function guardar() {
    if (!d.nombre.trim()) {
      mostrar("Escribí el nombre del uniforme", "error");
      return;
    }
    // Diseño: aún sin conexión a la base de datos
    setGuardado(d);
    if (nuevo) {
      mostrar("Uniforme creado (demo)");
      setTimeout(() => router.push("/admin/uniformes"), 1000);
    } else {
      mostrar("Cambios guardados (demo)");
    }
  }

  function eliminar() {
    setBorrar(false);
    mostrar("Uniforme eliminado (demo)");
    setTimeout(() => router.push("/admin/uniformes"), 1000);
  }

  return (
    <>
      <Aviso aviso={aviso} />
      <Titulo
        titulo={nuevo ? "Nuevo uniforme" : `Uniforme ${d.nombre}`}
        sub="Textos que se ven en el catálogo"
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
            md: inicial.fotoMujerDentro,
            mf: inicial.fotoMujerFuera,
            hd: inicial.fotoHombreDentro,
            hf: inicial.fotoHombreFuera,
          }}
        />
      ) : (
        <div className="space-y-4">
          <Tarjeta>
            <SeccionTitulo>Datos generales</SeccionTitulo>
            <div className="space-y-3">
              <Campo label="Nombre">
                <input
                  value={d.nombre}
                  onChange={(e) => set("nombre", e.target.value)}
                  placeholder="Ej: Sport"
                  className={inputCls}
                />
              </Campo>
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
            <SeccionTitulo>Dama · qué incluye</SeccionTitulo>
            <BulletsEditor
              items={d.bulletsMujer}
              onChange={(v) => set("bulletsMujer", v)}
            />
          </Tarjeta>

          <Tarjeta>
            <SeccionTitulo>Varón · qué incluye</SeccionTitulo>
            <BulletsEditor
              items={d.bulletsHombre}
              onChange={(v) => set("bulletsHombre", v)}
            />
          </Tarjeta>

          {nuevo ? (
            <p className="text-center text-xs text-carbon/55">
              Las fotos las subís después, desde la sección Fotos.
            </p>
          ) : (
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
        texto="Se borran sus textos y deja de aparecer en el catálogo. No se puede deshacer."
        onCancelar={() => setBorrar(false)}
        onOk={eliminar}
      />
    </>
  );
}
