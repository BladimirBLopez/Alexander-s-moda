import Link from "next/link";
import { notFound } from "next/navigation";
import { productos, type BulletItem } from "@/lib/productos";
import FotoZoom from "@/components/FotoZoom";
import BotonCompartir from "@/components/BotonCompartir";
import RedesSociales from "@/components/RedesSociales";
import VerColores, { CaracteristicasComunes } from "@/components/VerColores";

const UBICACION_URL = "https://maps.app.goo.gl/xfW7UDupWaDn3kgi8?g_st=aw";
const WHATSAPP_NUMERO = "59177974868";

const SLUG_A_ID: Record<string, string> = {
  sport: "uniforme-sport",
  casimir: "uniforme-casimir",
};

export function generateStaticParams() {
  return Object.keys(SLUG_A_ID).map((slug) => ({ slug }));
}

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
const IconoPantalon2 = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M7 4h10l1 5-1 12h-3l-1-9-1 9H8L7 9z" strokeLinejoin="round" />
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
  foto?: string | null;
  bullets: string[];
  detalles: { icono: React.ReactNode; texto: string }[];
  bordeDerecho?: boolean;
}) {
  return (
    <div>
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
    </div>
  );
}

function FotoOPlaceholder({ src, alt }: { src?: string | null; alt: string }) {
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
    </div>
  );
}

function SeccionGenero({
  titulo,
  fotoDentro,
  fotoFuera,
  bullets,
  invertido = false,
  mostrarColores = true,
}: {
  titulo: string;
  fotoDentro?: string | null;
  fotoFuera?: string | null;
  bullets: BulletItem[];
  invertido?: boolean;
  mostrarColores?: boolean;
}) {
  const descripcionBlock = (
    <div className={mostrarColores && !invertido ? "border-r border-[var(--color-hueso)]/50 -my-4 py-4 pr-3" : ""}>
      <p className="text-[9px] uppercase tracking-[0.1em] text-[var(--color-bordo)] font-semibold mb-1.5" style={{ fontFamily: "var(--font-display)" }}>
        <span className="inline-block border-b border-[var(--color-hueso)]/50 pb-0.5">Descripción</span>
      </p>
      <ul className="text-[9px] text-[var(--color-bordo)]/80 space-y-1.5 text-left">
        {bullets.map((b, i) =>
          typeof b === "string" ? (
            <li key={i} className="flex gap-1">
              <span className="shrink-0">•</span>
              <span>{b}</span>
            </li>
          ) : (
            <li key={i}>
              <div className="flex gap-1">
                <span className="shrink-0">•</span>
                <span>{b.texto}</span>
              </div>
              <ul className="pl-4 mt-1 space-y-1">
                {b.sublista.map((op) => (
                  <li key={op} className="flex gap-1">
                    <span className="shrink-0">◦</span>
                    <span>{op}</span>
                  </li>
                ))}
              </ul>
              {b.nota && (
                <p className="mt-1 pl-1">{b.nota}</p>
              )}
            </li>
          )
        )}
      </ul>
    </div>
  );

  const coloresBlock = (
    <div className={`h-full flex flex-col items-center justify-center gap-10 pb-6 ${invertido ? "border-r border-[var(--color-hueso)]/50 -my-4 py-4 pr-3" : ""}`}>
      <div className="flex flex-col items-center">
        <p className="text-[9px] uppercase tracking-[0.05em] text-[var(--color-bordo)] font-semibold mb-1.5 text-center" style={{ fontFamily: "var(--font-display)" }}>
          <span className="inline-block border-b border-[var(--color-hueso)]/50 pb-0.5">Ver telas</span>
        </p>
        <p className="text-[9px] text-[var(--color-bordo)]/70 text-center">
          Colores a elección
        </p>
        <div className="flex flex-col items-center gap-2 mt-2">
          <VerColores label="Color camisa" mostrarCaracteristicas={false} />
          <VerColores label={titulo.includes("Dama") ? "Colores de faldas" : "Colores de pantalones"} mostrarCaracteristicas={false} filtroTelas={["drill-confort-dockers"]} />
        </div>
      </div>
      <CaracteristicasComunes />
    </div>
  );

  return (
    <div className="mb-6">
      <p className="text-[13px] uppercase tracking-[0.2em] text-[var(--color-bronce)] mt-4 mb-2 text-center" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
        {titulo}
      </p>
      <div className="grid grid-cols-2 gap-1 mb-0 max-w-[440px] mx-auto">
        <FotoOPlaceholder src={fotoDentro} alt={`${titulo} - camisa por dentro`} />
        <FotoOPlaceholder src={fotoFuera} alt={`${titulo} - camisa por fuera`} />
      </div>
      <div className={`grid gap-3 border border-[var(--color-hueso)]/50 rounded-lg p-4 -mx-3 ${!mostrarColores ? "grid-cols-1" : invertido ? "grid-cols-[1fr_1.4fr]" : "grid-cols-[1.4fr_1fr]"}`}>
        {!mostrarColores ? (
          descripcionBlock
        ) : invertido ? (
          <>
            {coloresBlock}
            {descripcionBlock}
          </>
        ) : (
          <>
            {descripcionBlock}
            {coloresBlock}
          </>
        )}
      </div>
    </div>
  );
}

