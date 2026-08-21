import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { productos, type BulletItem } from "@/lib/productos";
import FotoZoom from "@/components/FotoZoom";
import BotonCompartir from "@/components/BotonCompartir";
import RedesSociales from "@/components/RedesSociales";
import VerColores from "@/components/VerColores";

const UBICACION_URL = "https://maps.app.goo.gl/xfW7UDupWaDn3kgi8?g_st=aw";
const WHATSAPP_NUMERO = "59177974868";

const SLUG_A_ID: Record<string, string> = {
  sport: "uniforme-sport",
  casimir: "uniforme-casimir",
};

export function generateStaticParams() {
  return Object.keys(SLUG_A_ID).map((slug) => ({ slug }));
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
}: {
  titulo: string;
  fotoDentro?: string | null;
  fotoFuera?: string | null;
  bullets: BulletItem[];
  invertido?: boolean;
}) {
  const descripcionBlock = (
    <div>
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
    <div>
      <p className="text-[9px] uppercase tracking-[0.05em] text-[var(--color-bordo)] font-semibold mb-1.5 text-center" style={{ fontFamily: "var(--font-display)" }}>
        <span className="inline-block border-b border-[var(--color-hueso)]/50 pb-0.5">Colores</span>
      </p>
      <p className="text-[9px] text-[var(--color-bordo)]/70 text-center">
        Colores a elección
      </p>
      <div className="text-center">
        <VerColores />
      </div>
    </div>
  );

  const divider = <div className="self-stretch w-px h-full bg-[var(--color-bordo)]/15" />;

  return (
    <div className="mb-6">
      <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-bronce)] mt-4 mb-2 text-center" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
        {titulo}
      </p>
      <div className="grid grid-cols-2 gap-1 mb-4 max-w-[340px] mx-auto">
        <FotoOPlaceholder src={fotoDentro} alt={`${titulo} - camisa por dentro`} />
        <FotoOPlaceholder src={fotoFuera} alt={`${titulo} - camisa por fuera`} />
      </div>
      <div className={`grid gap-3 border border-[var(--color-hueso)]/50 rounded-lg p-4 ${invertido ? "grid-cols-[1fr_auto_1.4fr]" : "grid-cols-[1.4fr_auto_1fr]"}`}>
        {invertido ? (
          <>
            {coloresBlock}
            {divider}
            {descripcionBlock}
          </>
        ) : (
          <>
            {descripcionBlock}
            {divider}
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
      <div className="sticky top-0 z-10 px-3 py-2 flex items-center justify-between">
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
              color: "color-mix(in oklab, var(--color-bordo) 70%, white 30%)",
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
            <div className="border border-[var(--color-hueso)]/50 rounded-none overflow-hidden mb-6">
              <div className="bg-[var(--color-bordo)] px-4 py-2">
                <p className="text-[10px] uppercase tracking-[0.05em] text-white text-center" style={{ fontFamily: "var(--font-display)" }}>
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
              <div className="grid grid-cols-[1.5fr_0.5fr_1.5fr] gap-2">
                <div>
                  <div className="relative w-full aspect-[5/7] overflow-hidden bg-[var(--color-papel)]">
                    {producto.fotoMujerFuera ? (
                      <FotoZoom src={producto.fotoMujerFuera} alt="Uniforme dama" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-center px-2">
                        <span className="text-[9px] uppercase tracking-[0.1em] text-[var(--color-bordo)]/40">Foto pendiente</span>
                      </div>
                    )}
                  </div>
                  <div className="border border-[var(--color-hueso)]/50 rounded-b-lg p-2">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.05em] text-[var(--color-bordo)] mb-1.5" style={{ fontFamily: "var(--font-display)" }}>
                      <span className="inline-block border-b border-[var(--color-hueso)]/50 pb-0.5">Uniforme Dama</span>
                    </p>
                    <ul className="text-[9px] text-[var(--color-bordo)]/80 space-y-1.5">
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
                  <div className="border border-[var(--color-hueso)]/50 rounded-lg overflow-hidden">
                    <div className="aspect-square flex items-center justify-center bg-[var(--color-bordo)]/[0.04] p-1">
                      <span className="text-[6px] uppercase text-[var(--color-bordo)]/40 text-center">Pendiente</span>
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.05em] text-[var(--color-bordo)]/60 text-center py-1 border-t border-[var(--color-hueso)]/50" style={{ fontFamily: "var(--font-display)" }}>
                      Corbata
                    </p>
                  </div>
                  <div className="border border-[var(--color-hueso)]/50 rounded-lg p-2 text-center">
                    <p className="text-[10px] uppercase tracking-[0.05em] text-[var(--color-bordo)]/60 mb-1" style={{ fontFamily: "var(--font-display)" }}>
                      Paleta
                    </p>
                    <p className="text-[9px] text-[var(--color-bordo)]/70">Colores a elección</p>
                    <VerColores />
                  </div>
                  <div className="border border-[var(--color-hueso)]/50 rounded-lg p-2 text-center">
                    <p className="text-[10px] uppercase tracking-[0.05em] text-[var(--color-bordo)]/60 mb-0.5" style={{ fontFamily: "var(--font-display)" }}>
                      Tipografía
                    </p>
                    <p className="text-[9px] text-[var(--color-bordo)]">
                      A elección de los estudiantes de la promoción
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
                  <div className="border border-[var(--color-hueso)]/50 rounded-b-lg p-2">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.05em] text-[var(--color-bordo)] mb-1.5" style={{ fontFamily: "var(--font-display)" }}>
                      <span className="inline-block border-b border-[var(--color-hueso)]/50 pb-0.5">Uniforme Varón</span>
                    </p>
                    <ul className="text-[9px] text-[var(--color-bordo)]/80 space-y-1.5">
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
        </div>

        <section className="mt-10 pt-6">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-bronce)] mb-4 text-center" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
            Poleras
          </p>

          <div className="grid grid-cols-[1.2fr_1fr] gap-3 mb-3">
            <div className="relative w-full aspect-[5/7] rounded-md overflow-hidden bg-[var(--color-papel)]">
              <FotoZoom src="https://res.cloudinary.com/dkq95jus0/image/upload/v1787341634/Dise%C3%B1o_sin_t%C3%ADtulo_5_umz5ov.png" alt="Polera" />
            </div>
            <div className="border border-[var(--color-hueso)]/50 rounded-lg p-3 h-full flex flex-col">
              <p className="text-[9px] uppercase tracking-[0.1em] text-[var(--color-bordo)] font-semibold mb-1.5" style={{ fontFamily: "var(--font-display)" }}>
                <span className="inline-block border-b border-[var(--color-hueso)]/50 pb-0.5">Descripción</span>
              </p>
              <ul className="text-[9px] text-[var(--color-bordo)]/80 space-y-2 flex-1">
                <li className="flex gap-1">
                  <span className="shrink-0">•</span>
                  <span>Descripción pendiente</span>
                </li>
                <li className="flex gap-1">
                  <span className="shrink-0">•</span>
                  <span>Descripción pendiente</span>
                </li>
                <li className="flex gap-1">
                  <span className="shrink-0">•</span>
                  <span>Descripción pendiente</span>
                </li>
                <li className="flex gap-1">
                  <span className="shrink-0">•</span>
                  <span>Descripción pendiente</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-[1.2fr_1fr] gap-3">
            <div className="flex flex-col gap-2 h-full">
              <div className="border border-[var(--color-hueso)]/50 rounded-lg p-2 flex-1 flex flex-col justify-center">
                <p className="text-[8px] uppercase tracking-[0.05em] text-[var(--color-bordo)] font-semibold text-center mb-1.5" style={{ fontFamily: "var(--font-display)" }}>
                  <span className="inline-block border-b border-[var(--color-hueso)]/50 pb-0.5">Colores</span>
                </p>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-center gap-1">
                    <span className="w-3.5 h-3.5 rounded-sm border border-[var(--color-hueso)]/50 shrink-0" style={{ backgroundColor: "#4a5a3f" }} />
                    <span className="text-[7px] text-[var(--color-bordo)]/70">Verde musgo</span>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <span className="w-3.5 h-3.5 rounded-sm border border-[var(--color-hueso)]/50 shrink-0" style={{ backgroundColor: "#c9b896" }} />
                    <span className="text-[7px] text-[var(--color-bordo)]/70">Hueso / arena</span>
                  </div>
                </div>
              </div>
              <div className="border border-[var(--color-hueso)]/50 rounded-lg p-2 flex-1 flex flex-col justify-center">
                <p className="text-[8px] uppercase tracking-[0.05em] text-[var(--color-bordo)] font-semibold text-center mb-1.5" style={{ fontFamily: "var(--font-display)" }}>
                  <span className="inline-block border-b border-[var(--color-hueso)]/50 pb-0.5">Bordados</span>
                </p>
                <div className="flex gap-1">
                  <div className="flex-1 aspect-square bg-[var(--color-bordo)]/[0.04] rounded border border-[var(--color-hueso)]/30 flex items-center justify-center">
                    <span className="text-[6px] uppercase text-[var(--color-bordo)]/40 text-center px-0.5">Pendiente</span>
                  </div>
                  <div className="flex-1 aspect-square bg-[var(--color-bordo)]/[0.04] rounded border border-[var(--color-hueso)]/30 flex items-center justify-center">
                    <span className="text-[6px] uppercase text-[var(--color-bordo)]/40 text-center px-0.5">Pendiente</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative w-full aspect-[5/7] rounded-md overflow-hidden bg-[var(--color-papel)]">
              <FotoZoom src="https://res.cloudinary.com/dkq95jus0/image/upload/v1786978172/Sin_t%C3%ADtulo_1000_x_1400_px_2_snyq8e.png" alt="Polera" />
            </div>
          </div>
        </section>

        <div className="mt-12 pt-8 border-t-2 border-[var(--color-hueso)]/40 text-center">
          <p className="text-[11px] uppercase tracking-[0.25em] text-[var(--color-bronce)] mb-2" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
            Obsequios Especiales
          </p>
          <div className="flex items-center justify-center gap-1.5">
            <span className="text-[8px] text-[var(--color-bronce)]">◆</span>
            <span className="w-9 h-px bg-[var(--color-bronce)]/60" />
            <span className="text-base text-[var(--color-bronce)] leading-none">⚜</span>
            <span className="w-9 h-px bg-[var(--color-bronce)]/60" />
            <span className="text-[8px] text-[var(--color-bronce)]">◆</span>
          </div>
        </div>

        <section className="mt-10 pt-6">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-bronce)] mb-4 text-center" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
            Chamarras
          </p>

          <div className="relative w-full max-w-[300px] mx-auto aspect-[5/7] rounded-md overflow-hidden bg-[var(--color-papel)] mb-4">
            <FotoZoom src="https://res.cloudinary.com/dkq95jus0/image/upload/e_trim/v1786755139/promo-hombre_1.png" alt="Chamarra Americana" />
          </div>

          <div className="border border-[var(--color-hueso)]/50 rounded-lg overflow-hidden mb-3">
            <p className="text-[9px] uppercase tracking-[0.05em] text-[var(--color-bordo)] font-semibold text-center py-1.5" style={{ fontFamily: "var(--font-display)" }}>
              Chamarra Americana
            </p>
            <div className="flex items-center justify-center bg-[var(--color-bordo)]/[0.04] rounded-b-lg aspect-[4/2] border-t border-[var(--color-hueso)]/50">
              <span className="text-[7px] uppercase text-[var(--color-bordo)]/40 text-center px-1">Pendiente</span>
            </div>
          </div>

          <div className="border border-[var(--color-hueso)]/50 rounded-lg p-3">
            <p className="text-[9px] uppercase tracking-[0.1em] text-[var(--color-bordo)] font-semibold mb-1.5" style={{ fontFamily: "var(--font-display)" }}>
              <span className="inline-block border-b border-[var(--color-hueso)]/50 pb-0.5">Descripción</span>
            </p>
            <ul className="text-[9px] text-[var(--color-bordo)]/80 space-y-1.5 mb-3">
              <li className="flex gap-1">
                <span className="shrink-0">•</span>
                <span>Descripción pendiente</span>
              </li>
            </ul>
            <p className="text-[9px] uppercase tracking-[0.05em] text-[var(--color-bordo)] font-semibold mb-1 text-center" style={{ fontFamily: "var(--font-display)" }}>
              <span className="inline-block border-b border-[var(--color-hueso)]/50 pb-0.5">Colores</span>
            </p>
            <p className="text-[9px] text-[var(--color-bordo)]/70 text-center">Colores a elección</p>
            <div className="text-center">
              <VerColores />
            </div>
          </div>
        </section>

        <section className="mt-10 pt-6">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-bronce)] mb-4 text-center" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
            Canguros
          </p>

          <div className="relative w-full max-w-[300px] mx-auto aspect-[5/7] rounded-md overflow-hidden bg-[var(--color-papel)] mb-4">
            <FotoZoom src="https://res.cloudinary.com/dkq95jus0/image/upload/e_trim/v1786755139/promo-mujer_1.png" alt="Canguro Clásico" />
          </div>

          <div className="border border-[var(--color-hueso)]/50 rounded-lg overflow-hidden mb-3">
            <p className="text-[9px] uppercase tracking-[0.05em] text-[var(--color-bordo)] font-semibold text-center py-1.5" style={{ fontFamily: "var(--font-display)" }}>
              Canguro Clásico
            </p>
            <div className="flex items-center justify-center bg-[var(--color-bordo)]/[0.04] rounded-b-lg aspect-[4/2] border-t border-[var(--color-hueso)]/50">
              <span className="text-[7px] uppercase text-[var(--color-bordo)]/40 text-center px-1">Pendiente</span>
            </div>
          </div>

          <div className="border border-[var(--color-hueso)]/50 rounded-lg p-3">
            <p className="text-[9px] uppercase tracking-[0.1em] text-[var(--color-bordo)] font-semibold mb-1.5" style={{ fontFamily: "var(--font-display)" }}>
              <span className="inline-block border-b border-[var(--color-hueso)]/50 pb-0.5">Descripción</span>
            </p>
            <ul className="text-[9px] text-[var(--color-bordo)]/80 space-y-1.5 mb-3">
              <li className="flex gap-1">
                <span className="shrink-0">•</span>
                <span>Descripción pendiente</span>
              </li>
            </ul>
            <p className="text-[9px] uppercase tracking-[0.05em] text-[var(--color-bordo)] font-semibold mb-1 text-center" style={{ fontFamily: "var(--font-display)" }}>
              <span className="inline-block border-b border-[var(--color-hueso)]/50 pb-0.5">Colores</span>
            </p>
            <p className="text-[9px] text-[var(--color-bordo)]/70 text-center">Colores a elección</p>
            <div className="text-center">
              <VerColores />
            </div>
          </div>
        </section>

        <footer className="mt-8 pt-5 border-t border-[var(--color-hueso)]/50 text-center">
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
        className="fixed bottom-5 right-5 z-20 w-14 h-14 rounded-full shadow-lg overflow-hidden hover:scale-105 transition-transform"
      >
        <Image
          src="https://res.cloudinary.com/dkq95jus0/image/upload/v1786895093/whatsapp-icon_oxdzin.png"
          alt="WhatsApp"
          fill
          className="object-cover"
        />
      </Link>
    </main>
  );
}
