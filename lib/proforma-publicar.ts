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

type Publicacion = {
  ok?: boolean;
  error?: string;
  pdfUrl?: string;
  previewUrl?: string;
};

/** Sube el PDF a Cloudinary con firma y lo publica como proforma actual. */
export async function publicarPdf(
  archivo: File,
  fase: (texto: string) => void,
): Promise<{ pdfUrl: string; previewUrl: string }> {
  if (archivo.size < 1 || archivo.size > 10 * 1024 * 1024) {
    throw new Error("El PDF supera los 10 MB permitidos");
  }

  fase("Preparando subida segura...");
  const rf = await fetch("/api/admin/proforma", { cache: "no-store" });
  const firma: Firma = await rf.json().catch(() => ({}));
  if (!rf.ok || firma.ok !== true) {
    throw new Error(firma.error || "No se pudo autorizar la subida");
  }
  if (
    firma.cloudName !== "dkq95jus0" ||
    !firma.apiKey ||
    !firma.signature ||
    !firma.timestamp ||
    !firma.publicId
  ) {
    throw new Error("La firma recibida esta incompleta");
  }

  fase("Subiendo PDF a Cloudinary...");
  const datos = new FormData();
  datos.append("file", archivo);
  datos.append("api_key", firma.apiKey);
  datos.append("timestamp", String(firma.timestamp));
  datos.append("signature", firma.signature);
  datos.append("public_id", firma.publicId);

  const rc = await fetch(
    "https://api.cloudinary.com/v1_1/" + firma.cloudName + "/image/upload",
    { method: "POST", body: datos },
  );
  const subida: { secure_url?: string; error?: { message?: string } } =
    await rc.json().catch(() => ({}));
  if (!rc.ok || !subida.secure_url) {
    throw new Error(subida.error?.message || "Cloudinary no pudo recibir el PDF");
  }

  fase("Verificando archivo y publicando...");
  const rp = await fetch("/api/admin/proforma", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ publicId: firma.publicId }),
  });
  const res: Publicacion = await rp.json().catch(() => ({}));
  if (!rp.ok || res.ok !== true || !res.pdfUrl || !res.previewUrl) {
    throw new Error(res.error || "No se pudo confirmar la publicacion");
  }
  return { pdfUrl: res.pdfUrl, previewUrl: res.previewUrl };
}
