export type ProformaActual = {
  pdfUrl: string;
  previewUrl: string;
};

const ORIGINAL: ProformaActual = {
  pdfUrl: "/proforma.pdf",
  previewUrl: "/proforma-preview.png",
};

function valida(url: unknown): url is string {
  if (typeof url !== "string") return false;

  try {
    const u = new URL(url);
    return (
      u.protocol === "https:" &&
      u.hostname === "res.cloudinary.com" &&
      u.pathname.startsWith("/dkq95jus0/image/upload/") &&
      u.pathname.length > "/dkq95jus0/image/upload/".length
    );
  } catch {
    return false;
  }
}

export async function getProformaActual():
  Promise<ProformaActual> {

  if (!process.env.DATABASE_URL) return ORIGINAL;

  try {
    const { prisma } = await import("@/lib/prisma");

    const ajuste = await prisma.ajuste.findUnique({
      where: { clave: "proforma_actual" },
      select: { valor: true },
    });

    if (!ajuste) return ORIGINAL;

    const datos: unknown = JSON.parse(ajuste.valor);

    if (
      !datos ||
      typeof datos !== "object" ||
      Array.isArray(datos)
    ) {
      return ORIGINAL;
    }

    const d = datos as Record<string, unknown>;

    if (!valida(d.pdfUrl) || !valida(d.previewUrl)) {
      console.error("Proforma: URLs invalidas");
      return ORIGINAL;
    }

    return {
      pdfUrl: d.pdfUrl,
      previewUrl: d.previewUrl,
    };

  } catch (error) {
    console.error("Proforma: fallo al consultar Neon", error);
    return ORIGINAL;
  }
}
