import type { BulletItem } from "@/lib/productos";

function linea(prefijo: string, contenido: string): string {
  return contenido
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .map((parte, i) =>
      i === 0 ? prefijo + parte : "    ↳ " + parte
    )
    .join("\n");
}

export function descripcionATexto(
  items: BulletItem[]
): string {
  return items.map((item) => {
    if (typeof item === "string") {
      return linea("• ", item);
    }

    const partes = [
      linea("• ", item.texto),
      ...item.sublista.map((op) => linea("    ◦ ", op)),
    ];

    if (item.nota !== undefined) {
      partes.push(linea("    Nota: ", item.nota));
    }

    return partes.join("\n");
  }).join("\n\n");
}

export function textoADescripcion(
  texto: string
): BulletItem[] {
  const resultado: BulletItem[] = [];

  let actual: {
    texto: string;
    sublista: string[];
    nota?: string;
  } | null = null;

  let ultimo: "texto" | "opcion" | "nota" = "texto";

  function cerrar() {
    if (!actual) return;

    if (!actual.texto.trim()) {
      throw new Error("Hay un punto sin descripción");
    }

    if (
      actual.sublista.length > 0 ||
      actual.nota !== undefined
    ) {
      resultado.push(actual);
    } else {
      resultado.push(actual.texto);
    }

    actual = null;
  }

  for (const lineaOriginal of texto.replace(
    /\r\n?/g, "\n"
  ).split("\n")) {
    const contenido = lineaOriginal.trim();

    if (!contenido) continue;

    if (/^↳(?:\s|$)/.test(contenido)) {
      if (!actual) {
        throw new Error("Hay una continuación sin texto");
      }

      const parte = contenido.replace(/^↳\s?/, "");

      if (ultimo === "opcion") {
        const i = actual.sublista.length - 1;
        if (i < 0) {
          throw new Error("Continuación de opción inválida");
        }
        actual.sublista[i] += "\n" + parte;
      } else if (ultimo === "nota") {
        actual.nota = (actual.nota ?? "") + "\n" + parte;
      } else {
        actual.texto += "\n" + parte;
      }

      continue;
    }

    if (/^[◦○](?:\s|$)/.test(contenido)) {
      if (!actual) {
        throw new Error("Agrega un punto antes de las opciones");
      }

      const opcion = contenido.replace(/^[◦○]\s*/, "");

      actual.sublista.push(opcion);
      ultimo = "opcion";
      continue;
    }

    if (/^Nota\s*:/i.test(contenido)) {
      if (!actual) {
        throw new Error("Agrega un punto antes de la nota");
      }

      if (actual.nota !== undefined) {
        throw new Error("Cada punto admite una sola nota");
      }

      actual.nota = contenido.replace(/^Nota\s*:\s*/i, "");
      ultimo = "nota";
      continue;
    }

    cerrar();

    const principal = contenido.replace(
      /^(?:•|-|\*)\s*/, ""
    );

    actual = {
      texto: principal,
      sublista: [],
    };

    ultimo = "texto";
  }

  cerrar();

  if (resultado.length > 60) {
    throw new Error("Máximo 60 puntos por descripción");
  }

  for (const item of resultado) {
    const textoPrincipal =
      typeof item === "string" ? item : item.texto;

    if (
      !textoPrincipal.trim() ||
      textoPrincipal.length > 2000
    ) {
      throw new Error("Revisa la longitud de los puntos");
    }

    if (typeof item !== "string") {
      if (
        item.sublista.length > 40 ||
        item.sublista.some(
          (s) => !s.trim() || s.length > 500
        ) ||
        (item.nota !== undefined &&
          item.nota.length > 2000)
      ) {
        throw new Error(
          "Revisa las opciones y observaciones"
        );
      }
    }
  }

  return resultado;
}
