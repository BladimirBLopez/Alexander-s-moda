import Link from "next/link";
import Image from "next/image";
import BotonCompartir from "@/components/BotonCompartir";
import VideoTikTok from "@/components/VideoTikTok";

const WHATSAPP_NUMERO = "59177974868";
const MENSAJE_PEDIDO = encodeURIComponent(
  "Hola, quiero información sobre los uniformes de promoción"
);
const UBICACION_URL = "https://maps.app.goo.gl/xfW7UDupWaDn3kgi8?g_st=aw";

const enlaces = [
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
          Uniformes Institucionales · Confección a Medida
        </p>
        <div className="w-full flex flex-col gap-4 mb-10">
          {enlaces.map((enlace) => (
            <Link
              key={enlace.label}
              href={enlace.href}
              target={enlace.externo ? "_blank" : undefined}
              rel={enlace.externo ? "noopener noreferrer" : undefined}
              className="boton-tactil w-full py-4 px-5 rounded-full bg-[var(--color-papel)] text-[var(--color-bordo-oscuro)] text-[17px] font-bold text-center shadow-lg shadow-black/25 hover:bg-white hover:shadow-xl transition-shadow"
              style={{ fontFamily: "var(--font-display)" }}
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
