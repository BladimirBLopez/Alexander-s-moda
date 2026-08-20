import Link from "next/link";
import Image from "next/image";
import BotonCompartir from "@/components/BotonCompartir";

export default function CatalogoPage() {
  return (
    <main className="min-h-screen bg-[var(--color-papel)] flex flex-col">
      <div className="sticky top-0 z-10 px-3 py-2 flex items-center justify-between">
        <Link
          href="/"
          className="text-xs font-medium text-[var(--color-hueso)] bg-[var(--color-bordo)]/80 hover:bg-[var(--color-bordo)] inline-flex items-center gap-1 px-3 py-1.5 rounded-full shadow-md"
        >
          ← Volver
        </Link>
        <BotonCompartir />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10">
        <h1
          className="text-3xl uppercase tracking-wide text-center mb-1"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            color: "color-mix(in oklab, var(--color-bordo) 70%, white 30%)",
          }}
        >
          Alexander&apos;s Moda
        </h1>
        <p className="text-sm uppercase tracking-[0.15em] text-[var(--color-bronce)] mb-10 text-center">
          Elegí tu uniforme
        </p>

        <div className="w-full max-w-xs flex flex-col gap-5">
          <Link
            href="/catalogo/sport"
            className="w-full py-5 px-6 rounded-full bg-[var(--color-bordo)] text-[var(--color-hueso)] text-lg font-bold text-center uppercase tracking-wide shadow-lg hover:opacity-90 transition"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Uniforme Sport
          </Link>
          <Link
            href="/catalogo/casimir"
            className="w-full py-5 px-6 rounded-full bg-[var(--color-bordo)] text-[var(--color-hueso)] text-lg font-bold text-center uppercase tracking-wide shadow-lg hover:opacity-90 transition"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Uniforme Casimir
          </Link>
        </div>
      </div>
    </main>
  );
}
