"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactElement } from "react";

const ICONOS: Record<string, ReactElement> = {
  inicio: <path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9Z" />,
  uniformes: (
    <path d="M8 3l-5 3 2 4 3-1v12h8V9l3 1 2-4-5-3a4 4 0 0 1-8 0Z" />
  ),
  telas: (
    <>
      <rect x="3" y="3" width="8" height="8" rx="1" />
      <rect x="13" y="3" width="8" height="8" rx="1" />
      <rect x="3" y="13" width="8" height="8" rx="1" />
      <rect x="13" y="13" width="8" height="8" rx="1" />
    </>
  ),
  fotos: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="9" cy="10" r="2" />
      <path d="M21 16l-5-5-9 9" />
    </>
  ),
  proforma: (
    <>
      <path d="M6 2h9l5 5v15H6V2Z" />
      <path d="M14 2v6h6M9 13h8M9 17h8" />
    </>
  ),
};

const ITEMS = [
  { href: "/admin", label: "Inicio", icono: "inicio" },
  { href: "/admin/uniformes", label: "Uniformes", icono: "uniformes" },
  { href: "/admin/telas", label: "Telas", icono: "telas" },
  { href: "/admin/fotos", label: "Fotos", icono: "fotos" },
  { href: "/admin/proforma", label: "Proforma", icono: "proforma" },
];

function Icono({ nombre }: { nombre: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {ICONOS[nombre]}
    </svg>
  );
}

export default function AdminNav() {
  const pathname = usePathname();
  const activo = (href: string) =>
    href === "/admin" ? pathname === href : pathname.startsWith(href);

  return (
    <>
      {/* Escritorio: barra lateral */}
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col bg-bordo-oscuro p-4 md:flex">
        <p
          className="mb-6 px-2 text-lg text-hueso"
          style={{ fontFamily: "var(--font-script)" }}
        >
          Alexander&apos;s Moda
        </p>
        <nav className="flex flex-1 flex-col gap-1">
          {ITEMS.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                activo(i.href)
                  ? "bg-hueso text-bordo-oscuro font-semibold"
                  : "text-hueso/80 hover:bg-white/5"
              }`}
            >
              <Icono nombre={i.icono} />
              {i.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/admin/login"
          className="rounded-xl px-3 py-2.5 text-sm text-hueso/60 hover:bg-white/5"
        >
          Cerrar sesión
        </Link>
      </aside>

      {/* Móvil: barra inferior */}
      <nav className="fixed inset-x-0 bottom-0 z-40 flex border-t border-hueso/20 bg-bordo-oscuro pb-[env(safe-area-inset-bottom)] md:hidden">
        {ITEMS.map((i) => (
          <Link
            key={i.href}
            href={i.href}
            className={`flex flex-1 flex-col items-center gap-0.5 py-2 text-[10px] ${
              activo(i.href) ? "text-hueso" : "text-hueso/50"
            }`}
          >
            <Icono nombre={i.icono} />
            {i.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
