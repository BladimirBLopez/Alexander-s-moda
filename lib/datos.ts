import { productos as productosArchivo, type Producto, type BulletItem } from "@/lib/productos";
import { telas as telasArchivo, type Tela, type ColorTela } from "@/data/telas";

export type ProductoDato = Producto & { slug: string; orden: number };

const slugDe = (id: string) => id.replace(/^uniforme-/, "");

export function fotosDe(p: Producto): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(p)) {
    if (k.startsWith("foto") && typeof v === "string" && v) out[k] = v;
  }
  return out;
}

function productosDeArchivo(): ProductoDato[] {
  return productosArchivo.map((p, i) => ({ ...p, slug: slugDe(p.id), orden: i }));
}

export async function getProductos(): Promise<ProductoDato[]> {
  if (!process.env.DATABASE_URL) return productosDeArchivo();
  try {
    const { prisma } = await import("@/lib/prisma");
    const filas = await prisma.producto.findMany({ orderBy: { orden: "asc" } });
    if (filas.length === 0) return productosDeArchivo();
    return filas.map((f) => {
      const base: ProductoDato = {
        id: f.id,
        slug: f.slug ?? slugDe(f.id),
        orden: f.orden,
        nombre: f.nombre,
        subtitulo: f.subtitulo,
        descripcion: f.descripcion,
        tipografia: f.tipografia,
        bulletsMujer: f.bulletsMujer as unknown as BulletItem[],
        bulletsHombre: f.bulletsHombre as unknown as BulletItem[],
      };
      return Object.assign(base, f.fotos as unknown as Partial<Producto>);
    });
  } catch (e) {
    console.error("getProductos: usando archivos", e);
    return productosDeArchivo();
  }
}

export async function getProductoPorSlug(slug: string) {
  return (await getProductos()).find((p) => p.slug === slug);
}

export async function getTelas(): Promise<Tela[]> {
  if (!process.env.DATABASE_URL) return telasArchivo;
  try {
    const { prisma } = await import("@/lib/prisma");
    const filas = await prisma.tela.findMany({ orderBy: { orden: "asc" } });
    if (filas.length === 0) return telasArchivo;
    return filas.map((f) => ({
      id: f.id,
      nombre: f.nombre,
      estructura: f.estructura,
      composicion: f.composicion,
      gramaje: f.gramaje,
      ancho: f.ancho,
      caracteristicas: f.caracteristicas as unknown as string[],
      imagenPrincipal: f.imagenPrincipal ?? undefined,
      colores: f.colores as unknown as ColorTela[],
    }));
  } catch (e) {
    console.error("getTelas: usando archivos", e);
    return telasArchivo;
  }
}
