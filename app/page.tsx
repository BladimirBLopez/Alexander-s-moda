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
const TIKTOK_DESTACADO = "https://vt.tiktok.com/ZSVR8auCq/";

const enlaces = [
  {
    label: "Ver catálogo",
    href: "/catalogo",
  },
  {
    label: "WhatsApp",
    href: `https://wa.me/${WHATSAPP_NUMERO}?text=${MENSAJE_PEDIDO}`,
  },
  {
    label: "Ubicación",
    href: UBICACION_URL,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center px-6 py-4 text-center">
      <div className="w-full max-w-sm flex justify-end mb-2">
        <BotonCompartir />
      </div>

      <div className="w-full max-w-sm flex flex-col items-center flex-1">
        <div className="relative w-32 h-32 mb-4">
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

        <h1
          className="text-2xl tracking-wide text-[var(--color-papel)] uppercase mb-1"
          style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
        >
          Alexander&apos;s Moda
        </h1>
        <p className="text-[11px] tracking-[0.15em] uppercase text-[var(--color-hueso)]/70 mb-1">
          Uniformes Institucionales · Confección a Medida
        </p>
        <p className="text-[var(--color-hueso)]/50 text-xs mb-4">
          @alexanders.moda
        </p>

        <div className="mb-6">
          <RedesSociales />
        </div>

        <div className="w-full flex flex-col gap-3.5 mb-5">
          {enlaces.map((enlace) => (
            <Link
              key={enlace.label}
              href={enlace.href}
              className="boton-tactil w-full py-4 px-5 rounded-full bg-[var(--color-hueso)] text-[var(--color-bordo-oscuro)] font-medium tracking-wide text-sm transition-colors hover:bg-[var(--color-bronce)] hover:text-[var(--color-papel)]"
            >
              {enlace.label}
            </Link>
          ))}
        </div>

        <div className="w-full flex gap-3.5 mb-10">
          <Link
            href="/proforma.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="boton-tactil flex-1 py-3.5 px-4 rounded-full border border-[var(--color-hueso)]/50 text-[var(--color-hueso)] text-sm font-medium tracking-wide text-center transition-colors hover:border-[var(--color-hueso)] hover:bg-[var(--color-hueso)]/10"
          >
            Ver proforma
          </Link>
          <a
            href="/proforma.pdf"
            download="proforma-alexanders-moda.pdf"
            className="boton-tactil flex-1 py-3.5 px-4 rounded-full border border-[var(--color-hueso)]/50 text-[var(--color-hueso)] text-sm font-medium tracking-wide text-center transition-colors hover:border-[var(--color-hueso)] hover:bg-[var(--color-hueso)]/10"
          >
            Descargar
          </a>
        </div>

        <div className="w-full">
          <VideoTikTok url={TIKTOK_DESTACADO} />
        </div>
      </div>

      <p className="text-[var(--color-hueso)]/40 text-[11px] tracking-wide mt-8">
        Hecho a medida · Santa Cruz, Bolivia
      </p>
    </main>
  );
}
