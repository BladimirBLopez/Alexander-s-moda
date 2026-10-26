"use client";

import { useState } from "react";
import type { BulletItem, Producto } from "@/lib/productos";
import BulletsEditor from "@/components/admin/BulletsEditor";
import {
  BarraGuardar,
  Campo,
  SeccionTitulo,
  Tarjeta,
  Titulo,
  inputCls,
} from "@/components/admin/ui";

type Datos = Pick<
  Producto,
  "nombre" | "subtitulo" | "descripcion" | "tipografia"
> & { bulletsMujer: BulletItem[]; bulletsHombre: BulletItem[] };

export default function EditorUniforme({ inicial }: { inicial: Producto }) {
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
  const [estado, setEstado] = useState<"idle" | "ok">("idle");

  const sucio = JSON.stringify(d) !== JSON.stringify(guardado);
  const set = <K extends keyof Datos>(k: K, v: Datos[K]) => {
    setEstado("idle");
    setD({ ...d, [k]: v });
  };

  function guardar() {
    // Diseño: aún sin conexión a la base de datos
    setGuardado(d);
    setEstado("ok");
  }

  return (
    <>
      <Titulo titulo={`Uniforme ${d.nombre}`} sub="Textos que se ven en el catálogo" />

      <div className="space-y-4">
        <Tarjeta>
          <SeccionTitulo>Datos generales</SeccionTitulo>
          <div className="space-y-3">
            <Campo label="Nombre">
              <input
                value={d.nombre}
                onChange={(e) => set("nombre", e.target.value)}
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
      </div>

      <BarraGuardar sucio={sucio} onGuardar={guardar} estado={estado} />
    </>
  );
}
