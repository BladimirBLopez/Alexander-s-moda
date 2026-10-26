"use client";

import { useState } from "react";
import type { Producto } from "@/lib/productos";
import { Aviso, useAviso } from "@/components/admin/aviso";
import Confirmar from "@/components/admin/Confirmar";
import FotoSlot from "@/components/admin/FotoSlot";
import {
  BarraGuardar,
  SeccionTitulo,
  Tarjeta,
  Titulo,
} from "@/components/admin/ui";

const SLOTS: { campo: keyof Producto; etiqueta: string }[] = [
  { campo: "fotoMujerDentro", etiqueta: "Dama · dentro" },
  { campo: "fotoMujerFuera", etiqueta: "Dama · fuera" },
  { campo: "fotoHombreDentro", etiqueta: "Varón · dentro" },
  { campo: "fotoHombreFuera", etiqueta: "Varón · fuera" },
  { campo: "fotoSeccion2Arriba", etiqueta: "Sección 2 · arriba" },
  { campo: "fotoSeccion2Izquierda", etiqueta: "Sección 2 · izquierda" },
  { campo: "fotoSeccion2Derecha", etiqueta: "Sección 2 · derecha" },
];

type Estado = Record<string, (string | undefined)[]>;

export default function PanelFotos({ productos }: { productos: Producto[] }) {
  const inicial: Estado = Object.fromEntries(
    productos.map((p) => [
      p.id,
      SLOTS.map((s) => p[s.campo] as string | undefined),
    ]),
  );
  const [fotos, setFotos] = useState<Estado>(inicial);
  const [guardado, setGuardado] = useState<Estado>(inicial);
  const [quitar, setQuitar] = useState<{ id: string; i: number } | null>(null);
  const { aviso, mostrar } = useAviso();

  const sucio = JSON.stringify(fotos) !== JSON.stringify(guardado);

  const poner = (id: string, i: number, v: string | undefined) =>
    setFotos({ ...fotos, [id]: fotos[id].map((x, k) => (k === i ? v : x)) });

  function mover(id: string, i: number, d: -1 | 1) {
    const j = i + d;
    if (j < 0 || j >= SLOTS.length) return;
    const copia = [...fotos[id]];
    [copia[i], copia[j]] = [copia[j], copia[i]];
    setFotos({ ...fotos, [id]: copia });
  }

  return (
    <>
      <Aviso aviso={aviso} />
      <Titulo
        titulo="Fotos"
        sub="Tocá una foto para reemplazarla. Con ◀ ▶ la cambiás de lugar."
      />
      <div className="space-y-5">
        {productos.map((p) => (
          <Tarjeta key={p.id}>
            <SeccionTitulo>Uniforme {p.nombre}</SeccionTitulo>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              {SLOTS.map((s, i) => (
                <FotoSlot
                  key={s.campo}
                  etiqueta={s.etiqueta}
                  src={fotos[p.id][i]}
                  pendiente={fotos[p.id][i] !== inicial[p.id][i]}
                  puedeIzq={i > 0}
                  puedeDer={i < SLOTS.length - 1}
                  onElegir={(url) => poner(p.id, i, url)}
                  onQuitar={() => setQuitar({ id: p.id, i })}
                  onMover={(d) => mover(p.id, i, d)}
                />
              ))}
            </div>
          </Tarjeta>
        ))}
      </div>

      <BarraGuardar
        sucio={sucio}
        etiqueta="Guardar fotos"
        onGuardar={() => {
          // Diseño: aún sin subida a Cloudinary
          setGuardado(fotos);
          mostrar("Fotos guardadas (demo)");
        }}
      />

      <Confirmar
        abierto={quitar !== null}
        titulo="¿Quitar esta foto?"
        texto={
          quitar
            ? `Se quita “${SLOTS[quitar.i].etiqueta}”. El catálogo mostrará un espacio vacío hasta que subas otra.`
            : undefined
        }
        textoOk="Quitar"
        onCancelar={() => setQuitar(null)}
        onOk={() => {
          if (quitar) poner(quitar.id, quitar.i, undefined);
          setQuitar(null);
        }}
      />
    </>
  );
}
