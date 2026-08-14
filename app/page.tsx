import Link from "next/link";
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
    destacado: true,
  },
  {
    label: "Ver catálogo",
    href: "/catalogo",
    destacado: false,
  },
  {
    label: "Ubicación · CC Norte, planta alta, pasillo 11",
    href: UBICACION_URL,
    destacado: false,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center px-6 py-10 text-center">
      <div className="w-full max-w-sm flex justify-end mb-4">
        <BotonCompartir />
      </div>

      <div className="w-full max-w-sm flex flex-col items-center">
        <div className="w-32 h-32 rounded-full bg-[var(--color-bordo-oscuro)] border-2 border-[var(--color-hueso)]/60 flex flex-col items-center justify-center mb-6">
          <span
            className="text-2xl text-[var(--color-hueso)] leading-none"
            style={{ fontFamily: "var(--font-script)" }}
          >
            Alexander&apos;s
          </span>
          <span
            className="text-[10px] tracking-[0.25em] text-[var(--color-hueso)] uppercase mt-1"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Moda
          </span>
        </div>

        <p className="text-[var(--color-papel)]/80 text-sm leading-relaxed mb-1">
          Empresa de confección de uniformes institucionales
        </p>
        <p className="text-[var(--color-hueso)]/70 text-xs mb-6">
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
                enlace.destacado
                  ? "w-full py-4 rounded-full bg-[var(--color-hueso)] text-[var(--color-bordo-oscuro)] font-medium tracking-wide transition hover:bg-[var(--color-bronce)] hover:text-[var(--color-papel)]"
                  : "w-full py-4 px-4 rounded-full border border-[var(--color-hueso)]/50 text-[var(--color-hueso)] text-sm font-medium tracking-wide transition hover:border-[var(--color-hueso)] hover:bg-[var(--color-hueso)]/10"
              }
            >
              {enlace.label}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
