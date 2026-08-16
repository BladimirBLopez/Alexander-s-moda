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
      className="w-10 h-10 rounded-full bg-[var(--color-bordo-oscuro)] border border-[var(--color-hueso)]/30 flex items-center justify-center text-[var(--color-hueso)] hover:bg-[var(--color-bordo)] transition"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
    </button>
  );
}
