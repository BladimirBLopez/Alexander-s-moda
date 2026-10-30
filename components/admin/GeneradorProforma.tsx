"use client";

import { useEffect, useRef, useState } from "react";
import { Aviso, useAviso } from "@/components/admin/aviso";
import Confirmar from "@/components/admin/Confirmar";
import Selector from "@/components/admin/Selector";
import {
  BotonIcono,
  BotonPrimario,
  BotonSecundario,
  Campo,
  SeccionTitulo,
  Tarjeta,
  inputCls,
} from "@/components/admin/ui";
import {
  PROFORMA_INICIAL,
  PROFORMA_OCTUBRE,
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

const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

function mesAnio(t: string) {
  const txt = t.toLowerCase();
  const m = MESES.findIndex((x) => txt.includes(x));
  const a = txt.match(/20[0-9][0-9]/);
  const hoy = new Date();
  return {
    mes: m >= 0 ? m : hoy.getMonth(),
    anio: a ? Number(a[0]) : hoy.getFullYear(),
  };
}

function opcionesAnio(actual: number) {
  const y = new Date().getFullYear();
  return Array.from(new Set([y, y + 1, actual])).sort((a, b) => a - b);
}

function armarFecha(mes: number, anio: number) {
  return "Santa Cruz " + MESES[mes] + " " + anio;
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
  const hojaRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (vista !== "previa") return;
    hojaRef.current?.scrollIntoView({ block: "start" });
  }, [vista]);
  const [fase, setFase] = useState("");
  const [ocupado, setOcupado] = useState(false);
  const [confReset, setConfReset] = useState(false);
  const [confOctubre, setConfOctubre] = useState(false);
  const [modeloOcupado, setModeloOcupado] = useState(false);
  const [quitarOferta, setQuitarOferta] = useState<number | null>(null);
  const [guardado, setGuardado] = useState<"guardando" | "ok" | "error">("ok");
  const [conflicto, setConflicto] = useState(false);
  const versionRef = useRef(0);
  const nubeOk = useRef(false);
  const ultimo = useRef("");
  const subiendo = useRef(false);
  const pendiente = useRef(false);
  const datosRef = useRef<DatosProforma | null>(null);
  const { aviso, mostrar } = useAviso();
  const bloqueo = useRef(false);

  const set = <K extends keyof DatosProforma>(k: K, v: DatosProforma[K]) =>
    setDatos((d) => ({ ...d, [k]: v }));

  // Borrador compartido en la nube; el celular es respaldo
  const URL_BORRADOR = "/api/admin/proforma-borrador";

  async function subir() {
    if (subiendo.current) {
      pendiente.current = true;
      return;
    }
    subiendo.current = true;
    try {
      do {
        pendiente.current = false;
        const snap = datosRef.current;
        if (!snap) break;
        const txt = JSON.stringify(snap);
        if (!nubeOk.current) {
          const r0 = await fetch(URL_BORRADOR, { cache: "no-store" });
          const j0 = await r0.json();
          if (!(j0?.ok === true && typeof j0.version === "number")) {
            throw new Error("lectura");
          }
          versionRef.current = j0.version;
          nubeOk.current = true;
          const n0 = j0.datos ? datosValidos(j0.datos) : null;
          if (n0 && JSON.stringify(n0) !== txt) {
            setConflicto(true);
            setGuardado("error");
            return;
          }
        }
        if (txt === ultimo.current) continue;
        const r = await fetch(URL_BORRADOR, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ datos: snap, base: versionRef.current }),
        });
        const j = await r.json().catch(() => null);
        if (r.status === 409 && j?.conflicto) {
          setConflicto(true);
          setGuardado("error");
          return;
        }
        if (!r.ok || j?.ok !== true || typeof j.version !== "number") {
          throw new Error("guardar");
        }
        versionRef.current = j.version;
        ultimo.current = txt;
      } while (pendiente.current);
      setGuardado("ok");
    } catch {
      setGuardado("error");
    } finally {
      subiendo.current = false;
    }
  }

  async function cargarNube() {
    setConflicto(false);
    try {
      const r = await fetch(URL_BORRADOR, { cache: "no-store" });
      const j = await r.json();
      if (j?.ok === true && typeof j.version === "number") {
        versionRef.current = j.version;
        nubeOk.current = true;
        const n = j.datos ? datosValidos(j.datos) : null;
        if (n) {
          ultimo.current = JSON.stringify(n);
          setDatos(n);
        }
        setGuardado("ok");
        mostrar("Versión de la nube cargada");
      } else {
        setGuardado("error");
      }
    } catch {
      setGuardado("error");
    }
  }

  async function mantenerMia() {
    setConflicto(false);
    try {
      const r = await fetch(URL_BORRADOR, { cache: "no-store" });
      const j = await r.json();
      if (j?.ok === true && typeof j.version === "number") {
        versionRef.current = j.version;
        nubeOk.current = true;
        await subir();
      } else {
        setGuardado("error");
      }
    } catch {
      setGuardado("error");
    }
  }

  useEffect(() => {
    let vivo = true;
    let local: DatosProforma | null = null;
    try {
      const raw = localStorage.getItem(CLAVE);
      local = raw ? datosValidos(JSON.parse(raw)) : null;
    } catch {
      local = null;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (local) setDatos(local);
    (async () => {
      try {
        const r = await fetch(URL_BORRADOR, { cache: "no-store" });
        const j = await r.json();
        if (!vivo) return;
        if (j?.ok === true && typeof j.version === "number") {
          versionRef.current = j.version;
          nubeOk.current = true;
          const n = j.datos ? datosValidos(j.datos) : null;
          if (n) {
            ultimo.current = JSON.stringify(n);
            setDatos(n);
          }
        }
      } catch {
        /* sin internet: se usa el borrador del celular */
      }
      if (vivo) setCargado(true);
    })();
    return () => {
      vivo = false;
    };
  }, []);

  useEffect(() => {
    if (!cargado) return;
    datosRef.current = datos;
    try {
      localStorage.setItem(CLAVE, JSON.stringify(datos));
    } catch {
      /* almacenamiento no disponible */
    }
    if (JSON.stringify(datos) === ultimo.current) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setGuardado("guardando");
    const t = setTimeout(() => {
      void subir();
    }, 1500);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datos, cargado]);

  // Al salir o cerrar: enviar lo pendiente
  useEffect(() => {
    const enviar = () => {
      const snap = datosRef.current;
      if (!snap || !nubeOk.current || subiendo.current) return;
      const txt = JSON.stringify(snap);
      if (txt === ultimo.current) return;
      try {
        fetch(URL_BORRADOR, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ datos: snap, base: versionRef.current }),
          keepalive: true,
        }).catch(() => {});
        versionRef.current += 1;
        ultimo.current = txt;
      } catch {
        /* sin envio */
      }
    };
    const oculta = () => {
      if (document.visibilityState === "hidden") enviar();
    };
    document.addEventListener("visibilitychange", oculta);
    window.addEventListener("pagehide", enviar);
    return () => {
      document.removeEventListener("visibilitychange", oculta);
      window.removeEventListener("pagehide", enviar);
      enviar();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Si falla (sin conflicto), reintenta solo cada 15 s
  useEffect(() => {
    if (guardado !== "error" || conflicto) return;
    const id = setInterval(() => {
      void subir();
    }, 15000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guardado, conflicto]);

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

  async function publicarEnSitio(pdf: File) {
    type Firma = {
      ok?: boolean;
      error?: string;
      cloudName?: string;
      apiKey?: string;
      timestamp?: number;
      signature?: string;
      publicId?: string;
      maxBytes?: number;
    };
    setFase("Publicando en el sitio...");
    const rf = await fetch("/api/admin/proforma", { cache: "no-store" });
    const f: Firma = await rf.json().catch(() => ({}));
    if (
      !rf.ok ||
      f.ok !== true ||
      f.cloudName !== "dkq95jus0" ||
      !f.apiKey ||
      !f.signature ||
      !f.timestamp ||
      !f.publicId
    ) {
      throw new Error(f.error || "No se pudo autorizar la publicación");
    }
    if (f.maxBytes && pdf.size > f.maxBytes) {
      throw new Error("El PDF supera el límite de 10 MB");
    }
    const fd = new FormData();
    fd.append("file", pdf);
    fd.append("api_key", f.apiKey);
    fd.append("timestamp", String(f.timestamp));
    fd.append("signature", f.signature);
    fd.append("public_id", f.publicId);
    const rc = await fetch(
      "https://api.cloudinary.com/v1_1/" + f.cloudName + "/image/upload",
      { method: "POST", body: fd },
    );
    const sub: { secure_url?: string; error?: { message?: string } } =
      await rc.json().catch(() => ({}));
    if (!rc.ok || !sub.secure_url) {
      throw new Error(sub.error?.message || "Cloudinary no pudo recibir el PDF");
    }
    const rp = await fetch("/api/admin/proforma", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ publicId: f.publicId }),
    });
    const r: { ok?: boolean; error?: string } = await rp
      .json()
      .catch(() => ({}));
    if (!rp.ok || r.ok !== true) {
      throw new Error(r.error || "No se pudo confirmar la publicación");
    }
  }

  async function publicarYAvisar(pdf: File, texto: string) {
    try {
      await publicarEnSitio(pdf);
      mostrar(texto + " y publicado en el sitio");
    } catch (e) {
      mostrar(
        texto +
          ", pero no se pudo publicar (el sitio sigue con la proforma anterior): " +
          (e instanceof Error ? e.message : "error desconocido"),
        "error",
      );
    }
  }

  const bajarPdf = () =>
    accion(async () => {
      const pdf = await crearPdf();
      descargar(pdf, nombreBase() + ".pdf");
      await publicarYAvisar(pdf, "PDF descargado");
    });

  const bajarPng = () =>
    accion(async () => {
      const png = await blobCanvas("image/png");
      const pdf = await crearPdf();
      descargar(png, nombreBase() + ".png");
      await publicarYAvisar(pdf, "PNG descargado");
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
      await publicarYAvisar(pdf, "Compartido");
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

      <div className="sticky top-16 z-20 -mx-4 mb-4 flex items-center justify-between gap-2 border-b border-bordo/15 bg-white px-4 py-2 shadow-sm sm:-mx-6 sm:px-6 md:-mx-8 md:px-8">
        <div
          className="flex min-w-0 items-center gap-2 text-xs"
          aria-live="polite"
        >
          {guardado === "guardando" ? (
            <>
              <span className="h-3.5 w-3.5 shrink-0 animate-spin rounded-full border-2 border-carbon/20 border-t-carbon/60" />
              <span className="text-carbon/60">Guardando...</span>
            </>
          ) : guardado === "error" ? (
            <>
              <span className="font-semibold text-red-700">
                ⚠ No se pudo guardar
              </span>
              <button
                type="button"
                onClick={() => {
                  setGuardado("guardando");
                  void subir();
                }}
                className="boton-tactil shrink-0 rounded-full border border-red-300 bg-white px-3 py-1.5 text-xs font-semibold text-red-700"
              >
                Reintentar
              </button>
            </>
          ) : (
            <span className="truncate font-medium text-green-700">
              ✓ Guardado automático
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={() => {
            setVista(vista === "editar" ? "previa" : "editar");
            if (vista === "previa") window.scrollTo({ top: 0 });
          }}
          className={
            vista === "editar"
              ? "boton-tactil shrink-0 rounded-full bg-bordo px-5 py-2.5 text-sm font-semibold text-hueso"
              : "boton-tactil shrink-0 rounded-full border border-bordo/25 bg-white px-5 py-2.5 text-sm font-semibold text-bordo"
          }
        >
          {vista === "editar" ? "Vista previa" : "Editar"}
        </button>
      </div>

      {vista === "previa" && (
        <div className="fixed inset-x-0 bottom-[calc(4.75rem+env(safe-area-inset-bottom))] z-30 px-3 md:bottom-4">
          <div className="mx-auto flex max-w-[540px] items-center gap-2 rounded-2xl border border-bordo/15 bg-white/95 p-2 shadow-lg backdrop-blur">
            <div className="grid flex-1 grid-cols-3 gap-1.5">
              <button
                type="button"
                disabled={!listo || ocupado}
                onClick={bajarPdf}
                className="boton-tactil rounded-full bg-bordo py-2.5 text-xs font-semibold text-hueso disabled:opacity-40"
              >
                PDF
              </button>
              <button
                type="button"
                disabled={!listo || ocupado}
                onClick={bajarPng}
                className="boton-tactil rounded-full border border-bordo/25 bg-white py-2.5 text-xs font-semibold text-bordo disabled:opacity-40"
              >
                PNG
              </button>
              <button
                type="button"
                disabled={!listo || ocupado}
                onClick={compartir}
                className="boton-tactil rounded-full border border-bordo/25 bg-white py-2.5 text-xs font-semibold text-bordo disabled:opacity-40"
              >
                Compartir
              </button>
            </div>
          </div>
        </div>
      )}



      {/* Vista previa: el canvas queda montado siempre para poder exportar */}
      <div
        ref={hojaRef}
        className={vista === "previa" ? "scroll-mt-32" : "hidden"}
      >
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
        <p className="mx-auto mb-2 max-w-[540px] text-center text-[11px] leading-tight text-bordo/70">
          PDF, PNG y Compartir también publican esta hoja en el
          sitio.
        </p>
        <div className="mx-auto max-w-[540px] overflow-hidden rounded-sm border border-bordo/15 bg-white shadow-lg">
          <canvas
            ref={canvasRef}
            width={ANCHO * ESCALA}
            height={ALTO * ESCALA}
            className="block h-auto w-full"
          />
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
              <div>
                <div className="grid grid-cols-2 gap-3">
                  <Selector
                    label="Mes"
                    valor={mesAnio(datos.ciudadFecha).mes}
                    opciones={MESES.map((m, k) => ({ valor: k, texto: m }))}
                    onChange={(v) =>
                      set(
                        "ciudadFecha",
                        armarFecha(v, mesAnio(datos.ciudadFecha).anio),
                      )
                    }
                  />
                  <Selector
                    label="Año"
                    valor={mesAnio(datos.ciudadFecha).anio}
                    opciones={opcionesAnio(
                      mesAnio(datos.ciudadFecha).anio,
                    ).map((a) => ({ valor: a, texto: String(a) }))}
                    onChange={(v) =>
                      set(
                        "ciudadFecha",
                        armarFecha(mesAnio(datos.ciudadFecha).mes, v),
                      )
                    }
                  />
                </div>
                <p className="mt-1 text-xs text-carbon/60">
                  Sale así: {datos.ciudadFecha}
                </p>
              </div>
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
            <SeccionTitulo>Nota bajo las tablas</SeccionTitulo>
            <Campo label="Texto suelto, sin viñeta (opcional)">
              <textarea
                rows={2}
                value={datos.nota ?? ""}
                onChange={(e) => set("nota", e.target.value)}
                className={inputCls}
              />
            </Campo>
          </Tarjeta>

          <Tarjeta>
            <div className="mb-3 flex items-center justify-between">
              <SeccionTitulo>Obsequios y notas</SeccionTitulo>
              <BotonSecundario onClick={() => set("notas", [...datos.notas, ""])}>
                + Nota
              </BotonSecundario>
            </div>
            <div className="mb-3">
              <Campo label="Título de los obsequios (opcional)">
                <input
                  value={datos.tituloNotas ?? ""}
                  onChange={(e) => set("tituloNotas", e.target.value)}
                  className={inputCls}
                />
              </Campo>
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
            <SeccionTitulo>Condiciones</SeccionTitulo>
            <Campo label="Un renglón por línea, sin viñeta (opcional)">
              <textarea
                rows={3}
                value={(datos.condiciones ?? []).join("\n")}
                onChange={(e) => set("condiciones", e.target.value.split("\n"))}
                className={inputCls}
              />
            </Campo>
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
                if (modeloOcupado) return;
                setModeloOcupado(true);
                try {
                  const r = await fetch("/api/admin/proforma-modelo", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ modelo: datos }),
                  });
                  const j = await r.json().catch(() => null);
                  mostrar(
                    r.ok && j?.ok
                      ? "Modelo guardado"
                      : "No se pudo guardar el modelo",
                  );
                } catch {
                  mostrar("No se pudo guardar el modelo");
                }
                setModeloOcupado(false);
              }}
            >
              {modeloOcupado ? "Guardando..." : "Guardar como modelo"}
            </BotonSecundario>
            <BotonSecundario onClick={() => setConfReset(true)}>
              Volver al modelo
            </BotonSecundario>
            <BotonSecundario onClick={() => setConfOctubre(true)}>
              Cargar hoja de octubre
            </BotonSecundario>
          </div>
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
        abierto={conflicto}
        titulo="Otra persona modificó esta proforma"
        texto="Cargar su versión reemplaza la tuya. Si cancelás, se guarda la tuya encima."
        textoOk="Cargar su versión"
        onCancelar={mantenerMia}
        onOk={cargarNube}
      />
      <Confirmar
        abierto={confOctubre}
        titulo="¿Cargar la hoja de octubre?"
        texto="Se reemplaza este borrador por la hoja de octubre. Tu modelo guardado no cambia hasta que toques Guardar como modelo."
        textoOk="Cargar"
        onCancelar={() => setConfOctubre(false)}
        onOk={() => {
          setConfOctubre(false);
          setDatos(PROFORMA_OCTUBRE);
          mostrar("Hoja de octubre cargada");
        }}
      />
      <Confirmar
        abierto={confReset}
        titulo="¿Volver al modelo?"
        texto="Se pierden los cambios de este borrador y vuelve tu modelo guardado."
        textoOk="Volver"
        onCancelar={() => setConfReset(false)}
        onOk={async () => {
          setConfReset(false);
          let leido = false;
          let m: DatosProforma | null = null;
          try {
            const r = await fetch("/api/admin/proforma-modelo", {
              cache: "no-store",
            });
            const j = await r.json();
            leido = j?.ok === true;
            m = leido ? datosValidos(j.modelo) : null;
          } catch {
            leido = false;
          }
          if (!leido) {
            mostrar("No se pudo leer el modelo");
            return;
          }
          setDatos(m ?? PROFORMA_INICIAL);
          mostrar(
            m
              ? "Modelo restaurado"
              : "Aun no hay modelo guardado: se uso la proforma inicial",
          );
        }}
      />
    </>
  );
}
