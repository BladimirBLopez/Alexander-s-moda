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
    label: "Ver catálogo",
    href: "/catalogo",
    externo: false,
  },
  {
    label: "Proforma",
    href: "/proforma.pdf",
    externo: true,
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
          className="text-2xl tracking-wide text-[var(--color-papel)] uppercase mb-2"
          style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
        >
          Alexander&apos;s Moda
        </h1>

        <p className="text-[11px] tracking-[0.15em] uppercase text-[var(--color-hueso)]/70 mb-1">
          Uniformes Institucionales · Confección a Medida
        </p>
        <p className="text-[var(--color-hueso)]/50 text-xs mb-6">
          @alexanders.moda
        </p>

        <div className="mb-8">
          <RedesSociales />
        </div>

        <div className="w-full flex flex-col gap-3.5 mb-10">
          {enlaces.map((enlace) => (
            <Link
              key={enlace.label}
              href={enlace.href}
              target={enlace.externo ? "_blank" : undefined}
              rel={enlace.externo ? "noopener noreferrer" : undefined}
              className="boton-tactil w-full py-4 px-5 rounded-full text-[var(--color-bordo-oscuro)] uppercase tracking-[0.15em] text-[13px] text-center shadow-lg shadow-black/40 hover:brightness-105"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                background: "linear-gradient(180deg, var(--color-hueso) 0%, var(--color-bronce) 100%)",
              }}
            >
              {enlace.label}
            </Link>
          ))}
        </div>

        <div className="w-full">
          <VideoTikTok />
        </div>
      </div>

      <p className="text-[var(--color-hueso)]/40 text-[11px] tracking-wide mt-8">
        Hecho a medida · Santa Cruz, Bolivia
      </p>
    </main>
  );
}
