/** Arma un PDF de una página (carta) con un JPEG a página completa. */
export function crearPdfDeJpeg(
  jpeg: Uint8Array,
  ancho: number,
  alto: number,
): Uint8Array<ArrayBuffer> {
  const enc = new TextEncoder();
  const partes: Uint8Array[] = [];
  const offsets: number[] = [];
  let largo = 0;

  const poner = (b: Uint8Array | string) => {
    const u = typeof b === "string" ? enc.encode(b) : b;
    partes.push(u);
    largo += u.length;
  };
  const objeto = (n: number, cuerpo: () => void) => {
    offsets[n] = largo;
    poner(`${n} 0 obj\n`);
    cuerpo();
    poner("\nendobj\n");
  };

  const hp = Math.round((612 * alto) / ancho);
  const contenido = `q 612 0 0 ${hp} 0 0 cm /Im0 Do Q`;

  poner("%PDF-1.4\n%\xE2\xE3\xCF\xD3\n");
  objeto(1, () => poner("<< /Type /Catalog /Pages 2 0 R >>"));
  objeto(2, () => poner("<< /Type /Pages /Kids [3 0 R] /Count 1 >>"));
  objeto(3, () =>
    poner(
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 ${hp}] ` +
        "/Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>",
    ),
  );
  objeto(4, () => {
    poner(
      `<< /Type /XObject /Subtype /Image /Width ${ancho} /Height ${alto} ` +
        `/ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode ` +
        `/Length ${jpeg.length} >>\nstream\n`,
    );
    poner(jpeg);
    poner("\nendstream");
  });
  objeto(5, () =>
    poner(`<< /Length ${contenido.length} >>\nstream\n${contenido}\nendstream`),
  );

  const xref = largo;
  let tabla = "xref\n0 6\n0000000000 65535 f \n";
  for (let n = 1; n <= 5; n++) {
    tabla += String(offsets[n]).padStart(10, "0") + " 00000 n \n";
  }
  poner(
    tabla + `trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`,
  );

  const salida = new Uint8Array(largo);
  let pos = 0;
  for (const p of partes) {
    salida.set(p, pos);
    pos += p.length;
  }
  return salida;
}
