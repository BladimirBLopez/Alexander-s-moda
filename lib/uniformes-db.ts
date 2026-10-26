import { revalidatePath } from "next/cache";
import type { BulletItem } from "@/lib/productos";

export const txt = (v: unknown) => (typeof v === "string" ? v.trim() : "");

export const json = (x: unknown) => JSON.parse(JSON.stringify(x));

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);

export function limpiarBullets(v: unknown): BulletItem[] {
  if (!Array.isArray(v)) return [];
  const out: BulletItem[] = [];
  for (const it of v) {
    if (typeof it === "string") {
      if (it.trim()) out.push(it.trim());
    } else if (it && typeof it === "object") {
      const o = it as Record<string, unknown>;
      const texto = txt(o.texto);
      if (!texto) continue;
      const sublista = Array.isArray(o.sublista)
        ? o.sublista
            .filter((x): x is string => typeof x === "string" && x.trim() !== "")
            .map((x) => x.trim())
        : [];
      const nota = txt(o.nota) || undefined;
      out.push(nota ? { texto, sublista, nota } : { texto, sublista });
    }
  }
  return out;
}

export function limpiarFotos(v: unknown): Record<string, string> {
  const out: Record<string, string> = {};
  if (!v || typeof v !== "object") return out;
  for (const [k, u] of Object.entries(v as Record<string, unknown>)) {
    if (!k.startsWith("foto") || k.endsWith("Zoom")) continue;
    if (typeof u !== "string" || !/^(https:\/\/|\/(?!\/))/.test(u)) continue;
    out[k] = u;
    out[k + "Zoom"] = u;
  }
  return out;
}

export function revalidarUniformes() {
  revalidatePath("/");
  revalidatePath("/catalogo/[slug]", "page");
  revalidatePath("/admin");
  revalidatePath("/admin/uniformes");
  revalidatePath("/admin/uniformes/[id]", "page");
}
