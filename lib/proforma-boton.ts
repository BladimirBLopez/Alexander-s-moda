export async function getProformaBoton(): Promise<boolean> {
  if (!process.env.DATABASE_URL) return false;

  try {
    const { prisma } = await import("@/lib/prisma");

    const ajuste = await prisma.ajuste.findUnique({
      where: { clave: "proforma_boton" },
      select: { valor: true },
    });

    return ajuste?.valor === "1";
  } catch (error) {
    console.error("Proforma boton: fallo al consultar Neon", error);
    return false;
  }
}
