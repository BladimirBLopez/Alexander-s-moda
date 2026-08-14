import Link from "next/link";
import Image from "next/image";
import BotonCompartir from "@/components/BotonCompartir";
import RedesSociales from "@/components/RedesSociales";

const WHATSAPP_NUMERO = "59177373235";
const WHATSAPP_MENSAJE = encodeURIComponent(
  "Hola, quiero información sobre uniformes escolares"
);
const UBICACION_URL = "https://maps.app.goo.gl/xfW7UDupWaDn3kgi8?g_st=aw";

const enlaces = [
  {
    label: "Pedir por WhatsApp",
    href: `https://wa.me/${WHATSAPP_NUMERO}?text=${WHATSAPP_MENSAJE}`,
  },
  {
    label: "Ver catálogo",
    href: "/catalogo",
  },
  {
    label: "Ubicación · CC Norte, pasillo 11",
    href: UBICACION_URL,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center px-6 py-10 text-center">
      <div className="w-full max-w-sm flex justify-end mb-4">
        <BotonCompartir />
      </div>

      <div className="w-full max-w-sm flex flex-col items-center flex-1">
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-[var(--color-hueso)]/60 shadow-lg shadow-black/30 mb-5">
          <Image
            src="/alexanders-moda-logo.png"
            alt="Alexander's Moda"
            fill
            className="object-cover"
            priority
          />
        </div>

        <h1 className="text-2xl font-semibold tracking-wide text-[var(--color-papel)] uppercase mb-1">
          Alexander&apos;s Moda
        </h1>
        <p className="text-[11px] tracking-[0.15em] uppercase text-[var(--color-hueso)]/70 mb-1">
          Uniformes Institucionales · Confección a Medida
        </p>
        <p className="text-[var(--color-hueso)]/50 text-xs mb-6">
          @alexanders.moda
        </p>

        <div className="mb-10">
          <RedesSociales />
        </div>

        <div className="w-full flex flex-col gap-3.5">
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
      </div>

      <p className="text-[var(--color-hueso)]/40 text-[11px] tracking-wide mt-12">
        Hecho a medida · Santa Cruz, Bolivia
      </p>
    </main>
  );
}
