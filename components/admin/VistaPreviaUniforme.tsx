import Image from "next/image";
import type { BulletItem } from "@/lib/productos";

const display = { fontFamily: "var(--font-display)" } as const;

function Lista({ items }: { items: BulletItem[] }) {
  return (
    <ul className="space-y-1.5 text-left text-[9px] text-bordo/80">
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

function Foto({ src }: { src?: string }) {
  return (
    <div className="relative aspect-[2/3] w-full overflow-hidden rounded-md bg-bordo/10">
      {src ? (
        <Image src={src} alt="" fill sizes="200px" className="object-cover" />
      ) : (
        <span className="flex h-full items-center justify-center text-[10px] uppercase tracking-[0.1em] text-bordo/40">
          Foto pendiente
        </span>
      )}
    </div>
  );
}

function BotonMuestra({ texto }: { texto: string }) {
  return (
    <span
      className="rounded-lg bg-bordo-oscuro px-3 py-2 text-center text-[9px] font-semibold uppercase tracking-[0.1em] text-white"
      style={display}
    >
      {texto}
    </span>
  );
}

function Genero({
  titulo,
  items,
  f1,
  f2,
  segundoBoton,
}: {
  titulo: string;
  items: BulletItem[];
  f1?: string;
  f2?: string;
  segundoBoton: string;
}) {
  return (
    <div className="mb-6">
      <p
        className="mb-2 mt-4 text-center text-[13px] uppercase tracking-[0.2em] text-bronce"
        style={{ ...display, fontWeight: 700 }}
      >
        {titulo}
      </p>
      <div className="mx-auto grid max-w-[440px] grid-cols-2 gap-1">
        <Foto src={f1} />
        <Foto src={f2} />
      </div>
      <div className="-mx-3 grid grid-cols-[1.4fr_1fr] gap-3 rounded-lg border border-hueso/50 p-4">
        <div className="-my-4 border-r border-hueso/50 py-4 pr-3">
          <p
            className="mb-1.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-bordo"
            style={display}
          >
            <span className="inline-block border-b border-hueso/50 pb-0.5">
              Descripción
            </span>
          </p>
          <Lista items={items} />
        </div>
        <div className="flex h-full flex-col items-center justify-center gap-6 pb-4">
          <div className="flex flex-col items-center">
            <p
              className="mb-1.5 text-center text-[9px] font-semibold uppercase tracking-[0.05em] text-bordo"
              style={display}
            >
              <span className="inline-block border-b border-hueso/50 pb-0.5">
                Ver telas
              </span>
            </p>
            <p className="text-center text-[9px] text-bordo/70">
              Colores a elección
            </p>
            <div className="mt-2 flex flex-col items-stretch gap-2">
              <BotonMuestra texto="Color camisa" />
              <BotonMuestra texto={segundoBoton} />
            </div>
          </div>
          <p className="text-center text-[8px] text-bordo/60">
            Durabilidad · Suave al tacto · Respirabilidad
          </p>
        </div>
      </div>
    </div>
  );
}

export default function VistaPreviaUniforme({
  nombre,
  bulletsMujer,
  bulletsHombre,
  fotos,
}: {
  nombre: string;
  subtitulo?: string;
  descripcion?: string;
  tipografia?: string;
  bulletsMujer: BulletItem[];
  bulletsHombre: BulletItem[];
  fotos: {
    md?: string;
    mf?: string;
    hd?: string;
    hf?: string;
    sa?: string;
    si?: string;
    sd?: string;
  };
}) {
  const n = nombre || "Nombre";
  return (
    <div>
      <p className="mb-2 text-center text-xs text-carbon/50">
        Así se verá en el catálogo (aproximado). Los botones de telas son de
        muestra.
      </p>
      <div className="mx-auto max-w-md rounded-3xl border-4 border-bordo-oscuro bg-papel px-6 pb-6 pt-5 text-center shadow-xl">
        <Genero
          titulo={`Uniforme ${n} Dama`}
          items={bulletsMujer}
          f1={fotos.md}
          f2={fotos.mf}
          segundoBoton="Colores de faldas"
        />
        <div className="-mx-3 mb-6 overflow-hidden border border-hueso/50">
          <div className="bg-bordo px-2 py-2">
            <p
              className="text-center text-[8.5px] uppercase tracking-[0.05em] text-white"
              style={display}
            >
              Los diseños y tipografías de letras de los bordados serán
              elegidos por los estudiantes de la promoción.
            </p>
          </div>
        </div>
        <Genero
          titulo={`Uniforme ${n} Varón`}
          items={bulletsHombre}
          f1={fotos.hd}
          f2={fotos.hf}
          segundoBoton="Colores de pantalones"
        />
        <div className="mt-6">
          <div className="-mx-6 bg-bordo px-2 py-2.5">
            <p
              className="text-center text-[9px] font-semibold uppercase tracking-[0.1em] text-white"
              style={display}
            >
              Chamarra americana - canguro
            </p>
          </div>
          <div className="pb-2 pt-4">
            <div className="mx-auto mb-1 max-w-[220px]">
              <Foto src={fotos.sa} />
            </div>
            <div className="grid grid-cols-2 gap-1">
              <Foto src={fotos.si} />
              <Foto src={fotos.sd} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
