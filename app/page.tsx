import Link from "next/link";

// TODO: actualizar cuando llegue el logo PNG y mas redes
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
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@alexanders.moda",
    destacado: false,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center px-6 py-16 text-center">
      <div className="w-full max-w-sm flex flex-col items-center">
        <h1
          className="text-6xl text-[var(--color-hueso)] mb-1"
          style={{ fontFamily: "var(--font-script)" }}
        >
          Alexander&apos;s
        </h1>
        <p
          className="text-2xl tracking-[0.3em] text-[var(--color-hueso)] uppercase"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Moda
        </p>

        <div className="pespunte w-24 my-6" />

        <p className="text-[var(--color-papel)]/80 text-sm leading-relaxed mb-10">
          Uniformes escolares y moda colegial a medida en Bolivia
        </p>

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
