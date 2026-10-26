"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import BotonSalir from "@/components/admin/BotonSalir";
import IconoAdmin, {
  type IconoAdminNombre,
} from "@/components/admin/IconoAdmin";

const SECCIONES: {
  href: string;
  label: string;
  icono: IconoAdminNombre;
}[] = [
  { href: "/admin", label: "Inicio", icono: "inicio" },
  {
    href: "/admin/uniformes",
    label: "Uniformes",
    icono: "uniformes",
  },
  { href: "/admin/telas", label: "Telas", icono: "telas" },
  { href: "/admin/fotos", label: "Fotos", icono: "fotos" },
  {
    href: "/admin/proforma",
    label: "Proforma",
    icono: "proforma",
  },
];

export default function AdminNav() {
  const pathname = usePathname();

  const activo = (href: string) =>
    href === "/admin"
      ? pathname === href
      : pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col overflow-y-auto bg-bordo-oscuro px-4 py-6 md:flex">
        <div className="mb-9 border-b border-white/10 px-3 pb-7">
          <p
            className="text-2xl text-hueso"
            style={{ fontFamily: "var(--font-script)" }}
          >
            Alexander&apos;s Moda
          </p>
          <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.23em] text-hueso/50">
            Administración
          </p>
        </div>

        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-hueso/40">
          Menú principal
        </p>

        <nav
          aria-label="Navegación de administración"
          className="flex flex-1 flex-col gap-1.5"
        >
          {SECCIONES.map((item) => {
            const seleccionado = activo(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={seleccionado ? "page" : undefined}
                className={
                  "flex min-h-12 items-center gap-3 rounded-xl px-3.5 text-sm transition-colors " +
                  (seleccionado
                    ? "bg-hueso font-semibold text-bordo-oscuro shadow-sm"
                    : "text-hueso/75 hover:bg-white/10 hover:text-hueso")
                }
              >
                <IconoAdmin nombre={item.icono} className="h-5 w-5" />
                <span className="flex-1">{item.label}</span>
                {seleccionado && (
                  <IconoAdmin nombre="flecha" className="h-4 w-4" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="mt-5 border-t border-white/10 pt-5">
          <BotonSalir enMenu />
        </div>
      </aside>

      <nav
        aria-label="Menú principal"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-bordo/10 bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_30px_rgba(40,16,20,0.07)] backdrop-blur-xl md:hidden"
      >
        <div className="mx-auto grid max-w-xl grid-cols-5 gap-0.5 px-2 py-2">
          {SECCIONES.map((item) => {
            const seleccionado = activo(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={seleccionado ? "page" : undefined}
                className="flex min-w-0 flex-col items-center justify-center gap-1 rounded-xl py-1"
              >
                <span
                  className={
                    "flex h-9 w-12 items-center justify-center rounded-xl transition-colors " +
                    (seleccionado
                      ? "bg-bordo text-hueso"
                      : "text-bordo/55")
                  }
                >
                  <IconoAdmin nombre={item.icono} className="h-[21px] w-[21px]" />
                </span>
                <span
                  className={
                    "text-[10px] leading-tight " +
                    (seleccionado
                      ? "font-semibold text-bordo"
                      : "font-medium text-carbon/55")
                  }
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
