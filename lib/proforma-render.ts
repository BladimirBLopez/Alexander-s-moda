import type { DatosProforma, Oferta } from "@/lib/proforma-datos";

export const ANCHO = 850;
export const ALTO = 1100;
export const ESCALA = 2; // 1700 x 2200 px (carta a 200 dpi)

const SERIF = 'Tinos, "Times New Roman", Times, serif';
const SANS = "Arimo, Arial, Helvetica, sans-serif";
const BORDO = "#5a0f13";
const TINTA = "#111";

const X0 = 130; // margen izquierdo
const X1 = 720; // margen derecho
const COL = X1 - X0;
const LH = 18.5;

export type Imagenes = {
  logo: HTMLImageElement | null;
  firma: HTMLImageElement | null;
  sello: HTMLImageElement | null;
};

export type Resultado = { desborda: boolean; yFinal: number };

type Fuentes = { n: string; b: string };
type Pieza = { t: string; b: boolean; sp: boolean };

const SERIF_F: Fuentes = {
  n: `16.5px ${SERIF}`,
  b: `italic 700 16.5px ${SERIF}`,
};
const SERIF_BI: Fuentes = { n: SERIF_F.b, b: SERIF_F.b };
const SANS_PIE: Fuentes = { n: `15px ${SANS}`, b: `700 15px ${SANS}` };
const ITEM_F: Fuentes = {
  n: `italic 700 13.5px ${SANS}`,
  b: `italic 700 13.5px ${SANS}`,
};

function tokenizar(parrafo: string): Pieza[] {
  const piezas: Pieza[] = [];
  const partes = parrafo.split("**");
  let sp = false;
  partes.forEach((parte, i) => {
    const b = i % 2 === 1;
    const trozos = parte.split(/(\s+)/);
    for (const trozo of trozos) {
      if (trozo === "") continue;
      if (/^\s+$/.test(trozo)) {
        sp = true;
      } else {
        piezas.push({ t: trozo, b, sp });
        sp = false;
      }
    }
  });
  return piezas;
}

function medir(ctx: CanvasRenderingContext2D, f: Fuentes, p: Pieza): number {
  ctx.font = p.b ? f.b : f.n;
  return ctx.measureText(p.t).width;
}

function envolver(
  ctx: CanvasRenderingContext2D,
  f: Fuentes,
  texto: string,
  ancho: number,
): Pieza[][] {
  ctx.font = f.n;
  const esp = ctx.measureText(" ").width;
  const lineas: Pieza[][] = [];
  for (const parrafo of texto.split("\n")) {
    let actual: Pieza[] = [];
    let w = 0;
    for (const p of tokenizar(parrafo)) {
      const pw = medir(ctx, f, p);
      const sw = p.sp && actual.length ? esp : 0;
      if (actual.length && p.sp && w + sw + pw > ancho) {
        lineas.push(actual);
        actual = [{ ...p, sp: false }];
        w = pw;
      } else {
        actual.push(actual.length ? p : { ...p, sp: false });
        w += sw + pw;
      }
    }
    lineas.push(actual);
  }
  return lineas;
}

type Alin = "izq" | "centro" | "der" | "just";

function dibujarLinea(
  ctx: CanvasRenderingContext2D,
  f: Fuentes,
  linea: Pieza[],
  x: number,
  y: number,
  ancho: number,
  alin: Alin,
  color = TINTA,
) {
  if (!linea.length) return;
  ctx.font = f.n;
  const esp = ctx.measureText(" ").width;
  const anchos = linea.map((p) => medir(ctx, f, p));
  const huecos = linea.filter((p, i) => i > 0 && p.sp).length;
  const suma = anchos.reduce((a, b) => a + b, 0);
  const espReal = alin === "just" && huecos > 0 ? (ancho - suma) / huecos : esp;
  const total = suma + huecos * (alin === "just" ? espReal : esp);

  let cx = x;
  if (alin === "centro") cx = x + (ancho - total) / 2;
  if (alin === "der") cx = x + ancho - total;

  ctx.fillStyle = color;
  ctx.textAlign = "left";
  linea.forEach((p, i) => {
    if (i > 0 && p.sp) cx += espReal;
    ctx.font = p.b ? f.b : f.n;
    ctx.fillText(p.t, cx, y);
    cx += anchos[i];
  });
}

/** Dibuja un bloque de texto con saltos; devuelve la y de la siguiente línea. */
function bloque(
  ctx: CanvasRenderingContext2D,
  f: Fuentes,
  texto: string,
  x: number,
  y: number,
  ancho: number,
  alin: Alin,
  lh = LH,
): number {
  const lineas = envolver(ctx, f, texto, ancho);
  lineas.forEach((l, i) => {
    const ultima = i === lineas.length - 1;
    dibujarLinea(ctx, f, l, x, y, ancho, alin === "just" && ultima ? "izq" : alin);
    y += lh;
  });
  return y;
}

