import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

const SECCIONES = [
  { numero: 1, id: "generales", nombre: "Datos generales" },
  { numero: 2, id: "dama", nombre: "Uniforme Dama" },
  { numero: 3, id: "varon", nombre: "Uniforme Varón" },
  { numero: 4, id: "tipografia", nombre: "Tipografía" },
];

export default async function AdminUniformeDetalle({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const uniforme = await prisma.uniforme.findUnique({ where: { slug } });

  if (!uniforme) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[var(--color-papel)] px-4 py-8">
      <div className="max-w-md mx-auto">
        <Link href="/admin" className="text-xs text-[var(--color-bordo)]/70 mb-4 inline-block">
          ← Volver al panel
        </Link>

        <h1
          className="text-2xl uppercase tracking-wide mb-6"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            color: "var(--color-bordo)",
          }}
        >
          {uniforme.nombre}
        </h1>

        <div className="flex flex-col gap-3">
          {SECCIONES.map((s) => (
            <Link
              key={s.id}
              href={`/admin/uniformes/${slug}/${s.id}`}
              className="flex items-center gap-3 border border-[var(--color-hueso)]/50 rounded-lg px-4 py-3 bg-white hover:bg-[var(--color-bordo)]/5 transition"
            >
              <span className="w-7 h-7 rounded-full bg-[var(--color-bordo)] text-white flex items-center justify-center text-sm font-bold shrink-0">
                {s.numero}
              </span>
              <span className="font-medium text-[var(--color-bordo)]">{s.nombre}</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
