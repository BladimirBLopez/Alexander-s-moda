import Link from "next/link";
import Image from "next/image";
import { productos } from "@/lib/productos";

const WHATSAPP_NUMERO = "59177974868";

function FotoOPlaceholder({ src, alt, label }: { src?: string; alt: string; label: string }) {
  return (
    <div className="relative aspect-[5/7] rounded-md overflow-hidden bg-[var(--color-papel)] border border-[var(--color-bordo)]/15">
      {src ? (
        <Image src={src} alt={alt} fill className="object-contain" />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-center px-2">
          <span className="text-[10px] uppercase tracking-[0.1em] text-[var(--color-bordo)]/40">
            Foto pendiente
          </span>
        </div>
      )}
      <span className="absolute bottom-1.5 left-0 right-0 text-center text-[9px] uppercase tracking-[0.1em] text-[var(--color-bordo)]/60">
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
      <div className="grid grid-cols-2 gap-2 mb-4">
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
    <main className="min-h-screen px-6 py-12 bg-[var(--color-papel)]">
      <div className="max-w-md mx-auto">
        <Link href="/" className="text-sm text-[var(--color-bordo)]/70 hover:text-[var(--color-bordo)] mb-6 inline-block">
          ← Volver
        </Link>

        <div className="text-center mb-10">
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
              <article key={producto.id} className="pespunte-hueso pt-8 first:border-t-0 first:pt-0">
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

                <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-bordo)]/50 mb-2 text-center mt-6">
                  Paleta de colores
                </p>
                <div className="flex gap-6 justify-center mb-6">
                  {producto.colores.map((color) => (
                    <div key={color.nombre} className="flex flex-col items-center gap-1">
                      <div className="w-9 h-9 rounded-full border border-[var(--color-bordo)]/20" style={{ backgroundColor: color.hex }} />
                      <span className="text-[10px] text-[var(--color-bordo)]/70">{color.nombre}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href={`https://wa.me/${WHATSAPP_NUMERO}?text=${mensaje}`}
                  className="block w-full text-center py-3 rounded-full bg-[var(--color-bordo)] text-[var(--color-hueso)] text-sm font-medium hover:bg-[var(--color-bordo-oscuro)] transition"
                >
                  Pedir este diseño
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}