function tabla(ctx: CanvasRenderingContext2D, o: Oferta, yTop: number): number {
  const xc = 641;
  const hTitulo = 20;
  const hFila = 17.7;

  const lineas = o.lineas
    .filter((l) => l.trim() !== "")
    .flatMap((l) => envolver(ctx, ITEM_F, l, xc - X0 - 18));
  const hItems = Math.max(lineas.length, 1) * hFila + 8;
  const yBase = yTop + hTitulo + hItems;

  ctx.strokeStyle = "#000";
  ctx.lineWidth = 1;
  ctx.strokeRect(X0, yTop, COL, hTitulo + hItems);
  ctx.beginPath();
  ctx.moveTo(xc, yTop);
  ctx.lineTo(xc, yBase);
  ctx.moveTo(X0, yTop + hTitulo);
  ctx.lineTo(X1, yTop + hTitulo);
  ctx.stroke();

  const tit: Fuentes = { n: `700 13.5px ${SANS}`, b: `700 13.5px ${SANS}` };
  const t1 = envolver(ctx, tit, o.titulo, xc - X0 - 8)[0] ?? [];
  dibujarLinea(ctx, tit, t1, X0, yTop + 14.5, xc - X0, "centro");
  dibujarLinea(ctx, tit, tokenizar("COSTO"), xc, yTop + 14.5, X1 - xc, "centro");

  lineas.forEach((l, i) => {
    dibujarLinea(ctx, ITEM_F, l, X0 + 8, yTop + hTitulo + 15 + i * hFila, xc - X0, "izq");
  });

  if (o.costo.trim()) {
    const cf: Fuentes = { n: `700 17.5px ${SANS}`, b: `700 17.5px ${SANS}` };
    const yc = yTop + hTitulo + hItems / 2 + 6;
    dibujarLinea(ctx, cf, tokenizar(o.costo), xc, yc, X1 - xc, "centro");
  }
  return yBase;
}

export function dibujarProforma(
  ctx: CanvasRenderingContext2D,
  d: DatosProforma,
  im: Imagenes,
): Resultado {
  ctx.save();
  ctx.setTransform(ESCALA, 0, 0, ESCALA, 0, 0);
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, ANCHO, ALTO);
  ctx.textBaseline = "alphabetic";

  // Encabezado
  ctx.fillStyle = BORDO;
  ctx.fillRect(0, 0, ANCHO, 96);
  if (im.logo) ctx.drawImage(im.logo, X0, 12, 312, 72);

  // Fecha
  let y = 131;
  dibujarLinea(ctx, SERIF_F, tokenizar(d.ciudadFecha), X0, y, COL, "der");

  // Destinatario
  y = 199;
  y = bloque(ctx, SERIF_BI, d.destinatario, X0, y, COL, "izq");

  // Referencia (subrayada, centrada)
  y += 21;
  const refL = envolver(ctx, SERIF_BI, d.ref, COL)[0] ?? [];
  dibujarLinea(ctx, SERIF_BI, refL, X0, y, COL, "centro");
  if (refL.length) {
    ctx.font = SERIF_BI.n;
    const w =
      refL.reduce((a, p, i) => a + medir(ctx, SERIF_BI, p) + (i > 0 && p.sp ? ctx.measureText(" ").width : 0), 0);
    const x = X0 + (COL - w) / 2;
    ctx.strokeStyle = TINTA;
    ctx.lineWidth = 0.9;
    ctx.beginPath();
    ctx.moveTo(x, y + 2.5);
    ctx.lineTo(x + w, y + 2.5);
    ctx.stroke();
  }

  // Saludo y cuerpo
  y += 30;
  y = bloque(ctx, SERIF_F, d.saludo, X0, y, COL, "izq");
  y = bloque(ctx, SERIF_F, d.cuerpo, X0, y, COL, "just");

  // Introducción de la oferta
  y += 16;
  y = bloque(ctx, SERIF_F, d.intro, X0, y, COL, "izq");

  // Tablas
  y += 3;
  for (const o of d.ofertas) {
    y = tabla(ctx, o, y) + 24;
  }

  // Notas
  y += 8;
  for (const n of d.notas) {
    if (!n.trim()) continue;
    ctx.font = SERIF_BI.n;
    ctx.fillStyle = TINTA;
    ctx.textAlign = "left";
    ctx.fillText("-", X0 + 4, y);
    y = bloque(ctx, SERIF_BI, n, 180, y, X1 - 180, "izq") + 12;
  }

  // Despedida
  y += 14;
  y = bloque(ctx, SERIF_F, d.despedida, X0, y, COL, "izq");
  const yCierre = y;
  y = bloque(ctx, SERIF_F, d.cierre, X0, y, COL, "izq");

  // Firma y sello
  const yNombre = yCierre + 153;
  ctx.globalCompositeOperation = "multiply";
  if (d.mostrarFirma && im.firma) ctx.drawImage(im.firma, 344, yCierre - 14, 204, 140);
  if (d.mostrarSello && im.sello) ctx.drawImage(im.sello, 560, yCierre + 72, 151, 69);
  ctx.globalCompositeOperation = "source-over";

  const CENTRO = 440;
  const centrado = (f: Fuentes, t: string, yy: number) =>
    dibujarLinea(ctx, f, tokenizar(t), CENTRO - 150, yy, 300, "centro");
  centrado(SERIF_F, d.firmante, yNombre);
  centrado(SERIF_BI, d.cargo, yNombre + LH);
  centrado(SERIF_F, d.empresa, yNombre + LH * 2);
  const yFinal = yNombre + LH * 2 + 8;

  // Pie
  ctx.strokeStyle = "#333";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(6, 1020);
  ctx.lineTo(ANCHO - 6, 1020);
  ctx.stroke();
  let yp = 1043;
  for (const l of d.pie.split("\n")) {
    const linea = envolver(ctx, SANS_PIE, l, ANCHO - 40)[0] ?? [];
    dibujarLinea(ctx, SANS_PIE, linea, 20, yp, ANCHO - 40, "centro", "#1a1a1a");
    yp += 20;
  }

  ctx.restore();
  return { desborda: yFinal > 1012, yFinal };
}
