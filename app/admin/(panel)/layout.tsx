import Link from "next/link";
import type { ReactNode } from "react";
import AdminNav from "@/components/admin/AdminNav";

export const metadata = { title: "Panel | Alexander's Moda" };

export default function PanelLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-papel text-carbon md:flex">
      <AdminNav />
      <div className="min-w-0 flex-1 pb-36 md:pb-24">
        <header className="sticky top-0 z-20 flex items-center justify-between bg-bordo px-4 py-3 md:justify-end">
          <span
            className="text-lg text-hueso md:hidden"
            style={{ fontFamily: "var(--font-script)" }}
          >
            Alexander&apos;s Moda
          </span>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="rounded-full bg-hueso px-3.5 py-1.5 text-xs font-semibold text-bordo-oscuro"
            >
              Ver sitio ↗
            </Link>
            <Link
              href="/admin/login"
              className="rounded-full border border-hueso/40 px-3.5 py-1.5 text-xs text-hueso md:hidden"
            >
              Salir
            </Link>
          </div>
        </header>
        <main className="mx-auto max-w-3xl p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
