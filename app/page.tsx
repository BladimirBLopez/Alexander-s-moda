import Link from "next/link";
import Image from "next/image";
import BotonCompartir from "@/components/BotonCompartir";
import RedesSociales from "@/components/RedesSociales";
import VideoTikTok from "@/components/VideoTikTok";

const WHATSAPP_NUMERO = "59177974868";
const MENSAJE_PEDIDO = encodeURIComponent(
  "Hola, quiero información sobre uniformes escolares"
);
const UBICACION_URL = "https://maps.app.goo.gl/xfW7UDupWaDn3kgi8?g_st=aw";

const enlaces = [
  {
    label: "Catálogo",
    href: "/catalogo",
    externo: false,
  },
  {
    label: "Proforma",
    href: "/proforma",
    externo: false,
  },
  {
    label: "WhatsApp",
    href: `https://wa.me/${WHATSAPP_NUMERO}?text=${MENSAJE_PEDIDO}`,
    externo: false,
  },
  {
    label: "Ubicación",
    href: UBICACION_URL,
    externo: false,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center text-center">
      <div className="relative w-full h-32 overflow-hidden">
        <Image
          src="/banner.jpg"
          alt="Alexander's Moda"
          fill
          className="object-cover"
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
        <div className="relative w-32 h-32 -mt-16 mb-5">
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
          Uniformes Institucionales · Confección a Medida
        </p>
        <div className="flex items-center gap-1.5 text-[var(--color-hueso)]/70 text-xs mb-6">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
            <path d="M12 21s-7-6.1-7-11a7 7 0 0114 0c0 4.9-7 11-7 11z" strokeLinejoin="round" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
          <span>Centro Comercial Norte, Pasillo 11, Local #357</span>
        </div>

        <div className="mb-12">
          <RedesSociales />
        </div>

        <div className="w-full flex flex-col gap-4 mb-10">
          {enlaces.map((enlace) => (
            <Link
              key={enlace.label}
              href={enlace.href}
              target={enlace.externo ? "_blank" : undefined}
              rel={enlace.externo ? "noopener noreferrer" : undefined}
              className="boton-tactil w-full py-4 px-5 rounded-full bg-[var(--color-papel)] text-[var(--color-bordo-oscuro)] text-[17px] font-bold text-center shadow-md shadow-black/20 hover:bg-white"
            >
              {enlace.label}
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
