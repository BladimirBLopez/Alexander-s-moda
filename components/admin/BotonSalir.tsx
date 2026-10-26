"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BotonSalir() {
  const router = useRouter();
  const [saliendo, setSaliendo] = useState(false);

  async function salir() {
    setSaliendo(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      router.replace("/admin/login");
      router.refresh();
    }
  }

  return (
    <button
      type="button"
      onClick={salir}
      disabled={saliendo}
      className="rounded-full border border-hueso/40 px-3.5 py-1.5 text-xs text-hueso disabled:opacity-60"
    >
      {saliendo ? "Saliendo…" : "Salir"}
    </button>
  );
}
