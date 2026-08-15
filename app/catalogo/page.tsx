import Link from "next/link";
import Image from "next/image";
import { productos } from "@/lib/productos";

const WHATSAPP_NUMERO = "59177974868";

const IconoCamisa2 = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M8 4L4 7v3l2-1v11h12V9l2 1V7l-4-3-3 2h-2L8 4z" strokeLinejoin="round" />
  </svg>
);
const IconoCorbata2 = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M9 3h6l1 4-4 2-4-2 1-4z" strokeLinejoin="round" />
    <path d="M10 9l-2 9 4 3 4-3-2-9" strokeLinejoin="round" />
  </svg>
);
const IconoFalda2 = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M9 4h6l1 6 3 10H5l3-10 1-6z" strokeLinejoin="round" />
  </svg>
);

function ColumnaGenero2({
  titulo,
  foto,
  bullets,
  detalles,
}: {
  titulo: string;
  foto?: string;
  bullets: string[];
  detalles: { icono: React.ReactNode; texto: string }[];
}) {
  return (
    <div>
      <div className="relative w-full aspect-[5/7] overflow-hidden bg-[var(--color-papel)]">
        {foto ? (
          <Image src={foto} alt={titulo} fill className="object-contain" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-center px-2">
            <span className="text-[9px] uppercase tracking-[0.1em] text-[var(--color-bordo)]/40">
              Foto pendiente
            </span>
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 gap-2 mt-3 px-3">
        <div>
          <p className="text-[9px] uppercase tracking-[0.1em] text-[var(--color-bordo)] font-semibold mb-1.5 border-b border-[var(--color-bordo)]/20 pb-1">
            Descripción
          </p>
          <ul className="text-[9px] text-[var(--color-bordo)]/80 space-y-1">
            {bullets.map((b) => (
              <li key={b} className="flex gap-1">
                <span className="shrink-0">•</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[9px] uppercase tracking-[0.1em] text-[var(--color-bordo)] font-semibold mb-1.5 border-b border-[var(--color-bordo)]/20 pb-1">
            Detalles
          </p>
          <div className="space-y-1.5">
            {detalles.map((d, i) => (
              <div key={i} className="flex items-start gap-1">
                <span className="w-5 h-5 rounded-full bg-[var(--color-bordo)] text-[var(--color-hueso)] flex items-center justify-center shrink-0">
                  {d.icono}
                </span>
                <span className="text-[8px] text-[var(--color-bordo)]/70 leading-tight">{d.texto}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FotoOPlaceholder({ src, alt, label }: { src?: string; alt: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full aspect-[5/7] rounded-md overflow-hidden bg-[var(--color-papel)]">
        {src ? (
          <Image src={src} alt={alt} fill className="object-contain" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-center px-2">
            <span className="text-[10px] uppercase tracking-[0.1em] text-[var(--color-bordo)]/40">
              Foto pendiente
            </span>
          </div>
        )}
      </div>
      <span className="mt-1.5 text-center text-[9px] uppercase tracking-[0.1em] text-[var(--color-bordo)]/60">
        {label}
      </span>
    </div>
  );
}

function SeccionGenero({
  titulo,
  fotoDentro,
  fotoFuera,
  bullets,
}: {
  titulo: string;
  fotoDentro?: string;
  fotoFuera?: string;
  bullets: string[];
}) {
  return (
    <div className="mb-8">
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-bordo)] font-semibold mb-3 text-center">
        {titulo}
      </p>
      <div className="grid grid-cols-2 gap-1 mb-4 max-w-[340px] mx-auto">
        <FotoOPlaceholder src={fotoDentro} alt={`${titulo} - camisa por dentro`} label="Camisa por dentro" />
        <FotoOPlaceholder src={fotoFuera} alt={`${titulo} - camisa por fuera`} label="Camisa por fuera" />
      </div>
      <ul className="text-sm text-[var(--color-bordo)]/80 space-y-2.5 border border-[var(--color-bordo)]/20 rounded-lg p-4">
        {bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span className="shrink-0">•</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function CatalogoPage() {
  return (
    <main className="min-h-screen bg-[var(--color-papel)]">
      <div className="sticky top-0 z-10 px-6 py-3">
        <Link
          href="/"
          className="text-sm font-medium text-[var(--color-hueso)] bg-[var(--color-bordo)] hover:bg-[var(--color-bordo-oscuro)] inline-flex items-center gap-1.5 px-4 py-2 rounded-full shadow-md"
        >
          ← Volver
        </Link>
      </div>
      <div className="max-w-md mx-auto px-6 pb-8 pt-1">
        <div className="text-center mb-6">
          <h1
            className="text-3xl uppercase tracking-wide text-[var(--color-bordo)]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
          >
            Alexander&apos;s Moda
          </h1>
          <p className="text-sm uppercase tracking-[0.15em] text-[var(--color-bordo)]/70 mt-1">
            Uniformes de Promoción 2027
          </p>
          <div className="flex items-center justify-center gap-3 mt-3">
            <span className="text-[9px] text-[var(--color-bronce)]">◆</span>
            <span className="w-10 h-px bg-[var(--color-bronce)]/60" />
            <span className="text-lg text-[var(--color-bronce)] leading-none">❧</span>
            <span className="w-10 h-px bg-[var(--color-bronce)]/60" />
            <span className="text-[9px] text-[var(--color-bronce)]">◆</span>
          </div>
        </div>

        <div className="flex flex-col gap-16">
          {productos.map((producto) => {
            const mensaje = encodeURIComponent(`Hola, me interesa el ${producto.nombre}`);
            return (
              <article key={producto.id} className="[&:not(:first-child)]:pespunte-hueso [&:not(:first-child)]:pt-8">
                <SeccionGenero
                  titulo="Uniforme Mujer"
                  fotoDentro={producto.fotoMujerDentro}
                  fotoFuera={producto.fotoMujerFuera}
                  bullets={producto.bulletsMujer}
                />
                <SeccionGenero
                  titulo="Uniforme Varón"
                  fotoDentro={producto.fotoHombreDentro}
                  fotoFuera={producto.fotoHombreFuera}
                  bullets={producto.bulletsHombre}
                />

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="border border-[var(--color-bordo)]/25 rounded-lg overflow-hidden">
                    <div className="aspect-square flex items-center justify-center bg-[var(--color-bordo)]/[0.04] p-3">
                      <span className="text-[10px] uppercase tracking-[0.1em] text-[var(--color-bordo)]/40 text-center">
                        Foto pendiente
                      </span>
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-[var(--color-bordo)]/60 text-center py-2 border-t border-[var(--color-bordo)]/15">
                      Bordado
                    </p>
                  </div>
                  <div className="border border-[var(--color-bordo)]/25 rounded-lg overflow-hidden">
                    <div className="aspect-square flex items-center justify-center bg-[var(--color-bordo)]/[0.04] p-3">
                      <span className="text-[10px] uppercase tracking-[0.1em] text-[var(--color-bordo)]/40 text-center">
                        Foto pendiente
                      </span>
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-[var(--color-bordo)]/60 text-center py-2 border-t border-[var(--color-bordo)]/15">
                      Detalle Corbata
                    </p>
                  </div>
                </div>

                <div className="border border-[var(--color-bordo)]/25 rounded-lg py-5 px-4 mb-6">
                  <p className="text-xs uppercase tracking-[0.15em] text-[var(--color-bordo)]/60 text-center mb-4">
                    Paleta de colores
                  </p>
                  <div className="flex gap-6 justify-center">
                    {producto.colores.map((color) => (
                      <div key={color.nombre} className="flex flex-col items-center gap-2 max-w-[120px]">
                        <div className="w-16 h-16 rounded-sm border border-[var(--color-bordo)]/20" style={{ backgroundColor: color.hex }} />
                        <div className="text-center">
                          <p className="text-xs uppercase font-semibold text-[var(--color-bordo)]">{color.nombre}</p>
                          <p className="text-[10px] text-[var(--color-bordo)]/60">({color.uso})</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border border-[var(--color-bordo)]/25 rounded-lg py-5 px-4 mb-6 text-center">
                  <p className="text-xs uppercase tracking-[0.15em] text-[var(--color-bordo)]/60 mb-1">
                    Tipografía utilizada
                  </p>
                  <p className="text-lg text-[var(--color-bordo)]" style={{ fontFamily: "var(--font-display)" }}>
                    {producto.tipografia}
                  </p>
                </div>

                <Link
                  href={`https://wa.me/${WHATSAPP_NUMERO}?text=${mensaje}`}
                  className="block w-full text-center py-3 rounded-full bg-[var(--color-bordo)] text-[var(--color-hueso)] text-sm font-medium hover:bg-[var(--color-bordo-oscuro)] transition"
                >
                  Pedir este diseño
                </Link>

                {/* Seccion adicional: vista tipo ficha tecnica combinada */}
                <div className="mt-10 pt-8 border-t-2 border-dashed border-[var(--color-bordo)]/25">
                  <div className="grid grid-cols-2 -mx-6 bg-[var(--color-bordo)]">
                    <p className="text-center text-[11px] uppercase tracking-[0.1em] text-[var(--color-hueso)] font-semibold py-2 border-r border-[var(--color-hueso)]/20">
                      Uniforme Femenino
                    </p>
                    <p className="text-center text-[11px] uppercase tracking-[0.1em] text-[var(--color-hueso)] font-semibold py-2">
                      Uniforme Masculino
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-0 -mx-6 mb-4">
                    <ColumnaGenero2
                      titulo={`${producto.nombre} - femenino`}
                      foto={producto.fotoMujerFuera}
                      bullets={producto.bulletsMujer}
                      detalles={[
                        { icono: <IconoCamisa2 />, texto: "Camisa clásica femenina" },
                        { icono: <IconoCorbata2 />, texto: "Corbata con bordado" },
                        { icono: <IconoFalda2 />, texto: "Falda cómoda" },
                      ]}
                    />
                    <ColumnaGenero2
                      titulo={`${producto.nombre} - masculino`}
                      foto={producto.fotoHombreFuera}
                      bullets={producto.bulletsHombre}
                      detalles={[
                        { icono: <IconoCamisa2 />, texto: "Camisa clásica masculina" },
                        { icono: <IconoCorbata2 />, texto: "Corbata con bordado" },
                        { icono: <IconoFalda2 />, texto: "Pantalón cómodo" },
                      ]}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="border border-[var(--color-bordo)]/20 rounded-lg p-2.5">
                      <p className="text-[9px] uppercase tracking-[0.1em] text-[var(--color-bordo)] font-semibold mb-2 text-center border-b border-[var(--color-bordo)]/15 pb-1.5">
                        Colores
                      </p>
                      <div className="space-y-2">
                        {producto.colores.map((color) => (
                          <div key={color.nombre} className="flex items-center gap-1.5">
                            <span className="w-5 h-5 rounded-sm border border-[var(--color-bordo)]/20 shrink-0" style={{ backgroundColor: color.hex }} />
                            <span className="text-[8px] text-[var(--color-bordo)]/70 leading-tight">{color.nombre}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border border-[var(--color-bordo)]/20 rounded-lg p-2.5 flex flex-col">
                      <p className="text-[9px] uppercase tracking-[0.1em] text-[var(--color-bordo)] font-semibold mb-2 text-center border-b border-[var(--color-bordo)]/15 pb-1.5">
                        Tela / Textura
                      </p>
                      <div className="flex-1 flex items-center justify-center bg-[var(--color-bordo)]/[0.04] rounded aspect-square">
                        <span className="text-[8px] uppercase text-[var(--color-bordo)]/40 text-center px-1">Pendiente</span>
                      </div>
                    </div>

                    <div className="border border-[var(--color-bordo)]/20 rounded-lg p-2.5 flex flex-col">
                      <p className="text-[9px] uppercase tracking-[0.1em] text-[var(--color-bordo)] font-semibold mb-2 text-center border-b border-[var(--color-bordo)]/15 pb-1.5">
                        Bordados
                      </p>
                      <div className="flex-1 grid grid-cols-2 gap-1">
                        <div className="flex items-center justify-center bg-[var(--color-bordo)]/[0.04] rounded aspect-square">
                          <span className="text-[7px] uppercase text-[var(--color-bordo)]/40 text-center px-0.5">Pendiente</span>
                        </div>
                        <div className="flex items-center justify-center bg-[var(--color-bordo)]/[0.04] rounded aspect-square">
                          <span className="text-[7px] uppercase text-[var(--color-bordo)]/40 text-center px-0.5">Pendiente</span>
                        </div>
                      </div>
                      <p className="text-[7px] text-[var(--color-bordo)]/50 text-center mt-1.5">{producto.tipografia}</p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}
