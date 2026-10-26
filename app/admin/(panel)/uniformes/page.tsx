import Image from "next/image";
import Link from "next/link";
import { productos } from "@/lib/productos";
import { Tarjeta, Titulo } from "@/components/admin/ui";

export default function UniformesPage() {
  return (
    <>
      <Titulo titulo="Uniformes" sub="Elegí cuál querés editar" />
      <div className="space-y-3">
        {productos.map((p) => (
          <Link key={p.id} href={`/admin/uniformes/${p.id}`} className="block">
            <Tarjeta className="boton-tactil flex items-center gap-4 !p-3">
              <div className="relative h-24 w-16 shrink-0 overflow-hidden rounded-lg bg-papel">
                {p.fotoMujerDentro && (
                  <Image
                    src={p.fotoMujerDentro}
                    alt={p.nombre}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p
                  className="text-lg font-semibold text-bordo"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {p.nombre}
                </p>
                <p className="truncate text-sm text-carbon/60">{p.subtitulo}</p>
                <p className="mt-1 text-xs text-bronce">
                  {p.bulletsMujer.length + p.bulletsHombre.length} puntos de
                  descripción
                </p>
              </div>
              <span className="text-xl text-bronce">›</span>
            </Tarjeta>
          </Link>
        ))}
      </div>
    </>
  );
}