export default async function CatalogoDetallePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const id = SLUG_A_ID[slug];
  const producto = productos.find((p) => p.id === id);

  if (!producto) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[var(--color-papel)]">
      <div className="sticky top-0 z-10 px-3 py-2 flex items-center justify-between bg-[var(--color-papel)]/95 backdrop-blur-sm">
        <Link
          href="/"
          className="text-xs font-medium text-[var(--color-hueso)] bg-[var(--color-bordo)]/80 hover:bg-[var(--color-bordo)] inline-flex items-center gap-1 px-3 py-1.5 rounded-full shadow-md"
        >
          ← Volver
        </Link>
        <BotonCompartir />
      </div>
      <div className="max-w-md mx-auto px-6 pb-8 pt-1">
        <div className="text-center mb-6">
          <h1
            className="text-3xl uppercase tracking-wide"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              color: "var(--color-bordo)",
            }}
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
          <article className="text-center mb-4">
            <SeccionGenero
              titulo={`Uniforme ${producto.nombre} Dama`}
              fotoDentro={producto.fotoMujerDentro}
              fotoFuera={producto.fotoMujerFuera}
              bullets={producto.bulletsMujer}
            />
            <div className="border border-[var(--color-hueso)]/50 rounded-none overflow-hidden mb-6 -mx-3">
              <div className="bg-[var(--color-bordo)] px-2 py-2">
                <p className="text-[8.5px] uppercase tracking-[0.05em] text-white text-center" style={{ fontFamily: "var(--font-display)" }}>
                  Los diseños y tipografías de letras de los bordados serán elegidos por los estudiantes de la promoción.
                </p>
              </div>
            </div>
            <SeccionGenero
              titulo={`Uniforme ${producto.nombre} Varón`}
              fotoDentro={producto.fotoHombreDentro}
              fotoFuera={producto.fotoHombreFuera}
              bullets={producto.bulletsHombre}
            />

            <div className="mt-6">
              <div className="relative -mx-6">
                <div className="grid grid-cols-2 bg-[var(--color-bordo)]">
                  <p className="text-center text-[9px] uppercase tracking-[0.1em] text-white font-semibold py-2.5" style={{ fontFamily: "var(--font-display)" }}>
                    Uniforme Dama
                  </p>
                  <p className="text-center text-[9px] uppercase tracking-[0.1em] text-white font-semibold py-2.5" style={{ fontFamily: "var(--font-display)" }}>
                    Uniforme Varón
                  </p>
                </div>

                <div className="relative">
                  <div className="grid grid-cols-2 gap-0 pt-4 pb-4">
                    <ColumnaGenero2
                      titulo="Uniforme dama"
                      foto="https://res.cloudinary.com/dkq95jus0/image/upload/e_trim:20/v1787361943/Dise%C3%B1o_sin_t%C3%ADtulo_2_ywe8v4.png"
                      bullets={[
                        "Camisa manga corta color verde hoja seca",
                        "Corbata color beige con bordado DF",
                        "Bordado \"DEIFFET'S 27\" en el pecho",
                        "Falda color beige con abertura lateral",
                      ]}
                      detalles={[
                        { icono: <IconoCamisa2 />, texto: "Camisa clásica de corte femenino" },
                        { icono: <IconoCorbata2 />, texto: "Corbata con bordado DF" },
                        { icono: <IconoFalda2 />, texto: "Falda cómoda y elegante" },
                      ]}
                    />
                    <ColumnaGenero2
                      titulo="Uniforme varón"
                      foto="https://res.cloudinary.com/dkq95jus0/image/upload/e_trim:20/v1787361943/Dise%C3%B1o_sin_t%C3%ADtulo_4_ys77im.png"
                      bullets={[
                        "Camisa manga corta color verde hoja seca",
                        "Corbata color beige con bordado DF",
                        "Bordado \"DEIFFET'S 27\" en el pecho",
                        "Pantalón color beige de corte clásico",
                      ]}
                      detalles={[
                        { icono: <IconoCamisa2 />, texto: "Camisa clásica de corte masculino" },
                        { icono: <IconoCorbata2 />, texto: "Corbata con bordado DF" },
                        { icono: <IconoPantalon2 />, texto: "Pantalón formal y cómodo" },
                      ]}
                    />
                  </div>
                  <div className="mt-4 border-t border-[var(--color-hueso)]/50" />
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[var(--color-hueso)]/50" />
                </div>
              </div>
            </div>
          </article>
        </div>

        <footer className="pt-5 text-center">
          <p className="text-[9px] uppercase tracking-[0.15em] text-[var(--color-bronce)] mb-2" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
            Alexander&apos;s Moda
          </p>
          <div className="flex items-center justify-center gap-1.5 text-[var(--color-bordo)]/70 text-[9px] mb-3">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
              <path d="M12 21s-7-6.1-7-11a7 7 0 0114 0c0 4.9-7 11-7 11z" strokeLinejoin="round" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            <Link href={UBICACION_URL} className="underline decoration-[var(--color-hueso)]">
              Centro Comercial Norte, Pasillo 11, Local #357
            </Link>
          </div>
          <div>
            <RedesSociales variant="dark" />
          </div>
        </footer>
      </div>

      <Link
        href={`https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent("Hola, me interesa el uniforme de promoción de Alexander's Moda")}`}
        aria-label="Pedir por WhatsApp"
        className="fixed bottom-5 right-5 z-20 w-14 h-14 rounded-full shadow-lg bg-[#25D366] flex items-center justify-center hover:scale-105 transition-transform"
      >
        <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.87 9.87 0 0 0 4.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C22 6.45 17.5 2 12.04 2Zm5.8 14.06c-.24.68-1.4 1.3-1.93 1.35-.5.05-1.03.25-3.45-.72-2.92-1.16-4.8-4.12-4.94-4.31-.14-.19-1.18-1.57-1.18-3 0-1.43.75-2.13 1.02-2.42.27-.29.58-.36.78-.36.19 0 .39 0 .55.01.18.01.42-.07.65.5.24.58.82 2.01.9 2.15.07.15.12.32.02.51-.1.19-.15.31-.29.48-.15.17-.3.38-.43.51-.14.14-.29.29-.13.57.16.29.72 1.19 1.55 1.93 1.06.95 1.96 1.24 2.24 1.38.29.14.46.12.63-.07.17-.19.72-.83.91-1.12.19-.29.38-.24.63-.14.26.1 1.65.78 1.93.92.29.14.48.21.55.33.07.12.07.68-.17 1.36Z" />
        </svg>
      </Link>
    </main>
  );
}
