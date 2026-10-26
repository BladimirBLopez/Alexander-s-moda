import Image from "next/image";
import type { BulletItem } from "@/lib/productos";

function Lista({ items }: { items: BulletItem[] }) {
  return (
    <ul className="space-y-1.5 text-left text-[11px] text-bordo/80">
      {items.map((b, i) =>
        typeof b === "string" ? (
          b.trim() && (
            <li key={i} className="flex gap-1">
              <span className="shrink-0">•</span>
              <span>{b}</span>
            </li>
          )
        ) : (
          <li key={i}>
            <div className="flex gap-1">
              <span className="shrink-0">•</span>
              <span>{b.texto}</span>
            </div>
            <ul className="mt-1 space-y-1 pl-4">
              {b.sublista
                .filter((o) => o.trim())
                .map((o, k) => (
                  <li key={k} className="flex gap-1">
                    <span className="shrink-0">◦</span>
                    <span>{o}</span>
                  </li>
                ))}
            </ul>
            {b.nota && <p className="mt-1 pl-1">{b.nota}</p>}
          </li>
        ),
      )}
    </ul>
  );
}

function Bloque({
  titulo,
  items,
  foto1,
  foto2,
}: {
  titulo: string;
  items: BulletItem[];
  foto1?: string;
  foto2?: string;
}) {
  return (
    <div className="mb-6">
      <p
        className="mb-2 mt-4 text-center text-[13px] uppercase tracking-[0.2em] text-bronce"
        style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
      >
        {titulo}
      </p>
      <div className="mx-auto mb-1 grid max-w-[440px] grid-cols-2 gap-1">
        {[foto1, foto2].map((f, i) => (
          <div
            key={i}
            className="relative aspect-[2/3] overflow-hidden rounded-md bg-bordo/10"
          >
            {f && (
              <Image src={f} alt="" fill sizes="200px" className="object-cover" />
            )}
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-hueso/60 p-4">
        <p
          className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-bordo"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <span className="inline-block border-b border-hueso/60 pb-0.5">
            Descripción
          </span>
        </p>
        <Lista items={items} />
      </div>
    </div>
  );
}

export default function VistaPreviaUniforme({
  nombre,
  subtitulo,
  descripcion,
  bulletsMujer,
  bulletsHombre,
  fotos,
}: {
  nombre: string;
  subtitulo: string;
  descripcion: string;
  bulletsMujer: BulletItem[];
  bulletsHombre: BulletItem[];
  fotos: { md?: string; mf?: string; hd?: string; hf?: string };
}) {
  return (
    <div>
      <p className="mb-2 text-center text-xs text-carbon/50">
        Así se verá en el catálogo (aproximado)
      </p>
      <div className="mx-auto max-w-[400px] rounded-3xl border-4 border-bordo-oscuro bg-papel px-4 pb-2 pt-5 shadow-xl">
        <h2
          className="text-center text-2xl font-semibold text-bordo"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {nombre || "Nombre del uniforme"}
        </h2>
        <p className="text-center text-xs text-carbon/60">{subtitulo}</p>
        <p className="mt-1 text-center text-xs text-carbon/60">{descripcion}</p>
        <Bloque titulo="Dama" items={bulletsMujer} foto1={fotos.md} foto2={fotos.mf} />
        <Bloque titulo="Varón" items={bulletsHombre} foto1={fotos.hd} foto2={fotos.hf} />
      </div>
    </div>
  );
}
