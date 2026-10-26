"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { BulletItem } from "@/lib/productos";
import {
  descripcionATexto,
  textoADescripcion,
} from "@/lib/descripciones-editor";
import FotoSlot from "@/components/admin/FotoSlot";
import Confirmar from "@/components/admin/Confirmar";
import { Aviso, useAviso } from "@/components/admin/aviso";
import {
  BarraGuardar,
  Pestanas,
  SeccionTitulo,
  Tarjeta,
  Titulo,
} from "@/components/admin/ui";

const SLOTS = [
  { campo: "fotoMujerDentro", nombre: "Dama · camisa" },
  { campo: "fotoMujerFuera", nombre: "Dama · polera" },
  { campo: "fotoHombreDentro", nombre: "Varón · camisa" },
  { campo: "fotoHombreFuera", nombre: "Varón · polera" },
  { campo: "fotoSeccion2Arriba", nombre: "Foto adicional 1" },
  { campo: "fotoSeccion2Izquierda", nombre: "Foto adicional 2" },
  { campo: "fotoSeccion2Derecha", nombre: "Foto adicional 3" },
] as const;

type Inicial = {
  id: string;
  nombre: string;
  bulletsMujer: BulletItem[];
  bulletsHombre: BulletItem[];
  fotos: (string | null)[];
};

type Pestaña = "dama" | "varon" | "extras";

