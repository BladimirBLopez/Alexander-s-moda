"use client";

import { useEffect, useRef, useState } from "react";
import { Aviso, useAviso } from "@/components/admin/aviso";
import Confirmar from "@/components/admin/Confirmar";
import {
  BotonIcono,
  BotonPrimario,
  BotonSecundario,
  Campo,
  Pestanas,
  SeccionTitulo,
  Tarjeta,
  inputCls,
} from "@/components/admin/ui";
import {
  PROFORMA_INICIAL,
  datosValidos,
  type DatosProforma,
  type Oferta,
} from "@/lib/proforma-datos";
import { crearPdfDeJpeg } from "@/lib/proforma-pdf";
import {
  ALTO,
  ANCHO,
  ESCALA,
  dibujarProforma,
  type Imagenes,
} from "@/lib/proforma-render";

const CLAVE = "proforma-borrador-v1";

function cargarImagen(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

async function esperarFuentes() {
  const fuentes = [
    "16.5px Tinos",
    "italic 700 16.5px Tinos",
    "13.5px Arimo",
    "italic 700 13.5px Arimo",
    "700 13.5px Arimo",
    "15px Arimo",
    "700 15px Arimo",
  ];
  try {
    await Promise.race([
      Promise.all(fuentes.map((f) => document.fonts.load(f))),
      new Promise((r) => setTimeout(r, 3500)),
    ]);
  } catch {
    /* si fallan, se usan las fuentes de respaldo */
  }
}

function slug(t: string) {
  return (
    t
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "nueva"
  );
}

function descargar(blob: Blob, nombre: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = nombre;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

export default function GeneradorProforma() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgs = useRef<Imagenes>({ logo: null, firma: null, sello: null });

  const [datos, setDatos] = useState<DatosProforma>(PROFORMA_INICIAL);
  const [cargado, setCargado] = useState(false);
  const [listo, setListo] = useState(false);
  const [desborda, setDesborda] = useState(false);
  const [vista, setVista] = useState<"editar" | "previa">("editar");
  const [fase, setFase] = useState("");
  const [ocupado, setOcupado] = useState(false);
  const [confReset, setConfReset] = useState(false);
  const [quitarOferta, setQuitarOferta] = useState<number | null>(null);
  const { aviso, mostrar } = useAviso();
  const bloqueo = useRef(false);

  const set = <K extends keyof DatosProforma>(k: K, v: DatosProforma[K]) =>
    setDatos((d) => ({ ...d, [k]: v }));

  // Borrador guardado en este navegador
  useEffect(() => {
    try {
      const raw = localStorage.getItem(CLAVE);
      const v = raw ? datosValidos(JSON.parse(raw)) : null;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (v) setDatos(v);
    } catch {
      /* sin borrador */
    }
    setCargado(true);
  }, []);

  useEffect(() => {
    if (!cargado) return;
    try {
      localStorage.setItem(CLAVE, JSON.stringify(datos));
    } catch {
      /* almacenamiento no disponible */
    }
  }, [datos, cargado]);

  // Fuentes e imágenes
  useEffect(() => {
    let vivo = true;
    (async () => {
      await esperarFuentes();
      const [logo, firma, sello] = await Promise.all([
        cargarImagen("/proforma/logo-blanco.png"),
        cargarImagen("/proforma/firma.png"),
        cargarImagen("/proforma/sello.png"),
      ]);
      if (!vivo) return;
      imgs.current = { logo, firma, sello };
      setListo(true);
    })();
    return () => {
      vivo = false;
    };
  }, []);

  // Dibujo de la hoja
  useEffect(() => {
    const c = canvasRef.current;
    if (!c || !listo) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const r = dibujarProforma(ctx, datos, imgs.current);
    setDesborda(r.desborda);
  }, [datos, listo]);

  const nombreBase = () => "proforma-alexanders-moda-" + slug(datos.ciudadFecha);

  const blobCanvas = (tipo: string, calidad?: number) =>
    new Promise<Blob>((resolve, reject) => {
      const c = canvasRef.current;
      if (!c) return reject(new Error("La hoja todavía no está lista"));
      c.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("No se pudo generar el archivo"))),
        tipo,
        calidad,
      );
    });

  async function crearPdf(): Promise<File> {
    const c = canvasRef.current;
    if (!c || !listo) throw new Error("La hoja todavía no está lista");
    const jpg = await blobCanvas("image/jpeg", 0.92);
    const bytes = new Uint8Array(await jpg.arrayBuffer());
    const pdf = crearPdfDeJpeg(bytes, c.width, c.height);
    return new File([pdf], nombreBase() + ".pdf", { type: "application/pdf" });
  }

  async function accion(fn: () => Promise<void>) {
    if (bloqueo.current) return;
    bloqueo.current = true;
    setOcupado(true);
    try {
      await fn();
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") return;
      mostrar(e instanceof Error ? e.message : "Algo salió mal", "error");
    } finally {
      bloqueo.current = false;
      setOcupado(false);
      setFase("");
    }
  }

  const bajarPdf = () =>
    accion(async () => {
      descargar(await crearPdf(), nombreBase() + ".pdf");
      mostrar("PDF descargado");
    });

  const bajarPng = () =>
    accion(async () => {
      descargar(await blobCanvas("image/png"), nombreBase() + ".png");
      mostrar("PNG descargado");
    });

  const compartir = () =>
    accion(async () => {
      const pdf = await crearPdf();
      const png = new File([await blobCanvas("image/png")], nombreBase() + ".png", {
        type: "image/png",
      });
      const payload = { files: [pdf, png], title: "Proforma Alexander's Moda" };
      if (!navigator.canShare || !navigator.canShare(payload)) {
        throw new Error("Este navegador no permite compartir archivos. Usá Descargar.");
      }
      await navigator.share(payload);
    });

  // Ofertas
  const setOferta = (i: number, parche: Partial<Oferta>) =>
    set(
      "ofertas",
      datos.ofertas.map((o, k) => (k === i ? { ...o, ...parche } : o)),
    );

  const moverOferta = (i: number, d: -1 | 1) => {
    const j = i + d;
    if (j < 0 || j >= datos.ofertas.length) return;
    const copia = [...datos.ofertas];
    [copia[i], copia[j]] = [copia[j], copia[i]];
    set("ofertas", copia);
  };

  // Notas
  const setNota = (i: number, v: string) =>
    set(
      "notas",
      datos.notas.map((n, k) => (k === i ? v : n)),
    );

  const moverNota = (i: number, d: -1 | 1) => {
    const j = i + d;
    if (j < 0 || j >= datos.notas.length) return;
    const copia = [...datos.notas];
    [copia[i], copia[j]] = [copia[j], copia[i]];
    set("notas", copia);
  };

  return (
    <>
      <Aviso aviso={aviso} />

      <Pestanas
        valor={vista}
        onCambiar={setVista}
        opciones={[
          { id: "editar", label: "Editar" },
          { id: "previa", label: "Vista previa" },
        ]}
      />

      {/* Vista previa: el canvas queda montado siempre para poder exportar */}
      <div className={vista === "previa" ? "" : "hidden"}>
        {desborda && (
          <p className="mb-3 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-800">
            ⚠ El contenido no entra en la hoja y se pisa con el pie de página.
            Acortá textos o quitá líneas.
          </p>
        )}
        {!listo && (
          <p className="mb-3 text-center text-xs text-carbon/50">
            Preparando la hoja…
          </p>
        )}
        <div className="mx-auto max-w-[540px] overflow-hidden rounded-sm border border-bordo/15 bg-white shadow-lg">
          <canvas
            ref={canvasRef}
            width={ANCHO * ESCALA}
            height={ALTO * ESCALA}
            className="block h-auto w-full"
          />
        </div>

        <div className="mx-auto mt-4 grid max-w-[540px] grid-cols-2 gap-2">
          <BotonPrimario disabled={!listo || ocupado} onClick={bajarPdf}>
            Descargar PDF
          </BotonPrimario>
          <BotonSecundario disabled={!listo || ocupado} onClick={bajarPng}>
            Descargar PNG
          </BotonSecundario>
          <BotonSecundario disabled={!listo || ocupado} onClick={compartir}>
            Compartir…
          </BotonSecundario>
        </div>

        <p className="mt-3 text-center text-xs text-carbon/55" aria-live="polite">
          {fase ||
            "El PDF es una imagen de la hoja, igual que la proforma actual."}
        </p>
      </div>

      {vista === "editar" && (
        <div className="space-y-4">
          <Tarjeta>
            <SeccionTitulo>Encabezado de la carta</SeccionTitulo>
            <div className="space-y-3">
              <Campo label="Ciudad y fecha">
                <input
                  value={datos.ciudadFecha}
                  onChange={(e) => set("ciudadFecha", e.target.value)}
                  className={inputCls}
                />
              </Campo>
              <Campo label="Destinatario (un renglón por línea)">
                <textarea
                  rows={3}
                  value={datos.destinatario}
                  onChange={(e) => set("destinatario", e.target.value)}
                  className={inputCls}
                />
              </Campo>
              <Campo label="Referencia (va subrayada)">
                <input
                  value={datos.ref}
                  onChange={(e) => set("ref", e.target.value)}
                  className={inputCls}
                />
              </Campo>
            </div>
          </Tarjeta>

          <Tarjeta>
            <SeccionTitulo>Texto de la carta</SeccionTitulo>
            <div className="space-y-3">
              <Campo label="Saludo">
                <input
                  value={datos.saludo}
                  onChange={(e) => set("saludo", e.target.value)}
                  className={inputCls}
                />
              </Campo>
              <Campo label="Párrafo principal">
                <textarea
                  rows={5}
                  value={datos.cuerpo}
                  onChange={(e) => set("cuerpo", e.target.value)}
                  className={inputCls}
                />
              </Campo>
              <p className="-mt-1 text-[11px] text-carbon/55">
                Para resaltar en negrita, poné el texto entre dos asteriscos:
                **así**.
              </p>
              <Campo label="Frase antes de las ofertas">
                <input
                  value={datos.intro}
                  onChange={(e) => set("intro", e.target.value)}
                  className={inputCls}
                />
              </Campo>
            </div>
          </Tarjeta>

          <Tarjeta>
            <div className="mb-3 flex items-center justify-between">
              <SeccionTitulo>Ofertas ({datos.ofertas.length})</SeccionTitulo>
              <BotonSecundario
                onClick={() =>
                  set("ofertas", [
                    ...datos.ofertas,
                    { titulo: "", lineas: [""], costo: "" },
                  ])
                }
              >
                + Oferta
              </BotonSecundario>
            </div>
            <div className="space-y-3">
              {datos.ofertas.map((o, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-bordo/10 bg-papel/60 p-3"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-semibold text-bordo">
                      Oferta {i + 1}
                    </span>
                    <div className="flex gap-1">
                      <BotonIcono
                        label="Subir"
                        onClick={() => moverOferta(i, -1)}
                        disabled={i === 0}
                      >
                        ↑
                      </BotonIcono>
                      <BotonIcono
                        label="Bajar"
                        onClick={() => moverOferta(i, 1)}
                        disabled={i === datos.ofertas.length - 1}
                      >
                        ↓
                      </BotonIcono>
                      <BotonIcono
                        label="Quitar oferta"
                        onClick={() => setQuitarOferta(i)}
                      >
                        ✕
                      </BotonIcono>
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    <Campo label="Título de la tabla">
                      <input
                        value={o.titulo}
                        onChange={(e) => setOferta(i, { titulo: e.target.value })}
                        className={inputCls}
                      />
                    </Campo>
                    <Campo label="Prendas (una por línea)">
                      <textarea
                        rows={Math.min(8, Math.max(3, o.lineas.length + 1))}
                        value={o.lineas.join("\n")}
                        onChange={(e) =>
                          setOferta(i, { lineas: e.target.value.split("\n") })
                        }
                        className={inputCls}
                      />
                    </Campo>
                    <Campo label="Costo">
                      <input
                        value={o.costo}
                        onChange={(e) => setOferta(i, { costo: e.target.value })}
                        placeholder="Bs 565.-"
                        className={inputCls}
                      />
                    </Campo>
                  </div>
                </div>
              ))}
              {datos.ofertas.length === 0 && (
                <p className="py-3 text-center text-xs text-carbon/45">
                  Sin ofertas. Tocá “+ Oferta” para agregar una.
                </p>
              )}
            </div>
          </Tarjeta>

          <Tarjeta>
            <div className="mb-3 flex items-center justify-between">
              <SeccionTitulo>Obsequios y notas</SeccionTitulo>
              <BotonSecundario onClick={() => set("notas", [...datos.notas, ""])}>
                + Nota
              </BotonSecundario>
            </div>
            <div className="space-y-2.5">
              {datos.notas.map((n, i) => (
                <div key={i} className="flex items-start gap-2">
                  <textarea
                    rows={2}
                    value={n}
                    onChange={(e) => setNota(i, e.target.value)}
                    className={inputCls}
                  />
                  <div className="flex flex-col gap-1">
                    <BotonIcono
                      label="Subir"
                      onClick={() => moverNota(i, -1)}
                      disabled={i === 0}
                    >
                      ↑
                    </BotonIcono>
                    <BotonIcono
                      label="Bajar"
                      onClick={() => moverNota(i, 1)}
                      disabled={i === datos.notas.length - 1}
                    >
                      ↓
                    </BotonIcono>
                    <BotonIcono
                      label="Quitar"
                      onClick={() =>
                        set(
                          "notas",
                          datos.notas.filter((_, k) => k !== i),
                        )
                      }
                    >
                      ✕
                    </BotonIcono>
                  </div>
                </div>
              ))}
            </div>
          </Tarjeta>

          <Tarjeta>
            <SeccionTitulo>Cierre y firma</SeccionTitulo>
            <div className="space-y-3">
              <Campo label="Despedida">
                <textarea
                  rows={2}
                  value={datos.despedida}
                  onChange={(e) => set("despedida", e.target.value)}
                  className={inputCls}
                />
              </Campo>
              <Campo label="Cierre">
                <input
                  value={datos.cierre}
                  onChange={(e) => set("cierre", e.target.value)}
                  className={inputCls}
                />
              </Campo>
              <div className="grid gap-3 sm:grid-cols-3">
                <Campo label="Nombre">
                  <input
                    value={datos.firmante}
                    onChange={(e) => set("firmante", e.target.value)}
                    className={inputCls}
                  />
                </Campo>
                <Campo label="Cargo">
                  <input
                    value={datos.cargo}
                    onChange={(e) => set("cargo", e.target.value)}
                    className={inputCls}
                  />
                </Campo>
                <Campo label="Empresa">
                  <input
                    value={datos.empresa}
                    onChange={(e) => set("empresa", e.target.value)}
                    className={inputCls}
                  />
                </Campo>
              </div>
              <div className="flex flex-wrap gap-4 pt-1">
                <label className="flex items-center gap-2 text-sm text-carbon/80">
                  <input
                    type="checkbox"
                    checked={datos.mostrarFirma}
                    onChange={(e) => set("mostrarFirma", e.target.checked)}
                    className="h-4 w-4 accent-[#500F13]"
                  />
                  Mostrar firma
                </label>
                <label className="flex items-center gap-2 text-sm text-carbon/80">
                  <input
                    type="checkbox"
                    checked={datos.mostrarSello}
                    onChange={(e) => set("mostrarSello", e.target.checked)}
                    className="h-4 w-4 accent-[#500F13]"
                  />
                  Mostrar sello
                </label>
              </div>
            </div>
          </Tarjeta>

          <Tarjeta>
            <SeccionTitulo>Pie de página</SeccionTitulo>
            <Campo label="Direcciones (un renglón por línea; **negrita** entre asteriscos)">
              <textarea
                rows={3}
                value={datos.pie}
                onChange={(e) => set("pie", e.target.value)}
                className={inputCls}
              />
            </Campo>
          </Tarjeta>

          <div className="flex flex-wrap items-center justify-between gap-3 pb-2">
            <BotonSecundario
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(JSON.stringify(datos));
                  mostrar("Datos copiados");
                } catch {
                  mostrar("No se pudo copiar");
                }
              }}
            >
              Copiar datos
            </BotonSecundario>
            <BotonSecundario onClick={() => setConfReset(true)}>
              Volver a la proforma original
            </BotonSecundario>
            <BotonPrimario onClick={() => setVista("previa")}>
              Ver vista previa
            </BotonPrimario>
          </div>
          <p className="text-center text-[11px] text-carbon/45">
            Tus cambios se guardan solos en este navegador.
          </p>
        </div>
      )}

      <Confirmar
        abierto={quitarOferta !== null}
        titulo="¿Quitar esta oferta?"
        texto={
          quitarOferta !== null
            ? `Se quita “${datos.ofertas[quitarOferta]?.titulo || "oferta sin título"}” de la proforma.`
            : undefined
        }
        textoOk="Quitar"
        onCancelar={() => setQuitarOferta(null)}
        onOk={() => {
          if (quitarOferta !== null)
            set(
              "ofertas",
              datos.ofertas.filter((_, k) => k !== quitarOferta),
            );
          setQuitarOferta(null);
        }}
      />
      <Confirmar
        abierto={confReset}
        titulo="¿Volver a la proforma original?"
        texto="Se pierden los cambios que hiciste en este borrador."
        textoOk="Restablecer"
        onCancelar={() => setConfReset(false)}
        onOk={() => {
          setDatos(PROFORMA_INICIAL);
          setConfReset(false);
          mostrar("Proforma restablecida");
        }}
      />
    </>
  );
}
