import Link from "next/link";
import Image from "next/image";
import BotonCompartir from "@/components/BotonCompartir";
import RedesSociales from "@/components/RedesSociales";

const WHATSAPP_NUMERO = "59177373235";
const WHATSAPP_MENSAJE = encodeURIComponent(
  "Hola, quiero información sobre uniformes escolares"
);
const UBICACION_URL = "https://maps.app.goo.gl/xfW7UDupWaDn3kgi8?g_st=aw";

const IconoWhatsapp = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.44-1.42a9.87 9.87 0 004.6 1.17h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.79 14.05c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.13.11-1.82-.12-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.79-4.16-4.94-4.35-.14-.19-1.18-1.57-1.18-2.99 0-1.43.75-2.13 1.02-2.42.27-.29.58-.36.78-.36.19 0 .39 0 .55.01.18.01.42-.07.65.5.24.58.83 2 .9 2.14.07.15.11.32.02.51-.09.19-.14.3-.27.46-.14.16-.29.36-.41.48-.14.14-.28.29-.12.57.16.28.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.22 1.37.28.14.44.12.6-.07.16-.19.68-.79.87-1.06.18-.28.36-.23.6-.14.24.09 1.55.73 1.82.86.27.14.44.2.51.32.07.11.07.65-.17 1.32z"/>
  </svg>
);

const IconoCatalogo = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 3h9l3 4v13a1 1 0 01-1 1H6a1 1 0 01-1-1V4a1 1 0 011-1z" strokeLinejoin="round" />
    <path d="M9 8h6M9 12h6M9 16h4" strokeLinecap="round" />
  </svg>
);

const IconoUbicacion = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 21s-7-6.1-7-11a7 7 0 0114 0c0 4.9-7 11-7 11z" strokeLinejoin="round" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

const enlaces = [
  {
    label: "Pedir por WhatsApp",
    href: `https://wa.me/${WHATSAPP_NUMERO}?text=${WHATSAPP_MENSAJE}`,
    destacado: true,
    icono: <IconoWhatsapp />,
  },
  {
    label: "Ver catálogo",
    href: "/catalogo",
    destacado: false,
    icono: <IconoCatalogo />,
  },
  {
    label: "Ubicación · CC Norte, pasillo 11",
    href: UBICACION_URL,
    destacado: false,
    icono: <IconoUbicacion />,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center px-6 py-10 text-center">
      <div className="w-full max-w-sm flex justify-end mb-4">
        <BotonCompartir />
      </div>

      <div className="w-full max-w-sm flex flex-col items-center flex-1">
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-[var(--color-hueso)]/60 shadow-lg shadow-black/30 mb-6">
          <Image
            src="/alexanders-moda-logo.png"
            alt="Alexander's Moda"
            fill
            className="object-cover"
            priority
          />
        </div>

        <p
          className="text-lg text-[var(--color-hueso)] mb-1"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Uniformes que representan tu institución
        </p>
        <p className="text-[var(--color-papel)]/60 text-xs leading-relaxed mb-1">
          Empresa de confección de uniformes institucionales
        </p>
        <p className="text-[var(--color-hueso)]/60 text-xs mb-6">
          @alexanders.moda
        </p>

        <div className="mb-10">
          <RedesSociales />
        </div>

        <div className="w-full flex flex-col gap-4">
          {enlaces.map((enlace) => (
            <Link
              key={enlace.label}
              href={enlace.href}
              className={
                (enlace.destacado
                  ? "bg-[var(--color-hueso)] text-[var(--color-bordo-oscuro)] hover:bg-[var(--color-bronce)] hover:text-[var(--color-papel)]"
                  : "border border-[var(--color-hueso)]/50 text-[var(--color-hueso)] hover:border-[var(--color-hueso)] hover:bg-[var(--color-hueso)]/10") +
                " boton-tactil w-full py-4 px-5 rounded-full font-medium tracking-wide flex items-center justify-center gap-2 text-sm transition-colors"
              }
            >
              {enlace.icono}
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
