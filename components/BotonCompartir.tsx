"use client";

export default function BotonCompartir() {
  async function compartir() {
    const datos = {
      title: "Alexander's Moda",
      text: "Uniformes escolares y moda colegial a medida",
      url: typeof window !== "undefined" ? window.location.href : "",
    };

    if (navigator.share) {
      try {
        await navigator.share(datos);
      } catch {
        // usuario cerró el diálogo, no hacer nada
      }
    } else {
      await navigator.clipboard.writeText(datos.url);
      alert("Link copiado");
    }
  }

  return (
    <button
      onClick={compartir}
      aria-label="Compartir"
      className="w-10 h-10 rounded-full bg-[var(--color-bordo-oscuro)] shadow-lg shadow-black/50 flex items-center justify-center text-[var(--color-hueso)] hover:bg-[var(--color-bordo)] transition"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 12v7a2 2 0 002 2h12a2 2 0 002-2v-7" strokeLinecap="round" />
        <path d="M16 6l-4-4-4 4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 2v14" strokeLinecap="round" />
      </svg>
    </button>
  );
}
