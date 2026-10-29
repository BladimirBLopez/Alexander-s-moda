export type Oferta = {
  titulo: string;
  lineas: string[];
  costo: string;
};

export type DatosProforma = {
  ciudadFecha: string;
  destinatario: string;
  ref: string;
  saludo: string;
  cuerpo: string;
  intro: string;
  ofertas: Oferta[];
  notas: string[];
  nota?: string;
  tituloNotas?: string;
  condiciones?: string[];
  despedida: string;
  cierre: string;
  firmante: string;
  cargo: string;
  empresa: string;
  mostrarFirma: boolean;
  mostrarSello: boolean;
  pie: string;
};

export const PROFORMA_INICIAL: DatosProforma = {
  ciudadFecha: "Santa Cruz agosto 2026",
  destinatario: "Señores:\nALUMNOS PROMOCION 2027\nPresente. –",
  ref: "REF: OFERTA UNIFORMES INSTITUCIONALES",
  saludo: "Distinguidos Alumnos:",
  cuerpo:
    "A tiempo de brindarles un cordial saludo, el motivo de la presente es para hacerles llegar la **OFERTA** que la empresa **ALEXANDERS MODA** ha preparado para su **PRESTIGIOSA PROMOCION.**",
  intro: "La oferta es la siguiente:",
  ofertas: [
    {
      titulo: "UNIFORME SPORT VARON Y MUJER",
      lineas: [
        "Pantalón/Falda en tela TWILL FLEX 100% Algodón.",
        "Camisa manga corta en tela OXFOR (Incluye un bordado).",
        "Polera en tela PIQUE PERUANO (Incluye dos bordados).",
        "Corbata en tela TWILL FLEX 100% Algodón (Incluye un bordado).",
      ],
      costo: "Bs 565.-",
    },
    {
      titulo: "UNIFORME CASIMIR VARON Y MUJER",
      lineas: [
        "Pantalón/Falda en tela CASIMIR INGLES.",
        "Camisa manga corta en tela OXFOR (Incluye un bordado).",
        "Polera en tela PIQUE PERUANO (Incluye dos bordados).",
        "Corbata en tela CASIMIR INGLES (Incluye un bordado).",
      ],
      costo: "Bs 615.-",
    },
  ],
  notas: [
    "POLERA DE OBSEQUIO PARA LOS TUTORES DE LA PROMOCION.",
    "PARA LAS PROMOCIONES QUE RESERVEN SU PAQUETE HASTA EL 20 DE SEPTIEMBRE REGALO ESPECIAL DE UNA CHAMARRA TIPO AMERICANO PARA CADA ALUMNO DE LA PROMOCION.",
  ],
  despedida: "Sin otro particular me despido con las consideraciones más distinguidas.",
  cierre: "Atentamente:",
  firmante: "Eddy Fuentes Hurtado",
  cargo: "Gerente General",
  empresa: "ALEXANDERS MODA",
  mostrarFirma: true,
  mostrarSello: true,
  pie: "**Santa Cruz:** Centro Comercial Norte Pasillo 11 Local #357\n**Cochabamba:** Calle 23 de Marzo casi Dorbigni #424 - **Cels.:** 77974868 - 77373235",
};

export const PROFORMA_OCTUBRE: DatosProforma = {
  ...PROFORMA_INICIAL,
  ciudadFecha: "Santa Cruz octubre 2026",
  ref: "REF: OFERTA PAQUETE UNIFORME DE PROMOCION",
  saludo: "",
  intro: "",
  ofertas: [
    {
      titulo: "UNIFORME SPORT",
      lineas: [
        "Varones Pantalón en tela GABARDINA BRASILERA.",
        "Mujeres Falda en tela GABARDINA BRASILERA.",
        "Ambos camisa manga corta en tela OXFOR (Incluye un bordado).",
        "Ambos polera en tela PIQUE PERUANO (Incluye dos bordados).",
        "Ambos corbata en tela GABARDINA BRASILERA (Incluye un bordado).",
      ],
      costo: "Bs 580.-",
    },
    {
      titulo: "UNIFORME CASIMIR",
      lineas: [
        "Varones Pantalón en tela CASIMIR INGLES.",
        "Mujeres Falda en tela CASIMIR INGLES.",
        "Ambos camisa manga corta en tela OXFOR (Incluye un bordado).",
        "Ambos polera en tela PIQUE PERUANO (Incluye dos bordados).",
        "Ambos corbata en tela CASIMIR INGLES (Incluye un bordado).",
      ],
      costo: "Bs 625.-",
    },
  ],
  nota: "NOTA. - Si las damas quieren Falda Short se aumenta Bs 70.-",
  tituloNotas: "OBSEQUIOS PARA LA PROMOCION",
  notas: [
    "POLERA PARA LOS TUTORES DE LA PROMOCION.",
    "CANGURO O CHAMARRA TIPO AMERICANO PARA CADA ALUMNO DE LA PROMOCION SI RESERVAN SU PAQUETE HASTA EL 30 DE OCTUBRE.",
  ],
  condiciones: ["FORMA DE PAGO. - 60% de anticipo 40% contra entrega."],
  despedida: "",
};

/** Valida datos leídos de localStorage: devuelve null si no tienen la forma esperada. */
export function datosValidos(x: unknown): DatosProforma | null {
  if (!x || typeof x !== "object" || Array.isArray(x)) return null;
  const d = x as Record<string, unknown>;
  const s = (k: string) => typeof d[k] === "string";
  const b = (k: string) => typeof d[k] === "boolean";
  const textos = [
    "ciudadFecha", "destinatario", "ref", "saludo", "cuerpo", "intro",
    "despedida", "cierre", "firmante", "cargo", "empresa", "pie",
  ];
  if (!textos.every(s) || !b("mostrarFirma") || !b("mostrarSello")) return null;
  if (
    !Array.isArray(d.notas) ||
    !d.notas.every((n) => typeof n === "string")
  )
    return null;
  if (
    !Array.isArray(d.ofertas) ||
    !d.ofertas.every((o) => {
      if (!o || typeof o !== "object") return false;
      const r = o as Record<string, unknown>;
      return (
        typeof r.titulo === "string" &&
        typeof r.costo === "string" &&
        Array.isArray(r.lineas) &&
        r.lineas.every((l) => typeof l === "string")
      );
    })
  )
    return null;
  if (d.nota !== undefined && typeof d.nota !== "string") return null;
  if (d.tituloNotas !== undefined && typeof d.tituloNotas !== "string")
    return null;
  if (
    d.condiciones !== undefined &&
    (!Array.isArray(d.condiciones) ||
      !d.condiciones.every((c) => typeof c === "string"))
  )
    return null;
  return d as unknown as DatosProforma;
}
