"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
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
type EstadoOrigen = Record<string, (number | null)[]>;

export default function PanelFotos({ productos }: { productos: Producto[] }) {
  const inicial: Estado = Object.fromEntries(
    productos.map((p) => [
      p.id,
      SLOTS.map((s) => p[s.campo] as string | undefined),
    ]),
  );
  const inicialOrigenes: EstadoOrigen = Object.fromEntries(
    productos.map((p) => [
      p.id,
      SLOTS.map((s, i) => p[s.campo] ? i : null),
    ]),
  );

  const [fotos, setFotos] = useState<Estado>(inicial);
  const [origenes, setOrigenes] =
    useState<EstadoOrigen>(inicialOrigenes);
  const [guardado, setGuardado] = useState<Estado>(inicial);
  const [origenesGuardados, setOrigenesGuardados] =
    useState<EstadoOrigen>(inicialOrigenes);
  const [guardando, setGuardando] = useState(false);
  const [subidas, setSubidas] = useState(0);
  const subidasRef = useRef(0);
  const router = useRouter();
  const [quitar, setQuitar] = useState<{ id: string; i: number } | null>(null);
  const { aviso, mostrar } = useAviso();

  const sucio =
    JSON.stringify(fotos) !== JSON.stringify(guardado) ||
    JSON.stringify(origenes) !==
      JSON.stringify(origenesGuardados);

  function registrarSubida(activa: boolean) {
    subidasRef.current = Math.max(
      0,
      subidasRef.current + (activa ? 1 : -1)
    );
    setSubidas(subidasRef.current);
  }

  function poner(id: string, i: number, v: string | undefined) {
    setFotos((actual) => ({
      ...actual,
      [id]: actual[id].map((x, k) => (k === i ? v : x)),
    }));

    setOrigenes((actual) => ({
      ...actual,
      [id]: actual[id].map((x, k) => (k === i ? null : x)),
    }));
  }

  function mover(id: string, i: number, d: -1 | 1) {
    const j = i + d;
    if (j < 0 || j >= SLOTS.length) return;
    setFotos((actual) => {
      const copia = [...actual[id]];
      [copia[i], copia[j]] = [copia[j], copia[i]];
      return { ...actual, [id]: copia };
    });

    setOrigenes((actual) => {
      const copia = [...actual[id]];
      [copia[i], copia[j]] = [copia[j], copia[i]];
      return { ...actual, [id]: copia };
    });
  }


  async function guardar() {
    if (guardando || subidasRef.current > 0 || !sucio) return;

    setGuardando(true);

    try {
      const pendientes = productos.filter(
        (p) =>
          JSON.stringify(fotos[p.id]) !==
            JSON.stringify(guardado[p.id]) ||
          JSON.stringify(origenes[p.id]) !==
            JSON.stringify(origenesGuardados[p.id])
      );

      for (const producto of pendientes) {
        const valores = fotos[producto.id];
        const fuentes = origenes[producto.id];

        if (
          !valores || valores.length !== SLOTS.length ||
          !fuentes || fuentes.length !== SLOTS.length
        ) {
          throw new Error("Posiciones incompletas");
        }

        const datos = Object.fromEntries(
          SLOTS.map((slot, i) => [
            slot.campo,
            valores[i] ?? null,
          ])
        );

        const respuesta = await fetch(
          "/api/admin/uniformes/" +
            encodeURIComponent(producto.id) +
            "/fotos",
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ fotos: datos, origenes: fuentes }),
          }
        );

        const resultado = await respuesta
          .json()
          .catch(() => ({}));

        if (!respuesta.ok || resultado.ok !== true) {
          throw new Error(
            resultado.error ||
            "No se pudieron guardar las fotos de " +
              producto.nombre
          );
        }

        setGuardado((anterior) => ({
          ...anterior,
          [producto.id]: [...valores],
        }));

        const nuevasFuentes = valores.map(
          (url, i) => url ? i : null
        );

        setOrigenes((anterior) => ({
          ...anterior,
          [producto.id]: [...nuevasFuentes],
        }));

        setOrigenesGuardados((anterior) => ({
          ...anterior,
          [producto.id]: [...nuevasFuentes],
        }));
      }

      mostrar("Fotografias guardadas correctamente en Neon");
      router.refresh();

    } catch (error) {
      mostrar(
        "Error al guardar: " +
          (error instanceof Error
            ? error.message
            : "Error de conexion")
      );
    } finally {
      setGuardando(false);
    }
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
                  bloqueada={guardando || subidas > 0}
                  onSubidaCambiar={registrarSubida}
                  etiqueta={s.etiqueta}
                  src={fotos[p.id][i]}
                  pendiente={
                    fotos[p.id][i] !== guardado[p.id][i] ||
                    origenes[p.id][i] !== origenesGuardados[p.id][i]
                  }
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
        sucio={sucio && !guardando && subidas === 0}
        etiqueta={guardando ? "Guardando..." : subidas > 0 ? "Subiendo..." : "Guardar fotos"}
        onGuardar={() => void guardar()}
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
          if (guardando || subidasRef.current > 0) return;
          if (quitar) poner(quitar.id, quitar.i, undefined);
          setQuitar(null);
        }}
      />
    </>
  );
}
