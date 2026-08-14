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
          className="text-3xl text-[var(--color-bordo)] mb-1"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Catálogo
        </h1>
        <p className="text-sm text-[var(--color-bordo)]/70 mb-10">
          Diseños disponibles para tu colegio o promoción
        </p>

        <div className="flex flex-col gap-10">
          {productos.map((producto) => {
            const mensaje = encodeURIComponent(
              `Hola, me interesa el ${producto.nombre}`
            );
            return (
              <article
                key={producto.id}
                className="pespunte-hueso pt-6 first:border-t-0 first:pt-0"
              >
                <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden mb-4 bg-[var(--color-bordo)]">
                  <Image
                    src={producto.imagen}
                    alt={producto.nombre}
                    fill
                    className="object-cover"
                  />
                </div>

                <h2
                  className="text-xl text-[var(--color-bordo)] mb-1"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {producto.nombre}
                </h2>
                <p className="text-sm text-[var(--color-bordo)]/70 mb-4">
                  {producto.descripcion}
                </p>

                <div className="flex gap-3 mb-4">
                  {producto.colores.map((color) => (
                    <div key={color.nombre} className="flex flex-col items-center gap-1">
                      <div
                        className="w-8 h-8 rounded-full border border-[var(--color-bordo)]/20"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="text-[10px] text-[var(--color-bordo)]/60">
                        {color.nombre}
                      </span>
                    </div>
                  ))}
                </div>

                <ul className="text-sm text-[var(--color-bordo)]/80 mb-5 space-y-1">
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
