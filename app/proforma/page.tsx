import Link from "next/link";
import Image from "next/image";

export default function ProformaPage() {
  return (
    <main className="h-screen flex flex-col bg-[var(--color-papel)] overflow-hidden">
      <div className="w-full flex items-center justify-between px-4 py-3 bg-[var(--color-bordo)] shrink-0">
        <Link
          href="/"
          className="text-sm text-[var(--color-hueso)] flex items-center gap-1.5"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Volver
        </Link>
        <a
          href="/proforma.pdf"
          download="proforma-alexanders-moda.pdf"
          className="text-sm text-[var(--color-bordo-oscuro)] bg-[var(--color-hueso)] px-4 py-1.5 rounded-full font-medium flex items-center gap-1.5"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Descargar
        </a>
      </div>
      <div className="flex-1 flex justify-center items-center py-2 px-2 min-h-0">
        <div className="relative h-full w-full max-w-2xl">
          <Image
            src="/proforma-preview.png"
            alt="Proforma Alexander's Moda"
            fill
            className="object-contain rounded-sm shadow-md"
            priority
          />
        </div>
      </div>
    </main>
  );
}
