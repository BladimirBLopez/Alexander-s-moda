import Link from "next/link";
import type { ReactNode } from "react";
import AdminNav from "@/components/admin/AdminNav";
import BotonSalir from "@/components/admin/BotonSalir";
import IconoAdmin from "@/components/admin/IconoAdmin";
import AyudaFlotante from "@/components/admin/AyudaFlotante";

export const metadata = {
  title: "Administración | Alexander's Moda",
};

export default function PanelLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-papel text-carbon md:flex">
      <AdminNav />

      <div className="min-w-0 flex-1 pb-60 md:pb-24">
        <header className="sticky top-0 z-30 flex min-h-16 items-center justify-between gap-3 border-b border-white/10 bg-bordo px-4 sm:px-6 md:justify-end">
          <div className="min-w-0 md:hidden">
            <p
              className="truncate text-lg text-hueso"
              style={{ fontFamily: "var(--font-script)" }}
            >
              Alexander&apos;s Moda
            </p>
            <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-hueso/60">
              Administración
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-9 items-center gap-1.5 rounded-xl bg-hueso px-3 text-xs font-semibold text-bordo-oscuro transition hover:bg-white"
            >
              Ver sitio
              <IconoAdmin
                nombre="externo"
                className="h-3.5 w-3.5"
              />
            </Link>

            <BotonSalir />
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 md:px-8 md:py-9">
          <div className="mb-4 flex justify-end">
            <AyudaFlotante />
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
