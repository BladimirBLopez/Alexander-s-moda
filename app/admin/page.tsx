import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

export default async function AdminPage() {
  const uniformes = await prisma.uniforme.findMany({
    orderBy: { orden: "asc" },
  });

  return (
    <main className="min-h-screen bg-[var(--color-papel)] px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1
          className="text-2xl uppercase tracking-wide text-center mb-6"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            color: "var(--color-bordo)",
          }}
        >
          Panel de Uniformes
        </h1>

        <div className="flex flex-col gap-3 mb-6">
          {uniformes.map((u) => (
            <Link
              key={u.id}
              href={`/admin/uniformes/${u.slug}`}
              className="flex items-center justify-between border border-[var(--color-hueso)]/50 rounded-lg px-4 py-3 bg-white hover:bg-[var(--color-bordo)]/5 transition"
            >
              <span className="font-semibold text-[var(--color-bordo)]">{u.nombre}</span>
              <span className="text-xs text-[var(--color-bordo)]/50">/{u.slug}</span>
            </Link>
          ))}
        </div>

        <Link
          href="/admin/uniformes/nuevo"
          className="block w-full text-center bg-[var(--color-bordo)] text-white rounded-lg py-3 font-semibold uppercase tracking-wide text-sm"
        >
          + Agregar uniforme nuevo
        </Link>
      </div>
    </main>
  );
}
