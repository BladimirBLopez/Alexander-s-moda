import Link from "next/link";
import Image from "next/image";
import { productos } from "@/lib/productos";

const WHATSAPP_NUMERO = "59177373235";

export default function CatalogoPage() {
  return (
    <main className="min-h-screen px-6 py-12 bg-[var(--color-papel)]">
      <div className="max-w-md mx-auto">
        <Link
          href="/"
          className="text-sm text-[var(--color-bordo)]/70 hover:text-[var(--color-bordo)] mb-6 inline-block"
        >
          ← Volver
        </Link>

        <h1
          className="text-3xl text-[var(--color-bordo)] text-center mb-1"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Catálogo
        </h1>
        <p className="text-xs text-[var(--color-bordo)]/60 text-center mb-8">
          Diseños disponibles para tu colegio o promoción
        </p>

        <div className="flex flex-col gap-14">
          {productos.map((producto) => {
            const mensaje = encodeURIComponent(
              `Hola, me interesa el ${producto.nombre}`
            );
            return (
              <article
                key={producto.id}
                className="pespunte-hueso pt-8 first:border-t-0 first:pt-0"
              >
                {/* Título tipo ficha, centrado y compacto */}
                <div className="text-center mb-5">
                  <h2
                    className="text-2xl uppercase tracking-wide text-[var(--color-bordo)]"
                    style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
                  >
                    {producto.nombre}
                  </h2>
                  <div className="flex items-center justify-center gap-2 mt-1.5">
                    <span className="w-4 h-px bg-[var(--color-bronce)]" />
                    <span className="text-[10px] text-[var(--color-bronce)]">✦</span>
                    <span className="w-4 h-px bg-[var(--color-bronce)]" />
                  </div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-bordo)]/60 mt-1.5">
                    {producto.subtitulo}
                  </p>
                </div>

                {/* Fotos mujer / hombre lado a lado */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  <div className="relative aspect-[5/7] rounded-md overflow-hidden bg-[var(--color-bordo)]">
                    <Image
                      src={producto.fotoMujer}
                      alt={`${producto.nombre} mujer`}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                    <span className="absolute bottom-1.5 left-0 right-0 text-center text-[9px] uppercase tracking-[0.15em] text-[var(--color-hueso)]">
                      Uniforme mujer
                    </span>
                  </div>
                  <div className="relative aspect-[5/7] rounded-md overflow-hidden bg-[var(--color-bordo)]">
                    <Image
                      src={producto.fotoHombre}
                      alt={`${producto.nombre} hombre`}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                    <span className="absolute bottom-1.5 left-0 right-0 text-center text-[9px] uppercase tracking-[0.15em] text-[var(--color-hueso)]">
                      Uniforme hombre
                    </span>
                  </div>
                </div>

                {/* Paleta de colores */}
                <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-bordo)]/50 mb-2 text-center">
                  Paleta de colores
                </p>
                <div className="flex gap-6 justify-center mb-5">
                  {producto.colores.map((color) => (
                    <div key={color.nombre} className="flex flex-col items-center gap-1">
                      <div
                        className="w-9 h-9 rounded-full border border-[var(--color-bordo)]/20"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="text-[10px] text-[var(--color-bordo)]/70">
                        {color.nombre}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Tipografía */}
                <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-bordo)]/50 mb-1 text-center">
                  Tipografía del bordado
                </p>
                <p className="text-sm text-[var(--color-bordo)] text-center mb-6">
                  {producto.tipografia}
                </p>

                {/* Descripción y bullets */}
                <p className="text-sm text-[var(--color-bordo)]/80 mb-2 leading-relaxed">
                  {producto.descripcion}
                </p>
                <ul className="text-sm text-[var(--color-bordo)]/80 mb-6 space-y-0.5">
                  {producto.bullets.map((bullet) => (
                    <li key={bullet}>• {bullet}</li>
                  ))}
                </ul>

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
