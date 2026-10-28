"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

type Paso = {
  titulo: string;
  descripcion: string;
};

function obtenerTutorial(ruta: string): {
  titulo: string;
  pasos: Paso[];
} {
  if (
    ruta.startsWith("/admin/uniformes/") &&
    !ruta.endsWith("/nuevo")
  ) {
    return {
      titulo: "Editar un uniforme",
      pasos: [
        {
          titulo: "Elegí Dama o Varón",
          descripcion:
            "Las pestañas separan las fotografías y la descripción de cada uniforme.",
        },
        {
          titulo: "Cambiá las fotografías",
          descripcion:
            "Tocá Cambiar foto, elegí una imagen y esperá a que termine de subir. También podés ordenar o quitar fotografías.",
        },
        {
          titulo: "Editá la descripción",
          descripcion:
            "Escribí o pegá el texto completo. Usá • para los puntos, ◦ para las opciones y Nota: para las observaciones.",
        },
        {
          titulo: "Revisá los cambios",
          descripcion:
            "Comprobá que los textos y fotografías sean los correctos antes de publicarlos.",
        },
        {
          titulo: "Guardá el contenido",
          descripcion:
            "Pulsá Guardar cambios. Esperá el mensaje de confirmación antes de salir.",
        },
      ],
    };
  }

  if (ruta.startsWith("/admin/uniformes")) {
    return {
      titulo: "Gestionar uniformes",
      pasos: [
        {
          titulo: "Seleccioná un uniforme",
          descripcion:
            "Entrá a Sport o Casimir desde la lista de uniformes.",
        },
        {
          titulo: "Editá su contenido",
          descripcion:
            "Actualizá por separado los textos y fotografías de Dama y Varón.",
        },
        {
          titulo: "Revisá antes de guardar",
          descripcion:
            "Guardá solamente cuando los cambios estén completos.",
        },
      ],
    };
  }

  if (ruta.startsWith("/admin/telas")) {
    return {
      titulo: "Administrar telas",
      pasos: [
        {
          titulo: "Elegí una tela",
          descripcion:
            "Abrí una tela existente para revisar los datos disponibles.",
        },
        {
          titulo: "Actualizá la información",
          descripcion:
            "Modificá únicamente los campos habilitados en el formulario.",
        },
        {
          titulo: "Confirmá el guardado",
          descripcion:
            "Comprobá el mensaje de confirmación antes de volver al listado.",
        },
      ],
    };
  }

  if (ruta.startsWith("/admin/fotos")) {
    return {
      titulo: "Gestionar fotografías",
      pasos: [
        {
          titulo: "Seleccioná las fotografías",
          descripcion:
            "Revisá a qué uniforme pertenece cada imagen.",
        },
        {
          titulo: "Subí o cambiá imágenes",
          descripcion:
            "Elegí las fotografías correspondientes y esperá a que terminen de subir.",
        },
        {
          titulo: "Guardá y revisá",
          descripcion:
            "Confirmá los cambios y comprobá el resultado en el catálogo.",
        },
      ],
    };
  }

  if (ruta.startsWith("/admin/proforma")) {
    return {
      titulo: "Actualizar proforma",
      pasos: [
        {
          titulo: "Prepará el documento",
          descripcion:
            "Seleccioná el archivo PDF de precios que querés mostrar.",
        },
        {
          titulo: "Revisá la vista previa",
          descripcion:
            "Comprobá que corresponda al documento correcto.",
        },
        {
          titulo: "Publicá los cambios",
          descripcion:
            "Utilizá los controles del formulario y esperá la confirmación.",
        },
      ],
    };
  }

  return {
    titulo: "Conocé tu administrador",
    pasos: [
      {
        titulo: "Explorá el panel",
        descripcion:
          "En el inicio encontrás un resumen de uniformes, telas, colores y proforma.",
      },
      {
        titulo: "Editá Sport o Casimir",
        descripcion:
          "Entrá a Uniformes para modificar las descripciones y fotografías.",
      },
      {
        titulo: "Utilizá el menú inferior",
        descripcion:
          "Desde el celular podés cambiar rápidamente entre las principales secciones.",
      },
      {
        titulo: "Verificá los cambios",
        descripcion:
          "Revisá el sitio público después de guardar cualquier modificación.",
      },
    ],
  };
}

export default function AyudaFlotante() {
  const pathname = usePathname();

  const [abierto, setAbierto] = useState(false);
  const [indice, setIndice] = useState(0);

  const tutorial = obtenerTutorial(pathname);
  const actual = Math.min(indice, tutorial.pasos.length - 1);
  const paso = tutorial.pasos[actual];
  const ultimo = actual === tutorial.pasos.length - 1;

  function abrir() {
    setIndice(0);
    setAbierto(true);
  }

  return (
    <>
      <button
        type="button"
        onClick={abrir}
        aria-label="Abrir tutorial de esta sección"
        className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-bordo/15 bg-white px-3.5 py-2 text-xs font-semibold text-bordo shadow-sm transition hover:border-bronce/40 hover:bg-papel focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronce"
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-full border border-hueso/70 text-sm font-bold">
          ?
        </span>
        Tutorial
      </button>

      {abierto && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/55 px-3 pb-4 pt-8 sm:items-center"
          onClick={() => setAbierto(false)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-ayuda-admin"
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85dvh] w-full max-w-lg overflow-y-auto rounded-[24px] bg-white p-5 text-carbon shadow-2xl sm:p-7"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-bronce">
                  Guía paso a paso
                </p>
                <h2
                  id="titulo-ayuda-admin"
                  className="text-xl font-semibold text-bordo"
                >
                  {tutorial.titulo}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setAbierto(false)}
                aria-label="Cerrar tutorial"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-papel text-xl text-bordo"
              >
                ×
              </button>
            </div>

            <div className="mt-5 flex items-center gap-1.5">
              {tutorial.pasos.map((_, i) => (
                <span
                  key={i}
                  className={
                    "h-1.5 flex-1 rounded-full " +
                    (i <= actual ? "bg-bordo" : "bg-bordo/10")
                  }
                />
              ))}
            </div>

            <p className="mt-5 text-xs font-semibold text-bronce">
              Paso {actual + 1} de {tutorial.pasos.length}
            </p>

            <h3 className="mt-2 text-lg font-semibold text-bordo">
              {paso.titulo}
            </h3>

            <p className="mt-3 min-h-20 text-sm leading-7 text-carbon/75">
              {paso.descripcion}
            </p>

            <div className="mt-6 flex items-center justify-between gap-3">
              <button
                type="button"
                disabled={actual === 0}
                onClick={() => setIndice((i) => Math.max(0, i - 1))}
                className="min-h-11 rounded-xl border border-bordo/20 px-4 text-xs font-semibold text-bordo disabled:opacity-35"
              >
                Anterior
              </button>

              <button
                type="button"
                onClick={() => {
                  if (ultimo) {
                    setAbierto(false);
                  } else {
                    setIndice((i) =>
                      Math.min(tutorial.pasos.length - 1, i + 1)
                    );
                  }
                }}
                className="min-h-11 rounded-xl bg-bordo px-5 text-xs font-semibold text-hueso"
              >
                {ultimo ? "Entendido" : "Siguiente"}
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
