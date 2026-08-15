import Link from "next/link";
import Image from "next/image";
import { productos } from "@/lib/productos";
import FotoZoom from "@/components/FotoZoom";

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
  bordeDerecho,
}: {
  titulo: string;
  foto?: string;
  bullets: string[];
  detalles: { icono: React.ReactNode; texto: string }[];
  bordeDerecho?: boolean;
}) {
  return (
    <div className={bordeDerecho ? "border-r border-[var(--color-bordo)]/20" : ""}>
      <div className="relative w-full aspect-[5/7] overflow-hidden bg-[var(--color-papel)]">
        {foto ? (
          <FotoZoom src={foto} alt={titulo} />
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
          <p className="text-[9px] uppercase tracking-[0.1em] text-[var(--color-bordo)] font-semibold mb-1.5" style={{ fontFamily: "var(--font-display)" }}>
          <span className="inline-block border-b border-[var(--color-bordo)]/20 pb-1">Descripción</span>
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
          <p className="text-[9px] uppercase tracking-[0.1em] text-[var(--color-bordo)] font-semibold mb-1.5" style={{ fontFamily: "var(--font-display)" }}>
          <span className="inline-block border-b border-[var(--color-bordo)]/20 pb-1">Detalles</span>
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
          <FotoZoom src={src} alt={alt} />
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
  colores,
  invertido = false,
}: {
  titulo: string;
  fotoDentro?: string;
  fotoFuera?: string;
  bullets: string[];
  colores: { nombre: string; hex: string; uso: string }[];
  invertido?: boolean;
}) {
  return (
    <div className="mb-8">
      <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-bronce)] mt-4 mb-2 text-center" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
        {titulo}
      </p>
      <div className="grid grid-cols-2 gap-1 mb-4 max-w-[340px] mx-auto">
        <FotoOPlaceholder src={fotoDentro} alt={`${titulo} - camisa por dentro`} label="Camisa por dentro" />
        <FotoOPlaceholder src={fotoFuera} alt={`${titulo} - camisa por fuera`} label="Camisa por fuera" />
      </div>
      <div className={`grid gap-3 border border-[var(--color-bordo)]/20 rounded-lg p-4 ${invertido ? "grid-cols-[1fr_1.4fr]" : "grid-cols-[1.4fr_1fr]"}`}>
        <div className={invertido ? "order-2 border-l border-[var(--color-bordo)]/15" : ""}>
          <p className="text-[9px] uppercase tracking-[0.1em] text-[var(--color-bordo)] font-semibold mb-1.5" style={{ fontFamily: "var(--font-display)" }}>
            <span className="inline-block border-b border-[var(--color-bordo)]/20 pb-1">Descripción</span>
          </p>
          <ul className="text-[9px] text-[var(--color-bordo)]/80 space-y-1.5">
            {bullets.map((b) => (
              <li key={b} className="flex gap-1">
                <span className="shrink-0">•</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={`pl-3 ${invertido ? "order-1" : "border-l border-[var(--color-bordo)]/15"}`}>
          <p className="text-[9px] uppercase tracking-[0.05em] text-[var(--color-bordo)] font-semibold mb-1.5 text-center" style={{ fontFamily: "var(--font-display)" }}>
            <span className="inline-block border-b border-[var(--color-bordo)]/15 pb-1">Colores</span>
          </p>
          <div className="space-y-1 mb-3">
            {colores.map((color) => (
              <div key={color.nombre} className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-sm border border-[var(--color-bordo)]/20 shrink-0" style={{ backgroundColor: color.hex }} />
                <span className="text-[8px] text-[var(--color-bordo)]/70 leading-tight">{color.nombre}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-[var(--color-bordo)]/15 pt-2 grid grid-cols-2 gap-1.5">
            <div>
              <p className="text-[8px] uppercase tracking-[0.05em] text-[var(--color-bordo)] font-semibold mb-1 text-center" style={{ fontFamily: "var(--font-display)" }}>
                Tela
              </p>
              <div className="flex items-center justify-center bg-[var(--color-bordo)]/[0.04] rounded aspect-square">
                <span className="text-[6px] uppercase text-[var(--color-bordo)]/40 text-center px-0.5">Pendiente</span>
              </div>
            </div>
            <div>
              <p className="text-[8px] uppercase tracking-[0.05em] text-[var(--color-bordo)] font-semibold mb-1 text-center" style={{ fontFamily: "var(--font-display)" }}>
                Bordado
              </p>
              <div className="flex items-center justify-center bg-[var(--color-bordo)]/[0.04] rounded aspect-square">
                <span className="text-[6px] uppercase text-[var(--color-bordo)]/40 text-center px-0.5">Pendiente</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CatalogoPage() {
  return (
    <main className="min-h-screen bg-[var(--color-papel)]">
      <div className="sticky top-0 z-10 px-3 py-2">
        <Link
          href="/"
          className="text-xs font-medium text-[var(--color-hueso)] bg-[var(--color-bordo)] hover:bg-[var(--color-bordo-oscuro)] inline-flex items-center gap-1 px-3 py-1.5 rounded-full shadow-md"
        >
          ← Volver
        </Link>
      </div>
      <div className="max-w-md mx-auto px-6 pb-8 pt-1">
        <div className="text-center mb-6">
          <h1
            className="text-3xl uppercase tracking-wide text-[var(--color-bordo-oscuro)]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
          >
            Alexander&apos;s Moda
          </h1>
          <p className="text-sm uppercase tracking-[0.15em] text-[var(--color-bronce)] mt-1">
            Uniformes de Promoción 2027
          </p>
          <div className="flex items-center justify-center gap-1.5 mt-1.5">
            <span className="text-[8px] text-[var(--color-bronce)]">◆</span>
            <span className="w-9 h-px bg-[var(--color-bronce)]/60" />
            <span className="text-base text-[var(--color-bronce)] leading-none">⚜</span>
            <span className="w-9 h-px bg-[var(--color-bronce)]/60" />
            <span className="text-[8px] text-[var(--color-bronce)]">◆</span>
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
                  colores={producto.colores}
                />
                <div className="border border-[var(--color-bronce)]/50 rounded-lg overflow-hidden mb-8">
                  <div className="bg-[var(--color-bordo)] px-3 py-2">
                    <p className="text-[10px] uppercase tracking-[0.05em] text-white text-center" style={{ fontFamily: "var(--font-display)" }}>
                      Tipografía del bordado: <span className="text-white font-bold">{producto.tipografia}</span>
                    </p>
                  </div>
                  <p className="text-[9px] text-[var(--color-bordo)]/80 text-center px-3 py-2 leading-relaxed">
                    La tipografía utilizada en todos los bordados es {producto.tipografia}, garantizando uniformidad, elegancia y una identidad institucional sólida.
                  </p>
                </div>
                <SeccionGenero
                  titulo="Uniforme Varón"
                  fotoDentro={producto.fotoHombreDentro}
                  fotoFuera={producto.fotoHombreFuera}
                  bullets={producto.bulletsHombre}
                  colores={producto.colores}
                  invertido
                />

                {/* Seccion adicional: vista tipo ficha tecnica combinada */}
                <div className="mt-10 pt-8 border-t-2 border-dashed border-[var(--color-bordo)]/25">
                  <div className="border border-[var(--color-bronce)]/50 rounded-lg overflow-hidden mb-3">
                    <div className="bg-[var(--color-bordo)] px-4 py-3">
                      <p className="text-[10px] uppercase tracking-[0.05em] text-white text-center" style={{ fontFamily: "var(--font-display)" }}>
                        Tipografía del bordado: <span className="text-white font-bold">{producto.tipografia}</span>
                      </p>
                    </div>
                    <p className="text-[9px] text-[var(--color-bordo)]/80 text-center px-5 py-4 leading-relaxed">
                      La tipografía utilizada en todos los bordados es {producto.tipografia}, garantizando uniformidad, elegancia y una identidad institucional sólida.
                    </p>
                  </div>
                  <div className="relative -mx-6">
                    <div className="grid grid-cols-2 bg-[var(--color-bordo)]">
                      <p className="text-center text-[11px] uppercase tracking-[0.1em] text-white font-semibold py-2.5" style={{ fontFamily: "var(--font-display)" }}>
                        Uniforme Femenino
                      </p>
                      <p className="text-center text-[11px] uppercase tracking-[0.1em] text-white font-semibold py-2.5" style={{ fontFamily: "var(--font-display)" }}>
                        Uniforme Masculino
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-0 pt-4 pb-4">
                      <ColumnaGenero2
                        titulo={`${producto.nombre} - femenino`}
                        foto={producto.fotoMujerFuera}
                        bullets={[
                          "Camisa con bordado institucional",
                          "Corbata en gabardina con bordado",
                          "Falda 100% algodón",
                          "Polera con dos bordados",
                        ]}
                        detalles={[
                          { icono: <IconoCamisa2 />, texto: "Camisa clásica femenina" },
                          { icono: <IconoCorbata2 />, texto: "Corbata con bordado" },
                          { icono: <IconoFalda2 />, texto: "Falda cómoda" },
                        ]}
                      />
                      <ColumnaGenero2
                        titulo={`${producto.nombre} - masculino`}
                        foto={producto.fotoHombreFuera}
                        bullets={[
                          "Camisa con bordado institucional",
                          "Corbata en gabardina con bordado",
                          "Pantalón 100% algodón",
                          "Polera con dos bordados",
                        ]}
                        detalles={[
                          { icono: <IconoCamisa2 />, texto: "Camisa clásica masculina" },
                          { icono: <IconoCorbata2 />, texto: "Corbata con bordado" },
                          { icono: <IconoFalda2 />, texto: "Pantalón cómodo" },
                        ]}
                      />
                    </div>

                    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-[var(--color-bronce)]/40 pointer-events-none" />
                  </div>

                  <div className="grid grid-cols-3 divide-x divide-[var(--color-bordo)]/25 -mx-6 border-t border-b border-[var(--color-bordo)]/25">
                    <div className="pt-0.5 px-2 pb-2">
                      <p className="text-[8px] uppercase tracking-[0.05em] text-[var(--color-bordo)] font-semibold mb-1.5 text-center" style={{ fontFamily: "var(--font-display)" }}>
                        <span className="inline-block border-b border-[var(--color-bordo)]/15 pb-1">Colores</span>
                      </p>
                      <div className="space-y-1.5">
                        {producto.colores.map((color) => (
                          <div key={color.nombre} className="flex items-center gap-1">
                            <span className="w-4 h-4 rounded-sm border border-[var(--color-bordo)]/20 shrink-0" style={{ backgroundColor: color.hex }} />
                            <span className="text-[7px] text-[var(--color-bordo)]/70 leading-tight">{color.nombre}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="pt-0.5 px-2 pb-2">
                      <p className="text-[8px] uppercase tracking-[0.05em] text-[var(--color-bordo)] font-semibold mb-1.5 text-center" style={{ fontFamily: "var(--font-display)" }}>
                        <span className="inline-block border-b border-[var(--color-bordo)]/15 pb-1">Tela</span>
                      </p>
                      <div className="flex items-center justify-center bg-[var(--color-bordo)]/[0.04] rounded aspect-[4/3]">
                        <span className="text-[6px] uppercase text-[var(--color-bordo)]/40 text-center px-0.5">Pendiente</span>
                      </div>
                    </div>
                    <div className="pt-0.5 px-2 pb-2">
                      <p className="text-[8px] uppercase tracking-[0.05em] text-[var(--color-bordo)] font-semibold mb-1.5 text-center" style={{ fontFamily: "var(--font-display)" }}>
                        <span className="inline-block border-b border-[var(--color-bordo)]/15 pb-1">Bordados</span>
                      </p>
                      <div className="flex items-center justify-center bg-[var(--color-bordo)]/[0.04] rounded aspect-[4/3]">
                        <span className="text-[6px] uppercase text-[var(--color-bordo)]/40 text-center px-0.5">Pendiente</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Nueva seccion adicional: 3 columnas Mujer | centro | Varon, estilo referencia */}
                <div className="mt-10 pt-8 border-t-2 border-dashed border-[var(--color-bordo)]/25">
                  <div className="grid grid-cols-[1.3fr_0.6fr_1.3fr] gap-2">
                    <div>
                      <div className="relative w-full aspect-[5/7] overflow-hidden bg-[var(--color-papel)]">
                        {producto.fotoMujerFuera ? (
                          <FotoZoom src={producto.fotoMujerFuera} alt="Uniforme mujer" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-center px-2">
                            <span className="text-[9px] uppercase tracking-[0.1em] text-[var(--color-bordo)]/40">Foto pendiente</span>
                          </div>
                        )}
                      </div>
                      <div className="border border-[var(--color-bordo)]/40 rounded-b-lg p-2">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.05em] text-[var(--color-bordo)] mb-1.5" style={{ fontFamily: "var(--font-display)" }}>
                          Uniforme Mujer
                        </p>
                        <ul className="text-[9px] text-[var(--color-bordo)]/80 space-y-1">
                          {[
                            "Camisa manga corta verde musgo",
                            "Corbata con bordado institucional",
                            "Falda color hueso/arena",
                            "Tipografía: " + producto.tipografia,
                          ].map((b) => (
                            <li key={`m-${b}`} className="flex gap-1">
                              <span className="shrink-0">•</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="border border-[var(--color-bordo)]/25 rounded-lg overflow-hidden">
                        <div className="aspect-square flex items-center justify-center bg-[var(--color-bordo)]/[0.04] p-1">
                          <span className="text-[7px] uppercase text-[var(--color-bordo)]/40 text-center">Pendiente</span>
                        </div>
                        <p className="text-[7px] uppercase tracking-[0.05em] text-[var(--color-bordo)]/60 text-center py-1 border-t border-[var(--color-bordo)]/15" style={{ fontFamily: "var(--font-display)" }}>
                          Bordado
                        </p>
                      </div>
                      <div className="border border-[var(--color-bordo)]/25 rounded-lg overflow-hidden">
                        <div className="aspect-square flex items-center justify-center bg-[var(--color-bordo)]/[0.04] p-1">
                          <span className="text-[7px] uppercase text-[var(--color-bordo)]/40 text-center">Pendiente</span>
                        </div>
                        <p className="text-[7px] uppercase tracking-[0.05em] text-[var(--color-bordo)]/60 text-center py-1 border-t border-[var(--color-bordo)]/15" style={{ fontFamily: "var(--font-display)" }}>
                          Corbata
                        </p>
                      </div>
                      <div className="border border-[var(--color-bordo)]/25 rounded-lg p-2">
                        <p className="text-[7px] uppercase tracking-[0.05em] text-[var(--color-bordo)]/60 text-center mb-1.5" style={{ fontFamily: "var(--font-display)" }}>
                          Paleta
                        </p>
                        <div className="flex gap-1.5 justify-center">
                          {producto.colores.map((color) => (
                            <div key={color.nombre} className="flex flex-col items-center gap-0.5">
                              <div className="w-6 h-6 rounded-sm border border-[var(--color-bordo)]/20" style={{ backgroundColor: color.hex }} />
                              <span className="text-[6px] text-[var(--color-bordo)]/60 text-center leading-none max-w-[36px]">{color.nombre}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="border border-[var(--color-bordo)]/25 rounded-lg p-2 text-center">
                        <p className="text-[7px] uppercase tracking-[0.05em] text-[var(--color-bordo)]/60 mb-0.5" style={{ fontFamily: "var(--font-display)" }}>
                          Tipografía
                        </p>
                        <p className="text-[9px] text-[var(--color-bordo)]" style={{ fontFamily: "var(--font-display)" }}>
                          {producto.tipografia}
                        </p>
                      </div>
                    </div>

                    <div>
                      <div className="relative w-full aspect-[5/7] overflow-hidden bg-[var(--color-papel)]">
                        {producto.fotoHombreFuera ? (
                          <FotoZoom src={producto.fotoHombreFuera} alt="Uniforme varón" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-center px-2">
                            <span className="text-[9px] uppercase tracking-[0.1em] text-[var(--color-bordo)]/40">Foto pendiente</span>
                          </div>
                        )}
                      </div>
                      <div className="border border-[var(--color-bordo)]/40 rounded-b-lg p-2">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.05em] text-[var(--color-bordo)] mb-1.5" style={{ fontFamily: "var(--font-display)" }}>
                          Uniforme Varón
                        </p>
                        <ul className="text-[9px] text-[var(--color-bordo)]/80 space-y-1">
                          {[
                            "Camisa manga corta verde musgo",
                            "Corbata con bordado institucional",
                            "Pantalón color hueso",
                            "Tipografía: " + producto.tipografia,
                          ].map((b) => (
                            <li key={`h-${b}`} className="flex gap-1">
                              <span className="shrink-0">•</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
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