export default function EditorContenidoUniforme({
  inicial,
}: {
  inicial: Inicial;
}) {
  const router = useRouter();
  const { aviso, mostrar } = useAviso();

  const [pestana, setPestana] = useState<Pestaña>("dama");

  const [textoDama, setTextoDama] = useState(
    () => descripcionATexto(inicial.bulletsMujer)
  );
  const [textoVaron, setTextoVaron] = useState(
    () => descripcionATexto(inicial.bulletsHombre)
  );

  const [baseDama, setBaseDama] = useState(
    () => descripcionATexto(inicial.bulletsMujer)
  );
  const [baseVaron, setBaseVaron] = useState(
    () => descripcionATexto(inicial.bulletsHombre)
  );

  const [fotos, setFotos] = useState<(string | null)[]>(
    () => inicial.fotos.map((u) => u ?? null)
  );

  const [origenes, setOrigenes] = useState<(number | null)[]>(
    () => inicial.fotos.map((u, i) => u ? i : null)
  );

  const [baseFotos, setBaseFotos] = useState(
    JSON.stringify(inicial.fotos)
  );

  const [baseOrigenes, setBaseOrigenes] = useState(
    JSON.stringify(
      inicial.fotos.map((u, i) => u ? i : null)
    )
  );

  const [guardando, setGuardando] = useState(false);
  const [subidas, setSubidas] = useState(0);
  const [quitar, setQuitar] = useState<number | null>(null);

  const bloqueo = useRef(false);
  const subidasRef = useRef(0);

  const cambioDama = textoDama !== baseDama;
  const cambioVaron = textoVaron !== baseVaron;

  const cambioFotos =
    JSON.stringify(fotos) !== baseFotos ||
    JSON.stringify(origenes) !== baseOrigenes;

  const pendiente = cambioDama || cambioVaron || cambioFotos;
  const bloqueado = guardando || subidas > 0;

  function registrarSubida(activa: boolean) {
    subidasRef.current = Math.max(
      0,
      subidasRef.current + (activa ? 1 : -1)
    );
    setSubidas(subidasRef.current);
  }

  function elegir(i: number, url: string) {
    setFotos((anterior) =>
      anterior.map((u, j) => j === i ? url : u)
    );
    setOrigenes((anterior) =>
      anterior.map((u, j) => j === i ? null : u)
    );
  }

  function eliminarFoto(i: number) {
    if (bloqueo.current || subidasRef.current > 0) return;

    setFotos((anterior) =>
      anterior.map((u, j) => j === i ? null : u)
    );
    setOrigenes((anterior) =>
      anterior.map((u, j) => j === i ? null : u)
    );
    setQuitar(null);
  }

  function mover(i: number, d: -1 | 1) {
    if (bloqueo.current || subidasRef.current > 0) return;

    const inicio = i < 2 ? 0 : i < 4 ? 2 : 4;
    const fin = i < 2 ? 1 : i < 4 ? 3 : 6;
    const j = i + d;

    if (j < inicio || j > fin) return;

    setFotos((anterior) => {
      const copia = [...anterior];
      [copia[i], copia[j]] = [copia[j], copia[i]];
      return copia;
    });

    setOrigenes((anterior) => {
      const copia = [...anterior];
      [copia[i], copia[j]] = [copia[j], copia[i]];
      return copia;
    });
  }

  async function guardarDescripcion(
    seccion: "dama" | "varon",
    bullets: BulletItem[]
  ) {
    const respuesta = await fetch(
      "/api/admin/uniformes/" +
        encodeURIComponent(inicial.id) +
        "/contenido",
      {
        method: "PATCH",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ seccion, bullets }),
      }
    );

    const resultado = await respuesta.json().catch(() => ({}));

    if (!respuesta.ok || resultado.ok !== true) {
      throw new Error(
        resultado.error || "No se guardó la descripción"
      );
    }
  }

  async function guardar() {
    if (
      bloqueo.current ||
      subidasRef.current > 0 ||
      !pendiente
    ) return;

    let bulletsDama: BulletItem[] | null = null;
    let bulletsVaron: BulletItem[] | null = null;

    try {
      if (cambioDama) {
        bulletsDama = textoADescripcion(textoDama);
      }
      if (cambioVaron) {
        bulletsVaron = textoADescripcion(textoVaron);
      }
    } catch (e) {
      mostrar(
        e instanceof Error
          ? e.message
          : "Revisá la descripción",
        "error"
      );
      return;
    }

    bloqueo.current = true;
    setGuardando(true);

    let guardadoParcial = false;

    try {
      if (cambioDama) {
        await guardarDescripcion("dama", bulletsDama ?? []);
        setBaseDama(textoDama);
        guardadoParcial = true;
      }

      if (cambioVaron) {
        await guardarDescripcion("varon", bulletsVaron ?? []);
        setBaseVaron(textoVaron);
        guardadoParcial = true;
      }

      if (cambioFotos) {
        const datos = Object.fromEntries(
          SLOTS.map((s, i) => [s.campo, fotos[i]])
        );

        const respuesta = await fetch(
          "/api/admin/uniformes/" +
            encodeURIComponent(inicial.id) +
            "/fotos",
          {
            method: "PATCH",
            credentials: "same-origin",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fotos: datos,
              origenes,
            }),
          }
        );

        const resultado = await respuesta
          .json()
          .catch(() => ({}));

        if (!respuesta.ok || resultado.ok !== true) {
          throw new Error(
            resultado.error || "No se guardaron las fotografías"
          );
        }

        const nuevosOrigenes = fotos.map(
          (url, i) => url ? i : null
        );

        setBaseFotos(JSON.stringify(fotos));
        setOrigenes(nuevosOrigenes);
        setBaseOrigenes(JSON.stringify(nuevosOrigenes));

        guardadoParcial = true;
      }

      mostrar("Cambios guardados correctamente en Neon");
      router.refresh();

    } catch (e) {
      const detalle =
        e instanceof Error ? e.message : "Error de conexión";

      mostrar(
        (guardadoParcial
          ? "Guardado parcial. "
          : "No se pudo guardar. ") + detalle,
        "error"
      );
    } finally {
      bloqueo.current = false;
      setGuardando(false);
    }
  }

  const indices =
    pestana === "dama"
      ? [0, 1]
      : pestana === "varon"
        ? [2, 3]
        : [4, 5, 6];

  const guardadas = JSON.parse(baseFotos) as (string | null)[];
  const fuentesGuardadas = JSON.parse(baseOrigenes) as
    (number | null)[];

  return (
    <>
      <Aviso aviso={aviso} />

      <Titulo
        titulo={"Uniforme " + inicial.nombre}
        sub="Editá las descripciones y fotografías de la tienda"
      />

      <Pestanas
        valor={pestana}
        onCambiar={setPestana}
        opciones={[
          { id: "dama", label: "Dama" },
          { id: "varon", label: "Varón" },
          { id: "extras", label: "Fotos adicionales" },
        ]}
      />

      <div className="space-y-4">
        <Tarjeta>
          <SeccionTitulo>
            {pestana === "dama"
              ? "Uniforme Dama"
              : pestana === "varon"
                ? "Uniforme Varón"
                : "Fotografías adicionales"}
          </SeccionTitulo>

          <p className="mb-4 text-xs text-carbon/60">
            Tocá una foto para cambiarla.
            Usá las flechas para ordenar las imágenes.
          </p>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {indices.map((i) => {
              const limiteInferior = indices[0];
              const limiteSuperior = indices[indices.length - 1];

              return (
                <FotoSlot
                  key={SLOTS[i].campo}
                  etiqueta={SLOTS[i].nombre}
                  src={fotos[i] ?? undefined}
                  pendiente={
                    fotos[i] !== guardadas[i] ||
                    origenes[i] !== fuentesGuardadas[i]
                  }
                  puedeIzq={i > limiteInferior}
                  puedeDer={i < limiteSuperior}
                  bloqueada={bloqueado}
                  onSubidaCambiar={registrarSubida}
                  onElegir={(url) => elegir(i, url)}
                  onQuitar={() => setQuitar(i)}
                  onMover={(d) => mover(i, d)}
                />
              );
            })}
          </div>
        </Tarjeta>

        {pestana !== "extras" && (
          <Tarjeta>
            <SeccionTitulo>
              Descripción del uniforme
            </SeccionTitulo>

            <p className="mb-4 text-xs text-carbon/60">
              Estos son los textos que aparecen
              debajo de las fotos en la tienda.
            </p>

            <label
              htmlFor="descripcion-uniforme"
              className="mb-2 block text-sm font-semibold text-bordo"
            >
              Escribí o pegá la descripción completa
            </label>

            <textarea
              id="descripcion-uniforme"
              key={pestana}
              rows={15}
              spellCheck
              value={
                pestana === "dama"
                  ? textoDama
                  : textoVaron
              }
              onChange={(e) => {
                if (pestana === "dama") {
                  setTextoDama(e.target.value);
                } else {
                  setTextoVaron(e.target.value);
                }
              }}
              className="min-h-80 w-full resize-y rounded-2xl border border-bordo/20 bg-white p-4 text-sm leading-7 text-carbon outline-none transition focus:border-bronce focus:ring-2 focus:ring-bronce/15"
              placeholder="• Escribí el primer punto de la descripción..."
              aria-describedby="ayuda-descripcion"
            />

            <p
              id="ayuda-descripcion"
              className="mt-3 text-xs leading-5 text-carbon/60"
            >
              Cada punto comienza con •. Para opciones dentro
              de un punto usá ◦ y para observaciones usá Nota:.
              Podés copiar y pegar todo el texto.
            </p>

            <details className="mt-4 rounded-xl border border-bordo/10 bg-papel/60 p-3">
              <summary className="cursor-pointer text-xs font-semibold text-bordo">
                Vista previa del texto
              </summary>
              <div className="mt-3 whitespace-pre-wrap text-sm leading-6 text-carbon">
                {pestana === "dama" ? textoDama : textoVaron}
              </div>
            </details>
          </Tarjeta>
        )}
      </div>

      <BarraGuardar
        sucio={pendiente && !bloqueado}
        onGuardar={guardar}
        etiqueta={
          guardando
            ? "Guardando..."
            : subidas > 0
              ? "Subiendo fotos..."
              : "Guardar cambios"
        }
      />

      <Confirmar
        abierto={quitar !== null}
        titulo="¿Quitar esta fotografía?"
        texto="El cambio se aplicará cuando pulses Guardar."
        onCancelar={() => setQuitar(null)}
        onOk={() => {
          if (quitar !== null) eliminarFoto(quitar);
        }}
      />
    </>
  );
}
