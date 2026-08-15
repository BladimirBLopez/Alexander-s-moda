import Link from "next/link";
import Image from "next/image";
import { productos, type Producto } from "@/lib/productos";

const WHATSAPP_NUMERO = "59177974868";

const IconoCamisa = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M8 4L4 7v3l2-1v11h12V9l2 1V7l-4-3-3 2h-2L8 4z" strokeLinejoin="round" />
  </svg>
);
const IconoCorbata = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M9 3h6l1 4-4 2-4-2 1-4z" strokeLinejoin="round" />
    <path d="M10 9l-2 9 4 3 4-3-2-9" strokeLinejoin="round" />
  </svg>
);
const IconoFalda = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M9 4h6l1 6 3 10H5l3-10 1-6z" strokeLinejoin="round" />
  </svg>
);

function FotoOPlaceholder({ src, alt }: { src?: string; alt: string }) {
  return (
    <div className="relative w-full aspect-[5/7] rounded-md overflow-hidden bg-[var(--color-papel)]">
      {src ? (
        <Image src={src} alt={alt} fill className="object-contain" />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-center px-2">
          <span className="text-[9px] uppercase tracking-[0.1em] text-[var(--color-bordo)]/40">
            Foto pendiente
          </span>
        </div>
      )}
    </div>
  );
}

function ColumnaGenero({
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
      <FotoOPlaceholder src={foto} alt={titulo} />

      <p className="text-[10px] uppercase tracking-[0.1em] text-[var(--color-bordo)] font-semibold mt-3 mb-1.5 border-b border-[var(--color-bordo)]/20 pb-1">
        Descripción
      </p>
      <ul className="text-[11px] text-[var(--color-bordo)]/80 space-y-1 mb-3">
        {bullets.map((b) => (
          <li key={b} className="flex gap-1">
            <span className="shrink-0">•</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <p className="text-[10px] uppercase tracking-[0.1em] text-[var(--color-bordo)] font-semibold mb-1.5 border-b border-[var(--color-bordo)]/20 pb-1">
        Detalles
      </p>
      <div className="space-y-1.5">
        {detalles.map((d, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <span className="w-6 h-6 rounded-full bg-[var(--color-bordo)] text-[var(--color-hueso)] flex items-center justify-center shrink-0">
              {d.icono}
            </span>
            <span className="text-[10px] text-[var(--color-bordo)]/70 leading-tight">{d.texto}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FichaProducto({ producto }: { producto: Producto }) {
  const mensaje = encodeURIComponent(`Hola, me interesa el ${producto.nombre}`);

  return (
    <article>
      <div className="grid grid-cols-2 rounded-t-lg overflow-hidden bg-[var(--color-bordo)]">
        <p className="text-center text-[11px] uppercase tracking-[0.1em] text-[var(--color-hueso)] font-semibold py-2 border-r border-[var(--color-hueso)]/20">
          Uniforme Mujer
        </p>
        <p className="text-center text-[11px] uppercase tracking-[0.1em] text-[var(--color-hueso)] font-semibold py-2">
          Uniforme Varón
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 border border-[var(--color-bordo)]/20 border-t-0 rounded-b-lg p-3 mb-4">
        <ColumnaGenero
          titulo={`${producto.nombre} - mujer`}
          foto={producto.fotoMujerFuera}
          bullets={producto.bulletsMujer}
          detalles={[
            { icono: <IconoCamisa />, texto: "Camisa clásica femenina" },
            { icono: <IconoCorbata />, texto: "Corbata con bordado" },
            { icono: <IconoFalda />, texto: "Falda cómoda" },
          ]}
        />
        <ColumnaGenero
          titulo={`${producto.nombre} - varón`}
          foto={producto.fotoHombreFuera}
          bullets={producto.bulletsHombre}
          detalles={[
            { icono: <IconoCamisa />, texto: "Camisa clásica masculina" },
            { icono: <IconoCorbata />, texto: "Corbata con bordado" },
            { icono: <IconoFalda />, texto: "Pantalón cómodo" },
          ]}
        />
      </div>

      <div className="grid grid-cols-3 gap-2 mb-6">
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

      <Link
        href={`https://wa.me/${WHATSAPP_NUMERO}?text=${mensaje}`}
        className="block w-full text-center py-3 rounded-full bg-[var(--color-bordo)] text-[var(--color-hueso)] text-sm font-medium hover:bg-[var(--color-bordo-oscuro)] transition"
      >
        Pedir este diseño
      </Link>
    </article>
  );
}

export default function CatalogoPage() {
  return (
    <main className="min-h-screen bg-[var(--color-papel)]">
      <div className="sticky top-0 z-10 px-6 py-3">
        <Link href="/" className="text-sm text-[var(--color-bordo)]/70 hover:text-[var(--color-bordo)] inline-flex items-center gap-1.5">
          ← Volver
        </Link>
      </div>
      <div className="max-w-md mx-auto px-6 pb-12 pt-4">
        <div className="text-center mb-8">
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
          {productos.map((producto) => (
            <FichaProducto key={producto.id} producto={producto} />
          ))}
        </div>
      </div>
    </main>
  );
}
