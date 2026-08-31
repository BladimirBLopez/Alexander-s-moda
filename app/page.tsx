import Link from "next/link";
import Image from "next/image";
import type { ReactElement } from "react";
import BotonCompartir from "@/components/BotonCompartir";
import VideoTikTok from "@/components/VideoTikTok";

const WHATSAPP_NUMERO = "59177974868";
const MENSAJE_PEDIDO = encodeURIComponent(
  "Hola, quiero información sobre los uniformes de promoción"
);
const UBICACION_URL = "https://maps.app.goo.gl/xfW7UDupWaDn3kgi8?g_st=aw";

type IconoProps = { className?: string };

function IconoWhatsApp({ className }: IconoProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.85.5 3.58 1.36 5.06L2 22l5.2-1.44a9.87 9.87 0 0 0 4.84 1.28h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.83 9.83 0 0 0 12.04 2Zm5.72 14.11c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.13.11-1.82-.11-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.79-4.16-4.94-4.35-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.13 1.02-2.42.27-.29.58-.36.78-.36.19 0 .39 0 .56.01.18.01.42-.07.66.5.24.58.82 2 .89 2.14.07.15.12.32.02.51-.1.19-.15.31-.3.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.75 1.24 1.62 2 1.11.99 2.05 1.3 2.34 1.44.29.15.46.13.63-.08.17-.2.72-.84.92-1.13.19-.29.39-.24.65-.14.27.1 1.69.8 1.98.94.29.15.48.22.55.34.08.13.08.72-.16 1.4Z" />
    </svg>
  );
}

function IconoUbicacion({ className }: IconoProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 21s7-6.5 7-11.5A7 7 0 1 0 5 9.5C5 14.5 12 21 12 21Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="12" cy="9.5" r="2.4" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

type Enlace = {
  label: string;
  href: string;
  externo: boolean;
  Icono?: (props: IconoProps) => ReactElement;
  descripcion?: string;
};

const enlaces: Enlace[] = [
  {
    label: "Uniforme Sport",
    href: "/catalogo/sport",
    externo: false,
  },
  {
    label: "Uniforme Casimir",
    href: "/catalogo/casimir",
    externo: false,
  },
  {
    label: "WhatsApp",
    href: `https://wa.me/${WHATSAPP_NUMERO}?text=${MENSAJE_PEDIDO}`,
    externo: false,
    Icono: IconoWhatsApp,
  },
  {
    label: "Ubicación",
    href: UBICACION_URL,
    externo: false,
    Icono: IconoUbicacion,
    descripcion: "Centro Comercial Norte, Planta Alta, Pasillo #11, Local #357",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center text-center">
      <div className="relative w-full h-44 overflow-hidden">
        <Image
          src="https://res.cloudinary.com/dkq95jus0/image/upload/v1787372604/Dise%C3%B1o_sin_t%C3%ADtulo_6_b2ufyx.png"
          alt="Alexander's Moda"
          fill
          className="object-cover object-[center_25%]"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, transparent 0%, transparent 55%, var(--color-bordo) 100%)",
          }}
        />
        <div className="absolute top-3 right-4">
          <BotonCompartir />
        </div>
      </div>

      <div className="w-full max-w-sm flex flex-col items-center flex-1 px-3">
        <div className="relative w-44 h-44 -mt-24 mb-5">
          <div
            className="absolute inset-0 bg-[var(--color-hueso)]"
            style={{
              borderRadius: "62% 38% 35% 65% / 58% 32% 68% 42%",
              transform: "rotate(-8deg)",
            }}
          />
          <div className="absolute inset-2 rounded-full overflow-hidden shadow-lg shadow-black/30">
            <Image
              src="/alexanders-moda-logo.png"
              alt="Alexander's Moda"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <h1 className="sr-only">Alexander&apos;s Moda</h1>

        <p className="text-[13px] tracking-[0.15em] uppercase text-[var(--color-papel)] font-medium mb-3">
          Uniformes Institucionales
          <br />
          Moda Colegial
        </p>
        <div className="w-full flex flex-col gap-4 mb-10">
          {enlaces.map((enlace) => (
            <Link
              key={enlace.label}
              href={enlace.href}
              target={enlace.externo ? "_blank" : undefined}
              rel={enlace.externo ? "noopener noreferrer" : undefined}
              className="boton-tactil w-full py-4 px-5 rounded-full bg-[var(--color-papel)] text-[var(--color-bordo-oscuro)] shadow-lg shadow-black/25 hover:bg-white hover:shadow-xl transition-shadow flex flex-col items-center justify-center gap-1"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="flex items-center justify-center gap-2 text-[17px] font-bold">
                {enlace.Icono && <enlace.Icono className="w-5 h-5 shrink-0" />}
                {enlace.label}
              </span>
              {enlace.descripcion && (
                <span className="text-[11px] font-normal normal-case tracking-normal text-[var(--color-bordo-oscuro)]/60">
                  {enlace.descripcion}
                </span>
              )}
            </Link>
          ))}
        </div>

        <div className="w-full">
          <VideoTikTok />
        </div>
      </div>

      <p className="text-[var(--color-hueso)]/40 text-[11px] tracking-wide mt-8 mb-6">
        Hecho a medida · Santa Cruz, Bolivia
      </p>
    </main>
  );
}
