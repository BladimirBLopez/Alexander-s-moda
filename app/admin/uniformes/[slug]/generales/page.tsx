import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

export default async function EditarGenerales({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const uniforme = await prisma.uniforme.findUnique({ where: { slug } });

  if (!uniforme) {
    notFound();
  }

  async function guardar(formData: FormData) {
    "use server";

    const nombre = String(formData.get("nombre") ?? "");
    const subtitulo = String(formData.get("subtitulo") ?? "");
    const descripcion = String(formData.get("descripcion") ?? "");

    await prisma.uniforme.update({
      where: { slug },
      data: { nombre, subtitulo, descripcion },
    });

    revalidatePath("/");
    revalidatePath(`/catalogo/${slug}`);
    revalidatePath(`/admin/uniformes/${slug}`);

    redirect(`/admin/uniformes/${slug}`);
  }

  return (
    <main className="min-h-screen bg-[var(--color-papel)] px-4 py-8">
      <div className="max-w-md mx-auto">
        <Link
          href={`/admin/uniformes/${slug}`}
          className="text-xs text-[var(--color-bordo)]/70 mb-4 inline-block"
        >
          ← Volver a secciones
        </Link>

        <h1
          className="text-xl uppercase tracking-wide mb-6"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            color: "var(--color-bordo)",
          }}
        >
          1. Datos generales
        </h1>

        <form action={guardar} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-semibold text-[var(--color-bordo)] block mb-1">
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              defaultValue={uniforme.nombre}
              required
              className="w-full border border-[var(--color-hueso)]/50 rounded-lg px-3 py-2 text-sm bg-white"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[var(--color-bordo)] block mb-1">
              Subtítulo
            </label>
            <input
              type="text"
              name="subtitulo"
              defaultValue={uniforme.subtitulo}
              required
              className="w-full border border-[var(--color-hueso)]/50 rounded-lg px-3 py-2 text-sm bg-white"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[var(--color-bordo)] block mb-1">
              Descripción
            </label>
            <textarea
              name="descripcion"
              defaultValue={uniforme.descripcion}
              required
              rows={3}
              className="w-full border border-[var(--color-hueso)]/50 rounded-lg px-3 py-2 text-sm bg-white"
            />
          </div>

          <button
            type="submit"
            className="bg-[var(--color-bordo)] text-white rounded-lg py-3 font-semibold uppercase tracking-wide text-sm mt-2"
          >
            Guardar
          </button>
        </form>
      </div>
    </main>
  );
}
